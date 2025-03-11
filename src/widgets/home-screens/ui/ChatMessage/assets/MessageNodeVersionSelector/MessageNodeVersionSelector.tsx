import React from "react";
import css from "./MessageNodeVersionSelector.module.less";
import { IMessage } from "../../../../../../shared/types/Message";
import { useChatStore } from "../../../../../../shared/providers";
import ArrowLeftIcon from "../../../../../../shared/icons/ArrowLeft.icon";
import ArrowRightIcon from "../../../../../../shared/icons/ArrowRight.icon";

interface MessageNodeVersionSelectorProps {
    message: IMessage;
}

export const MessageNodeVersionSelector: React.FC<MessageNodeVersionSelectorProps> = ({ message }) => {
    const { getCurrentMessageNodeVersionInfo, changeCurrentNodeVersion } = useChatStore();
    const versionInfo = getCurrentMessageNodeVersionInfo(message);

    if (!versionInfo || versionInfo.totalVersions <= 1) {
        return null;
    }

    const handlePrevVersion = () => {
        if (versionInfo.currentVersion > 0) {
            changeCurrentNodeVersion(message, "prev");
        }
    };

    const handleNextVersion = () => {
        if (versionInfo.currentVersion < versionInfo.totalVersions - 1) {
            changeCurrentNodeVersion(message, "next");
        }
    };

    return (
        <div className={css.messageNodeSelectorContainer}>
            <button
                className={css.messageNodeButton}
                onClick={handlePrevVersion}
                disabled={versionInfo.currentVersion === 0}
            >
                <ArrowLeftIcon fill={"currentColor"}/>
            </button>
            <span className={css.messageNodeVersionText}>
                {`${versionInfo.currentVersion + 1} / ${versionInfo.totalVersions}`}
            </span>
            <button
                className={css.messageNodeButton}
                onClick={handleNextVersion}
                disabled={versionInfo.currentVersion === versionInfo.totalVersions - 1}
            >
                <ArrowRightIcon fill={"currentColor"}/>
            </button>
        </div>
    );
};
