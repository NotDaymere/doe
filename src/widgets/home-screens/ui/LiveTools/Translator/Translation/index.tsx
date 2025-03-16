import classNames from "classnames";
import {
    TEXT_TO_TRANSLATE_PART,
    TRANSLATED_TEXT_BOTTOM_PART,
    TRANSLATED_TEXT_TOP_PART,
    VOICE_TEXT_TO_TRANSLATE_PART,
    VOICE_TRANSLATED_TEXT_BOTTOM_PART,
    VOICE_TRANSLATED_TEXT_TOP_PART,
} from "../../MockData";
import TranslatedTextIcon from "src/shared/icons/TranslatedText.icon";
import VolumeIcon from "src/shared/icons/Volume.icon";
import TextForTranslateIcon from "src/shared/icons/TextForTranslate.icon";
import RotateButton from "../RotateButton";
import { FC, useEffect, useMemo, useState } from "react";
import DeviceIcon from "src/shared/icons/Device.icon";
import AppsIcon from "src/shared/icons/Apps.icon";
import PlaygroundIcon from "src/shared/icons/Playground.icon";
import { useDragFile } from "src/widgets/home-screens/lib";
import { TRANSLATION_MENU_OPTIONS, TranslationMenuOptionsType } from "src/shared/types/Translation";
import RecordIcon from "src/shared/icons/Record.icon";
import FileLoadingProgress from "../../LiveToolsWrapper/FileLoadingProgress";
import { splitText } from "./helpers";
import FilesList from "../FilesList";
import TranslationActionButtons from "../TranslationActionButtons";
import LangPopup from "../LangPopup";
import css from "./Translation.module.less";

interface IProps {
    mode: TranslationMenuOptionsType;
    isRotated: boolean;
    onRotate: (value: boolean) => void;
}

const DURATION = 1000;

