import React from "react";
import { MagicMenuButton } from "../MagicMenuButton";
import UploadIcon from "../../../../../../shared/icons/Upload.icon";
import { FileWithId } from "../../../../lib/hooks/useDragFile";

interface MagicUploadFromDesktopProps {
    setActiveMenu: (active: boolean) => void;
    onUploadFiles?: (files: FileWithId[]) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
}

export const MagicUploadFromDesktop: React.FC<MagicUploadFromDesktopProps> = ({
                                                                                  setActiveMenu,
                                                                                  fileInputRef,
                                                                              }) => {
    const handleClick = () => {
        fileInputRef.current?.click();
        setActiveMenu(false);
    };

    return (
        <MagicMenuButton
            icon={<UploadIcon />}
            text="Upload from desktop"
            onClick={handleClick}
        />
    );
};
