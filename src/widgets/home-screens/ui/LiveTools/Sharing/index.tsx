import { FC, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ToogleSwitch from "src/shared/components/ToogleSwitch";
import PlanetIcon from "src/shared/icons/Planet.icon";
import SeeAllLinks from "./SeeAllLinks";
import css from "./Sharing.module.less";
import { useClickOut } from "src/shared/hooks/useClickOut";

interface IProps {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const Sharing: FC<IProps> = ({ isActive, setIsActive }) => {
    const [showSharing, setShowSharing] = useState(false);
    const [password, setPassword] = useState(false);
    const [index, setIndex] = useState(false);
    const [isActiveSeeAllLinks, setIsActiveSeeAllLinks] = useState(false);

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
        }
    }, [isActive]);

    return (
        <>
            <CSSTransition in={showSharing} timeout={500} classNames={css} unmountOnExit>
                <div className={css.sharing} ref={ref}>
                    <div className={css.topPart}>
                        <div className={css.shareButton}>Share your conversation with others</div>
                        <div className={css.checkboxes}>
                            <ToogleSwitch
                                label="Password"
                                checked={password}
                                onChange={() => setPassword((prev) => !prev)}
                            />
                            <ToogleSwitch
                                label="Index"
                                checked={index}
                                onChange={() => {
                                    setIndex((prev) => !prev);
                                }}
                            />
                        </div>
                    </div>
                    <div className={css.bottomPart}>
                        <span className={css.description}>
                            We will attempt to remove any identifying information in this
                            conversation before it is published, though we recommend you refrain
                            from sharing chats with personal or private content.
                        </span>
                        <div className={css.linkWrapper}>
                            <span className={css.link}>https://doe.general.com/...</span>
                            <PlanetIcon width={19} height={19} />
                        </div>
                        <button
                            className={css.seeAllButton}
                            onClick={() => setIsActiveSeeAllLinks((prev) => !prev)}
                        >
                            See all shared links
                        </button>
                    </div>
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
