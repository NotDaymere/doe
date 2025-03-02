import { FC, ReactElement, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import css from "./Chip.module.less";

interface IProps {
    icon: ReactElement | null;
    label: string;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
    showTime?: number;
}

const SHOW_TIME = 3000;

const Chip: FC<IProps> = ({ isActive, setIsActive, icon, label, showTime = SHOW_TIME }) => {
    const [showChip, setShowChip] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowChip(true);
            const timeoutId = setTimeout(() => {
                setShowChip(false);
                setIsActive(false);
            }, showTime);

            return () => {
                clearTimeout(timeoutId);
                setShowChip(false);
            };
        } else {
            setShowChip(false);
        }
    }, [isActive]);

    return (
        <CSSTransition in={showChip} timeout={300} classNames={css} unmountOnExit>
            <div className={css.chip}>
                {icon && icon}
                <span>{label}</span>
            </div>
        </CSSTransition>
    );
};

export default Chip;
