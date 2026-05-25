import clsx from "clsx";
import { ReactComponent as CopyIcon } from "src/assets/icons/copy.svg";
import { ReactComponent as DownloadIcon } from "src/assets/icons/download-circle.svg";
import { ReactComponent as VolumeIcon } from "src/assets/icons/volume.svg";
import { ReactComponent as WandIcon } from "src/assets/icons/wand.svg";
import css from "../OnboardingChatMessage.module.less";

interface OnboardingChatMessageCodeButtonsProps {
    isVisible?: boolean;
}

export const OnboardingChatMessageCodeButtons = ({
    isVisible,
}: OnboardingChatMessageCodeButtonsProps) => {
    return (
        <div className={clsx(css.code_buttons, { [css.code_buttons_visible]: isVisible })}>
            <button className={css.code_buttons_magic}>
                <WandIcon />
                <span className={css.gradient_text}>See all steps</span>
            </button>
            <div className={css.code_buttons_actions}>
                <button className={css.code_buttons_volume}>
                    <VolumeIcon />
                </button>
                <button className={css.code_buttons_download}>
                    <DownloadIcon />
                </button>
                <button className={css.code_buttons_copy}>
                    <CopyIcon />
                </button>
            </div>
        </div>
    );
};
