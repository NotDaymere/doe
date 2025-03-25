import { FC } from "react";
import VolumeIcon from "src/shared/icons/Volume.icon";
import TranslatedTextIcon from "src/shared/icons/TranslatedText.icon";
import RotateButton from "../../RotateButton";
import { splitText } from "../helpers";
import {
    TRANSLATED_TEXT_BOTTOM_PART,
    TRANSLATED_TEXT_TOP_PART,
    VOICE_TRANSLATED_TEXT_BOTTOM_PART,
    VOICE_TRANSLATED_TEXT_TOP_PART,
} from "../../../MockData";
import { useAppStore } from "src/shared/providers";
import { TRANSLATION_MENU_OPTIONS, TranslationMenuOptionsType } from "src/shared/types/Translation";
import classNames from "classnames";
import TranslationFromImage from "./TranslationFromImage";
import css from "./TranslatedText.module.less";

interface IProps {
    translateFromImage: boolean;
    isRotated: boolean;
    onRotate: (value: boolean) => void;
}

const TranslatedText: FC<IProps> = ({ translateFromImage, isRotated, onRotate }) => {
    const { activeTranslationOption } = useAppStore();

    const renderTranslatedContent = (mode: TranslationMenuOptionsType) => {
        switch (mode) {
            case TRANSLATION_MENU_OPTIONS.VOICE_MODE:
                return {
                    topPart: () => (
                        <div
                            className={css.text}
                            dangerouslySetInnerHTML={{
                                __html: VOICE_TRANSLATED_TEXT_TOP_PART,
                            }}
                        />
                    ),
                    bottomPart: () => (
                        <div className={css.inline}>
                            <span className={css.bottomText}>
                                {splitText(VOICE_TRANSLATED_TEXT_BOTTOM_PART).beforeLastDot}
                            </span>
                            <span className={css.lastSentenceTranslated}>
                                {splitText(VOICE_TRANSLATED_TEXT_BOTTOM_PART).afterLastDot}
                            </span>
                        </div>
                    ),
                };
            case TRANSLATION_MENU_OPTIONS.TRANSLATION:
            default:
                return {
                    topPart: () => (
                        <div
                            className={css.text}
                            dangerouslySetInnerHTML={{
                                __html: TRANSLATED_TEXT_TOP_PART,
                            }}
                        />
                    ),
                    bottomPart: () => (
                        <div
                            className={classNames(css.text, css.bottomText)}
                            dangerouslySetInnerHTML={{
                                __html: TRANSLATED_TEXT_BOTTOM_PART,
                            }}
                        />
                    ),
                };
        }
    };

    const { topPart, bottomPart } = renderTranslatedContent(activeTranslationOption);
    const top = topPart();
    const bottom = bottomPart();

    return (
        <div className={css.translationBlock}>
            <div className={css.buttonsWrapper}>
                <div className={css.icons}>
                    {top && bottom && (
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
                        <RotateButton onClick={() => onRotate(!isRotated)} isRotaded={isRotated} />
                    </div>
                )}
            </div>
            {translateFromImage ? (
                <TranslationFromImage />
            ) : (
                <>
                    {top && bottom && (
                        <div className={css.translatedTextWrapper}>
                            {top}
                            {bottom}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TranslatedText;
