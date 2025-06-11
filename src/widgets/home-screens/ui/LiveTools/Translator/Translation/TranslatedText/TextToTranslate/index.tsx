import classNames from "classnames";
import css from "./TextToTranslate.module.less";
import { FC, useEffect } from "react";
import RecordIcon from "src/shared/icons/Record.icon";
import { splitText } from "../../helpers";
import { VOICE_TEXT_TO_TRANSLATE_PART, TEXT_TO_TRANSLATE_PART } from "../../../../MockData";
import { useAppStore } from "src/shared/providers";
import { TRANSLATION_MENU_OPTIONS } from "src/shared/types/Translation";
import TranslationActionButtons from "../../../TranslationActionButtons";
import { IMagicMenuItem } from "../../../../MagicMenu/MagicMenuItem";

interface IProps {
    translateFromImage: boolean;
    isUploadFiles: boolean;
    isUploadingFile: boolean;
    drag: boolean;
    isRotated: boolean;
    magicMenuItems: IMagicMenuItem[];
}

const TextToTranslate: FC<IProps> = ({
    translateFromImage,
    isUploadFiles,
    isUploadingFile,
    drag,
    isRotated,
    magicMenuItems,
}) => {
    const { activeTranslationOption } = useAppStore();
    const isVoiceMode = activeTranslationOption === TRANSLATION_MENU_OPTIONS.VOICE_MODE;

    const renderContent = () => {
        if (activeTranslationOption === TRANSLATION_MENU_OPTIONS.TRANSLATION) {
            return (
                <div
                    className={css.text}
                    dangerouslySetInnerHTML={{
                        __html: TEXT_TO_TRANSLATE_PART,
                    }}
                />
            );
        }
        if (activeTranslationOption === TRANSLATION_MENU_OPTIONS.VOICE_MODE) {
            return (
                <div className={css.inline}>
                    <span>{splitText(VOICE_TEXT_TO_TRANSLATE_PART).beforeLastDot}</span>
                    <span className={css.lastSentence}>
                        {splitText(VOICE_TEXT_TO_TRANSLATE_PART).afterLastDot}
                    </span>
                </div>
            );
        }

        return null;
    };

    const content = renderContent();

    return (
        <>
            {content && !isUploadFiles && !translateFromImage && (
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
                        {!isUploadFiles && <>{content}</>}
                    </div>
                    {!isUploadFiles && (
                        <TranslationActionButtons
                            magicMenuItems={magicMenuItems}
                            isDisabledUpload={isUploadingFile}
                            alignEnd={isVoiceMode}
                            isDragging={drag}
                        />
                    )}
                </div>
            )}
            {translateFromImage && !isUploadFiles && (
                <div className={css.uploadedImage}>
                    <img src="/translate-example.png" alt="loaded image for translate" />
                    <div className={css.uploadedButtons}>
                        <TranslationActionButtons
                            magicMenuItems={magicMenuItems}
                            isDisabledUpload={isUploadingFile}
                            alignEnd={isVoiceMode}
                            blurButton={false}
                            isDragging={drag}
                        />
                    </div>
                </div>
            )}
            {activeTranslationOption === TRANSLATION_MENU_OPTIONS.CONNECT_TO_CAMERA &&
                !isUploadFiles && (
                    <div className={css.uploadedImage}>
                        <img src="/screen.png" alt="loaded image for translate" />
                        <div className={css.uploadedButtons}>
                            <TranslationActionButtons
                                magicMenuItems={magicMenuItems}
                                isDisabledUpload={isUploadingFile}
                                alignEnd={isVoiceMode}
                                blurButton={false}
                                isDragging={drag}
                            />
                        </div>
                    </div>
                )}
        </>
    );
};

export default TextToTranslate;
