import { FC, ReactNode } from "react";
import css from "./DoubleRoundedNode.module.less";

interface IProps {
    children: ReactNode;
}

const DoubledRoundedNode: FC<IProps> = ({ children }) => (
    <div className={css.doubleBorder}>
        <div className={css.innerBorder}>{children}</div>
    </div>
);

export default DoubledRoundedNode;
