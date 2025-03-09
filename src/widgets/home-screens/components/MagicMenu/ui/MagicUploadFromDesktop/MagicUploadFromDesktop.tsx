import { useChatStore } from "../../../../../../shared/providers";
import React, { useRef } from "react";
import { MagicMenuButton } from "../MagicMenuButton";
import UploadIcon from "../../../../../../shared/icons/Upload.icon";

interface MagicUploadFromDesktopProps {
    setActiveMenu: (active: boolean) => void;
}

export const MagicUploadFromDesktop: React.FC<MagicUploadFromDesktopProps> = ({setActiveMenu}) => {
    const { setIsUploadFileChatMode, isUploadFileChatMode } = useChatStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
        setIsUploadFileChatMode(!isUploadFileChatMode)
        setActiveMenu(false);
    };

    return (
        <>
            <MagicMenuButton
                icon={<UploadIcon />}
                text="Upload from desktop"
                onClick={handleClick}
            />
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
            />
        </>
    );
};