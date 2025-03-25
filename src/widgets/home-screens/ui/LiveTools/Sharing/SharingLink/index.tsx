import { FC } from "react";
import ToogleSwitch from "src/shared/components/ToogleSwitch";
import CreateLinkIcon from "src/shared/icons/CreateLink.icon";
import css from "./SharingLink.module.less";
export interface IToogleCreate {
    password: boolean;
    index: boolean;
}

interface IProps {
    onCreateLink: () => void;
    onSeeAllLinksClick: () => void;
    onCreateWithToogleChange: (value: IToogleCreate) => void;
    createWith: any;
}

const SharingLink: FC<IProps> = ({
    onCreateLink,
    onSeeAllLinksClick,
    onCreateWithToogleChange,
    createWith,
}) => {
    return (
        <>
            <div className={css.topPart}>
                <div className={css.shareButton}>Share your conversation with others</div>
                <div className={css.checkboxes}>
                    <ToogleSwitch
                        label="Password"
                        checked={createWith.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onCreateWithToogleChange({ ...createWith, password: e.target.checked })
                        }
                    />
                    <ToogleSwitch
                        label="Index"
                        checked={createWith.index}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            onCreateWithToogleChange({ ...createWith, index: e.target.checked });
                        }}
                    />
                </div>
            </div>
            <div className={css.bottomPart}>
                <span className={css.description}>
                    We will attempt to remove any identifying information in this conversation
                    before it is published, though we recommend you refrain from sharing chats with
                    personal or private content.
                </span>
                <div className={css.linkWrapper}>
                    <span className={css.link}>https://doe.general.com/...</span>
                    <button onClick={onCreateLink}>
                        <CreateLinkIcon width={26} height={21} />
                    </button>
                </div>
                <button className={css.seeAllButton} onClick={onSeeAllLinksClick}>
                    See all shared links
                </button>
            </div>
        </>
    );
};

export default SharingLink;
