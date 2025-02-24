import { ReactComponent as Stars } from "src/assets/icons/stars.svg";
import { ReactComponent as Plus } from "src/assets/icons/Plus.svg";
import { ReactComponent as Code } from "src/assets/icons/code.svg";
import ArrowDownIconCode from "src/shared/icons/ArrowDownIconCode";
import ArrowUpIconCode from "src/shared/icons/ArrowUpIconCode";
import "./CloudActionsSectionCode.less";
import { useChatStore, usePlaygroundStore } from "src/shared/providers";
import { useState } from "react";
import CloudActionsSection from "../../../CloudActionsSection/CloudActionsSection";



function CloudActionsSectionCode() {
    const { playgroundFullscreen } = useChatStore();
    const { setPlaygroundAction } = usePlaygroundStore();
    const [arrowDownActionOnClick, setArrowDownActionOnClick] = useState(false);
    const handleArrowDownActionOnClick = () => {
        setArrowDownActionOnClick(!arrowDownActionOnClick);
    };
    return (
        <div
            className="text-columns-container"
            style={{
                right: playgroundFullscreen ? 0 : 'default',
                left: !playgroundFullscreen ? 0 : 'default',
            }}
        >
            <div className={`text-columns-button justify-space-between ${arrowDownActionOnClick && "hover-zero"}`}>
                <p className={`text-columns-button-p ${arrowDownActionOnClick && "text-columns-button-p-repaint"}`}>
                    Add a <span className={"text-columns-button-span"}>Prompt</span>
                </p>
                <button className="button-plus"
                        onClick={() => setPlaygroundAction({type: 'prompt'})}
                >
                    <Plus className="plus-icon" />
                </button>
            </div>
            <div className={`text-columns-button justify-space-between ${arrowDownActionOnClick && "hover-zero"}`}>
                <div className="text-columns-button justify-flex-start text-columns-border-top padding-zero hover-zero">
                    <Stars />
                    <p className={`text-columns-button-p ${arrowDownActionOnClick && "text-columns-button-p-repaint"}`}>
                        <span className={"text-columns-button-span"}>Change</span>
                    </p>
                </div>
                <button className={"arrow-down-icon-button"}>
                    <ArrowDownIconCode />
                </button>
            </div>
            <div className={`text-columns-button justify-space-between ${arrowDownActionOnClick && "button-highlighted"}`}>
                <div className="text-columns-button justify-flex-start text-columns-border-top padding-zero hover-zero"
                >
                    <Code />
                    <p className={`text-columns-button-p`}>
                        <span className={"text-columns-button-span"}>Code</span>
                    </p>
                </div>
                <button className={"arrow-down-icon-button"}
                        onClick={handleArrowDownActionOnClick}>
                    {!arrowDownActionOnClick && <ArrowDownIconCode />}
                    {arrowDownActionOnClick && <ArrowUpIconCode />}
                </button>
            </div>
            {arrowDownActionOnClick && (
                <>
                    <div className="text-columns-button justify-flex-start text-columns-border-top hover-zero">
                        <p className={`text-columns-button-p ${arrowDownActionOnClick && "text-columns-button-p-repaint"}`}>
                            <span className={"text-columns-button-span "}>Port Code</span>
                        </p>
                    </div>
                    <div className="text-columns-button justify-flex-start text-columns-border-top hover-zero">
                        <p className={`text-columns-button-p ${arrowDownActionOnClick && "text-columns-button-p-repaint"}`}>
                            <span className={"text-columns-button-span "}>Add Comments</span>
                        </p>
                    </div>
                    <div className="text-columns-button justify-flex-start text-columns-border-top hover-zero">
                        <p className={`text-columns-button-p ${arrowDownActionOnClick && "text-columns-button-p-repaint"}`}>
                            <span className={"text-columns-button-span "}>Fix Bugs</span>
                        </p>
                    </div>
                    <div className="text-columns-button justify-flex-start text-columns-border-top hover-zero">
                        <p className={`text-columns-button-p ${arrowDownActionOnClick && "text-columns-button-p-repaint"}`}>
                            <span className={"text-columns-button-span "}>Add Logs</span>
                        </p>
                    </div>
                    <div className="text-columns-button justify-flex-start text-columns-border-top hover-zero">
                        <p className={`text-columns-button-p ${arrowDownActionOnClick && "text-columns-button-p-repaint"}`}>
                            <span className={"text-columns-button-span "}>Run Code</span>
                        </p>
                    </div>
                    <div className="text-columns-button justify-flex-start text-columns-border-top hover-zero">
                        <p className={`text-columns-button-p ${arrowDownActionOnClick && "text-columns-button-p-repaint"}`}>
                            <span className={"text-columns-button-span "}>Open in</span>
                        </p>
                        <p className={`text-columns-button-p`}>
                            <span className={"text-columns-button-span-vs-code "}>VSCode</span>
                        </p>
                        <img
                            className={"text-columns-button-img "}
                            src={'https://s3-alpha-sig.figma.com/img/2e29/6a8e/2ede94e3f76d7177d871bae03342e3c5?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U9YzCyISrsnqHQZFPmMLILmjQPX8FnDp75uaEq1RYLQNr5q68Bhrn7pDU-LtXFkBuCWcNGIf9PFpyU7XVZrHmFJVMXg7lER4dljIyOuEVOnn84-N7eyUNAJSnHcM--AdgfYr2RfebqpHyEvkYcJxx-ihp4AY9vj7-hg3mtqpIdNeveEz~KqP-vU0EeVEqGyT6v26G~0FQx5o0PxckHc3JNwFqRSvRkfhMQ5VBVeEdI5aMWUQnZbZ8dugaey7AzfguZxE9rauDdmrj55C4INxtNNcM5aO4Cs3YC~Sd~ZKxZsQPRc72Qhd1rJvHNlZf4iNgAnusUsINLTrEsX0kbTrtw__'}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
export default CloudActionsSectionCode;

