import { FC } from "react";
import { RecordState } from "..";
import css from "./RecordingPlayer.module.less";
import RecordingStoppedIcon from "src/shared/icons/RecordingStopped.icon";
import RecordingIcon from "src/shared/icons/Recording.icon";
import PlayIcon from "src/shared/icons/Play.icon";
import StopIcon from "src/shared/icons/Stop.icon";
import PauseIcon from "src/shared/icons/Pause.icon";

interface IProps {
    state: RecordState;
    onPlay: () => void;
    onPause: () => void;
    onStop: () => void;
}

const RecordingPlayer: FC<IProps> = ({ state, onPlay, onPause, onStop }) => {
    return (
        <div className={css.recordingPlayer}>
            {state === "isStopped" ? (
                <RecordingStoppedIcon width={812} height={26} />
            ) : (
                <div className={css.actions}>
                    <RecordingIcon width={765} height={26} />
                    {state === "isPaused" && (
                        <div className={css.button} onClick={onPlay}>
                            <PlayIcon width={10} height={12} className={css.playIcon} />
                        </div>
                    )}
                    {state === "isRecording" && (
                        <div className={css.button} onClick={onPause}>
                            <PauseIcon width={10} height={12} className={css.playIcon} />
                        </div>
                    )}
                    <div className={css.button} onClick={onStop}>
                        <StopIcon width={8} height={8} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecordingPlayer;
