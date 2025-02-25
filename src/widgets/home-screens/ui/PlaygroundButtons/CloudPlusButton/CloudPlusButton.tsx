import { ReactComponent as CloudPlusIcon } from "src/assets/icons/cloud-plus.svg";
import "./CloudPlusButton.less";
import { useState, useEffect, useRef } from "react";
import CloudActionsSection from "../../CloudActionsSection/CloudActionsSection";
import CloudActionsSectionCode from "../../CodePlayground/assets/CloudActionsSectionCode/CloudActionsSectionCode";


function CloudPlusButton({type}: {type: 'table' | 'code' }) {
    const [activeCloudPlus, setActiveCloudPlus] = useState(false);
    const cloudPlusRef = useRef<HTMLDivElement | null>(null);

    const handleCloudPlusOnClick = () => {
        setActiveCloudPlus((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (cloudPlusRef.current && !cloudPlusRef.current.contains(event.target as Node)) {
                setActiveCloudPlus(false);
            }
        }

        if (activeCloudPlus) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeCloudPlus]);

    return (
        <div className="cloud-plus-wrapper" ref={cloudPlusRef}>
            <button onClick={handleCloudPlusOnClick} className="cloud-plus-button">

                <CloudPlusIcon className="cloud-plus-icon" />
            </button>
            {activeCloudPlus &&
                <>
                    {type === 'table' && <CloudActionsSection />}
                    {type === 'code' && <CloudActionsSectionCode />}
                </>
            }
        </div>
    );
}

export default CloudPlusButton;
