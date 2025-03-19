import classNames from "classnames";
import TextForTranslateIcon from "src/shared/icons/TextForTranslate.icon";
import RotateButton from "../RotateButton";
import { FC, useMemo, useState } from "react";
import DeviceIcon from "src/shared/icons/Device.icon";
import AppsIcon from "src/shared/icons/Apps.icon";
import PlaygroundIcon from "src/shared/icons/Playground.icon";
import { useDragFile } from "src/widgets/home-screens/lib";
import { TRANSLATION_MENU_OPTIONS } from "src/shared/types/Translation";
import FileLoadingProgress from "../FileLoadingProgress";
import FilesList from "../FilesList";
import TranslationActionButtons from "../TranslationActionButtons";
import LangPopup from "../LangPopup";
import { useFileLoading } from "./useFileLoading";
import TranslatedText from "./TranslatedText";
import TextToTranslate from "./TranslatedText/TextToTranslate";
import { IMagicMenuItem } from "../../MagicMenu/MagicMenuItem";
import { useAppStore } from "src/shared/providers";
import css from "./Translation.module.less";

interface IProps {
    isRotated: boolean;
    onRotate: (value: boolean) => void;
}

const Translation: FC<IProps> = ({ isRotated, onRotate }) => {
    const { activeTranslationOption: mode } = useAppStore();
    const isVoiceMode = mode === TRANSLATION_MENU_OPTIONS.VOICE_MODE;
    const [showLangPopup, setShowLangPopup] = useState(false);
    const [langText, setLangText] = useState("");
    const [translateFromImage, setTranslateFromImage] = useState(false);

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
            if (isUploadingFile) return;
            addFilesWithDelay(uploadFiles, 1000);
        },
    });

    const {
        uploadFiles,
        progress,
        isUploadingFile,
        isUploadFiles,
        addFilesWithDelay,
        files,
        currentFile,
    } = useFileLoading(translateFromImage, setTranslateFromImage, dragTarget);

    const handleEnteringLanguage = (e: any) => {
        setLangText(e.target.value);
    };

    const MAGIC_MENU_ITEMS: IMagicMenuItem[] = useMemo(
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
                                onFileLoad={() => setTranslateFromImage(true)}
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
                        [css.noEvents]: showLangPopup,
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
                        {isUploadFiles && !translateFromImage && (
                            <>
                                {isUploadingFile && !dragTarget ? (
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
                                    isDisabledUpload={isUploadingFile}
                                    alignEnd={isVoiceMode}
                                    blurButton={true}
                                    isDragging={drag}
                                />
                            </>
                        )}
                        <TextToTranslate
                            translateFromImage={translateFromImage}
                            isUploadFiles={isUploadFiles}
                            isRotated={isRotated}
                            isUploadingFile={isUploadingFile}
                            drag={drag}
                            magicMenuItems={MAGIC_MENU_ITEMS}
                        />
                    </div>
                </div>
                {isUploadFiles && <FilesList files={files} isRotated={isRotated} />}
            </div>
            <TranslatedText
                translateFromImage={translateFromImage}
                isRotated={isRotated}
                onRotate={onRotate}
            />
        </>
    );
};

export default Translation;
