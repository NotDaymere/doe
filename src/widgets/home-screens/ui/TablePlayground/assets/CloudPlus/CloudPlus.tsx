import { ReactComponent as CloudPlusIcon } from "src/assets/icons/cloud-plus.svg"
import './CloudPlus.less';
import { useState } from "react";
import TextColumns from "./TextColumns/TextColumns";

function CloudPlus() {
    const [activeCloudPlus, setActiveCloudPlus] = useState(false);
    const any = () => {
        setActiveCloudPlus(!activeCloudPlus);
    }
    return (
        <div className= 'cloud-plus-container' >
            <button
                onClick={any}
                className={"cloud-plus-button"} >
                <CloudPlusIcon className ={"cloud-plus-icon"}/>
            </button>
            {activeCloudPlus && (<TextColumns />)}
        </div>

    )
}
export default CloudPlus
