import { CSSTransition } from "react-transition-group";
import MinusIcon from "src/shared/icons/Minus.icon";
import MinimizeIcon from "src/shared/icons/Minimize.icon";
import { FC, ReactElement, useEffect, useState } from "react";
import css from "./Bookmarks.module.less";
import { useClickOut } from "src/shared/hooks/useClickOut";

interface IProps {
    icon: ReactElement;
    title: string;
    bookmark: string;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const Bookmarks: FC<IProps> = ({ icon, title, bookmark, isActive, setIsActive }) => {
    const [showBookmarks, setShowBookmarks] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowBookmarks(true);

            return () => {
                setShowBookmarks(false);
                setIsActive(false);
            };
        } else {
            setShowBookmarks(false);
            setIsActive(false);
        }
    }, [isActive]);

    const ref = useClickOut({
        handler: () => {
            setIsActive(false);
        },
    });

    return (
        <CSSTransition in={showBookmarks} timeout={500} classNames={css} unmountOnExit>
            <div className={css.bookmarks} ref={ref}>
                <div className={css.bookmarkHeader}>
                    <div className={css.bookmarkTitle}>
                        {icon}
                        <span>{title}</span>
                    </div>
                    <div className={css.minimizeButton}>
                        <MinimizeIcon width={12} height={12} />
                    </div>
                </div>
                <div className={css.bookmark}>
                    <span>{bookmark}</span>
                    <MinusIcon width={12} height={2} className={css.removeButton} />
                </div>
            </div>
        </CSSTransition>
    );
};

export default Bookmarks;
