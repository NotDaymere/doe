import DoeIcon from "src/shared/icons/Doe.icon";
import React, { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { MagicMenu } from "../../MagicMenu";
import classNames from "classnames";
import Bookmarks from "../Bookmarks";
import { useAppStore, useChatStore } from "src/shared/providers";
import { MODE } from "src/shared/types/Chat";
import css from "./LiveToolsWrapper.module.less";
import { FavBookmarks } from "../../../ChatMessage/assets/FavButton/FavBookmarks";
import { TEXT_TO_TRANSLATE_PART, VOICE_TEXT_TO_TRANSLATE_PART } from "../../MockData";
import { FavRecording } from "../../../ChatMessage/assets/FavButton/FavRecording";
import Recording from "../Bookmarks/Recording";
import RedMark from "../../../../../../shared/icons/RedMark";

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
    const { mode, getOpenSavedPlaygrounds, updateSavedPlaygrounds, closeNoPlayground, selectedBookmark, selectedRecording, savedBookmarks, savedRecordings } = useChatStore();

    useEffect(() => {
        const savedPlaygrounds = getOpenSavedPlaygrounds();

        savedPlaygrounds.forEach((savedPlayground) => {
            savedPlayground.open = false;
            updateSavedPlaygrounds(savedPlayground);
        });

        closeNoPlayground();
    }, []);

    const [showBookmarks, setShowBookmarks] = useState(false);
    const {isSideBarOpen} = useAppStore();

    return (
        <div className={!isSideBarOpen ? css.translator : css.sidebar_open_translator}>
            <div className={css.translationWrapper}>
                <div className={css.translation}>
                    <div className={css.bookmarksButtonContainer}>
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
                                {mode === MODE.TRANSLATION && (
                                    <Bookmarks
                                        isActive={showBookmarks}
                                        setIsActive={setShowBookmarks}
                                        mode={mode}
                                    />
                                )}
                                {mode === MODE.RECORDING && (
                                    <Recording
                                        isActive={showBookmarks}
                                        setIsActive={setShowBookmarks}
                                        mode={mode}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className={css.translationAreaWrapper}>
                        <div className={css.logo}>
                            {
                                (savedBookmarks.some(b => b.id === selectedBookmark.id)
                                    || savedRecordings.some(b => b.id === selectedRecording.id) ) &&
                                <span className={css.logo_mark}>
                                    <RedMark />
                                </span>
                            }
                            <DoeIcon width={26} height={26} className={css.logo_doe} />
                        </div>
                        <div
                            className={classNames(css.translationArea, {
                                [css.translationAreaRotated]: isRotated,
                            })}
                        >
                            {children}
                        </div>
                        {mode === MODE.TRANSLATION && (
                            <FavBookmarks
                                bookmark={selectedBookmark}
                                className={css.custom_fav_button}
                            />
                        )}

                        {mode === MODE.RECORDING && (
                            <FavRecording
                                recording={selectedRecording}
                                className={css.custom_fav_button}
                            />
                        )}
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
