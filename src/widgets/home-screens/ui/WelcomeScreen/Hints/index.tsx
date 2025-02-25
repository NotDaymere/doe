import CodeIcon from "src/shared/icons/Code.icon";
import QuestionMarkIcon from "src/shared/icons/QuestionMark.icon";
import StarIcon from "src/shared/icons/Star.icon";
import TableIcon from "src/shared/icons/Table.icon";
import { FC, ReactElement } from "react";
import classNames from "classnames";
import css from "./Hints.module.less";

interface IHint {
    icon: ReactElement;
    text: string;
    classname: string;
}

const HINTS: IHint[] = [
    {
        icon: <CodeIcon className={css.icon} />,
        text: "Create a project on Python ",
        classname: "hint1",
    },
    {
        icon: <QuestionMarkIcon className={css.icon} />,
        text: "Explain the Yoneda Lemma",
        classname: "hint2",
    },
    {
        icon: <StarIcon className={css.icon} />,
        text: "Calculate values from table",
        classname: "hint3",
    },
    {
        icon: <TableIcon className={css.icon} />,
        text: "Idea for the management app",
        classname: "hint4",
    },
];

interface IProps {
    onSelect: (text: string) => void;
}

const Hints: FC<IProps> = ({ onSelect }) => (
    <div className={css.hints}>
        {HINTS.map(({ icon, text, classname }) => (
            <div
                key={text}
                className={classNames(css.hint, css[classname])}
                onClick={() => onSelect(text)}
            >
                {icon}
                <span>{text}</span>
            </div>
        ))}
    </div>
);

export default Hints;
