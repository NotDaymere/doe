import { ReactComponent as LogoIcon } from "src/assets/icons/logo-dotted.svg";
import { ReactComponent as SparklesIcon } from "src/assets/icons/sparkles-icon.svg";
import css from "../ChatMessage.module.less";

export const ChatBetaWidget = () => {
    return (
        <div className={css.beta_widget}>
            <div className={css.beta_widget_frame}>
                <div className={css.beta_widget_icon}>
                    <LogoIcon />
                </div>
                <button className={css.beta_widget_button}>
                    <p>Let's start</p> <SparklesIcon />
                </button>
            </div>
        </div>
    );
};
