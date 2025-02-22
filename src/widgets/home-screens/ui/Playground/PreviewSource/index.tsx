import { FC, useState } from "react";
import { IPreviewPlayground } from "src/shared/types/Playground";
import ArrowRightUpIcon from "src/shared/icons/ArrowRightUp.icon";
import Modal from "src/shared/components/Modal";
import Preview from "./Preview";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import css from "./PreviewSource.module.less";
import ExpandDoubleIcon from "src/shared/icons/ExpandDouble.icon";

const PreviewSource: FC<IPreviewPlayground> = ({ type, data, title }) => {
    const fileType = data?.split(".").pop() || "";

    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenInNewWindowClick = (e: any) => {
        e.stopPropagation();
        window.open(data, "_blank");
    };

    const renderOpenInNewWindowButtonClick = () => (
        <>
            {isHovered && (
                <button
                    className={css.openButton}
                    rel="noreferrer"
                    onClick={(e) => handleOpenInNewWindowClick(e)}
                >
                    <ArrowRightUpIcon width={16} height={16} />
                    <span>Open in new window</span>
                </button>
            )}
        </>
    );

    return (
        <>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={css.previewSource}
            >
                <Preview type={type} url={data} isModalView={false} />
                {type !== "web" && (
                    <button className={css.expandView} onClick={() => setIsModalOpen(true)}>
                        <ExpandDoubleIcon width={20} height={20} />
                    </button>
                )}

                {renderOpenInNewWindowButtonClick()}
            </div>
            <div className={css.modal}>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    showScroll={fileType === "txt"}
                >
                    <Preview type={type} url={data} isModalView={true} title={title} />
                </Modal>
            </div>
        </>
    );
};

export default PreviewSource;
