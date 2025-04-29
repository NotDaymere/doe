import BoldIcon from "src/shared/icons/Bold.icon";
import CodeIcon from "src/shared/icons/Code.icon";
import EnergyIcon from "src/shared/icons/Energy.icon";
import FunctionIcon from "src/shared/icons/Function.icon";
import ItalicIcon from "src/shared/icons/Italic.icon";
import LeafIcon from "src/shared/icons/Leaf.icon";
import LinkIcon from "src/shared/icons/Link.icon";
import TrashIcon from "src/shared/icons/Trash.icon";
import TreeIcon from "src/shared/icons/Tree.icon";
import UnderlineIcon from "src/shared/icons/Underline.icon";
import WaterIcon from "src/shared/icons/Water.icon";
import WindIcon from "src/shared/icons/Wind.icon";
import { ReactComponent as ChatIcon } from "../../../public/img/icons/chats.svg";
import { ReactComponent as CorporaIcon } from "../../../public/img/icons/corpora.svg";
import { ReactComponent as RecordingIcon } from "../../../public/img/icons/recording.svg";
import { ReactComponent as ShareIcon } from "../../../public/img/icons/shared.svg";
import { ReactComponent as StarIcon } from "../../../public/img/icons/star.svg";
import { ReactComponent as TagsIcon } from "../../../public/img/icons/tags.svg";
import { ReactComponent as TranslationsIcon } from "../../../public/img/icons/translations.svg";
import { Tooltip } from "../Tooltip";
import css from "./OnboardingTooltip.module.less";

interface OnboardingTooltipProps {
    step: number;
}

export const OnboardingTooltip = ({ step }: OnboardingTooltipProps) => {
    if (step < 1 || step > 35) return null;

    return (
        <>
            {step >= 5 && step <= 7 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Format buttons.</b>
                        <p className={css.tooltip_paragraph}>
                            With format buttons you can formatting text style: make it <b>bold</b>,{" "}
                            <u>underlined</u> or <i>italic</i>.
                        </p>
                        <p className={css.tooltip_paragraph}>
                            Format buttons work by{" "}
                            <b>
                                toggling before typing or highlighting typed content then clicking.
                            </b>
                        </p>
                        <div className={css.tooltip_icons}>
                            <BoldIcon />
                            <UnderlineIcon />
                            <ItalicIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 8 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Math mode.</b>
                        <p className={css.tooltip_paragraph}>
                            <b>Math mode</b> allows you to convert your text into a mathematical
                            formula or equation using the <b>LaTeX</b> framework.
                        </p>
                        <p className={css.tooltip_paragraph}>
                            By <b>holding the button</b> you can create a <b>math block</b> with
                            generated content in the LaTeX format with the ability to further work
                            with the raw code.
                        </p>
                        <div className={css.tooltip_icons}>
                            <FunctionIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 9 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Code/ markdown mode.</b>
                        <p className={css.tooltip_paragraph}>
                            By <b>holding the button</b> you can create a <b>block code</b> with
                            example of rendered code&
                        </p>
                        <div className={css.tooltip_icons}>
                            <CodeIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 10 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Hyperlink button.</b>
                        <p className={css.tooltip_paragraph}>
                            Hyperlink button can only work by <b>highlighting text</b>.
                        </p>
                        <p className={css.tooltip_paragraph}>
                            Just highlight your text in input area, and than type or paste the
                            accurate hyperlink adress.
                        </p>
                        <div className={css.tooltip_icons}>
                            <LinkIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 11 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Delete button.</b>
                        <p className={css.tooltip_paragraph}>
                            Remove all messages, but not reset the page.
                        </p>
                        <div className={css.tooltip_icons}>
                            <TrashIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 13 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Corporas</b>
                        <p className={css.tooltip_paragraph}>
                            You can create and customize your corpora, which is a collection of
                            chats, similar to a folder or a project. Each corpus holds chats and
                            their branches.
                        </p>
                        <div className={css.tooltip_icons}>
                            <CorporaIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 14 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Individual chats</b>
                        <p className={css.tooltip_paragraph}>
                            You always can access and navigate through your all unsorted individual
                            chats.
                        </p>
                        <div className={css.tooltip_icons}>
                            <ChatIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 15 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Favourites</b>
                        <p className={css.tooltip_paragraph}>
                            Add any of the message in the chat to your favourites. You can find all
                            bookmarked messages in one place.
                        </p>
                        <div className={css.tooltip_icons}>
                            <StarIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 16 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Tags</b>
                        <p className={css.tooltip_paragraph}>
                            Mark your chat with special colour tag to keep it sorted.
                        </p>
                        <div className={css.tooltip_icons}>
                            <TagsIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 18 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Settings</b>
                        <p className={css.tooltip_paragraph}>
                            You can set up your profile, customize model and Doe’s writing style,
                            connect and manage your apps.
                        </p>
                    </div>
                </Tooltip>
            )}
            {step === 19 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Translator</b>
                        <p className={css.tooltip_paragraph}>
                            Translator is the live tool that specifically adapted for real-time
                            translations and designed with this task in mind.
                        </p>
                        <div className={css.tooltip_icons}>
                            <TranslationsIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 21 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Transcribe</b>
                        <p className={css.tooltip_paragraph}>
                            Translator is the live tool that specifically adapted for real-time
                            translations and designed with this task in mind.
                        </p>
                        <div className={css.tooltip_icons}>
                            <RecordingIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {step === 23 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Share conversations</b>
                        <p className={css.tooltip_paragraph}>
                            Share your conversations with others by creating a story on Instagram, a
                            post on Threads, Hacker News, or Facebook.
                        </p>
                        <div className={css.tooltip_icons}>
                            <ShareIcon />
                        </div>
                    </div>
                </Tooltip>
            )}
            {(step === 24 || step === 25 || step === 26) && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <b className={css.tooltip_title}>Light and Dark Theme.</b>
                        <p className={css.tooltip_paragraph}>
                            Manage the dark or light theme according to your preference.
                        </p>
                    </div>
                </Tooltip>
            )}
            {step === 27 && (
                <Tooltip position="right" className={`highlight-step highlight-step-${step}`}>
                    <div className={css.tooltip_content}>
                        <p className={css.tooltip_paragraph}>
                            Environmental savings per (calculated per token) by using our models
                            compared to existing SOTA models.
                        </p>
                        <p className={css.tooltip_paragraph}>
                            For each token you generate, we calculate tree mass{" "}
                            <TreeIcon fill="#5B5B5B" />, volume of water{" "}
                            <WaterIcon fill="#268AFF" />, mass of carbon dioxide (CO2){" "}
                            <WindIcon fill="#FF4848" />, joules of energy{" "}
                            <EnergyIcon fill="#FF8B12" />, and size of land{" "}
                            <LeafIcon fill="#8BCF16" /> conserved with the Bilateral Cortex Model
                            (BCM).
                        </p>
                    </div>
                </Tooltip>
            )}
        </>
    );
};
