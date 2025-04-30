import { MathJax } from "better-react-mathjax";
import clsx from "clsx";
import { useMemo } from "react";
import { useCursor } from "src/contexts/CursorContext";
import { mathBlock2 } from "src/helpers/onboardingMessages";
import css from "./InputStaticText.module.less";

interface InputStaticTextProps {
    step: number;
    blockInput: boolean;
    isMessageSent: boolean;
    showSelectedText: boolean;
    typedGreeting: string;
    typedPrompt: string;
    typedMathPrompt: string;
    typedMathFormula: string;
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
            {!isMessageSent ? (
                blockInput ? (
                    typedGreeting.split("").map((char, index) => (
                        <span
                            key={index}
                            className={clsx(css.letter, {
                                [css.space]: char === " ",
                            })}
                            style={{ animationDelay: `${index * 0.01}s` }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))
                ) : (
                    <>{step <= 10 && <span>Hey Doe, I'm </span>}</>
                )
            ) : null}
            {(step === 4.7 || step === 5) && (
                <p>
                    {typedPrompt.split("").map((word, index) => {
                        return (
                            <span
                                key={index}
                                className={clsx(css.letter, {
                                    [css.space]: word === " ",
                                })}
                                style={{ animationDelay: `${index * 0.005}s` }}
                                data-step={index + 1 === typedPrompt.length && "text"}
                            >
                                {word}
                            </span>
                        );
                    })}
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
            {step >= 8 && step < 9 && (
                <>
                    <p>
                        {typedMathPrompt.split("").map((word, index) => {
                            return (
                                <span
                                    key={index}
                                    className={clsx(css.letter, {
                                        [css.space]: word === " ",
                                    })}
                                    style={{ animationDelay: `${index * 0.005}s` }}
                                    data-step={index + 1 === typedPrompt.length && "text"}
                                >
                                    {word}
                                </span>
                            );
                        })}
                        {!isMathBlock
                            ? typedMathFormula.split("").map((word, index) => {
                                  return (
                                      <span
                                          key={index}
                                          className={clsx(css.letter, {
                                              [css.space]: word === " ",
                                          })}
                                          style={{ animationDelay: `${index * 0.005}s` }}
                                          data-step={index + 1 === typedPrompt.length && "text"}
                                      >
                                          {" "}
                                          {word}
                                      </span>
                                  );
                              })
                            : memoizedMathJax}
                    </p>
                </>
            )}
            {step === 9 && <p>Write me the deletion function in Python...</p>}
            {step === 10 && (
                <>
                    <p>
                        Write a song about <a>chicken</a>
                        <div className={css.link_modal}>{linkText}</div>
                    </p>
                </>
            )}
        </>
    );
};
