import clsx from "clsx";
import React from "react";
import { CSSTransition } from "react-transition-group";
import AppsIcon from "src/shared/icons/Apps.icon";
import SearchIcon from "src/shared/icons/Search.icon";
import { MagicMenuButton } from "..";
import ArrowDownIcon from "src/shared/icons/ArrowDown.icon";
import FileIcon from "src/shared/icons/File.icon";
import ImageIcon from "src/shared/icons/Image.icon";
import css from "./MagicUploadApps.module.less";

interface Props {}

export const MagicUploadApps: React.FC<Props> = (props) => {
    const [menuActive, setMenuActive] = React.useState(false);
    const nodeRef = React.useRef<HTMLDivElement>(null);
    const [input, setInput] = React.useState("");

    const toggleMenu = () => setMenuActive(!menuActive);

    return (
        <div className={css.apps}>
            <MagicMenuButton
                className={clsx(css.apps_btn, menuActive && css._active)}
                icon={<AppsIcon />}
                text="Upload from apps"
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
                    <div className={css.apps_menu_header}>
                        <div className={css.input}>
                            <SearchIcon className={css.input_icon} />
                            <input className={css.input_input} placeholder="Search" type="text" />
                        </div>
                        <button className={css.apps_menu_apps}>
                            Apps <ArrowDownIcon />
                        </button>
                    </div>
                    <ul className={css.apps_menu_content}>
                        <li className={css.apps_menu_item}>
                            <FileIcon fill="#8BCF16" />
                            <span><span>check_list</span>.docx</span>
                            <img src="/img/icons/miro.svg" alt="" />
                        </li>
                        <li className={css.apps_menu_item}>
                            <FileIcon fill="#F55687" />
                            <span><span>check_list_2</span>.pdf</span>
                            <img src="/img/icons/notion.svg" alt="" />
                        </li>
                        <li className={css.apps_menu_item}>
                            <ImageIcon fill="#FFD600" />
                            <span><span>check_list</span>.jpg</span>
                            <img src="/img/icons/miro.svg" alt="" />
                        </li>
                    </ul>
                </div>
            </CSSTransition>
        </div>
    );
};
