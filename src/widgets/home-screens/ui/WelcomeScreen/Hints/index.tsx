import CodeIcon from "src/shared/icons/Code.icon";
import QuestionMarkIcon from "src/shared/icons/QuestionMark.icon";
import StarIcon from "src/shared/icons/Star.icon";
import TableIcon from "src/shared/icons/Table.icon";
import { ReactElement } from "react";
import css from "./Hints.module.less";
import classNames from "classnames";

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

const Hints = () => (
    <div className={css.hints}>
        {HINTS.map(({ icon, text, classname }) => (
            <div key={text} className={classNames(css.hint, css[classname])}>
                {icon}
                <span>{text}</span>
            </div>
        ))}
    </div>
);

export default Hints;
