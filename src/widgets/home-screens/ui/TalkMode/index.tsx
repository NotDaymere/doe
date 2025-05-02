import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import css from "./TalkMode.module.less";
import { useAppStore } from "../../../../shared/providers";
import { TalkModeDynamicObj } from "./TalkModeDynamicObj/TalkModeDynamicObj";
import { TalkModeMessages } from "./TalkModeMessages/TalkModeMessages";
import { TalkModeActionsPanel } from "./TalkModeActionsPanel/TalkModeActionsPanel";
import { TalkModeVideoSection } from "./TalkModeVideoSection/TalkModeVideoSection";

interface TalkModeProps {
    targetRef: React.RefObject<HTMLElement>;
}

const MIN_SPEECH_DURATION = 100;
const SILENCE_DELAY = 1200;
const SILENCE_THRESHOLD = 0.04;

export const TalkMode: React.FC<TalkModeProps> = ({ targetRef }) => {
    const { talkModeActive, setTalkModeActive } = useAppStore();

    const [containerActive, setContainerActive] = useState(false);

    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState<string>("Hey, John. How can I help you?");

    const [isNeedToShowActionsPanel, setIsNeedToShowActionsPanel] = useState(false);
    const [isNeedToClose, setIsNeedToClose] = useState(false);

    const [isCameraOn, setIsCameraOn] = useState<boolean | null>(null);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState<boolean | null>(null);

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
    const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean>(false);

    const [volume, setVolume] = useState<number>(0);

    const [isUserResponseInProcess, setIsUserResponseInProcess] = useState(false);

    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

    const mediaStreamRef = useRef<MediaStream | null>(null);
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const speechStartTimeRef = useRef<number | null>(null);
    const { isSideBarOpen } = useAppStore();

    useEffect(() => {
        if (talkModeActive) {
            setIsNeedToClose(false);
        }
    }, [talkModeActive]);

    useEffect(() => {
        let containerTimer: ReturnType<typeof setTimeout>;
        let messageTimer: ReturnType<typeof setTimeout>;

        if (talkModeActive) {
            containerTimer = setTimeout(() => {
                setContainerActive(true);
            }, 50);

            messageTimer = setTimeout(() => {
                setShowMessage(true);
            }, 500);
        } else {
            setContainerActive(false);
            setShowMessage(false);
        }

        return () => {
            clearTimeout(containerTimer);
            clearTimeout(messageTimer);
        };
    }, [talkModeActive]);

    useEffect(() => {
        if (isNeedToClose) {
            setContainerActive(false);
            setShowMessage(false);
            const closeTimer = setTimeout(() => {
                setTalkModeActive(false);
            }, 300);
            return () => clearTimeout(closeTimer);
        }
        return undefined;
    }, [isNeedToClose, setTalkModeActive]);

    useEffect(() => {
        if (navigator.permissions) {
            navigator.permissions
                .query({ name: "camera" as PermissionName })
                .then((result) => {
                    setHasCameraPermission(result.state === "granted");
                    result.onchange = () => setHasCameraPermission(result.state === "granted");
                })
                .catch((error) => console.error("Camera permission query error:", error));

            navigator.permissions
                .query({ name: "microphone" as PermissionName })
                .then((result) => {
                    setHasMicrophonePermission(result.state === "granted");
                    result.onchange = () => setHasMicrophonePermission(result.state === "granted");
                })
                .catch((error) => console.error("Microphone permission query error:", error));
        }
    }, []);

    useEffect(() => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
            mediaStreamRef.current = null;
        }

        if (isCameraOn !== true && isMicrophoneOn !== true) {
            setAudioStream(null);
            return;
        }

        navigator.mediaDevices
            .getUserMedia({
                video: isCameraOn === true,
                audio: isMicrophoneOn === true,
            })
            .then((stream) => {
                mediaStreamRef.current = stream;
                if (isMicrophoneOn === true) {
                    setAudioStream(stream);
                } else {
                    setAudioStream(null);
                }
            })
            .catch((error) => {
                console.error("Error accessing media devices.", error);
            });

        return () => {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((track) => track.stop());
                mediaStreamRef.current = null;
            }
        };
    }, [isCameraOn, isMicrophoneOn]);

    useEffect(() => {
        if (isMicrophoneOn === true && audioStream) {
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(audioStream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            let animationFrameId: number;

            const updateVolume = () => {
                analyser.getByteTimeDomainData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    const sample = dataArray[i] - 128;
                    sum += sample * sample;
                }
                const rms = Math.sqrt(sum / dataArray.length);
                const normalized = Math.min(rms / 128, 1);
                setVolume(normalized);
                animationFrameId = requestAnimationFrame(updateVolume);
            };

            updateVolume();

            return () => {
                cancelAnimationFrame(animationFrameId);
                audioContext.close();
            };
        } else {
            setVolume(0);
        }
        return undefined;
    }, [isMicrophoneOn, audioStream]);

    useEffect(() => {
        if (isMicrophoneOn && audioStream) {
            if (volume >= SILENCE_THRESHOLD) {
                if (isUserResponseInProcess) {
                    setIsUserResponseInProcess(false);
                }
                if (!speechStartTimeRef.current) {
                    speechStartTimeRef.current = Date.now();
                }
                if (silenceTimeoutRef.current) {
                    clearTimeout(silenceTimeoutRef.current);
                    silenceTimeoutRef.current = null;
                }
            } else {
                if (speechStartTimeRef.current) {
                    const speechDuration = Date.now() - speechStartTimeRef.current;
                    if (speechDuration >= MIN_SPEECH_DURATION && !isUserResponseInProcess) {
                        if (!silenceTimeoutRef.current) {
                            silenceTimeoutRef.current = setTimeout(() => {
                                setIsUserResponseInProcess(true);
                                speechStartTimeRef.current = null;
                            }, SILENCE_DELAY);
                        }
                    }
                }
            }
        } else {
            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current);
                silenceTimeoutRef.current = null;
            }
            speechStartTimeRef.current = null;
            if (isUserResponseInProcess) {
                setIsUserResponseInProcess(false);
            }
        }
    }, [volume, isMicrophoneOn, audioStream, isUserResponseInProcess]);

    useEffect(() => {
        if (!isUserResponseInProcess) {
            return;
        }
        setCurrentMessage("");
        const timer = setTimeout(() => {
            setIsUserResponseInProcess(false);
            const newMessage =
                "" +
                "Your camera image contains a page of text with notes and graphs. " +
                "I can suggest the following actions:\n" +
                "1. Fixing the one thing there\n" +
                "2. Fixing the second thing there\n" +
                "3. Fixing the third thing there";
            setCurrentMessage(newMessage);
            setShowMessage(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isUserResponseInProcess]);

    if (!talkModeActive && !containerActive) {
        return null;
    }

    const closeBubbleHandler = () => {
        setShowMessage(false);
    };

    const handleCameraToggle = () => {
        setIsCameraOn((prev) => (prev === null ? true : !prev));
    };

    const handleMicrophoneToggle = () => {
        setIsMicrophoneOn((prev) => (prev === null ? true : !prev));
    };

    return (
        <div
            className={clsx(css.talkMode, { [css.sidebar_open]: isSideBarOpen }, { [css._active]: containerActive })}
            onMouseLeave={() => setIsNeedToShowActionsPanel(false)}
        >
            <TalkModeMessages
                message={currentMessage}
                showMessage={showMessage}
                closeBubbleHandler={closeBubbleHandler}
            />
            {!(isCameraOn === true) && (
                <div
                    className={clsx(css.hoverPanel, { [css._visible]: isNeedToShowActionsPanel })}
                    onMouseEnter={() => setIsNeedToShowActionsPanel(true)}
                    onMouseLeave={() => setIsNeedToShowActionsPanel(false)}
                >
                    <TalkModeActionsPanel
                        onClose={() => setIsNeedToClose(true)}
                        isCameraOn={isCameraOn}
                        isMicrophoneOn={isMicrophoneOn}
                        onCameraToggle={handleCameraToggle}
                        onMicrophoneToggle={handleMicrophoneToggle}
                        noPermissionForCamera={!hasCameraPermission}
                        noPermissionForMicrophone={!hasMicrophonePermission}
                    />
                </div>
            )}

            <div
                className={css.dynamicObjWrapper}
                onMouseEnter={() => setIsNeedToShowActionsPanel(true)}
                onMouseLeave={() => setIsNeedToShowActionsPanel(false)}
            >
                <TalkModeDynamicObj volume={volume} isThinkDoeMode={isUserResponseInProcess} />
                <TalkModeVideoSection
                    onClose={() => setIsNeedToClose(true)}
                    isCameraOn={isCameraOn}
                    isMicrophoneOn={isMicrophoneOn}
                    onCameraToggle={handleCameraToggle}
                    onMicrophoneToggle={handleMicrophoneToggle}
                    noPermissionForCamera={!hasCameraPermission}
                    noPermissionForMicrophone={!hasMicrophonePermission}
                    isNeedToShowActionsPanel={isNeedToShowActionsPanel}
                />
            </div>
        </div>
    );
};
