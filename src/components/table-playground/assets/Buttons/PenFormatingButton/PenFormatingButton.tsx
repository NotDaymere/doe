import { ReactComponent as PenIcon } from "src/assets/icons/pen.svg"
import { Button } from "antd";
import './PenFormatingButton.less';
interface IPen {
    onClick: () => void,
    isActive: string | null
}
function PenFormatingButton({ onClick , isActive }: IPen ) {
    return (
    <Button
        onClick={onClick}
        className={`pen-button ${isActive ? "pen-button-active" : ""}`}
    >
        <PenIcon className={"pen-icon"} />
    </Button>
    )
}
export default PenFormatingButton