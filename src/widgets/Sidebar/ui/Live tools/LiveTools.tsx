import React from "react";
import css from "./LiveTools.module.less";
import TranslateIcon from "../../../../shared/icons/TranslateIcon";
import RecordIcon from "../../../../shared/icons/RecordIcon";
import ShareIcon from "../../../../shared/icons/ShareIcon";
import { useAppStore } from "../../../../shared/providers";

export const LiveTools = () => {

    const { isSideBarOpen } = useAppStore();
    const [isSideBarLiveToolsOpen, setIsSideBarLiveToolsOpen] = React.useState(true);

    const handleOpenSideBarLiveTools = () => {
        setIsSideBarLiveToolsOpen(!isSideBarLiveToolsOpen);
    }

    return (
        <div className={isSideBarOpen ? css.sidebar_open_live_tools : css.sidebar_live_tools}>

            <div className={css.live_tools_actions_section_name}>
                <div>Live tools</div>
                <div
                    className={css.live_tools_show_actions_btn}
                    onClick={handleOpenSideBarLiveTools}>
                    {!isSideBarLiveToolsOpen ? "+" : "-"}
                </div>
            </div>

            {isSideBarLiveToolsOpen && (
                <div className={css.live_tools_actions_section_container}>

                    <div className={css.sidebar_live_tools_action_container}>
                        <button className={css.live_tools_menu_action_btn}>
                            <TranslateIcon fill="currentColor" width={23} height={17} />
                        </button>
                        <div className={css.sidebar_live_tools_action_btn_tooltip}>
                            Translate Content
                        </div>
                    </div>

                    <div className={css.sidebar_live_tools_action_container}>
                        <button className={css.live_tools_menu_action_btn}>
                            <RecordIcon fill="currentColor" width={20} height={10} />
                        </button>
                        <div className={css.sidebar_live_tools_action_btn_tooltip}>
                            Listen and Transcribe
                        </div>
                    </div>

                    <div className={css.sidebar_live_tools_action_container}>
                        <button className={css.live_tools_menu_action_btn}>
                            <ShareIcon fill="currentColor" width={25} height={19} />
                        </button>
                        <div className={css.sidebar_live_tools_action_btn_tooltip}>
                            Sharing Content
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}