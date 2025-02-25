import { FC, ReactNode } from "react";
import css from "./DoubleRoundedNode.module.less";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
    children: ReactNode;
    onClick: () => void;
}

const DoubledRoundeNode: FC<IProps> = ({ children, onClick }) => (
    <button className={css.doubleBorder} onClick={onClick}>
        <div className={css.innerBorder}>{children}</div>
    </button>
);

export default DoubledRoundeNode;
