import { FC, ReactNode } from "react";
import css from "./DoubleRoundedNode.module.less";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
    children: ReactNode;
}

const DoubledRoundeNode: FC<IProps> = ({ children }) => (
    <div className={css.doubleBorder}>
        <div className={css.innerBorder}>{children}</div>
    </div>
);

export default DoubledRoundeNode;
