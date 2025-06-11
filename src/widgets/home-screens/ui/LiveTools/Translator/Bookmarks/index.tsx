import MinusIcon from "src/shared/icons/Minus.icon";
import MinimizeIcon from "src/shared/icons/Minimize.icon";
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import css from "./Bookmarks.module.less";

interface IProps {
    icon: ReactElement;
    title: string;
    bookmark: string;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

type AnimationState = "enter" | "visible" | "exit";

const Bookmarks: FC<IProps> = ({ icon, title, bookmark, isActive, setIsActive }) => {
    const [animationState, setAnimationState] = useState<AnimationState>("enter");
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isActive) {
            setAnimationState("visible");
        }
    }, [isActive]);

    const handleClose = () => {
        setAnimationState("exit");
        setTimeout(() => {
            setIsActive(false);
        }, 300);
    };

    if (!isActive && animationState === "enter") return null;

    return (
        <div
            ref={ref}
            className={classNames(css.bookmarks, css[animationState])}
        >
            <div className={css.bookmarkHeader}>
                <div className={css.bookmarkTitle}>
                    {icon}
                    <span>{title}</span>
                </div>
                <div className={css.minimizeButton}>
                    <MinimizeIcon width={12} height={12} onClick={handleClose} />
                </div>
            </div>
            <div className={css.bookmarkWrapper}>
                <div className={css.bookmark}>
                    <span>{bookmark}</span>
                    <MinusIcon width={12} height={2} className={css.removeButton} />
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;
