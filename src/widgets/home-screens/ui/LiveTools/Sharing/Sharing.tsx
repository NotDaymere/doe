import { FC, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import SeeAllLinks from "./SeeAllLinks";
import { useClickOut } from "src/shared/hooks/useClickOut";
import LinkCreated from "./LinkCreated";
import SharingLink from "./SharingLink";
import css from "./Sharing.module.less";

interface IProps {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const Sharing: FC<IProps> = ({ isActive, setIsActive }) => {
    const [showSharing, setShowSharing] = useState(false);
    const [isActiveSeeAllLinks, setIsActiveSeeAllLinks] = useState(false);
    const [isLinkCreated, setIsLinkCreated] = useState(false);
    const [createWith, setCreateWith] = useState({ password: false, index: false });

    const ref = useClickOut({
        handler: () => {
            setShowSharing(false);
            setIsActive(false);
        },
    });

    useEffect(() => {
        if (isActive) {
            setShowSharing(true);

            return () => {
                setShowSharing(false);
                setIsActive(false);
            };
        } else {
            setShowSharing(false);
            setIsActive(false);
            return () => {}
        }
    }, [isActive]);

    return (
        <>
            <CSSTransition in={showSharing} timeout={500} classNames={css} unmountOnExit>
                <div className={css.sharing} ref={ref}>
                    {isLinkCreated ? (
                        <LinkCreated createdWithPassword={createWith.password || false} />
                    ) : (
                        <SharingLink
                            onCreateLink={() => setIsLinkCreated(true)}
                            onSeeAllLinksClick={() => setIsActiveSeeAllLinks(true)}
                            createWith={createWith}
                            onCreateWithToogleChange={setCreateWith}
                        />
                    )}
                </div>
            </CSSTransition>
            {isActiveSeeAllLinks && (
                <div className={css.seeAllLinks}>
                    <SeeAllLinks
                        isActive={isActiveSeeAllLinks}
                        setIsActive={setIsActiveSeeAllLinks}
                    />
                </div>
            )}
        </>
    );
};

export default Sharing;