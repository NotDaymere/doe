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
    const [showTooltips, setShowTooltips] = React.useState(false);


    const handleOpenSideBarLiveTools = () => {
        setIsSideBarLiveToolsOpen(!isSideBarLiveToolsOpen);
    }

    React.useEffect(() => {
        if (isSideBarOpen) {
            setShowTooltips(true);
            return () => {};
        } else {
            const timer = setTimeout(() => setShowTooltips(false), 100);
            return () => clearTimeout(timer);
        }
    }, [isSideBarOpen]);


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

                    <div className={css.sidebar_live_tools_action_container}
                         onClick={() => setMode(MODE.TRANSLATION)}>
                        <button
                            className={css.sidebar_controls_btn}
                        >
                            {mode === MODE.TRANSLATION ? (
                                <TranslationIcon fill1={'#FFD632'} fill2={'#AC7CFF'} isFill={true} />
                            ) : (
                                <TranslationIcon fill="currentColor" isFill={false} />
                            )}
                        </button>
                        <div className={css.sidebar_live_tools_action_btn_tooltip}>
                            <span>Translate</span> <span>Content</span>
                        </div>
                    </div>
                    <div className={css.sidebar_live_tools_action_container}
                         onClick={() => setMode(MODE.RECORDING)}>
                        <button
                            className={css.sidebar_controls_btn}
                        >
                            {mode === MODE.RECORDING ? (
                                <RecordIcon fill={'#FF4646'} />
                            ) : (
                                <RecordIcon fill="currentColor" />
                            )}
                        </button>
                            <div className={css.sidebar_live_tools_action_btn_tooltip}>
                                <span>Listen</span><span>and</span><span>Transcribe</span>
                            </div>
                    </div>
                </div>
            )}
        </div>
    )
}