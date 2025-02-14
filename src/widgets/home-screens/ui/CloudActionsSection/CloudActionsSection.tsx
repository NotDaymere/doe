import { ReactComponent as Stars } from "src/assets/icons/stars.svg";
import { ReactComponent as Plus } from "src/assets/icons/Plus.svg";
import { Button } from "antd";
import "./CloudActionsSection.less";

function CloudActionsSection() {
    return (
        <div className="text-columns-container">
            <div className="text-columns-button justify-space-between">
                <p className={"text-columns-button-p"}>
                    Add a <span className={"text-columns-button-span"}>Prompt</span>
                </p>
                <Button className="button-plus">
                    <Plus className="plus-icon" />
                </Button>
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
