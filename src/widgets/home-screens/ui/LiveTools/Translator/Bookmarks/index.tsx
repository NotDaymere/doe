import MinusIcon from "src/shared/icons/Minus.icon";
import MinimizeIcon from "src/shared/icons/Minimize.icon";
import { FC, ReactElement, useState } from "react";
import classNames from "classnames";
import css from "./Bookmarks.module.less";

interface IProps {
    icon: ReactElement;
    title: string;
    bookmark: string;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const Bookmarks: FC<IProps> = ({ icon, title, bookmark, isActive, setIsActive }) => {
    const [close, setClose] = useState(false);

    return (
        <div
            className={classNames(css.bookmarks, {
                [css.bookmarksShow]: isActive,
                [css.bookmarksClose]: close,
            })}
        >
            <div className={classNames(css.bookmarkHeader, { [css.bookmarkHeaderShow]: isActive })}>
                <div className={css.bookmarkTitle}>
                    {icon}
                    <span>{title}</span>
                </div>
                <div className={css.minimizeButton}>
                    <MinimizeIcon
                        width={12}
                        height={12}
                        onClick={() => {
                            setClose(true);
                            setTimeout(() => setIsActive(false), 300);
                        }}
                    />
                </div>
            </div>
            <div
                className={classNames(css.bookmarkWrapper, { [css.bookmarkContentShow]: isActive })}
            >
                <div className={classNames(css.bookmark, { [css.bookmarkShow]: isActive })}>
                    <span>{bookmark}</span>
                    <MinusIcon width={12} height={2} className={css.removeButton} />
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;
