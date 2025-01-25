import clsx from "clsx";
import React from "react";
import { CSSTransition } from "react-transition-group";
import PlusSquareIcon from "src/shared/icons/PlusSquare.icon";
import { MagicMenuButton } from "..";
import css from "./MagicApplications.module.less";

interface Props {}

export const MagicApplications: React.FC<Props> = (props) => {
    const [menuActive, setMenuActive] = React.useState(false);
    const nodeRef = React.useRef<HTMLDivElement>(null);

    const toggleMenu = () => setMenuActive(!menuActive);

    return (
        <div className={css.apps}>
            <MagicMenuButton
                className={clsx(css.apps_btn, menuActive && css._active)}
                icon={<PlusSquareIcon />}
                text="Connect Applications"
                onClick={toggleMenu}
                hasMenu
            />
            <CSSTransition 
                classNames={css}
                timeout={250}
                in={menuActive}
                nodeRef={nodeRef}
                unmountOnExit
                mountOnEnter
            >
                <div className={css.apps_menu} ref={nodeRef}>
                    <a className={css.apps_menu_btn} data-label="Notion">
                        <img src="/img/icons/notion.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Spotify">
                        <img src="/img/icons/spotify.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Google">
                        <img src="/img/icons/google.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Miro">
                        <img src="/img/icons/miro.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Miro">
                        <img src="/img/icons/miro.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Google">
                        <img src="/img/icons/google.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Spotify">
                        <img src="/img/icons/spotify.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Notion">
                        <img src="/img/icons/notion.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Notion">
                        <img src="/img/icons/notion.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Spotify">
                        <img src="/img/icons/spotify.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Google">
                        <img src="/img/icons/google.svg" alt="" />
                    </a>
                    <a className={css.apps_menu_btn} data-label="Miro">
                        <img src="/img/icons/miro.svg" alt="" />
                    </a>
                </div>
            </CSSTransition>
        </div>
    );
};
