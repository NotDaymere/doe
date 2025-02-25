import { FC } from "react";
import css from "./Title.module.less";

interface IProps {
    title: string | undefined;
}

const Title: FC<IProps> = ({ title }) => {
    const fileType = title?.split(".").pop() || "";
    const fileName = title?.substring(0, title?.lastIndexOf("."));

    return (
        <>
            {title ? (
                <div className={css.fileTitle}>
                    <span className={css.title}>{fileName}</span>
                    <span className={css.ext}>.{fileType}</span>
                </div>
            ) : null}
        </>
    );
};

export default Title;
