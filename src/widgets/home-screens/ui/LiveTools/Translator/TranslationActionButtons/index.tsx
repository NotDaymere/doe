import classNames from "classnames";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import PlanetIcon from "src/shared/icons/Planet.icon";
import { FC } from "react";
import { MagicMenu } from "../../MagicMenu";
import css from "./TranslationActionButtons.module.less";

interface IProps {
    magicMenuItems: any;
    isDisabledUpload: boolean;
    alignEnd: boolean;
    isDragging: boolean;
    blurButton?: boolean;
}

const TranslationActionButtons: FC<IProps> = ({
    magicMenuItems,
    isDisabledUpload,
    alignEnd,
    isDragging,
    blurButton = false,
}) => (
    <div
        className={classNames(css.translationActionButtons, {
            [css.alignEnd]: alignEnd,
            [css.noGap]: isDragging || blurButton,
        })}
    >
        {!isDisabledUpload && (
            <div className={css.magicMenu}>
                <MagicMenu
                    items={magicMenuItems}
                    magicButtonIcon={<AttachmentIcon width={15} height={15} />}
                    magicButtonClass={classNames(css.cursor, {
                        [css.dragging]: isDragging,
                        [css.blur]: blurButton,
                    })}
                    classes={css.menu}
                />
            </div>
        )}
        <PlanetIcon width={15} height={15} className={css.planetIcon} />
    </div>
);

export default TranslationActionButtons;
