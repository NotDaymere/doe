import { useChatStore } from "../../../../../../shared/providers";
import React from "react";
import { MagicMenuButton } from "../MagicMenuButton";
import UploadIcon from "../../../../../../shared/icons/Upload.icon";

interface Props {}

export const MagicUploadFromDesktop: React.FC<Props> = (props) => {
    const { setIsUploadFileChatMode, isUploadFileChatMode } = useChatStore();

    const activePanelUploadMode = () => {
        setIsUploadFileChatMode(!isUploadFileChatMode)
    };

    return (
            <MagicMenuButton
                icon={<UploadIcon/>}
                text="Upload from desktop"
                onClick={activePanelUploadMode}
            />
    );
};