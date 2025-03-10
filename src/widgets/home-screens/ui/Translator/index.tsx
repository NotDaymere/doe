import { useEffect, useMemo, useState } from "react";
import CameraIcon from "src/shared/icons/Camera.icon";
import StudyIcon from "src/shared/icons/Study.icon";
import WaveIcon from "src/shared/icons/Wave.icon";
import { MagicMenu } from "./MagicMenu";
import Translation from "./Translation";
import PracticeMode from "./PracticeMode";
import VoiceMode from "./VoiceMode";
import { TRANSLATION_MENU_OPTIONS, TranslationMenuOptionsType } from "src/shared/types/Translation";
import { useAppStore } from "src/shared/providers";
import Chip from "src/shared/components/Chip";
import StarsIcon from "src/shared/icons/Stars.icon";
import DictionaryIcon from "src/shared/icons/Dictionary.icon";
import DoeIcon from "src/shared/icons/Doe.icon";
import css from "./Translator.module.less";

const Translator = () => {
    const { activeTranslationOption, setActiveTranslationOption } = useAppStore();
    const [showChip, setShowChip] = useState(false);

    useEffect(() => {
        if (activeTranslationOption === TRANSLATION_MENU_OPTIONS.TRANSLATION) return;
        setShowChip(true);

        return () => {
            setShowChip(false);
        };
    }, [activeTranslationOption]);

    const MAGIC_MENU_ITEMS = useMemo(
        () => [
            {
                icon: <CameraIcon width={16} height={16} />,
                classes: "camera",
                text: "Connect to Camera",
                hasConnection: true,
                onClick: () => {
                    setActiveTranslationOption(TRANSLATION_MENU_OPTIONS.CONNECT_TO_CAMERA);
                },
            },
            {
                icon: <StudyIcon width={16} height={16} />,
                classes: "practice",
                text: "Practice (English)",
                hasMenu: true,
                onClick: () => {
                    setActiveTranslationOption(TRANSLATION_MENU_OPTIONS.PRACTICE_ENGLISH);
                },
            },
            {
                icon: <WaveIcon width={16} height={16} />,
                classes: "voice",
                text: "Voice mode",
                onClick: () => {
                    setActiveTranslationOption(TRANSLATION_MENU_OPTIONS.VOICE_MODE);
                },
            },
        ],
        []
    );

    const renderChipContent = (translationOption: TranslationMenuOptionsType) => {
        switch (translationOption) {
            case TRANSLATION_MENU_OPTIONS.CONNECT_TO_CAMERA:
                return { label: "", icon: null };
            case TRANSLATION_MENU_OPTIONS.PRACTICE_ENGLISH:
                return {
                    label: "Practice English is On",
                    icon: <StudyIcon width={16} height={16} className={css.chipIcon} />,
                };
            case TRANSLATION_MENU_OPTIONS.VOICE_MODE:
                return {
                    label: "Voice Mode is On",
                    icon: <WaveIcon width={16} height={16} className={css.chipIcon} />,
                };
            default:
                return { label: "", icon: null };
        }
    };

    const renderTranslatorMode = (mode: TranslationMenuOptionsType) => {
        switch (mode) {
            case TRANSLATION_MENU_OPTIONS.TRANSLATION:
            default:
                return <Translation />;
            case TRANSLATION_MENU_OPTIONS.CONNECT_TO_CAMERA:
                return <span>CONNECT_TO_CAMERA</span>;
            case TRANSLATION_MENU_OPTIONS.PRACTICE_ENGLISH:
                return (
                    <PracticeMode
                        onTranslationBack={() =>
                            setActiveTranslationOption(TRANSLATION_MENU_OPTIONS.TRANSLATION)
                        }
                    />
                );
            case TRANSLATION_MENU_OPTIONS.VOICE_MODE:
                return <VoiceMode />;
        }
    };

    return (
        <>
            <Chip
                isActive={showChip}
                setIsActive={setShowChip}
                {...renderChipContent(activeTranslationOption)}
            />
            <div className={css.translator}>
                <div className={css.translationWrapper}>
                    <div className={css.translation}>
                        <DictionaryIcon width={48} height={48} />
                        <div className={css.translationAreaWrapper}>
                            <div className={css.logo}>
                                <DoeIcon width={26} height={26} />
                            </div>
                            <div className={css.translationArea}>
                                {renderTranslatorMode(activeTranslationOption)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.magicMenu}>
                    <MagicMenu
                        items={MAGIC_MENU_ITEMS}
                        magicButtonIcon={<StarsIcon width={21} height={28} />}
                        magicButtonClass={css.magicButton}
                    />
                </div>
            </div>
        </>
    );
};

export default Translator;
