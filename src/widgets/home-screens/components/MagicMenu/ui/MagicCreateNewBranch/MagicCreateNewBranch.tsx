import clsx from "clsx";
import React from "react";
import { MagicMenuButton } from "..";
import BranchIcon from "../../../../../../shared/icons/Branch.icon";
import css from "./MagicCreateNewBranch.module.less";
import { useChatStore } from "../../../../../../shared/providers";

interface Props {}

export const MagicCreateNewBranch: React.FC<Props> = (props) => {
    const { setIsCreateBranchChatMode, isCreateBranchChatMode } = useChatStore();

    const createBranch = () => {
        setIsCreateBranchChatMode(!isCreateBranchChatMode)
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
