import React, { FC, useRef, useState } from "react";
import { IPreviewPlayground } from "src/shared/types/Playground";
import ArrowRightUpIcon from "src/shared/icons/ArrowRightUp.icon";
import ExpandDoubleIcon from "src/shared/icons/ExpandDouble.icon";
import Modal from "src/shared/components/Modal";
import Preview from "./Preview";
import "@react-pdf-viewer/core/lib/styles/index.css";

import css from "./PreviewSource.module.less";
import classNames from "classnames";
import Title from "./Title";
import Pagination from "./Pagination";
import ZoomButton from "./ZoomButton";

const PreviewSource: FC<IPreviewPlayground> = ({ type, data, title }) => {
    const fileType = data?.split(".").pop() || "";

    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pageRefs = useRef<any>({});
    const [pagesDocsNum, setPagesDocsNum] = useState<number>(0);
    const [currentDocxPage, setCurrentDocxPage] = useState<number>(0);
    const [docxScale, setDocxScale] = useState(1);
    const [scale, setScale] = useState(1);

    const handleOpenInNewWindowClick = (e: any) => {
        e.stopPropagation();
        window.open(data, "_blank");
    };

    const renderOpenInNewWindowButtonClick = () => (
        <React.Fragment>
            {isHovered && (
                <button
                    className={css.openButton}
                    rel={"noreferrer"}
                    onClick={(e) => handleOpenInNewWindowClick(e)}
                >
                    <ArrowRightUpIcon width={16} height={16} />
                    <span>Open in new window</span>
                </button>
            )}
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={css.previewSource}
                id={"previewSource"}
            >
                <div className={css.preview}>
                    <Preview
                        type={type}
                        url={data}
                        isModalView={false}
                        pageRefs={pageRefs}
                        setPagesDocsNum={setPagesDocsNum}
                        setCurrentDocxPage={setCurrentDocxPage}
                        docxScale={docxScale}
                        setScale={setScale}
                        scale={scale}
                    />
                    {type !== "web" && (
                        <button className={css.expandView} onClick={() => setIsModalOpen(true)}>
                            <ExpandDoubleIcon width={20} height={20} />
                        </button>
                    )}

                    {renderOpenInNewWindowButtonClick()}
                </div>
            </div>
            <div className={css.modal}>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    showScroll={fileType === "txt"}
                    classes={classNames(
                        fileType === "docx" ? `${css.flex}` : "",
                        fileType === "pdf" && `${css.modalDocPreview}`,
                        fileType === "pdf" ? `${css.pdf}` : `${css.content}`,
                        type !== "docs" && `${css.modalWebPreview}`
                    )}
                >
                    <Preview
                        type={type}
                        url={data}
                        isModalView={true}
                        title={title}
                        pageRefs={pageRefs}
                        setPagesDocsNum={setPagesDocsNum}
                        setCurrentDocxPage={setCurrentDocxPage}
                        docxScale={docxScale}
                        setScale={setScale}
                        scale={scale}
                    />
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default PreviewSource;
