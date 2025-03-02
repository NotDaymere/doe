import RotateIcon from "src/shared/icons/Rotate.icon";
import css from "./RotateButton.module.less";
import { FC } from "react";

interface IProps {
    onClick: () => void;
}

const RotateButton: FC<IProps> = ({ onClick }) => (
    <button className={css.rotateButton} onClick={onClick}>
        <RotateIcon width={14} height={19} />
    </button>
);

export default RotateButton;
