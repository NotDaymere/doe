import { ReactComponent as Stars } from "src/assets/icons/stars.svg";
import { ReactComponent as Plus } from "src/assets/icons/Plus.svg";
import { ReactComponent as Code } from "src/assets/icons/code.svg";
import ArrowDownIcon from "src/shared/icons/ArrowDown.icon";
import ArrowUpIcon from "src/shared/icons/ArrowUp.icon";
import "../../../../../../../../../../CloudActionsSectionCode.less";
import { useChatStore } from "../../../../../../shared/providers";



function CloudActionsSectionCode() {
    const { playgroundFullscreen } = useChatStore();

    return (
        <div
            className="text-columns-container"
            style={{
                right: playgroundFullscreen ? 0 : 'default',
                left: !playgroundFullscreen ? 0 : 'default',
            }}
        >
            <div className="text-columns-button justify-space-between">
                <p className={"text-columns-button-p"}>
                    Add a <span className={"text-columns-button-span"}>Prompt</span>
                </p>
                <button className="button-plus">
                    <Plus className="plus-icon" />
                </button>
            </div>
            <div className="text-columns-button text-columns-border-top justify-flex-start">
                <Stars />
                <p className={"text-columns-button-p"}>
                    <span className={"text-columns-button-span"}>Change</span>
                </p>
                <div className="text-columns-button-span justify-space-between">
                <button>
                    <ArrowDownIcon />
                </button>
                </div>
            </div>
            <div className="text-columns-button justify-flex-start text-columns-border-top">
                <Code />
                <p className={"text-columns-button-p"}>
                     <span className={"text-columns-button-span "}>Code</span>
                </p>
                <div className={"text-columns-button justify-space-between"}>
                <button>
                    <ArrowUpIcon />
                </button>
                </div>
            </div>
        </div>
    );
}
export default CloudActionsSectionCode;

