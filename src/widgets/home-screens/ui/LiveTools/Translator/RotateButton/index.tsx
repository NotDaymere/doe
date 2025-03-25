import RotateIcon from "src/shared/icons/Rotate.icon";
import { FC } from "react";
import classNames from "classnames";
import css from "./RotateButton.module.less";

interface IProps {
    isRotaded?: boolean;
    onClick: () => void;
}

const RotateButton: FC<IProps> = ({ onClick, isRotaded = false }) => (
    <button
        className={classNames(css.rotateButton, { [css.rotated]: isRotaded })}
        onClick={onClick}
    >
        <RotateIcon width={14} height={19} />
    </button>
);

export default RotateButton;
