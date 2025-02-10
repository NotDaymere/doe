import { ReactComponent as PenIcon } from "src/assets/icons/pen.svg"
import { Button } from "antd";
import './Pen.less';

function Pen() {
    return <Button
        // onClick={onClick}
        className={"pen-button"}
        style={{

        }}> <PenIcon className ={"pen-icon"} /></Button>
}
export default Pen