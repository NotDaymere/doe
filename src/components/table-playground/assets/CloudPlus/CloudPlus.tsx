import { ReactComponent as CloudPlusIcon } from "src/assets/icons/cloud-plus.svg"
import { Button } from "antd";
import './CloudPlus.less';

function CloudPlus() {
    return (
        <Button className={"cloud-plus-button"} >
            <CloudPlusIcon className ={"cloud-plus-icon"}/>
        </Button>
    )
}
export default CloudPlus
