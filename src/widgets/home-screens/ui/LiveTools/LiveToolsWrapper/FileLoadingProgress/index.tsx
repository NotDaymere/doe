import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import css from "./FileLoadingProgress.module.less";

interface IProps {
    fileName: string | null;
    progress: number;
    isRotated: boolean;
}

const FileLoadingProgress: FC<IProps> = ({ fileName, progress, isRotated }) => {
    return (
        <div className={classNames(css.fileLoading)}>
            <FileFilledIcon width={10} height={12} />
            <div className={css.fileLoadingName}>
                <div className={css.fileInfo}>
                    <span className={isRotated ? css.fileNameShorten : ""}>{fileName}</span>
                    <span>{progress}%</span>
                </div>
                <div className={css.loadingProgress}>
                    <div className={css.progressBar} />
                    <div className={css.progress} style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};

export default FileLoadingProgress;
