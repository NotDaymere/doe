import classNames from "classnames";
import {
    TEXT_TO_TRANSLATE_PART,
    TRANSLATED_TEXT_BOTTOM_PART,
    TRANSLATED_TEXT_TOP_PART,
} from "../MockData";
import TranslatedTextIcon from "src/shared/icons/TranslatedText.icon";
import VolumeIcon from "src/shared/icons/Volume.icon";
import PlanetIcon from "src/shared/icons/Planet.icon";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import TextForTranslateIcon from "src/shared/icons/TextForTranslate.icon";
import DictionaryIcon from "src/shared/icons/Dictionary.icon";
import RotateButton from "../RotateButton";
import css from "./Translation.module.less";

const Translation = () => (
    <div className={css.translationWrapper}>
        <div className={css.translation}>
            <DictionaryIcon width={48} height={48} className={css.dictionaryIcon} />
            <div className={css.translationArea}>
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
                        {TEXT_TO_TRANSLATE_PART && (
                            <div
                                className={css.text}
                                dangerouslySetInnerHTML={{ __html: TEXT_TO_TRANSLATE_PART }}
                            />
                        )}
                        <div className={css.icons}>
                            <AttachmentIcon width={15} height={15} />
                            <PlanetIcon width={15} height={15} />
                        </div>
                    </div>
                </div>
                <div className={css.icons}>
                    {TRANSLATED_TEXT_TOP_PART && TRANSLATED_TEXT_BOTTOM_PART && (
                        <div className={css.volumeIcon}>
                            <VolumeIcon width={17} height={13} />
                        </div>
                    )}
                    <div className={css.translateIcon}>
                        <TranslatedTextIcon width={20} height={20} />
                    </div>
                </div>
                {TRANSLATED_TEXT_TOP_PART && TRANSLATED_TEXT_BOTTOM_PART && (
                    <div className={css.translatedTextWrapper}>
                        <div
                            className={css.text}
                            dangerouslySetInnerHTML={{ __html: TRANSLATED_TEXT_TOP_PART }}
                        />
                        <div
                            className={classNames(css.text, css.bottomText)}
                            dangerouslySetInnerHTML={{
                                __html: TRANSLATED_TEXT_BOTTOM_PART,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default Translation;
