import clsx from "clsx";
import { ReactNode } from "react";
import { ReactComponent as BubbleIcon } from "src/assets/icons/bubble.svg";
import { ReactComponent as ResearchIcon } from "src/assets/icons/research.svg";
import ArrowUpIcon from "src/shared/icons/ArrowUp.icon";
import BoldIcon from "src/shared/icons/Bold.icon";
import CodeIcon from "src/shared/icons/Code.icon";
import EnergyIcon from "src/shared/icons/Energy.icon";
import FunctionIcon from "src/shared/icons/Function.icon";
import ItalicIcon from "src/shared/icons/Italic.icon";
import LeafIcon from "src/shared/icons/Leaf.icon";
import LinkIcon from "src/shared/icons/Link.icon";
import StarsIcon from "src/shared/icons/Stars.icon";
import TrashIcon from "src/shared/icons/Trash.icon";
import TreeIcon from "src/shared/icons/Tree.icon";
import UnderlineIcon from "src/shared/icons/Underline.icon";
import WaterIcon from "src/shared/icons/Water.icon";
import WindIcon from "src/shared/icons/Wind.icon";
import css from "src/styles/onboardingFlow.module.less";
import { ReactComponent as ChatIcon } from "../../public/img/icons/chats.svg";
import { ReactComponent as CorporaIcon } from "../../public/img/icons/corpora.svg";
import { ReactComponent as RecordingIcon } from "../../public/img/icons/recording.svg";
import { ReactComponent as ShareIcon } from "../../public/img/icons/shared.svg";
import { ReactComponent as StarIcon } from "../../public/img/icons/star.svg";
import { ReactComponent as TagsIcon } from "../../public/img/icons/tags.svg";
import { ReactComponent as TranslationsIcon } from "../../public/img/icons/translations.svg";

export interface OnboardingStep {
    id: number;
    location: string;
    cursorVisible: boolean;
    cursorClick?: boolean;
    cursorClickPrevPosition?: boolean;
    cursorPosition?: {
        top?: number;
        left?: number;
    };
    cursorCentered?: boolean;
    cursorSpeed?: number; // in seconds
    cursorDelay?: number; // in milliseconds
    tooltip: boolean;
    tooltipPosition?: "top" | "bottom" | "left" | "right";
    tooltipTitle?: string | ReactNode;
    tooltipParagraph1?: ReactNode;
    tooltipParagraph2?: ReactNode;
    tooltipIcons?: ReactNode;
    sendButtonEnabled?: boolean;
    blur?: string[];
    autoSkip?: number; // number represents delay for autoskip
    [key: string]: any;
}

