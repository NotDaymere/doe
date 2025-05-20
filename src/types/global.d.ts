declare global {
    interface HTMLVideoElement {
        captureStream(): MediaStream;
    }

    class MediaStreamTrackProcessor {
        constructor(options: { track: MediaStreamTrack });
        readonly readable: ReadableStream<VideoFrame>;
    }
}