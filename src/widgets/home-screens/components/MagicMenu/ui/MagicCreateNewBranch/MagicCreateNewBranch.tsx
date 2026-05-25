import clsx from "clsx";
import React from "react";
import { MagicMenuButton } from "..";
import BranchIcon from "../../../../../../shared/icons/Branch.icon";
import css from "./MagicCreateNewBranch.module.less";
import { useChatStore } from "../../../../../../shared/providers";

interface MagicCreateNewBranchProps {
    setActiveMenu: (active: boolean) => void;
}

export const MagicCreateNewBranch: React.FC<MagicCreateNewBranchProps> = ({ setActiveMenu }) => {
    const { setIsCreateBranchChatMode, isCreateBranchChatMode, savedPlaygrounds, setNoPlayground, closeSavedPlaygrounds, closeNoPlayground} = useChatStore();

    const createBranch = () => {
        setIsCreateBranchChatMode(!isCreateBranchChatMode);
        setActiveMenu(false);
        // hides all playgrounds and "see all" btn
        if (!isCreateBranchChatMode) {
            savedPlaygrounds.map(el => el.open = false);
            closeSavedPlaygrounds();
            closeNoPlayground();
        }
    };

    return (
        <div className={css.apps}>
            <MagicMenuButton
                className={clsx(css.apps_btn, isCreateBranchChatMode && css._active)}
                icon={<BranchIcon />}
                text="Create new branch"
                onClick={createBranch}
                hasMenu
            />
        </div>
    );
};
