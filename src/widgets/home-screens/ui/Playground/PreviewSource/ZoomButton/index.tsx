import { FC } from "react";
import ZoomIcon from "src/shared/icons/Zoom.icon";
import css from "./ZoomButton.module.less";

interface IProps {
    onZoomClick: () => void;
}

const ZoomButton: FC<IProps> = ({ onZoomClick }) => (
    <div className={css.zoom}>
        <button onClick={onZoomClick}>
            <ZoomIcon width={18} height={18} className={css.icon} />
        </button>
    </div>
);

export default ZoomButton;
