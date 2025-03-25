import { FC } from "react";
import HintIcon from "src/shared/icons/Hint.icon";
import css from "./HintsTyping.module.less";

const HINTS = ["Yoneda Lemma explained", "Yoneda Lemma ebmddeding", "Category theory Yoneda Lemma"];

interface IProps {
    onSelect: (text: string) => void;
}

const HintsTyping: FC<IProps> = ({ onSelect }) => (
    <div className={css.hintsTyping}>
        {HINTS.map((hint) => (
            <button key={hint} className={css.hint} onClick={() => onSelect(hint)}>
                <HintIcon width={16} height={16} />
                <span>{hint}</span>
            </button>
        ))}
    </div>
);

export default HintsTyping;
