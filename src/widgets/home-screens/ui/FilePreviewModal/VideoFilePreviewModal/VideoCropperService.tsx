export class VideoCropperService {
    private isProcessing: boolean = false;
    private recorder: MediaRecorder | null = null;
    private backgroundVideo: HTMLVideoElement | null = null;
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private onComplete: ((url: string) => void) | null = null;
    private audioContext: AudioContext | null = null;

    async cropVideo(
        url: string,
        cropArea: { x: number; y: number; width: number; height: number },
        fileName: string,
        onProgress: (progress: number, stage: string) => void,
        onError: (error: string) => void,
        onComplete: (newUrl: string) => void
    ): Promise<void> {
        if (this.isProcessing) {
            throw new Error("Already processing");
        }

        this.isProcessing = true;
        this.onComplete = onComplete;
        onProgress(0, "Applying...");

        try {
            this.backgroundVideo = document.createElement("video");
            this.backgroundVideo.src = url;
            this.backgroundVideo.style.display = "none";
            document.body.appendChild(this.backgroundVideo);

            await new Promise<void>((resolve, reject) => {
                this.backgroundVideo!.onloadedmetadata = () => resolve();
                this.backgroundVideo!.onerror = () => reject(new Error("Failed to load video metadata"));
                this.backgroundVideo!.load();
            });

            const { videoWidth, videoHeight } = this.backgroundVideo;
            const { x, y, width, height } = cropArea;

            if (x < 0 || y < 0 || x + width > videoWidth || y + height > videoHeight) {
                throw new Error("Invalid crop area");
            }

            this.canvas = document.createElement("canvas");
            this.canvas.width = width;
            this.canvas.height = height;
            this.ctx = this.canvas.getContext("2d");

            const videoStream = this.canvas.captureStream();

            this.audioContext = new AudioContext();
            const audioSource = this.audioContext.createMediaElementSource(this.backgroundVideo);
            const audioDestination = this.audioContext.createMediaStreamDestination();
            audioSource.connect(audioDestination);
            const audioStream = audioDestination.stream;

            const audioTracks = audioStream.getAudioTracks();
            if (audioTracks.length === 0) {
                console.warn("No audio tracks found in the source video");
            }
            const combinedStream = new MediaStream([
                ...videoStream.getVideoTracks(),
                ...audioTracks,
            ]);

            const mimeType = "video/webm;codecs=vp9,opus";
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                throw new Error("WebM with VP9 and Opus is not supported");
            }

            const chunks: Blob[] = [];
            this.recorder = new MediaRecorder(combinedStream, { mimeType });

            const recordingPromise = new Promise<void>((resolve, reject) => {
                this.recorder!.onstop = () => {
                    const outputBlob = new Blob(chunks, { type: "video/webm" });
                    const fragmentUrl = URL.createObjectURL(outputBlob);
                    onComplete(fragmentUrl);
                    resolve();
                };
                this.recorder!.onerror = () => {
                    onError("Recording error");
                    reject(new Error("MediaRecorder error"));
                };
            });

            this.recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            this.recorder.start();

            const drawFrame = () => {
                if (!this.isProcessing || !this.backgroundVideo || !this.ctx) return;
                this.ctx.drawImage(
                    this.backgroundVideo,
                    x,
                    y,
                    width,
                    height,
                    0,
                    0,
                    width,
                    height
                );
                requestAnimationFrame(drawFrame);
            };

            const updateProgress = () => {
                if (!this.isProcessing || !this.backgroundVideo) return;
                const duration = this.backgroundVideo.duration;
                const currentTime = this.backgroundVideo.currentTime;
                if (duration && isFinite(duration) && duration > 0) {
                    const progress = Math.min((currentTime / duration) * 100, 100);
                    onProgress(progress, "Applying...");
                }
                if (this.isProcessing) {
                    setTimeout(updateProgress, 100);
                }
            };

            this.backgroundVideo.currentTime = 0;
            await this.backgroundVideo.play();
            drawFrame();
            updateProgress();

            this.backgroundVideo.addEventListener("ended", () => {
                if (this.recorder) this.recorder.stop();
                if (this.audioContext) this.audioContext.close();
            });

            await recordingPromise;
            this.cleanup();
        } catch (error: any) {
            onError(error.message || "Unknown error");
            this.cleanup();
            throw error;
        }
    }

    private cleanup(): void {
        if (this.backgroundVideo) {
            document.body.removeChild(this.backgroundVideo);
            this.backgroundVideo = null;
        }
        this.canvas = null;
        this.recorder = null;
        this.onComplete = null;
        this.isProcessing = false;
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
    }

    cancel(): void {
        this.isProcessing = false;
        if (this.recorder && this.recorder.state !== "inactive") {
            this.recorder.stop();
        }
        if (this.backgroundVideo) {
            this.backgroundVideo.pause();
        }
        this.cleanup();
    }
}

export const videoCropperService = new VideoCropperService();