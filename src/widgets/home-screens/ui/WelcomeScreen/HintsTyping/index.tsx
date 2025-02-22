import HintIcon from "src/shared/icons/Hint.icon";
import css from "./HintsTyping.module.less";

const HINTS = ["Yoneda Lemma explained", "Yoneda Lemma ebmddeding", "Category theory Yoneda Lemma"];

const HintsTyping = () => (
    <div className={css.hintsTyping}>
        {HINTS.map((hint) => (
            <div key={hint} className={css.hint}>
                <HintIcon width={16} height={16} />
                <span>{hint}</span>
            </div>
        ))}
    </div>
);

export default HintsTyping;
