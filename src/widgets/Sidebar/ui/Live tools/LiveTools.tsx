import React from "react";
import css from "./LiveTools.module.less";
import TranslationIcon from "../../../../shared/icons/TranslateIcon";
import RecordIcon from "../../../../shared/icons/RecordIcon";
import ShareIcon from "../../../../shared/icons/ShareIcon";
import { useAppStore, useChatStore } from "../../../../shared/providers";
import { MODE } from "src/shared/types/Chat";
import TranslationActiveIcon from "src/shared/icons/TranslationActive.icon";
import TapeIcon from "../../../../shared/icons/Tape.icon";
import SharedWithYouActiveIcon from "../../../../shared/icons/SharedWithYouActive.icon";
import SharedWithYouIcon from "../../../../shared/icons/SharedWithYou.icon";


export const LiveTools = () => {

    const { isSideBarOpen } = useAppStore();
    const {mode, setMode, isSharingActive, setIsSharingActive} = useChatStore();
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
                        <button
                            className={css.sidebar_controls_btn}
                            onClick={() => setMode(MODE.TRANSLATION)}
                        >
                            {mode === MODE.TRANSLATION ? (
                                <TranslationIcon />
                            ) : (
                                <TranslationIcon />
                            )}
                        </button>
                        <div className={css.sidebar_live_tools_action_btn_tooltip}>
                            Translate Content
                        </div>
                    </div>
                    <div className={css.sidebar_live_tools_action_container}>
                        <button
                            className={css.sidebar_controls_btn}
                            onClick={() => setMode(MODE.RECORDING)}
                        >
                            {mode === MODE.RECORDING ? (
                                <RecordIcon className={css.activeTapeIcon} />
                            ) : (
                                <RecordIcon className={css.activeTapeIcon} />
                            )}
                        </button>
                        <div className={css.sidebar_live_tools_action_btn_tooltip}>
                            Listen and Transcribe
                        </div>
                    </div>

                    <div className={css.sidebar_live_tools_action_container}>
                        <button
                            className={css.sidebar_controls_btn}
                            onClick={() => setIsSharingActive(true)}
                        >
                            {isSharingActive ? <SharedWithYouActiveIcon /> : <SharedWithYouIcon />}
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