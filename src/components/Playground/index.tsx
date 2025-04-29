import clsx from "clsx";
import { ReactComponent as HistoryIcon } from "src/assets/icons/history.svg";
import { ReactComponent as StarDocIcon } from "src/assets/icons/starDoc.svg";
import { OnboardingStep } from "src/helpers/onboardingFlow";
import { Tooltip } from "../Tooltip";
import css from "./Playground.module.less";

interface PlaygroundProps {
    currentStep: OnboardingStep | undefined;
}

export const Playground = ({ currentStep }: PlaygroundProps) => {
    return (
        <div
            className={clsx(css.playground_wrapper, {
                [css.open]: currentStep?.openTable,
            })}
        >
            <div className={css.playground_container}>
                <div>
                    <div className={css.table_header}>
                        <div className={css.table_title}>
                            <span className={css.table_title} data-step="playground">
                                Tabular Random Values
                            </span>
                            <div className={css.playground_tag}>
                                <StarDocIcon /> Doe Playground
                            </div>
                        </div>
                        {currentStep?.id === 31 && (
                            <button className={css.table_history} data-step="playground-btn">
                                <HistoryIcon />
                            </button>
                        )}
                    </div>

                    <table className={css.data_table}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>A</th>
                                <th>B</th>
                                <th>C</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>112</td>
                                <td>478</td>
                                <td>234</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>23</td>
                                <td>13</td>
                                <td>23</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>4234</td>
                                <td>324</td>
                                <td>23</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>467</td>
                                <td>4</td>
                                <td>23</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className={css.description}>
                        This is what your table looks like when it's in Doe Playground! Larger
                        tables can be navigated, folded in to reveal text, etc. Typically, a
                        Playground table will not include include both text blocks and graphs as it
                        does here, but it is still possible! The graph interaction with highlighting
                        still applies here!
                    </p>
                </div>
                <div className={css.playground_footer}>
                    <div className={css.playground_left}>
                        <div className={css.playground_circle_filled}></div>
                    </div>
                    <div className={css.playground_right}>
                        <div className={css.playground_circle}></div>
                        <div className={css.playground_circle}></div>
                    </div>
                </div>
            </div>
            {currentStep?.id === 30 && (
                <Tooltip position="left" className={`highlight-step highlight-step-30`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Doe Playground.</b>
                        <p className={css.tooltip_paragraph}>
                            This is Playground: an interacrive, user and AI-editable space for large
                            and sometimes mixed/multimodal outputs
                        </p>
                    </div>
                </Tooltip>
            )}
        </div>
    );
};
