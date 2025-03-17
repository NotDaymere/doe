import { useState, useRef, useEffect } from "react";
import PauseIcon from "src/shared/icons/Pause.icon";
import PlayIcon from "src/shared/icons/Play.icon";
import StopIcon from "src/shared/icons/Stop.icon";
import classNames from "classnames";
import WaveSurfer from "wavesurfer.js";
import css from "./AudioRecorder.module.less";

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAudioPaused, setIsAudioPaused] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const waveformRef = useRef<HTMLDivElement | null>(null);
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (isActive || isPlaying) {
            intervalRef.current = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, isPlaying]);

    useEffect(() => {
        if (!waveformRef.current || !audioUrl) return;

        let wavesurf = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#cfcfcf",
            progressColor: "#1f1f1f",
            cursorWidth: 1,
            cursorColor: "#1f1f1f",
            barWidth: 1,
            height: 30,
            normalize: true,
            hideScrollbar: true,
            url: audioUrl,
        });

        wavesurf.on("ready", () => {
            setIsPlaying(false);
        });

        wavesurf.on("finish", () => {
            setIsPlaying(false);
        });

        setWavesurfer(wavesurf);

        return () => {
            wavesurf.destroy();
        };
    }, [audioUrl, waveformRef.current]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes < 10 ? "0" + minutes : minutes}:${
            remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
        }`;
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
                stopVisualizing();
            };

            mediaRecorder.start();
            setIsActive(true);
            setIsRecording(true);
            setIsPaused(false);
            setIsStopped(false);
            startVisualizingStream(stream);
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const stopRecording = () => {
        setIsActive(false);

        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            if (!isAudioPaused) {
                setSeconds(0);
            }

            setIsRecording(false);
            setIsPaused(false);
            setIsStopped(true);
        }
    };

    const pauseRecording = () => {
        setIsPaused((prev) => !prev);
        if (mediaRecorderRef.current) {
            if (isPaused) {
                mediaRecorderRef.current.resume();
                setIsPaused(false);
                setIsActive(true);
            } else {
                mediaRecorderRef.current.pause();
                setIsPaused(true);
                setIsActive(false);
            }
        }
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const canvasContext = canvasRef.current?.getContext("2d");

        if (!canvas || !canvasContext) return;

        const pixelRatio = window.devicePixelRatio || 1;
        const canvasWidth = canvas.clientWidth * pixelRatio;
        const canvasHeight = canvas.clientHeight * pixelRatio;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        canvasContext.scale(pixelRatio, pixelRatio);
    };

    const drawBars = () => {
        const canvas = canvasRef.current;
        const canvasContext = canvasRef.current?.getContext("2d");

        if (!canvas || !canvasContext) return;

        const bufferLength = analyserRef?.current?.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength || 0);

        analyserRef?.current?.getByteFrequencyData(dataArray);

        canvasContext.clearRect(0, 0, canvas.width!, canvas.height!);

        const barWidth = 1;
        const barSpacing = 2;
        const barHeight = 6;
        const totalBars = Math.floor(canvas?.clientWidth / (barWidth + barSpacing));

        let x = 0;
        const centerY = canvas.clientHeight / 2;

        for (let i = 0; i < totalBars; i++) {
            canvasContext.fillStyle = "#cfcfcf";
            canvasContext.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
            x += barWidth + barSpacing;
        }

        x = (canvas.clientWidth - totalBars * (barWidth + barSpacing)) / 2;

        for (let i = 0; i < totalBars; i++) {
            const dynamicBarHeight = dataArray[i] / 2;
            canvasContext.fillStyle = isRecording || isPaused ? "#ff5f56" : "#1f1f1f";
            canvasContext.fillRect(x, centerY - dynamicBarHeight / 2, barWidth, dynamicBarHeight);
            x += barWidth + barSpacing;
        }

        animationRef.current = requestAnimationFrame(() => drawBars());
    };

    const startVisualizingStream = (stream: MediaStream) => {
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;

        resizeCanvas();

        drawBars();
        window.addEventListener("resize", () => resizeCanvas());
    };

    const stopVisualizing = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };

    const tooglePlayRecord = () => {
        if (isPlaying) {
            wavesurfer?.pause();
        } else {
            wavesurfer?.play();
        }
    };

    useEffect(() => {
        if (!wavesurfer) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        wavesurfer.on("play", handlePlay);
        wavesurfer.on("pause", handlePause);
    }, [wavesurfer]);

    useEffect(() => {
        resizeCanvas();

        drawBars();
        window.addEventListener("resize", () => resizeCanvas());

        return () => {
            stopVisualizing();
        };
    }, []);

    useEffect(() => {
        drawBars();
    }, [isRecording]);

    return (
        <div className={css.audioRecorder}>
            {isStopped && audioUrl ? (
                <div className={css.playRecord}>
                    <button
                        className={classNames(css.actionButton, css.actionButtonStopped)}
                        onClick={tooglePlayRecord}
                    >
                        {isPlaying ? (
                            <PauseIcon width={10} height={12} className={css.playIcon} />
                        ) : (
                            <PlayIcon width={10} height={12} className={css.playIcon} />
                        )}
                    </button>
                    <div ref={waveformRef} className={css.audioPlayer} />
                    <div className={classNames(css.timer, css.timerStopped)}>
                        {formatTime(seconds)}
                    </div>
                </div>
            ) : (
                <>
                    <canvas ref={canvasRef} width={400} height={100} className={css.waveform} />
                    <div className={css.timer}>{formatTime(seconds)}</div>
                    <div className={css.actions}>
                        {isRecording && (
                            <button className={css.actionButton} onClick={pauseRecording}>
                                {isPaused ? (
                                    <PlayIcon width={10} height={12} className={css.playIcon} />
                                ) : (
                                    <PauseIcon width={10} height={12} className={css.playIcon} />
                                )}
                            </button>
                        )}
                        {!isRecording && (
                            <button className={css.actionButton} onClick={startRecording}>
                                <PlayIcon width={10} height={12} className={css.playIcon} />
                            </button>
                        )}
                        {!isStopped && (
                            <button className={css.actionButton} onClick={stopRecording}>
                                <StopIcon width={8} height={8} />
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AudioRecorder;
