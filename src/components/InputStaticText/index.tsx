import { MathJax } from "better-react-mathjax";
import clsx from "clsx";
import { useMemo } from "react";
import { useCursor } from "src/contexts/CursorContext";
import { mathBlock2 } from "src/helpers/onboardingMessages";
import BranchIcon from "src/shared/icons/Branch.icon";
import css from "./InputStaticText.module.less";

interface typedTextState {
    text: string;
    isDone: boolean;
    skip: () => void;
}

interface InputStaticTextProps {
    step: number;
    blockInput: boolean;
    isMessageSent: boolean;
    showSelectedText: boolean;
    typedGreeting: typedTextState;
    typedPrompt: typedTextState;
    typedMathPrompt: typedTextState;
    typedMathFormula: typedTextState;
    typedCodePrompt: typedTextState;
    typedPythonCode: typedTextState;
    typedBranchPrompt: typedTextState;
    typedBranch: typedTextState;
    linkText: string;
    userClickedBold: boolean;
    userClickedUnderline: boolean;
    userClickedItalic: boolean;
    isMathBlock: boolean;
}

export const InputStaticText = ({
    step,
    isMessageSent,
    blockInput,
    showSelectedText,
    typedGreeting,
    typedPrompt,
    typedMathPrompt,
    typedMathFormula,
    typedCodePrompt,
    typedPythonCode,
    typedBranchPrompt,
    typedBranch,
    linkText,
    userClickedBold,
    userClickedUnderline,
    userClickedItalic,
    isMathBlock,
}: InputStaticTextProps) => {
    const { cursorMoving } = useCursor();

    const memoizedMathJax = useMemo(() => {
        if (!isMathBlock) return null;

        return (
            <MathJax dynamic hideUntilTypeset="first">
                <div className={css.mathWrapper}>{mathBlock2}</div>
            </MathJax>
        );
    }, [isMathBlock]);

    return (
        <>
            {step === 4 && blockInput && (
                <>
                    {typedGreeting.text.split("").map((char, index) => (
                        <span
                            key={index}
                            className={clsx(css.letter, css.ghost, {
                                [css.space]: char === " ",
                            })}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                    {!typedGreeting.isDone && <span className={css.caret} />}
                </>
            )}
            {step === 4.5 && !isMessageSent && <>{step <= 10 && <span>Hey Doe, I'm </span>}</>}
            {(step === 4.7 || step === 5) && (
                <p>
                    {typedPrompt.text.split("").map((word, index) => {
                        return (
                            <span
                                key={index}
                                className={clsx(css.letter, {
                                    [css.space]: word === " ",
                                })}
                            >
                                {word}
                            </span>
                        );
                    })}
                    {!typedPrompt.isDone && <span className={css.caret} />}
                    {showSelectedText && (
                        <span
                            className={clsx(css.selected, {
                                [css.clicked]: userClickedBold,
                            })}
                        >
                            {cursorMoving ? <span>chicken</span> : <b>chicken</b>}
                        </span>
                    )}
                </p>
            )}
            {step === 6 && (
                <p>
                    Write a song about{" "}
                    <span
                        className={clsx(css.selected, {
                            [css.clicked]: userClickedUnderline,
                        })}
                    >
                        {cursorMoving ? <span>chicken</span> : <u>chicken</u>}
                    </span>
                </p>
            )}
            {step === 7 && (
                <p>
                    Write a song about{" "}
                    <span
                        className={clsx(css.selected, {
                            [css.clicked]: userClickedItalic,
                        })}
                    >
                        {cursorMoving ? <span>chicken</span> : <i>chicken</i>}
                    </span>
                </p>
            )}
            {step >= 8 && step < 8.4 && !isMessageSent && (
                <>
                    <p>
                        {typedMathPrompt.text.split("").map((word, index) => {
                            return (
                                <span
                                    key={index}
                                    className={clsx(css.letter, {
                                        [css.space]: word === " ",
                                    })}
                                >
                                    {word}
                                </span>
                            );
                        })}
                        {!typedMathPrompt.isDone && <span className={css.caret} />}
                        {!isMathBlock ? (
                            <>
                                {typedMathFormula.text.split("").map((word, index) => {
                                    return (
                                        <span
                                            key={index}
                                            className={clsx(css.letter, {
                                                [css.space]: word === " ",
                                            })}
                                        >
                                            {" "}
                                            {word}
                                        </span>
                                    );
                                })}
                            </>
                        ) : (
                            memoizedMathJax
                        )}
                    </p>
                </>
            )}
            {step >= 9 && step < 9.4 && !isMessageSent && (
                <>
                    <p>
                        {typedCodePrompt.text.split("").map((word, index) => {
                            return (
                                <span
                                    key={index}
                                    className={clsx(css.letter, {
                                        [css.space]: word === " ",
                                    })}
                                >
                                    {word}
                                </span>
                            );
                        })}

                        {!typedCodePrompt.isDone && <span className={css.caret} />}
                    </p>
                    {
                        <span
                            className={css.code}
                            dangerouslySetInnerHTML={{
                                __html: typedPythonCode.text,
                            }}
                        />
                    }
                </>
            )}
            {step === 38 && (
                <div className={css.text_with_icon}>
                    <BranchIcon className={css.branch_icon} />
                    <p>
                        {typedBranchPrompt.text.split("").map((word, index) => {
                            return (
                                <span
                                    key={index}
                                    className={clsx(css.letter, {
                                        [css.space]: word === " ",
                                    })}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </p>
                </div>
            )}

            {step === 38.1 && (
                <div className={css.text_with_icon}>
                    <BranchIcon className={clsx(css.branch_icon, css.no_animation)} />
                    <p>
                        {typedBranch.text.split("").map((word, index) => {
                            return (
                                <span
                                    key={index}
                                    className={clsx(css.letter, {
                                        [css.space]: word === " ",
                                    })}
                                >
                                    {word}
                                </span>
                            );
                        })}

                        {!typedBranch.isDone && <span className={css.caret} />}
                    </p>
                </div>
            )}
            {step === 10 && (
                <>
                    <p>
                        Write a song about <a className={css.link}>chicken</a>
                        <div className={css.link_modal}>{linkText}</div>
                    </p>
                </>
            )}
        </>
    );
};
