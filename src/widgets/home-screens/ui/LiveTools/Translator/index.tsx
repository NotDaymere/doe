import { useEffect, useMemo, useState } from "react";
import CameraIcon from "src/shared/icons/Camera.icon";
import StudyIcon from "src/shared/icons/Study.icon";
import WaveIcon from "src/shared/icons/Wave.icon";
import Translation from "./Translation";
import PracticeMode from "./PracticeMode";
import { TRANSLATION_MENU_OPTIONS, TranslationMenuOptionsType } from "src/shared/types/Translation";
import { useAppStore } from "src/shared/providers";
import Chip from "src/shared/components/Chip";
import StarsIcon from "src/shared/icons/Stars.icon";
import LiveToolsWrapper from "./LiveToolsWrapper";
import DictionaryIcon from "src/shared/icons/Dictionary.icon";
import ScreenIcon from "src/shared/icons/Screen.icon";
import css from "./Translator.module.less";
import { useTheme } from "src/shared/hooks/useTheme";

const Translator = () => {
    const { activeTranslationOption, setActiveTranslationOption } = useAppStore();
    const [showChip, setShowChip] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const { theme } = useTheme();
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
                return {
                    label: "Screen Sharing is On",
                    icon: <ScreenIcon width={17} height={13} />,
                };
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
            case TRANSLATION_MENU_OPTIONS.VOICE_MODE:
            case TRANSLATION_MENU_OPTIONS.CONNECT_TO_CAMERA:
            default:
                return <Translation isRotated={isRotated} onRotate={setIsRotated} />;
            case TRANSLATION_MENU_OPTIONS.PRACTICE_ENGLISH:
                return (
                    <PracticeMode
                        onTranslationBack={() =>
                            setActiveTranslationOption(TRANSLATION_MENU_OPTIONS.TRANSLATION)
                        }
                    />
                );
        }
    };

    return (
        <>
            <div className={css.chip}>
                <Chip
                    isActive={showChip}
                    setIsActive={setShowChip}
                    {...renderChipContent(activeTranslationOption)}
                />
            </div>
            <LiveToolsWrapper
                bookmarkIcon={<DictionaryIcon width={48} height={48} theme={theme} />}
                magicMenuItems={MAGIC_MENU_ITEMS}
                magicButtonIcon={<StarsIcon width={21} height={28} />}
                magicButtonClass={css.magicButton}
                isRotated={isRotated}
            >
                {renderTranslatorMode(activeTranslationOption)}
            </LiveToolsWrapper>
        </>
    );
};

export default Translator;