export const onboardingFlow: OnboardingStep[] = [
    {
        id: 1,
        location: '[data-step="input"]',
        cursorVisible: false,
        cursorCentered: true,
        tooltip: false,
    },
    {
        id: 2,
        location: '[data-step="input"]',
        cursorVisible: false,
        cursorCentered: true,
        tooltip: false,
    },
    {
        id: 3,
        location: '[data-step="head"]',
        cursorVisible: true,
        cursorCentered: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Please follow this cursor to walk through our onboarding tutorial.
            </p>
        ),
        tooltipParagraph2: (
            <p className={css.tooltip_paragraph}>
                You can also navigate the onboarding using <b>arrow keys:</b>
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons_column}>
                <div className={css.tooltip_icon_row}>
                    <div className={css.navigation_next}>
                        <ArrowUpIcon />
                    </div>
                    Go to the next step.
                </div>
                <div className={css.tooltip_icon_row}>
                    <div className={css.navigation_prev}>
                        <ArrowUpIcon />
                    </div>
                    Return to the previous step.
                </div>
            </div>
        ),
    },
    {
        id: 4,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 100,
        },
        tooltip: false,
    },
    {
        id: 4.5,
        location: '[data-step="send"]',
        cursorVisible: true,
        sendButtonEnabled: true,
        tooltip: false,
    },
    {
        id: 4.6,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 100,
        },
        tooltip: false,
        blur: ["history", "magicbox"],
    },
    {
        id: 4.7,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 200,
        },
        tooltip: false,

        blur: ["history", "magicbox"],
    },
    {
        id: 5,
        location: '[data-step="bold"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Format buttons</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                With format buttons you can formatting text style: make it <b>bold</b>,{" "}
                <u>underlined</u> or <i>italic</i>.
            </p>
        ),
        tooltipParagraph2: (
            <p className={css.tooltip_paragraph}>
                Format buttons work by{" "}
                <b>toggling before typing or highlighting typed content then clicking.</b>
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <BoldIcon />
                <UnderlineIcon />
                <ItalicIcon />
            </div>
        ),
        blur: ["history", "body", "magicbox"],
    },
    {
        id: 6,
        location: '[data-step="underline"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Format buttons</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                With format buttons you can formatting text style: make it <b>bold</b>,{" "}
                <u>underlined</u> or <i>italic</i>.
            </p>
        ),
        tooltipParagraph2: (
            <p className={css.tooltip_paragraph}>
                Format buttons work by{" "}
                <b>toggling before typing or highlighting typed content then clicking.</b>
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <BoldIcon />
                <UnderlineIcon />
                <ItalicIcon />
            </div>
        ),
        blur: ["history", "body", "magicbox"],
    },
    {
        id: 7,
        location: '[data-step="italic"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Format buttons</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                With format buttons you can formatting text style: make it <b>bold</b>,{" "}
                <u>underlined</u> or <i>italic</i>.
            </p>
        ),
        tooltipParagraph2: (
            <p className={css.tooltip_paragraph}>
                Format buttons work by{" "}
                <b>toggling before typing or highlighting typed content then clicking.</b>
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <BoldIcon />
                <UnderlineIcon />
                <ItalicIcon />
            </div>
        ),
        blur: ["history", "body", "magicbox"],
    },
    {
        id: 8,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 400,
        },
        tooltip: false,
        blur: [""],
    },
    {
        id: 8.1,
        location: '[data-step="function"]',
        cursorVisible: true,
        cursorClick: true,
        cursorDelay: 300,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Math mode.</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                <b>Math mode</b> allows you to convert your text into a mathematical formula or
                equation using the <b>LaTeX</b> framework.
            </p>
        ),
        tooltipParagraph2: (
            <p className={css.tooltip_paragraph}>
                By <b>holding the button</b> you can create a <b>math block</b> with generated
                content in the LaTeX format with the ability to further work with the raw code.
            </p>
        ),

        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <FunctionIcon />
            </div>
        ),
        blur: [""],
    },
    {
        id: 8.2,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 400,
        },
        tooltip: false,
        blur: [""],
    },
    {
        id: 8.3,
        location: '[data-step="send"]',
        cursorVisible: true,
        cursorClick: true,
        sendButtonEnabled: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 9,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 400,
        },
        tooltip: false,
        blur: [""],
    },
    {
        id: 9.1,
        location: '[data-step="code"]',
        cursorVisible: true,
        cursorClick: true,
        cursorDelay: 300,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Code/ markdown mode.</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                By <b>holding the button</b> you can create a <b>block code</b> with example of
                rendered code&
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <CodeIcon />
            </div>
        ),

        blur: [""],
    },
    {
        id: 9.2,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 400,
        },
        tooltip: false,
        blur: [""],
    },
    {
        id: 9.3,
        location: '[data-step="send"]',
        cursorVisible: true,
        cursorClick: true,
        sendButtonEnabled: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 10,
        location: '[data-step="link"]',
        cursorVisible: true,
        cursorDelay: 1500,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Hyperlink button.</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Hyperlink button can only work by <b>highlighting text</b>.
            </p>
        ),
        tooltipParagraph2: (
            <p className={css.tooltip_paragraph}>
                Just highlight your text in input area, and than type or paste the accurate
                hyperlink adress.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <LinkIcon />
            </div>
        ),

        blur: [""],
    },
    {
        id: 11,
        location: '[data-step="delete"]',
        cursorVisible: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Delete button.</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>Remove all messages, but not reset the page.</p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <TrashIcon />
            </div>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 12,
        location: '[data-step="delete"]',
        cursorVisible: true,
        tooltip: false,
        autoSkip: 500,
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 13,
        location: '[data-step="corpora"]',
        cursorVisible: true,
        cursorClick: true,
        cursorClickPrevPosition: true,
        cursorDelay: 500,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Corporas</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can create and customize your corpora, which is a collection of chats, similar
                to a folder or a project. Each corpus holds chats and their branches.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <CorporaIcon />
            </div>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 14,
        location: '[data-step="chats"]',
        cursorVisible: true,
        cursorClick: true,
        cursorClickPrevPosition: true,
        cursorDelay: 500,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Individual chats</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You always can access and navigate through your all unsorted individual chats.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <ChatIcon />
            </div>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 15,
        location: '[data-step="favourites"]',
        cursorVisible: true,
        cursorClick: true,
        cursorClickPrevPosition: true,
        cursorDelay: 500,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Favourites</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Add any of the message in the chat to your favourites. You can find all bookmarked
                messages in one place.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <StarIcon />
            </div>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 16,
        location: '[data-step="tags"]',
        cursorVisible: true,
        cursorClick: true,
        cursorClickPrevPosition: true,
        cursorDelay: 500,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Tags</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Mark your chat with special colour tag to keep it sorted.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <TagsIcon />
            </div>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 17,
        location: '[data-step="tags"]',
        cursorVisible: true,
        tooltip: false,
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 18,
        location: '[data-step="profile"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Settings</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can set up your profile, customize model and Doe’s writing style, connect and
                manage your apps.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 18.1,
        location: '[data-step="profile-photo"]',
        cursorVisible: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Settings</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can set up your profile, customize model and Doe’s writing style, connect and
                manage your apps.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 18.2,
        location: '[data-step="profile-name"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 150,
        },
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Settings</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can set up your profile, customize model and Doe’s writing style, connect and
                manage your apps.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 18.3,
        location: '[data-step="profile-email"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 150,
        },
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Settings</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can set up your profile, customize model and Doe’s writing style, connect and
                manage your apps.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 18.4,
        location: '[data-step="profile-save"]',
        cursorVisible: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Settings</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can set up your profile, customize model and Doe’s writing style, connect and
                manage your apps.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 19,
        location: '[data-step="un-translated"]',
        cursorVisible: true,
        tooltip: false,
        blur: ["input", "navigate"],
    },
    {
        id: 19.1,
        location: '[data-step="translate"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Translator</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Translator is the live tool that specifically adapted for real-time translations and
                designed with this task in mind.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <TranslationsIcon />
            </div>
        ),
        blur: ["input", "navigate"],
    },
    {
        id: 20,
        location: '[data-step="magic"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "left",
        tooltipTitle: <b className={css.tooltip_title}>Magic box</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                In live tools mode, such as Translator or Transcribe, you may find the Magic Box
                button, which contains all available actions.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <StarsIcon />
            </div>
        ),
        blur: ["input", "navigate"],
    },
    {
        id: 21,
        location: '[data-step=""]',
        cursorVisible: true,
        tooltip: false,
        blur: ["input", "navigate"],
    },
    {
        id: 21.1,
        location: '[data-step="transcribe"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Transcribe</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Translator is the live tool that specifically adapted for real-time translations and
                designed with this task in mind.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <RecordingIcon />
            </div>
        ),
        blur: ["input", "navigate"],
    },
    {
        id: 22,
        location: '[data-step="magic"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: false,
        blur: ["input", "navigate"],
    },
    {
        id: 22.1,
        location: '[data-step="magic-voice"]',
        cursorVisible: true,
        cursorDelay: 300,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Proactive research</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Doe will create a new chat where it proactively starts doing end-to-end research for
                the user based on meeting action items and other data.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <ResearchIcon />
            </div>
        ),
        blur: ["input", "navigate"],
    },
    {
        id: 23,
        location: '[data-step="share"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Share conversations</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Share your conversations with others by creating a story on Instagram, a post on
                Threads, Hacker News, or Facebook.
            </p>
        ),
        tooltipIcons: (
            <div className={css.tooltip_icons}>
                <ShareIcon />
            </div>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 24,
        location: '[data-step="lightMode"]',
        cursorVisible: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Light and Dark Theme.</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Manage the dark or light theme according to your preference.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 25,
        location: '[data-step="darkMode"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Light and Dark Theme.</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Manage the dark or light theme according to your preference.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 26,
        location: '[data-step="lightMode"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Light and Dark Theme.</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Manage the dark or light theme according to your preference.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 27,
        location: '[data-step="gaia"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "right",
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Environmental savings per (calculated per token) by using our models compared to
                existing SOTA models.
            </p>
        ),
        tooltipParagraph2: (
            <p className={clsx(css.tooltip_paragraph, css.tooltip_paragraph_with_icons)}>
                For each token you generate, we calculate tree mass <TreeIcon fill="#5B5B5B" />,
                volume of water <WaterIcon fill="#268AFF" />, mass of carbon dioxide (CO2){" "}
                <WindIcon fill="#FF4848" />, joules of energy <EnergyIcon fill="#FF8B12" />, and
                size of land <LeafIcon fill="#8BCF16" /> conserved with the Bilateral Cortex Model
                (BCM).
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 28,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 100,
        },
        sendButtonEnabled: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 28.1,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 100,
        },
        sendButtonEnabled: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 29,
        location: '[data-step="playgroun"]',
        cursorVisible: true,
        tooltip: false,
        blur: [""],
        openTable: true,
    },
    {
        id: 30,
        location: '[data-step="playground"]',
        cursorVisible: true,
        tooltip: false,
        blur: ["input", "history", "body", "magicbox", "navigate"],
        openTable: true,
    },
    {
        id: 31,
        location: '[data-step="playground-btn"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: true,
        tooltipPosition: "left",
        tooltipTitle: <b className={css.tooltip_title}>Revision History</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Playground’s time machine. View and revert back to any edits, diffs, or changes in a
                given Playground.
            </p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
        openTable: true,
    },
    {
        id: 32,
        location: '[data-step="playgrounds"]',
        cursorVisible: true,
        cursorCentered: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 33,
        location: '[data-step="playgrounds"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: false,
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 34,
        location: '[data-step="playgrounds"]',
        cursorVisible: true,
        cursorPosition: {
            top: 4,
            left: 5,
        },
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>All Playgrounds</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>Browse and access all your saved playgrounds.</p>
        ),
        blur: ["input", "history", "body", "magicbox", "navigate"],
    },
    {
        id: 35,
        location: '[data-step="quotes"]',
        cursorVisible: true,
        cursorPosition: {
            top: 0,
            left: 1,
        },
        cursorClickPrevPosition: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 36,
        location: '[data-step="reply"]',
        cursorVisible: true,
        cursorDelay: 300,
        tooltip: true,
        tooltipPosition: "top",
        tooltipTitle: <b className={css.tooltip_title}>References</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                By highlighting any part of the text in the chat, you can interact with it to
                clarify, expand, rephrase the text, etc.
            </p>
        ),
        blur: ["history", "body", "magicbox", "navigate"],
    },
    {
        id: 37,
        location: '[data-step="sparkle"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: false,
        blur: ["history", "body", "magicbox", "navigate"],
    },
    {
        id: 38,
        location: '[data-step="branch"]',
        cursorVisible: true,
        cursorPosition: {
            top: 10,
            left: 30,
        },
        cursorDelay: 200,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Creating branches</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can send a message in the chat that will immediately create a branch so as not
                to disrupt the flow of the main conversation.
            </p>
        ),
        blur: ["history", "body", "magicbox", "navigate"],
    },
    // {
    //     id: 38.1,
    //     location: '[data-step="branch"]',
    //     cursorVisible: true,
    //     cursorDelay: 200,
    //     tooltip: false,
    //     blur: ["history", "body", "magicbox", "navigate"],
    // },
    {
        id: 38.1,
        location: '[data-step="input"]',
        cursorVisible: true,
        cursorClickPrevPosition: true,
        cursorPosition: {
            top: 0,
            left: 400,
        },
        cursorDelay: 200,
        tooltip: false,
        blur: ["history", "body", "magicbox", "navigate"],
    },
    {
        id: 39,
        location: '[data-step="branch"]',
        cursorVisible: true,
        cursorClickPrevPosition: true,
        tooltip: false,
    },
    {
        id: 40,
        location: '[data-step="branch-bar"]',
        cursorVisible: true,
        cursorDelay: 1000,
        cursorPosition: {
            top: 0,
            left: -10,
        },
        tooltip: true,
        tooltipPosition: "left",
        tooltipTitle: <b className={css.tooltip_title}>Viewing branch</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                By opening the branch, you switch to horizontal scrolling mode.
            </p>
        ),
    },
    {
        id: 41,
        location: '[data-step="branch-dots"]',
        cursorVisible: true,
        cursorClick: true,
        cursorPosition: {
            top: 0,
            left: -10,
        },
        tooltip: false,
    },
    {
        id: 42,
        location: '[data-step="branches-box"]',
        cursorVisible: true,
        cursorClick: true,
        cursorPosition: {
            top: 0,
            left: 0,
        },
        tooltip: false,
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 43,
        location: '[data-step="branches-item"]',
        cursorVisible: true,
        cursorPosition: {
            top: -20,
            left: 0,
        },
        cursorDelay: 1000,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Fast access to branches</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can easily access to all your branches, navigate and manage it.
            </p>
        ),
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 44,
        location: '[data-step="branches-item"]',
        cursorVisible: true,
        cursorCentered: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 45,
        location: '[data-step="sparkle"]',
        cursorVisible: true,
        cursorClick: true,
        tooltip: false,
        blur: ["history", "body", "magicbox", "navigate"],
    },
    {
        id: 45.1,
        location: '[data-step="talk-mode"]',
        cursorVisible: true,
        cursorDelay: 500,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Talk Mode</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Choose Talk Mode to start live conversation with Doe! Doe will be your real time
                AI-assistant.
            </p>
        ),
        // blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
        blur: [""],
    },
    {
        id: 46,
        location: '[data-step=""]',
        cursorVisible: true,
        tooltip: false,
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 47,
        location: '[data-step=""]',
        cursorVisible: true,
        tooltip: false,
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 48,
        location: '[data-step="camera"]',
        cursorVisible: true,
        cursorDelay: 500,
        tooltip: true,
        tooltipPosition: "right",
        tooltipTitle: <b className={css.tooltip_title}>Adjust the talk mode</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can manage your audio settings. Or star a video chat with Doe.
            </p>
        ),
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 49,
        location: '[data-step=""]',
        cursorVisible: true,
        tooltip: false,
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 50,
        location: '[data-step=""]',
        cursorVisible: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 51,
        location: '[data-step="screen-share"]',
        cursorVisible: true,
        tooltip: true,
        tooltipPosition: "top",
        tooltipTitle: <b className={css.tooltip_title}>Screen sharing</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Here you may allow Doe to view the screens of your devices, including your laptop,
                phone, or tablet.
            </p>
        ),
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 52,
        location: '[data-step="screen-share"]',
        cursorVisible: true,
        cursorPosition: {
            top: 5,
            left: 4,
        },
        tooltip: true,
        tooltipPosition: "top",
        tooltipTitle: <b className={css.tooltip_title}>Screen sharing</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                You can share your external devices’ screens via Bluetooth or a manual port. A small
                window will open to show what Doe is seeing.
            </p>
        ),
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 53,
        location: '[data-step=""]',
        cursorVisible: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 54,
        location: '[data-step=""]',
        cursorVisible: true,
        tooltip: false,
        blur: [""],
    },
    {
        id: 55,
        location: '[data-step="search"]',
        cursorVisible: true,
        tooltip: true,
        tooltipPosition: "left",
        tooltipTitle: <b className={css.tooltip_title}>Quick search</b>,
        tooltipParagraph1: (
            <p className={css.tooltip_paragraph}>
                Search through any of messages sent by you or Doe across all conversations. You can
                limit by case or timeframe.
            </p>
        ),
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
    {
        id: 56,
        location: '[data-step="search"]',
        cursorVisible: true,
        cursorPosition: {
            top: 5,
            left: 4,
        },
        tooltip: true,
        tooltipPosition: "left",
        tooltipTitle: <b className={css.tooltip_title}>Quick search</b>,
        tooltipParagraph1: (
            <p className={clsx(css.tooltip_paragraph, css.tooltip_paragraph_with_icons)}>
                ⌘K (Command + K) will trigger the search. ⌘F may open it on certain browsers, too.
                Magic ( <StarsIcon fill="#FFFFFF" /> ) indicates messages sent by Doe, where bubbles
                ( <BubbleIcon fill="#FFFFFF" /> ) are your messages
            </p>
        ),
        blur: ["history", "body", "magicbox", "navigate", "playgrounds-box"],
    },
];
