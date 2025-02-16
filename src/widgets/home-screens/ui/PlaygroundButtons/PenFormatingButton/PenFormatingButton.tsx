import { ReactComponent as PenIcon } from "src/assets/icons/pen.svg"
import './PenFormatingButton.less';
interface IPen {
    onClick: () => void,
    isActive: string | null
}
function PenFormatingButton({ onClick , isActive }: IPen ) {
    return (
    <button
        onClick={onClick}
        className={`pen-button ${isActive ? "pen-button-active" : ""}`}
    >
        <PenIcon className={"pen-icon"} />
    </button>
    )
}
export default PenFormatingButton