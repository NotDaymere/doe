export class VideoStreamCuttingService {
    private isProcessing: boolean = false;
    private recorder: MediaRecorder | null = null;
    private backgroundVideo: HTMLVideoElement | null = null;
    private audioContext: AudioContext | null = null;

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
            console.log("[CUT] Invalid cut times: cutStart=", cutStart, "cutEnd=", cutEnd);
            throw new Error("Invalid cut times: end must be greater than start");
        }

        this.isProcessing = true;
        onProgress(0, "Starting cut");
        console.log("[CUT] Starting MediaRecorder cut from", cutStart, "to", cutEnd);

        try {

            this.backgroundVideo = document.createElement("video");
            this.backgroundVideo.src = url;
            this.backgroundVideo.style.display = "none";
            this.backgroundVideo.style.position = "absolute";
            this.backgroundVideo.style.left = "-9999px";
            document.body.appendChild(this.backgroundVideo);

            console.log("[CUT] Loading video metadata...");
            await new Promise<void>((resolve, reject) => {
                this.backgroundVideo!.onloadedmetadata = () => {
                    console.log("[CUT] Background video metadata loaded, duration:", this.backgroundVideo!.duration);
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

            console.log("[CUT] Setting currentTime to", cutStart);
            this.backgroundVideo.currentTime = cutStart;

            console.log("[CUT] Creating AudioContext...");
            this.audioContext = new AudioContext();
            const source = this.audioContext.createMediaElementSource(this.backgroundVideo);
            const destination = this.audioContext.createMediaStreamDestination();
            source.connect(destination);

            console.log("[CUT] Capturing stream...");
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
                    console.log("[CUT] Recording stopped");
                    const outputBlob = new Blob(chunks, { type: "video/webm" });
                    const fragmentUrl = URL.createObjectURL(outputBlob);
                    console.log("[CUT] Output Blob created, size:", outputBlob.size);

                    const downloadLink = document.createElement("a");
                    downloadLink.href = fragmentUrl;
                    downloadLink.download = `${fileName}_cut_${cutStart}-${cutEnd}.webm`;
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    console.log("[DOWNLOAD] Cut video downloaded as", downloadLink.download);

                    onProgress(100, "Completed");
                    onComplete(fragmentUrl);
                    console.log("[CUT] Cutting completed successfully");

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
                    console.log("[CUT] Recorded chunk, size:", e.data.size);
                }
            };

            console.log("[CUT] Starting playback...");
            await this.backgroundVideo.play().catch((err) => {
                console.error("[CUT] Playback error:", err);
                throw new Error("Failed to start playback: " + err.message);
            });
            console.log("[CUT] Starting MediaRecorder...");
            this.recorder.start();
            console.log("[CUT] Recording started");

            const duration = cutEnd - cutStart;
            console.log("[CUT] Cut duration:", duration, "seconds");
            const startTime = Date.now();
            const updateProgress = () => {
                if (!this.isProcessing) return;
                const elapsed = (Date.now() - startTime) / 1000;
                const progress = Math.min((elapsed / duration) * 80 + 10, 90);
                onProgress(progress, "Applying ");
                if (elapsed < duration) {
                    requestAnimationFrame(updateProgress);
                }
            };
            requestAnimationFrame(updateProgress);

            setTimeout(() => {
                if (this.recorder && this.recorder.state !== "inactive") {
                    console.log("[CUT] Stopping recording...");
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
        this.isProcessing = false;
        console.log("[CUT] Cleanup completed");
    }

    cancel(): void {
        this.isProcessing = false;
        if (this.recorder && this.recorder.state !== "inactive") {
            this.recorder.stop();
            console.log("[CUT] Recording cancelled");
        }
        if (this.backgroundVideo) {
            this.backgroundVideo.pause();
        }
        this.cleanup();
    }
}

export const videoStreamCuttingService = new VideoStreamCuttingService();