import { FC } from "react";
import { IScreenShareConfig } from "src/shared/types/ScreenShare";
import css from "./ShareScreenInfo.module.less";

const ShareScreenInfo: FC<IScreenShareConfig> = ({
    title,
    description,
    label,
    icon,
    actions,
    videoUrl,
}) => (
    <div className={css.shareScreenWrapper}>
        {videoUrl && (
            <div className={css.video}>
                <video src={videoUrl} autoPlay loop />
            </div>
        )}
        <div className={css.shareScreen}>
            <div className={css.instruction}>
                <span className={css.bold}>{title}</span>
                <div
                    className={css.description}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
            {label && (
                <div className={css.bottom}>
                    <span>{label}</span>
                    {icon && icon}
                </div>
            )}
            {actions && (
                <div>
                    <button>Cancel</button>
                    <button>Try again</button>
                </div>
            )}
        </div>
    </div>
);

export default ShareScreenInfo;
