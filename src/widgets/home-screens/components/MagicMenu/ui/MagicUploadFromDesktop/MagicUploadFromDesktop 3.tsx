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
        if (fileInputRef.current) {
            fileInputRef.current.click();
            console.log("click() method called");
            setTimeout(() => {
                setActiveMenu(false);
            }, 300);
        } else {
            console.warn("miss file ref");
        }
    };

    return (
        <MagicMenuButton
            icon={<UploadIcon />}
            text="Upload from desktop"
            onClick={handleClick}
        />
    );
};
