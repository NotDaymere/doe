import { CSSTransition } from "react-transition-group";
import { FC, useEffect, useRef, useState } from "react";
import { IScreenShareConfig } from "src/shared/types/ScreenShare";
import css from "./ShareScreenInfo.module.less";
import clsx from "clsx";

interface IProps extends IScreenShareConfig {
    onClickOutside: () => void;
    isActive: boolean;
}

const ShareScreenInfo: FC<IProps> = ({
    title,
    description,
    label,
    icon,
    actions,
    videoUrl,
    onClickOutside,
    isActive,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [showScreenInfo, setShowScreenInfo] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowScreenInfo(true);
            return () => {
                setShowScreenInfo(false);
            };
        } else {
            setShowScreenInfo(false);
        }
    }, [isActive]);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            onClickOutside();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <CSSTransition in={showScreenInfo} timeout={500} classNames={css} unmountOnExit>
            <div ref={ref} className={css.shareScreenWrapper}>
                {videoUrl && (
                    <div className={css.video}>
                        <video src={videoUrl} autoPlay loop />
                    </div>
                )}
                <div className={css.shareScreen}>
                    <div className={css.instruction}>
                        <span className={clsx(css.title, css.bold)}>{title}</span>
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
        </CSSTransition>
    );
};

export default ShareScreenInfo;
