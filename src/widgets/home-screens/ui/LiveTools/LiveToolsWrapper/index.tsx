import DoeIcon from "src/shared/icons/Doe.icon";
import css from "./LiveToolsWrapper.module.less";
import { FC, ReactElement, ReactNode } from "react";
import { MagicMenu } from "../MagicMenu";

interface IProps {
    bookmarkIcon?: ReactElement;
    magicMenuItems: any;
    magicButtonIcon: ReactElement;
    magicButtonClass?: string;
    children: ReactNode;
}

const LiveToolsWrapper: FC<IProps> = ({
    bookmarkIcon,
    magicMenuItems,
    magicButtonIcon,
    magicButtonClass,
    children,
}) => (
    <div className={css.translator}>
        <div className={css.translationWrapper}>
            <div className={css.translation}>
                {bookmarkIcon && bookmarkIcon}
                <div className={css.translationAreaWrapper}>
                    <div className={css.logo}>
                        <DoeIcon width={26} height={26} />
                    </div>
                    <div className={css.translationArea}>{children}</div>
                </div>
            </div>
        </div>
        <div className={css.magicMenu}>
            <MagicMenu
                items={magicMenuItems}
                magicButtonIcon={magicButtonIcon}
                magicButtonClass={magicButtonClass}
            />
        </div>
    </div>
);

export default LiveToolsWrapper;
