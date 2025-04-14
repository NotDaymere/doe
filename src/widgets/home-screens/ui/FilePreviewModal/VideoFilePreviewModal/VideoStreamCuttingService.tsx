export class VideoStreamCuttingService {
    private isProcessing: boolean = false;
    private recorder: MediaRecorder | null = null;
    private backgroundVideo: HTMLVideoElement | null = null;
    private audioContext: AudioContext | null = null;
    private onComplete: ((url: string) => void) | null = null;

    async cutVideo(
        url: string,
        cutStart: number,
        cutEnd: number,
        fileName: string,
        onProgress: (progress: number, stage: string) => void,
        onError: (error: string) => void,
        onComplete: (newUrl: string) => void
    ): Promise<void> {
        if (cutEnd <= cutStart) {
            throw new Error("Invalid cut times: end must be greater than start");
        }

        this.isProcessing = true;
        this.onComplete = onComplete;
        onProgress(0, "Starting cut");

        try {
            this.backgroundVideo = document.createElement("video");
            this.backgroundVideo.src = url;
            this.backgroundVideo.style.display = "none";
            this.backgroundVideo.style.position = "absolute";
            this.backgroundVideo.style.left = "-9999px";
            document.body.appendChild(this.backgroundVideo);

            await new Promise<void>((resolve, reject) => {
                this.backgroundVideo!.onloadedmetadata = () => {
                    resolve();
                };
                this.backgroundVideo!.onerror = () => {
                    console.error("[CUT] Failed to load video metadata");
                    reject(new Error("Failed to load video metadata"));
                };
                this.backgroundVideo!.load();
            });

            if (cutStart >= this.backgroundVideo!.duration || cutEnd > this.backgroundVideo!.duration) {
                throw new Error("Cut times exceed video duration");
            }

            this.backgroundVideo.currentTime = cutStart;

            this.audioContext = new AudioContext();
            const source = this.audioContext.createMediaElementSource(this.backgroundVideo);
            const destination = this.audioContext.createMediaStreamDestination();
            source.connect(destination);

            const videoStream = this.backgroundVideo.captureStream();
            const stream = new MediaStream([
                ...videoStream.getVideoTracks(),
                ...destination.stream.getAudioTracks(),
            ]);

            const mimeType = "video/webm;codecs=vp9,opus";
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                throw new Error("WebM with VP9/Opus is not supported in this browser");
            }

            if (!stream.getAudioTracks().length) {
                console.warn("[CUT] No audio tracks found in stream");
            }

            const chunks: Blob[] = [];
            this.recorder = new MediaRecorder(stream, { mimeType });

            const recordingPromise = new Promise<void>((resolve, reject) => {
                this.recorder!.onstop = async () => {
                    if (!this.isProcessing) {
                        resolve();
                        return;
                    }

                    const outputBlob = new Blob(chunks, { type: "video/webm" });
                    const fragmentUrl = URL.createObjectURL(outputBlob);

                    onProgress(100, "Completed");
                    onComplete(fragmentUrl);

                    stream.getTracks().forEach((track) => track.stop());
                    resolve();
                };

                this.recorder!.onerror = (e) => {
                    console.error("[CUT] MediaRecorder error:", e);
                    onError("Recording error");
                    stream.getTracks().forEach((track) => track.stop());
                    reject(new Error("MediaRecorder error"));
                };
            });

            this.recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            await this.backgroundVideo.play().catch((err) => {
                console.error("[CUT] Playback error:", err);
                throw new Error("Failed to start playback: " + err.message);
            });
            this.recorder.start();

            const duration = cutEnd - cutStart;
            const startTime = Date.now();
            const updateProgress = () => {
                if (!this.isProcessing) return;
                const elapsed = (Date.now() - startTime) / 1000;
                const progress = Math.min((elapsed / duration) * 80 + 10, 90);
                onProgress(progress, "Applying");
                if (elapsed < duration) {
                    requestAnimationFrame(updateProgress);
                }
            };
            requestAnimationFrame(updateProgress);

            setTimeout(() => {
                if (this.recorder && this.recorder.state !== "inactive") {
                    this.recorder.stop();
                    this.backgroundVideo?.pause();
                }
            }, duration * 1000);

            await recordingPromise;
            this.cleanup();

        } catch (error: any) {
            console.error("[CUT] Cutting error:", error);
            onError(error.message || "Unknown error");
            if (this.recorder) {
                this.recorder.stop();
            }
            if (this.backgroundVideo) {
                this.backgroundVideo.pause();
            }
            this.cleanup();
            throw error;
        }
    }

    private cleanup(): void {
        if (this.backgroundVideo) {
            document.body.removeChild(this.backgroundVideo);
            this.backgroundVideo = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        this.recorder = null;
        this.onComplete = null;
        this.isProcessing = false;
    }

    cancel(): void {
        this.isProcessing = false;
        if (this.recorder && this.recorder.state !== "inactive") {
            this.recorder.onstop = null;
            this.recorder.onerror = null;
            this.recorder.stop();
        }
        if (this.backgroundVideo) {
            this.backgroundVideo.pause();
        }
        this.cleanup();
    }
}

export const videoStreamCuttingService = new VideoStreamCuttingService();