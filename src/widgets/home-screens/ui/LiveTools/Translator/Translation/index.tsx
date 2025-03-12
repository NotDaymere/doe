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
import PlanetIcon from "src/shared/icons/Planet.icon";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import TextForTranslateIcon from "src/shared/icons/TextForTranslate.icon";
import RotateButton from "../RotateButton";
import { FC, useEffect, useMemo, useState } from "react";
import DeviceIcon from "src/shared/icons/Device.icon";
import AppsIcon from "src/shared/icons/Apps.icon";
import PlaygroundIcon from "src/shared/icons/Playground.icon";
import { MagicMenu } from "../../MagicMenu";
import { usePanel } from "src/widgets/home-screens/lib";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import CheckFilledIcon from "src/shared/icons/CheckFilled.icon";
import { TRANSLATION_MENU_OPTIONS, TranslationMenuOptionsType } from "src/shared/types/Translation";
import RecordIcon from "src/shared/icons/Record.icon";
import FileUploader from "../../LiveToolsWrapper/FileUploader";
import css from "./Translation.module.less";

interface IProps {
    mode: TranslationMenuOptionsType;
    isRotated: boolean;
    onRotate: (value: boolean) => void;
}

const DURATION = 5000;

const Translation: FC<IProps> = ({ mode, isRotated, onRotate }) => {
    const isVoiceMode = mode === TRANSLATION_MENU_OPTIONS.VOICE_MODE;
    const { files, setFiles } = usePanel();
    const [isUploadFiles, setIsUploadFiles] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const startAnimation = () => {
            let currentProgress = 0;
            const step = 100 / (DURATION / 10);

            interval = setInterval(() => {
                currentProgress += step;
                if (currentProgress >= 100) {
                    clearInterval(interval);
                    setProgress(100);
                } else {
                    setProgress(Math.floor(currentProgress));
                }
            }, 10);
        };

        startAnimation();

        return () => clearInterval(interval);
    }, [DURATION]);

    const uploadFiles = () => {
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = true;
        input.onchange = (ev: any) => {
            const newFiles = Array.from(ev.target.files) as File[];
            setFiles([...files, ...newFiles]);
            setIsUploadFiles(true);
            input.remove();
        };
        input.click();
    };

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

    const splitText = (text: string) => {
        const lastDotIndex = text.lastIndexOf(".");
        if (lastDotIndex === -1) {
            return { beforeLastDot: text, afterLastDot: "" };
        }
        const beforeLastDot = text.substring(0, lastDotIndex + 1);
        const afterLastDot = text.substring(lastDotIndex + 1);
        return { beforeLastDot, afterLastDot };
    };

    const renderUploadIcons = () => (
        <div className={classNames(css.icons, { [css.alignEnd]: isVoiceMode })}>
            {!isUploadFiles && (
                <div className={css.magicMenu}>
                    <MagicMenu
                        items={MAGIC_MENU_ITEMS}
                        magicButtonIcon={<AttachmentIcon width={15} height={15} />}
                        classes={css.menu}
                    />
                </div>
            )}
            <PlanetIcon width={15} height={15} />
        </div>
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
                    <div className={css.translateIcon}>
                        <TextForTranslateIcon width={20} height={20} />
                    </div>
                    {!isRotated && (
                        <RotateButton onClick={() => onRotate(!isRotated)} isRotaded={isRotated} />
                    )}
                </div>
                <div
                    className={classNames(css.textForTranslateWrapper, {
                        [css.uploadArea]: isUploadFiles,
                    })}
                >
                    {isUploadFiles && (
                        <FileUploader
                            fileName={files[files.length - 1]?.name}
                            progress={progress}
                            isActive={isUploadFiles}
                            setIsActive={setIsUploadFiles}
                        />
                    )}
                    {isUploadFiles && (
                        <div className={css.uploadFilesIcons}>{renderUploadIcons()}</div>
                    )}
                    <div
                        className={classNames(css.textForTranslate, {
                            [css.textForTranslateRow]: isVoiceMode,
                        })}
                    >
                        <div className={css.textWrapper}>
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
                        {!isUploadFiles && renderUploadIcons()}
                    </div>
                </div>
                {isUploadFiles && (
                    <div className={css.filesList}>
                        {files?.map((file) => (
                            <div className={css.file} key={file.name}>
                                <FileFilledIcon width={10} height={12} />
                                {file.name}
                                <CheckFilledIcon width={16} height={16} />
                            </div>
                        ))}
                    </div>
                )}
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
