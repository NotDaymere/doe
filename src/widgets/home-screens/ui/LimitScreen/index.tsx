import DoeIcon from "src/shared/icons/Doe.Icon";
import CopyIcon from "src/shared/icons/Copy.icon";
import css from "./LimitScreen.module.less";

const LimitScreen = () => {
    const invitationLink = "https://www.doe.xyz/invite/kdadaf129)";

    const handleShareLinkButtonClick = () => {
        navigator.clipboard.writeText(invitationLink);
    };

    return (
        <div className={css.limitScreen}>
            <div className={css.iconContainer}>
                <div className={css.icon}>
                    <DoeIcon width={26} height={26} />
                </div>
                <div className={css.backgroundPattern} />
            </div>

            <span className={css.title}>You've reached your 50 message daily maximum</span>
            <span className={css.description}>
                Send <span className={css.bold}>5 invitations</span> to receive
                <span className={css.bold}>50 more messages</span>
            </span>
            <span className={css.description}>and continue working with Doe.</span>
            <div className={css.invitation}>
                <span className={css.invitationLink}>{invitationLink}</span>
                <button className={css.button} onClick={handleShareLinkButtonClick}>
                    <CopyIcon width={11} height={11} />
                    Share Link
                </button>
            </div>
        </div>
    );
};

export default LimitScreen;
