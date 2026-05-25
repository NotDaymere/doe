import { useState, useRef, useEffect } from "react";
import PauseIcon from "src/shared/icons/Pause.icon";
import PlayIcon from "src/shared/icons/Play.icon";
import StopIcon from "src/shared/icons/Stop.icon";
import classNames from "classnames";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import css from "./AudioRecorder.module.less";

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStopped, setIsStopped] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const waveformRef = useRef<HTMLDivElement | null>(null);
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

    const waveformRecordRef = useRef<HTMLDivElement | null>(null);
    const [wavesurferRecord, setWavesurferRecord] = useState<RecordPlugin | null>(null);

    useEffect(() => {
        if (!waveformRecordRef.current) return;

        const wavesurfer = WaveSurfer.create({
            container: waveformRecordRef.current,
            waveColor: "#FF0004",
            progressColor: "transparent",
            barWidth: 1,
            barGap: 2,
            barHeight: 22,
            height: 30,
        });

        const record = wavesurfer.registerPlugin(
            RecordPlugin.create({
                renderRecordedAudio: false,
            })
        );

        setWavesurferRecord(record);

        record.on("record-end", (blob) => {
            if (!waveformRef.current) return;
            const recordedUrl = URL.createObjectURL(blob);

            const getCSSVar = (name: string) =>
                getComputedStyle(document.documentElement).getPropertyValue(name).trim();

            const recordedWaveSurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: getCSSVar("--var-88"),
                progressColor: getCSSVar("--var-7"),
                barWidth: 1,
                barGap: 2,
                barHeight: 22,
                height: 30,
                url: recordedUrl,
            });

            setWavesurfer(recordedWaveSurfer);

            recordedWaveSurfer.on("play", () => setIsPlaying(true));
            recordedWaveSurfer.on("pause", () => setIsPlaying(false));
            recordedWaveSurfer.on("finish", () => setSeconds(0));
        });

        return () => {
            wavesurfer.destroy();
        };
    }, []);

    const startRecording = () => {
        wavesurferRecord?.startRecording();
        setIsRecording(true);
        setIsActive(true);
        setSeconds(0);
    };

    const stopRecording = () => {
        wavesurferRecord?.stopRecording();
        setIsActive(false);
        setIsRecording(false);
        setIsStopped(true);
    };

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

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes < 10 ? "0" + minutes : minutes}:${
            remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
        }`;
    };

    const pauseRecording = () => {
        setIsPaused((prev) => !prev);
        if (isPaused) {
            wavesurferRecord?.resumeRecording();
            setIsPaused(false);
            setIsActive(true);
        } else {
            wavesurferRecord?.pauseRecording();
            setIsPaused(true);
            setIsActive(false);
        }
    };

    const tooglePlayRecord = () => {
        if (isPlaying) {
            wavesurfer?.pause();
        } else {
            setSeconds(0);
            wavesurfer?.play();
        }
    };

    return (
        <div className={css.audioRecorder}>
            {isStopped ? (
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
                    <div ref={waveformRecordRef} className={css.audioPlayer} />
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
