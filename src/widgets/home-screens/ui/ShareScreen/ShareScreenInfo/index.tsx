import CableIcon from "src/shared/icons/Cable.icon";
import css from "./ShareScreenInfo.module.less";

const ShareScreenInfo = () => (
    <div className={css.shareScreenWrapper}>
        <div className={css.shareScreen}>
            <div className={css.instruction}>
                <span className={css.bold}>Share your mobile screen</span>
                <span>
                    To switch to sharing mode, connect your mobile device to your computer
                    <span className={css.bold}>via a cable.</span>
                </span>
                <span>
                    You can also connect your device <span className={css.bold}>via Bluetooth</span>{" "}
                    if a cable connection is not available.
                </span>
            </div>
            <div className={css.bottom}>
                <span>Share Mobile screen via a cable</span>
                <CableIcon width={21} height={5} />
            </div>
        </div>
    </div>
);

export default ShareScreenInfo;
