import CustomBarChartTwo from "../../../PreviewChart/Component/CustomChartBar/CustomChartBarTwo";
import Databox from "../Databox/Databox";
import CustomChartBar from "./components/CustomBarChart";
import "./UploadChartBody.less";
import { useRef } from "react";

function UploadChartBody() {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("File uploaded:", file.name);
        }
    };

    return (
        <div className="edit_contanier">
            <div className="left">
                <p>Edit Data</p>
                <Databox title="BCM (projected)" color="#FFDB65" valueNumber={0} />
                <Databox title="o1" color="#BEE380" valueNumber={0} />
                <Databox title="o1" color="#BEE380" valueNumber={0} />
                <Databox title="o1-ioi" color="#FFB364" valueNumber={0} />
                <div className="scalebox">
                    <p>Scale</p>
                    <div className="numbers">
                        <p>0</p>
                        <p>500</p>
                        <p>1500</p>
                        <p>2000</p>
                    </div>
                </div>
                <button onClick={handleButtonClick}>
                    <img src="/img/icons/file_upload.svg" alt="Upload Icon" /> Upload your data
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </div>
            <div className="right">
                <CustomChartBar />
            </div>
        </div>
    );
}
export default UploadChartBody;
