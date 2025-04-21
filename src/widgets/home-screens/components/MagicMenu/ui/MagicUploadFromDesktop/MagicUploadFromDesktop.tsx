import React from "react";
import { MagicMenuButton } from "../MagicMenuButton";
import UploadIcon from "../../../../../../shared/icons/Upload.icon";
import { FileWithId } from "../../../../lib/hooks/useDragFile";
import css from "./MagicUploadFromDesktop.module.less";
import MagicMenuUploadIcon from "../../../../../../shared/icons/MagicMenuUploadIcon";

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
            setTimeout(() => {
                setActiveMenu(false);
            }, 300);
        } else {
            console.warn("miss file ref");
        }
    };

    return (
        <div className={css.magic_button_container}
            onClick={handleClick}>
            <div className={css.magic_button_and_text}>
                <UploadIcon fill="currentColor" height={20} width={18} />
                <span>Upload from desktop</span>
            </div>
            <div className={css.upload_icon}>
                <MagicMenuUploadIcon fill="currentColor" height={12} width={8} />
            </div>


        </div>
    );
};
