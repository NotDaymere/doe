import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg"
import { Button } from "antd";
import './DecreasePlayground.less';

function DecreasePlayground() {
    return <Button   // onClick={onClick}
        className={"decrease-playground-button"}
        style={{

        }}> <DecreasePlaygroundIcon className ={"decrease-playground-icon"} /></Button>
}
    export default DecreasePlayground