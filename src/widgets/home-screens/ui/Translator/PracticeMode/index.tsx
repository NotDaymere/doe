import EyeIcon from "src/shared/icons/Eye.icon";
import { FC, useState } from "react";
import RotateButton from "../RotateButton";
import PracticeIcon from "src/shared/icons/Practice.icon";
import OctagonIcon from "src/shared/icons/Octagon.icon";
import classNames from "classnames";
import ArrowRightIcon from "src/shared/icons/ArrowRight.icon";
import css from "./PracticeMode.module.less";

interface IProps {
    onTranslationBack: () => void;
    qualityLevel?: number;
}

enum LEVEL {
    HIGN = 6,
    MEDIUM = 4,
    LOW = 2,
    BAD = 1,
}

const PRACTICE_RESULT = {
    score: "20/30",
    tips: [
        {
            title: "Fluency and Pronunciation:",
            description: ` While your pronunciation is
                                understandable, it may lack the natural flow of a native speaker.
                                Practice speaking regularly by recording yourself and listening for
                                areas where you hesitate or sound unclear. Use shadowing
                                techniques—listen to native speakers and try to mimic their tone,
                                intonation, and pacing.`,
        },
        {
            title: "Content Development:",
            description: `Some
                                responses may not fully develop your ideas or provide sufficient
                                examples. To improve, practice structuring your answers using the
                                "PREP" method (Point, Reason, Example, Point). This ensures your
                                response is logical and complete. For instance, if asked about your
                                favorite book, state the title, explain why it’s your favorite,
                                provide a specific example, and conclude by reinforcing your main
                                point. For example, you kept using the word “exciting” over and over
                                again.`,
        },
        {
            title: "Vocabulary and Grammar:",
            description: `Expand your vocabulary to express your ideas more precisely. Practice using synonyms and descriptive phrases to avoid repetition. Focus on improving grammar, especially with complex sentence structures, by reviewing TOEFL-style speaking prompts and practicing responses.`,
        },
    ],
};

const PRACTICE_STOPPED_RESULT = {
    score: "27/30",
    tips: [
        {
            title: "Timing and Organization:",
            description: `Practice delivering responses within the time limit (15-30 seconds preparation, 45-60 seconds speaking). Use a timer during practice sessions and aim for a clear introduction, body, and conclusion.`,
        },
        {
            title: "Practice with Real Prompts: ",
            description: `Use official TOEFL practice tests or apps to simulate exam conditions. This helps you become comfortable with the types of questions and the pressure of timed responses.`,
        },
    ],
};

const PracticeMode: FC<IProps> = ({ onTranslationBack, qualityLevel = 6 }) => {
    const [see, setSee] = useState(true);
    const [isPracticeStopped, setIsPracticeStopped] = useState(false);

    const practiceResultContent = isPracticeStopped ? PRACTICE_STOPPED_RESULT : PRACTICE_RESULT;

    const isInRange = (number: number, min: number, max: number) => {
        return Math.min(Math.max(number, min), max) === number;
    };

    const getQualityLevelMeasure = (level: number) => {
        if (isInRange(level, 2, 3)) return LEVEL.LOW;
        if (isInRange(level, 4, 5)) return LEVEL.MEDIUM;
        if (isInRange(level, 5, 10)) return LEVEL.HIGN;
        return LEVEL.BAD;
    };

    return (
        <div className={css.practiceMode}>
            <>
                {see && !isPracticeStopped && (
                    <div className={css.seeSection}>
                        <div className={css.questionWrapper}>
                            <div className={css.question}>
                                <span>Hello, how are you doing today?</span>
                            </div>
                            <button onClick={() => setSee(false)}>
                                <EyeIcon width={22} height={14} />
                            </button>
                        </div>
                        <RotateButton onClick={() => console.log("rotated")} />
                    </div>
                )}
                {!isPracticeStopped && (
                    <div className={css.practiceInfo}>
                        <PracticeIcon width={100} height={114} />
                        <div className={css.volumeInfo}>
                            <OctagonIcon
                                width={28}
                                height={26}
                                className={classNames({
                                    [css.badQuality]:
                                        getQualityLevelMeasure(qualityLevel) === LEVEL.BAD,
                                })}
                            />
                            <div className={css.volumeMeasure}>
                                {Array.from(new Array(10)).map((_, index) => {
                                    const blockIndex = index;
                                    return (
                                        <div
                                            key={blockIndex}
                                            className={classNames(css.measureBlock, {
                                                [css.lowQuality]:
                                                    blockIndex < qualityLevel &&
                                                    (getQualityLevelMeasure(qualityLevel) ===
                                                        LEVEL.LOW ||
                                                        getQualityLevelMeasure(qualityLevel) ===
                                                            LEVEL.BAD),
                                                [css.midQuality]:
                                                    blockIndex < qualityLevel &&
                                                    getQualityLevelMeasure(qualityLevel) ===
                                                        LEVEL.MEDIUM,
                                                [css.highQuality]:
                                                    blockIndex <= qualityLevel &&
                                                    getQualityLevelMeasure(qualityLevel) ===
                                                        LEVEL.HIGN,
                                            })}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className={classNames(css.practiceResult, {
                        [css.practiceResultStopped]: isPracticeStopped,
                    })}
                >
                    <span className={css.title}>
                        Your <span className={css.bold}>simulated TOEFL score</span> so far:
                        <span className={css.score}>{practiceResultContent.score}</span>
                    </span>
                    <div className={css.tipsList}>
                        <span className={css.tipsTitle}>Tips:</span>
                        <ul>
                            {practiceResultContent.tips.map((tip) => (
                                <li key={tip.title}>
                                    <span className={css.bold}>{tip.title}</span>
                                    <span>{tip.description}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {isPracticeStopped && (
                    <div className={css.actions}>
                        <button className={css.button} onClick={onTranslationBack}>
                            <ArrowRightIcon width={12} height={12} />
                            Back to Translation
                        </button>
                        <button className={css.button}>Retry Practice</button>
                    </div>
                )}
            </>
        </div>
    );
};

export default PracticeMode;
