import {
    VOICE_TEXT_TO_TRANSLATE_PART,
    VOICE_TRANSLATED_TEXT_TOP_PART,
    VOICE_TRANSLATED_TEXT_BOTTOM_PART,
} from "../MockData";
import TranslatedTextIcon from "src/shared/icons/TranslatedText.icon";
import VolumeIcon from "src/shared/icons/Volume.icon";
import PlanetIcon from "src/shared/icons/Planet.icon";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import TextForTranslateIcon from "src/shared/icons/TextForTranslate.icon";
import DictionaryIcon from "src/shared/icons/Dictionary.icon";
import RotateButton from "../RotateButton";
import RecordItem from "src/shared/icons/Record.item";
import DoeIcon from "src/shared/icons/Doe.icon";
import css from "./VoiceMode.module.less";

const VoiceMode = () => {
    const splitText = (text: string) => {
        const lastDotIndex = text.lastIndexOf(".");
        if (lastDotIndex === -1) {
            return { beforeLastDot: text, afterLastDot: "" };
        }
        const beforeLastDot = text.substring(0, lastDotIndex + 1);
        const afterLastDot = text.substring(lastDotIndex + 1);
        return { beforeLastDot, afterLastDot };
    };

    return (
        <div className={css.translationWrapper}>
            <div className={css.translation}>
                <DictionaryIcon width={48} height={48} className={css.dictionaryIcon} />
                <div className={css.translationArea}>
                    <div className={css.logo}>
                        <DoeIcon width={26} height={26} />
                    </div>
                    <div className={css.iconsForTranslated}>
                        <div className={css.translateIcon}>
                            <TextForTranslateIcon width={20} height={20} />
                        </div>
                        <RotateButton
                            onClick={function (): void {
                                throw new Error("Function not implemented.");
                            }}
                        />
                    </div>
                    <div className={css.textForTranslateWrapper}>
                        <div className={css.textForTranslate}>
                            <div className={css.record}>
                                <RecordItem width={18} height={16} />
                            </div>
                            {VOICE_TEXT_TO_TRANSLATE_PART && (
                                <div className={css.text}>
                                    <span>
                                        {splitText(VOICE_TEXT_TO_TRANSLATE_PART).beforeLastDot}
                                    </span>
                                    <span className={css.lastSentence}>
                                        {splitText(VOICE_TEXT_TO_TRANSLATE_PART).afterLastDot}
                                    </span>
                                </div>
                            )}
                            <div className={css.icons}>
                                <AttachmentIcon width={15} height={15} />
                                <PlanetIcon width={15} height={15} />
                            </div>
                        </div>
                    </div>
                    <div className={css.icons}>
                        {VOICE_TRANSLATED_TEXT_TOP_PART && VOICE_TRANSLATED_TEXT_BOTTOM_PART && (
                            <div className={css.volumeIcon}>
                                <VolumeIcon width={17} height={13} />
                            </div>
                        )}
                        <div className={css.translateIcon}>
                            <TranslatedTextIcon width={20} height={20} />
                        </div>
                    </div>
                    {VOICE_TRANSLATED_TEXT_TOP_PART && VOICE_TRANSLATED_TEXT_BOTTOM_PART && (
                        <div className={css.translatedTextWrapper}>
                            <span className={css.bottomText}>{VOICE_TRANSLATED_TEXT_TOP_PART}</span>
                            <div className={css.text}>
                                <span className={css.bottomText}>
                                    {splitText(VOICE_TRANSLATED_TEXT_BOTTOM_PART).beforeLastDot}
                                </span>
                                <span className={css.lastSentenceTranslated}>
                                    {splitText(VOICE_TRANSLATED_TEXT_BOTTOM_PART).afterLastDot}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VoiceMode;
