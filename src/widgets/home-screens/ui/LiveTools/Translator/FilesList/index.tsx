import CheckFilledIcon from "src/shared/icons/CheckFilled.icon";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import css from "./FilesList.module.less";
import { FC } from "react";
import classNames from "classnames";

interface IProps {
    files: File[];
    isRotated: boolean;
    classes?: string;
}

const FilesList: FC<IProps> = ({ files, isRotated, classes }) => (
    <div className={css.filesList}>
        {files?.map((file, index) => (
            <div
                className={classNames(css.file, classes ? classes : null)}
                key={`${file.name}_${index}`}
            >
                <FileFilledIcon width={10} height={12} className={css.fileIcon} />
                <span className={classNames(css.fileName, { [css.fileNameShorten]: isRotated })}>
                    {file.name}
                </span>
                <CheckFilledIcon width={16} height={16} />
            </div>
        ))}
    </div>
);

export default FilesList;
