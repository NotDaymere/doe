import CheckFilledIcon from "src/shared/icons/CheckFilled.icon";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import css from "./FilesList.module.less";
import { FC } from "react";

interface IProps {
    files: File[];
}

const FilesList: FC<IProps> = ({ files }) => (
    <div className={css.filesList}>
        {files?.map((file, index) => (
            <div className={css.file} key={`${file.name}_${index}`}>
                <FileFilledIcon width={10} height={12} className={css.fileIcon} />
                {file.name}
                <CheckFilledIcon width={16} height={16} />
            </div>
        ))}
    </div>
);

export default FilesList;
