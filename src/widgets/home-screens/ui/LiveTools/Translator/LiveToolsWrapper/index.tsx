import DoeIcon from "src/shared/icons/Doe.icon";
import { FC, ReactElement, ReactNode, useState } from "react";
import { MagicMenu } from "../../MagicMenu";
import classNames from "classnames";
import Bookmarks from "../Bookmarks";
import TranslationIcon from "src/shared/icons/Translation.icon";
import { useChatStore } from "src/shared/providers";
import { MODE, ModeType } from "src/shared/types/Chat";
import RecordsIcon from "src/shared/icons/Records.icon";
import css from "./LiveToolsWrapper.module.less";

interface IProps {
    bookmarkIcon?: ReactElement;
    magicMenuItems: any;
    magicButtonIcon: ReactElement;
    magicButtonClass?: string;
    isRotated: boolean;
    children: ReactNode;
}

const LiveToolsWrapper: FC<IProps> = ({
    bookmarkIcon,
    magicMenuItems,
    magicButtonIcon,
    magicButtonClass,
    isRotated,
    children,
}) => {
    const { mode } = useChatStore();
    const [showBookmarks, setShowBookmarks] = useState(false);

    const renderBookmarkContent = (mode: ModeType) => {
        switch (mode) {
            case MODE.TRANSLATION:
            default:
                return {
                    icon: <TranslationIcon width={24} height={17} className={css.icon} />,
                    title: "Bookmarked Translations",
                    bookmark: "Hello this is the translation are ...",
                };
            case MODE.RECORDING:
                return {
                    icon: <RecordsIcon width={23} height={10} className={css.icon} />,
                    title: "Recordings",
                    bookmark: "Strategy Session with Sarah, Mi ...",
                };
        }
    };

    return (
        <div className={css.translator}>
            <div className={css.translationWrapper}>
                <div className={css.translation}>
                    {bookmarkIcon && (
                        <button
                            className={css.bookmarksButton}
                            onClick={() => setShowBookmarks(true)}
                        >
                            {bookmarkIcon}
                        </button>
                    )}
                    {showBookmarks && (
                        <div className={css.bookmarks}>
                            <Bookmarks
                                isActive={showBookmarks}
                                setIsActive={setShowBookmarks}
                                {...renderBookmarkContent(mode)}
                            />
                        </div>
                    )}
                    <div className={css.translationAreaWrapper}>
                        <div className={css.logo}>
                            <DoeIcon width={26} height={26} />
                        </div>
                        <div
                            className={classNames(css.translationArea, {
                                [css.translationAreaRotated]: isRotated,
                            })}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.magicMenu}>
                <MagicMenu
                    items={magicMenuItems}
                    magicButtonIcon={magicButtonIcon}
                    magicButtonClass={magicButtonClass}
                />
            </div>
        </div>
    );
};

export default LiveToolsWrapper;
