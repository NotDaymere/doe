import GmailIcon from "src/shared/icons/Gmail.icon";
import TwitterIcon from "src/shared/icons/Twitter.icon";
import LinkedinIcon from "src/shared/icons/LinkedIn.icon";
import XIcon from "src/shared/icons/X.icon";
import MetaIcon from "src/shared/icons/Meta.icon";
import RedditIcon from "src/shared/icons/Reddit.icon";
import YahooIcon from "src/shared/icons/Yahoo.icon";
import { FC, ReactElement, useState } from "react";
import classNames from "classnames";
import Chip from "src/shared/components/Chip";
import css from "./LinkCreated.module.less";

const ICONS: ReactElement[] = [
    <GmailIcon width={26} height={19} />,
    <TwitterIcon width={22} height={19} />,
    <LinkedinIcon width={19} height={19} />,
    <XIcon width={19} height={19} />,
    <MetaIcon width={29} height={19} />,
    <RedditIcon width={19} height={19} />,
    <YahooIcon width={19} height={19} />,
];

interface IProps {
    createdWithPassword: boolean;
}

const LinkCreated: FC<IProps> = ({ createdWithPassword }) => {
    const [isPasswordCopied, setIsPasswordCopied] = useState(false);
    const [isLinkCopied, setIsLinkCopied] = useState(false);

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const handlePasswordClick = (e: any) => {
        copyText(e.target?.innerText);
        setIsPasswordCopied(true);
    };

    const handleLinkClick = (e: any) => {
        copyText(e.target?.innerText);
        setIsLinkCopied(true);
    };

    return (
        <div className={css.linkCreated}>
            <div className={css.topPart}>
                <div className={css.linkCreatedLabel}>
                    {createdWithPassword ? "Link Created with Password:" : "Link Created!"}
                </div>
                {createdWithPassword ? (
                    <button
                        className={classNames(css.linkCreatedLabel, css.passwordLabel)}
                        onClick={handlePasswordClick}
                    >
                        <span className={css.password}>xyzabc23942bfsddfbsdbfbd</span>
                    </button>
                ) : null}
            </div>
            <div className={css.bottomPart}>
                <span className={css.description}>
                    A custom link to your conversation has been created. Feel free to share it on
                    social media:
                </span>
                <div className={css.icons}>
                    {ICONS.map((icon) => (
                        <div className={css.icon}>{icon}</div>
                    ))}
                </div>
                <div className={css.input} onClick={handleLinkClick}>
                    <span className={css.createdLink}>
                        https://doe.general.com/a4ww474wbfe934594rnff
                    </span>
                </div>
            </div>
            {isPasswordCopied && (
                <div className={css.chipPassword}>
                    <Chip
                        label="Password copied to clipboard!"
                        isActive={isPasswordCopied}
                        setIsActive={setIsPasswordCopied}
                    />
                </div>
            )}
            {isLinkCopied && (
                <div className={css.chipLink}>
                    <Chip
                        label="Link copied to clipboard!"
                        isActive={isLinkCopied}
                        setIsActive={setIsLinkCopied}
                    />
                </div>
            )}
        </div>
    );
};

export default LinkCreated;
