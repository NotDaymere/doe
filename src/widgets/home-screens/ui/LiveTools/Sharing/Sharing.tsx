import { FC, useState } from "react";
import { CSSTransition } from "react-transition-group";
import SeeAllLinks from "./SeeAllLinks";
import { useClickOut } from "src/shared/hooks/useClickOut";
import LinkCreated from "./LinkCreated";
import SharingLink from "./SharingLink";
import css from "./Sharing.module.less";
import classNames from "classnames";

interface IProps {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const Sharing: FC<IProps> = ({ isActive, setIsActive }) => {
    const [isActiveSeeAllLinks, setIsActiveSeeAllLinks] = useState(false);
    const [isLinkCreated, setIsLinkCreated] = useState(false);
    const [createWith, setCreateWith] = useState({ password: false, index: false });

    const ref = useClickOut({
        handler: () => {
            setIsActive(false);
        },
    });

    return (
        <>
            <CSSTransition in={isActive} timeout={500} classNames={css} unmountOnExit>
                <div
                    className={classNames(css.sharing, {
                        [css.sharingShow]: isActive,
                    })}
                    ref={ref}
                >
                    {isLinkCreated ? (
                        <LinkCreated createdWithPassword={createWith.password || false} />
                    ) : (
                        <SharingLink
                            onCreateLink={() => setIsLinkCreated(true)}
                            onSeeAllLinksClick={() => setIsActiveSeeAllLinks(!isActiveSeeAllLinks)}
                            createWith={createWith}
                            onCreateWithToogleChange={setCreateWith}
                        />
                    )}
                </div>
            </CSSTransition>
            <div className={css.seeAllLinks}>
                <SeeAllLinks isActive={isActiveSeeAllLinks} setIsActive={setIsActiveSeeAllLinks} />
            </div>
        </>
    );
};

export default Sharing;