const Translation: FC<IProps> = ({ mode, isRotated, onRotate }) => {
    const isVoiceMode = mode === TRANSLATION_MENU_OPTIONS.VOICE_MODE;
    const [isUploadFiles, setIsUploadFiles] = useState(false);
    const [isUploadingFiles, setIsUploadingFiles] = useState(false);
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState<File[]>([]);
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [showLangPopup, setShowLangPopup] = useState(false);
    const [langText, setLangText] = useState("");

    const simulateFileUpload = (duration: number) => {
        return new Promise<void>((resolve) => {
            let currentProgress = 0;
            const step = 100 / (duration / 10);

            const interval = setInterval(() => {
                currentProgress += step;
                setProgress(currentProgress);
                if (currentProgress >= 100) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    };

    const resetProgress = () => {
        return new Promise<void>((resolve) => {
            setProgress(100);
            setTimeout(() => {
                setProgress(0);
                resolve();
            }, 1);
        });
    };

    const addFilesWithDelay = async (filesArray: File[], delay: number) => {
        setIsUploadingFiles(true);
        setIsUploadFiles(true);

        const addNextFile = async () => {
            const currItem = filesArray.shift();
            if (!currItem) return;

            setCurrentFile(currItem);
            setProgress(0);

            await simulateFileUpload(DURATION);

            setFiles((prevFiles) => [...prevFiles, currItem]);

            if (filesArray.length !== 0) {
                await resetProgress();
                await new Promise((resolve) => setTimeout(resolve, delay));
                await addNextFile();
            }
        };

        await addNextFile();
        setIsUploadingFiles(false);
    };

    const {
        drag,
        dragTarget,
        handleDragDropTarget,
        handleDragLeaveTarget,
        handleDragOverTarget,
        handleDragStart,
        handleDragOver,
        handleDragCancel,
    } = useDragFile({
        onUploadFiles(uploadFiles) {
            if (isUploadingFiles) return;
            addFilesWithDelay(uploadFiles, 1000);
        },
    });

    useEffect(() => {
        if (drag) {
            setIsUploadFiles(true);
        }
    }, [drag]);

    const uploadFiles = () => {
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = true;
        input.onchange = (event: Event) => {
            const newFiles = Array.from((event.target as any)?.files) as File[];
            addFilesWithDelay(newFiles, 1000);
            input.remove();
        };
        input.click();
    };

    const handleEnteringLanguage = (e: any) => {
        setLangText(e.target.value);
    };

    useEffect(() => {
        return () => {
            setIsUploadFiles(false);
            setIsUploadingFiles(false);
        };
    }, []);

    const MAGIC_MENU_ITEMS = useMemo(
        () => [
            {
                icon: <DeviceIcon width={18} height={11} />,
                text: "Device Files",
                onClick: uploadFiles,
            },
            {
                icon: <AppsIcon width={9} height={15} />,
                text: "Applications",
                onClick: () => {
                    console.log("Applications");
                },
            },
            {
                icon: <PlaygroundIcon width={15} height={15} />,
                text: "Playgrounds",
                onClick: () => {
                    console.log("Playgrounds");
                },
            },
        ],
        []
    );

    const textToTranslate = TEXT_TO_TRANSLATE_PART || VOICE_TEXT_TO_TRANSLATE_PART;
    const translatedTopText = TRANSLATED_TEXT_TOP_PART || VOICE_TRANSLATED_TEXT_TOP_PART;
    const translatedBottomText = TRANSLATED_TEXT_BOTTOM_PART || VOICE_TRANSLATED_TEXT_BOTTOM_PART;

    return (
        <>
            <div className={css.translationBlock}>
                <div
                    className={
                        isRotated ? css.translateIconRotatedWrapper : css.translateIconWrapper
                    }
                >
                    <button className={css.translateIcon} onClick={() => setShowLangPopup(true)}>
                        <TextForTranslateIcon width={20} height={20} />
                    </button>
                    {showLangPopup && (
                        <div
                            className={classNames(css.langPopup, {
                                [css.langPopupRotated]: isRotated,
                            })}
                        >
                            <LangPopup
                                text={langText}
                                onChange={handleEnteringLanguage}
                                isActive={showLangPopup}
                                setIsActive={setShowLangPopup}
                            />
                        </div>
                    )}
                    {!isRotated && (
                        <RotateButton onClick={() => onRotate(!isRotated)} isRotaded={isRotated} />
                    )}
                </div>
                <div
                    className={classNames(css.textForTranslateWrapper, {
                        [css.uploadArea]: isUploadFiles,
                    })}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragCancel}
                >
                    <div
                        className={classNames(css.dragWrapper, { [css._over]: dragTarget })}
                        onDragOver={handleDragOverTarget}
                        onDrop={handleDragDropTarget}
                        onDragLeave={handleDragLeaveTarget}
                    >
                        {drag && <div className={css.panel_drag}></div>}
                        {isUploadFiles && (
                            <>
                                {isUploadingFiles && !dragTarget ? (
                                    <div className={css.fileLoadingProgress}>
                                        <FileLoadingProgress
                                            fileName={currentFile?.name || ""}
                                            progress={progress}
                                            isRotated={isRotated}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <span
                                            className={classNames(css.panel_drag_text, {
                                                [css.hidden]: dragTarget,
                                            })}
                                        >
                                            Upload files, folders, text content, or code here.
                                        </span>
                                    </>
                                )}
                                <TranslationActionButtons
                                    magicMenuItems={MAGIC_MENU_ITEMS}
                                    isDisabledUpload={isUploadingFiles}
                                    alignEnd={isVoiceMode}
                                    blurButton={true}
                                    isDragging={drag}
                                />
                            </>
                        )}
                        {textToTranslate && !isUploadFiles && (
                            <div
                                className={classNames(css.textForTranslate, {
                                    [css.textForTranslateRow]: isVoiceMode,
                                })}
                            >
                                <div
                                    className={classNames(css.textWrapper, {
                                        [css.textWrapperRotated]: isRotated,
                                    })}
                                >
                                    {isVoiceMode && !isUploadFiles ? (
                                        <div className={css.record}>
                                            <RecordIcon width={18} height={16} />
                                        </div>
                                    ) : null}
                                    {textToTranslate && !isUploadFiles && (
                                        <>
                                            {isVoiceMode ? (
                                                <div className={css.inline}>
                                                    <span>
                                                        {
                                                            splitText(VOICE_TEXT_TO_TRANSLATE_PART)
                                                                .beforeLastDot
                                                        }
                                                    </span>
                                                    <span className={css.lastSentence}>
                                                        {
                                                            splitText(VOICE_TEXT_TO_TRANSLATE_PART)
                                                                .afterLastDot
                                                        }
                                                    </span>
                                                </div>
                                            ) : (
                                                <div
                                                    className={css.text}
                                                    dangerouslySetInnerHTML={{
                                                        __html: TEXT_TO_TRANSLATE_PART,
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                                {!isUploadFiles && (
                                    <TranslationActionButtons
                                        magicMenuItems={MAGIC_MENU_ITEMS}
                                        isDisabledUpload={isUploadingFiles}
                                        alignEnd={isVoiceMode}
                                        isDragging={drag}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {isUploadFiles && <FilesList files={files} />}
            </div>
            <div className={css.translationBlock}>
                <div className={css.buttonsWrapper}>
                    <div className={css.icons}>
                        {translatedTopText && translatedBottomText && (
                            <div className={css.volumeIcon}>
                                <VolumeIcon width={17} height={13} />
                            </div>
                        )}
                        <div className={css.translateIcon}>
                            <TranslatedTextIcon width={20} height={20} />
                        </div>
                    </div>
                    {isRotated && (
                        <div className={css.rotateButton}>
                            <RotateButton
                                onClick={() => onRotate(!isRotated)}
                                isRotaded={isRotated}
                            />
                        </div>
                    )}
                </div>
                {translatedTopText && translatedBottomText && (
                    <div className={css.translatedTextWrapper}>
                        <div
                            className={css.text}
                            dangerouslySetInnerHTML={{
                                __html: isVoiceMode
                                    ? VOICE_TRANSLATED_TEXT_TOP_PART
                                    : TRANSLATED_TEXT_TOP_PART,
                            }}
                        />
                        {isVoiceMode ? (
                            <div className={css.inline}>
                                <span className={css.bottomText}>
                                    {splitText(VOICE_TRANSLATED_TEXT_BOTTOM_PART).beforeLastDot}
                                </span>
                                <span className={css.lastSentenceTranslated}>
                                    {splitText(VOICE_TRANSLATED_TEXT_BOTTOM_PART).afterLastDot}
                                </span>
                            </div>
                        ) : (
                            <div
                                className={classNames(css.text, css.bottomText)}
                                dangerouslySetInnerHTML={{
                                    __html: TRANSLATED_TEXT_BOTTOM_PART,
                                }}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default Translation;
