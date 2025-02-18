import { ReactComponent as Stars } from "src/assets/icons/stars.svg";
import { ReactComponent as Plus } from "src/assets/icons/Plus.svg";
import "./CloudActionsSection.less";
import { useChatStore } from "src/shared/providers";

function CloudActionsSection() {
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
                    Change <span className={"text-columns-button-span"}>Writing Level</span>
                </p>
            </div>
            <div className="text-columns-button justify-flex-start text-columns-border-top">
                <Stars />
                <p className={"text-columns-button-p"}>
                    Make <span className={"text-columns-button-span "}>Content Length</span>
                </p>
            </div>
            <div className="text-columns-button text-columns-border-top justify-flex-start">
                <Stars />
                <p className={"text-columns-button-p"}>
                    Change <span className={"text-columns-button-span"}>Tone</span>
                </p>
            </div>
        </div>
    );
}

export default CloudActionsSection;
