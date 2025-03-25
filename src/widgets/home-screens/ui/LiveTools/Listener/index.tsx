import { useMemo, useState } from "react";
import SummaryIcon from "src/shared/icons/Summary.icon";
import NotesIcon from "src/shared/icons/Notes";
import ResearchIcon from "src/shared/icons/Research.icon";
import LiveToolsWrapper from "../Translator/LiveToolsWrapper";
import StarsIcon from "src/shared/icons/Stars.icon";
import RecordBookmarkIcon from "src/shared/icons/RecordBookmark.icon";
import classNames from "classnames";
import AudioRecorder from "./AudioRecorder";
import css from "./Listener.module.less";

export type RecordState = "isRecording" | "isPaused" | "isStopped";

const Listener = () => {
    const [record, setRecord] = useState<RecordState>("isRecording");

    const MAGIC_MENU_ITEMS = useMemo(
        () => [
            {
                icon: <SummaryIcon width={16} height={16} />,
                text: "Generate Summary",
                hasConnection: true,
                onClick: () => {},
            },
            {
                icon: <NotesIcon width={16} height={16} />,
                text: "Write Notes",
                hasMenu: true,
                onClick: () => {},
            },
            {
                icon: <ResearchIcon width={16} height={16} />,
                text: "Proactive Research",
                onClick: () => {},
            },
        ],
        []
    );

    const renderText = (recordState: RecordState) => {
        switch (recordState) {
            case "isRecording":
                return (
                    <>
                        <span>
                            <span className={css.bold}>Team Strategy Session</span>, December 11,
                            2024, Time: 10:00 AM - XX:XX XX
                            <ul>
                                <li>Sarah Johnson (Project Manager)</li>
                                <li>Alex Rivera (Marketing Lead)</li>
                                <li>[You] Priya Patel (Product Designer)</li>
                                <li>Michael Chen (Software Engineer)</li>
                            </ul>
                        </span>
                        <span>
                            <span className={css.bold}>Sarah:</span> Good morning, everyone. Let’s
                            get started. The purpose of today’s meeting is to finalize our Q1
                            strategy for the new product launch. Before we dive in, does anyone have
                            any quick updates or announcements?
                        </span>
                        <span>
                            <span className={css.bold}>Alex:</span> I’ll go first. The marketing
                            team has finalized the social media campaign schedule. We’re planning to
                            start teasers two weeks before the launch. I’ll share the calendar after
                            the meeting.
                        </span>
                        <span>
                            <span className={css.bold}>Sarah:</span> Great, thanks, Alex. Priya,
                            how’s the design work coming along?
                        </span>
                        <span className={css.speaker}>
                            <span className={classNames(css.colored, css.bold)}>You: </span>
                            We’re on track with the app interface. The final prototypes should be
                            ready for user testing by the end of this week. I’ll need some feedback
                            from the dev team to ensure seamless integration.
                        </span>
                        <span>
                            <span className={css.bold}>Michael:</span> That’s good to hear. Priya,
                            once you send over the prototypes, I’ll have my team review the
                            functionality and flag any potential issues.
                        </span>
                        <span>
                            <span className={css.bold}>Sarah:</span> Perfect. Let’s move on to the
                            timeline. As of now, we’re aiming for the launch in March. Does anyone
                            foresee challenges with{" "}
                            <span className={css.blured}>meeting this dead</span>
                        </span>
                    </>
                );
            case "isPaused":
            case "isStopped":
                return (
                    <>
                        <span>
                            <span className={css.bold}>Team Strategy Session</span>, December 11,
                            2024, Time: 10:00 AM - XX:XX XX
                            <ul>
                                <li>Sarah Johnson (Project Manager)</li>
                                <li>Alex Rivera (Marketing Lead)</li>
                                <li>[You] Priya Patel (Product Designer)</li>
                                <li>Michael Chen (Software Engineer)</li>
                            </ul>
                        </span>
                        <span>
                            <span className={css.bold}>Sarah:</span> Good morning, everyone. Let’s
                            get started. The purpose of today’s meeting is to finalize our Q1
                            strategy for the new product launch. Before we dive in, does anyone have
                            any quick updates or announcements?
                        </span>
                        <span>
                            <span className={css.bold}>Alex:</span> I’ll go first. The marketing
                            team has finalized the social media campaign schedule. We’re planning to
                            start teasers two weeks before the launch. I’ll share the calendar after
                            the meeting.
                        </span>
                        <span>
                            <span className={css.bold}>Sarah:</span> Great, thanks, Alex. Priya,
                            how’s the design work coming along?
                        </span>
                        <span className={css.speaker}>
                            <span className={classNames(css.colored, css.bold)}>You: </span>
                            We’re on track with the app interface. The final prototypes should be
                            ready for user testing by the end of this week. I’ll need some feedback
                            from the dev team to ensure seamless integration.
                        </span>
                        <span>
                            <span className={css.bold}>Michael:</span> That’s good to hear. Priya,
                            once you send over the prototypes, I’ll have my team review the
                            functionality and flag any potential issues.
                        </span>
                        <span>
                            <span className={css.bold}>Sarah:</span> Perfect. Let’s move on to the
                            timeline. As of now, we’re aiming for the launch in March. Does anyone
                            foresee challenges with meeting this deadline? No? OK, great.
                        </span>
                    </>
                );
            default:
                return "";
        }
    };

    const handlePlayClick = () => {
        setRecord("isRecording");
    };

    const handlePauseClick = () => {
        setRecord("isPaused");
    };

    const handleStopClick = () => {
        setRecord("isStopped");
    };

    return (
        <LiveToolsWrapper
            bookmarkIcon={<RecordBookmarkIcon width={48} height={48} />}
            magicMenuItems={MAGIC_MENU_ITEMS}
            magicButtonIcon={<StarsIcon width={21} height={28} />}
            magicButtonClass={css.magicButton}
            isRotated={false}
        >
            <AudioRecorder />
            <div className={css.recordingText}>
                {renderText(record)}
                {/* <ul>
                    <li>
                        Finalize App Prototypes
                        <ul>
                            <li>Review and polish UI components.</li>
                            <li>Ensure seamless user flow and align with branding.</li>
                            <li>Complete and deliver prototypes by Friday.</li>
                        </ul>
                    </li>
                    <li>
                        Collaborate with Development Team
                        <ul>
                            <li>Share prototypes with Michael’s team.</li>
                            <li>Schedule a walkthrough to address integration feedback.</li>
                        </ul>
                    </li>
                    <li>
                        Prepare for User Testing
                        <ul>
                            <li>Coordinate participants with Sarah.</li>
                            <li>
                                Provide prototypes and supporting materials (e.g., task
                                instructions).
                            </li>
                            <li> Revise designs if issues arise during testing. </li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            Monitor Timeline
                            <li>Track progress to meet the March launch.</li>
                            <li>Communicate delays or challenges to Sarah proactively.</li>
                        </ul>
                    </li>
                </ul> */}
            </div>
        </LiveToolsWrapper>
    );
};

export default Listener;
