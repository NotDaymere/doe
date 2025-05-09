import clsx from "clsx";
import { ReactComponent as DocIcon } from "src/assets/icons/doc.svg";
import { ReactComponent as HatIcon } from "src/assets/icons/hat.svg";
import { ReactComponent as ResearchIcon } from "src/assets/icons/research.svg";
import { ReactComponent as WaveformIcon } from "src/assets/icons/waveform.svg";
import { ReactComponent as WheelIcon } from "src/assets/icons/wheel.svg";
import { ReactComponent as ZipIcon } from "src/assets/icons/zip.svg";
import { useCursor } from "src/contexts/CursorContext";
import StarsIcon from "src/shared/icons/Stars.icon";
import css from "./MagicBox.module.less";

interface MagicBoxProps {
    step: number;
}

export const MagicBox = ({ step }: MagicBoxProps) => {
    if (step < 19 || step >= 23) return null;
    const { cursorMoving } = useCursor();

    return (
        <div className={css.magicbox_wrapper}>
            <div
                data-step="magic"
                className={clsx(
                    css.magicbox_container,
                    ((step === 20 && !cursorMoving) || step === 22.1) &&
                        css.magicbox_container_active
                )}
            >
                <StarsIcon className={step === 20 ? css.icon_active : css.icon_disabled} />
                {step === 20 && !cursorMoving && (
                    <div className={css.magicbox_popup}>
                        <div className={css.magicbox_popup_item}>
                            <WheelIcon /> Connect Applications
                        </div>
                        <div className={css.magicbox_popup_item}>
                            <HatIcon /> Practice (English Only)
                        </div>
                        <div className={css.magicbox_popup_item}>
                            <WaveformIcon /> Voice Mode
                        </div>
                    </div>
                )}
                {step === 22.1 && (
                    <div className={css.magicbox_popup}>
                        <div className={css.magicbox_popup_item}>
                            <ZipIcon /> Connect Applications
                        </div>
                        <div className={css.magicbox_popup_item}>
                            <DocIcon /> Practice (English Only)
                        </div>
                        <div
                            data-step="magic-voice"
                            className={clsx(
                                css.magicbox_popup_item,
                                css.magicbox_popup_item_active
                            )}
                        >
                            <ResearchIcon /> Voice Mode
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
