import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import css from "./FileUploader.module.less";

interface IProps {
    fileName: string;
    progress: number;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const FileUploader: FC<IProps> = ({ fileName, progress, isActive, setIsActive }) => {
    const [showFileUploader, setShowFileUploader] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShowFileUploader(true);

            return () => {
                setShowFileUploader(false);
                setIsActive(false);
            };
        } else {
            setShowFileUploader(false);
            setIsActive(false);
        }
    }, [isActive]);

    return (
        <CSSTransition in={showFileUploader} timeout={500} classNames={css} unmountOnExit>
            <div className={classNames(css.fileLoading)}>
                <FileFilledIcon width={10} height={12} />
                <div className={css.fileLoadingName}>
                    <div className={css.fileInfo}>
                        <span>{fileName}</span>
                        <span>{progress}%</span>
                    </div>
                    <div className={css.loadingProgress}>
                        <div className={css.progressBar} />
                        <div className={css.progress} style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default FileUploader;
