import { ReactComponent as CloudPlusIcon } from "src/assets/icons/cloud-plus.svg";
import './CloudPlusButton.less';
import { useState } from "react";
import CloudActionsSection from "../../CloudActionsSection/CloudActionsSection";

function CloudPlusButton() {
    const [activeCloudPlus, setActiveCloudPlus] = useState(false);
    const handleCloudPlusOnClick = () => {
        setActiveCloudPlus(!activeCloudPlus);
    };

    return (
        <div className="cloud-plus-wrapper">
            <button onClick={handleCloudPlusOnClick} className="cloud-plus-button">
                <CloudPlusIcon className="cloud-plus-icon" />
            </button>
            {activeCloudPlus && <CloudActionsSection/>}
        </div>
    );
}

export default CloudPlusButton;
