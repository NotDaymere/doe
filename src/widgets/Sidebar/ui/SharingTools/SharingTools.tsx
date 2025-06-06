import React from "react";
import css from "./SharingTools.module.less";
import { useAppStore, useChatStore } from "../../../../shared/providers";
import SharedWithYouActiveIcon from "../../../../shared/icons/SharedWithYouActive.icon";
import SharedWithYouIcon from "../../../../shared/icons/SharedWithYou.icon";

export const SharingTools = () => {
    const { isSideBarOpen } = useAppStore();
    const { isSharingActive, setIsSharingActive } = useChatStore();
    const [isSideBarLiveToolsOpen, setIsSideBarLiveToolsOpen] = React.useState(true);

    const handleOpenSideBarLiveTools = () => {
        setIsSideBarLiveToolsOpen(!isSideBarLiveToolsOpen);
    };

    return (
        <div className={isSideBarOpen ? css.sidebar_open_live_tools : css.sidebar_live_tools}>
            <div className={css.live_tools_actions_section_name}>
                <div>Sharing Tools</div>
                <div
                    className={css.live_tools_show_actions_btn}
                    onClick={handleOpenSideBarLiveTools}
                >
                    {!isSideBarLiveToolsOpen ? "+" : "-"}
                </div>
            </div>

            {isSideBarLiveToolsOpen && (
                <div className={css.live_tools_actions_section_container}>
                    <div
                        className={css.sidebar_live_tools_action_container}
                        onClick={() => setIsSharingActive(true)}
                        data-active={isSharingActive}
                    >
                        <button className={css.sidebar_controls_btn}>
                            <SharedWithYouIcon />
                        </button>
                        <div className={css.sidebar_live_tools_action_btn_tooltip}>
                            Sharing Content
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
