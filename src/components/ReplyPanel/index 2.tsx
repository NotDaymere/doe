import { ReactComponent as ReplyArrowIcon } from "src/assets/icons/reply-arrow.svg";
import CrossIcon from "src/shared/icons/Cross.icon";
import css from "./ReplyPanel.module.less";

export const ReplyPanel = () => {
    return (
        <div className={css.reply_panel_wrapper}>
            <div className={css.reply_panel}>
                <div className={css.reply_left}>
                    <div className={css.reply_arrow} data-step="reply">
                        <ReplyArrowIcon />
                    </div>
                    <p className={css.reply_text}>
                        “We will write this code completely in Python.”
                    </p>
                </div>
                <button className={css.reply_close}>
                    <CrossIcon />
                </button>
            </div>
        </div>
    );
};
