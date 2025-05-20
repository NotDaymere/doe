import { FC } from "react";
import classNames from "classnames";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import css from "./FileLoadingProgress.module.less";

interface IProps {
    fileName: string | null;
    progress: number;
    isRotated: boolean;
}

const FileLoadingProgress: FC<IProps> = ({ fileName, progress, isRotated }) => (
    <div className={css.fileLoading}>
        <FileFilledIcon width={10} height={12} />
        <div className={css.fileLoadingName}>
            <div className={css.fileInfo}>
                <span
                    className={classNames(css.fileName, {
                        [css.fileNameShorten]: isRotated,
                    })}
                >
                    {fileName}
                </span>
                <span className={css.progressText}>{Math.round(progress)}%</span>
            </div>
            <div className={css.progressWrapper}>
                <div className={css.progressBar} />
                <div className={css.progress} style={{ width: `${Math.round(progress)}%` }} />
            </div>
        </div>
    </div>
);

export default FileLoadingProgress;
