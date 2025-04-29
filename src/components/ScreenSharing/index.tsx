import ReactDOM from "react-dom";
import { ReactComponent as ScreensIcon } from "src/assets/icons/screens.svg";
import notebook from "src/assets/images/notebook.png";
import css from "./ScreenSharing.module.less";

interface ScreenSharingProps {
    step: number;
}

export const ScreenSharing = ({ step }: ScreenSharingProps) => {
    if (step !== 53) return null;

    return (
        <>
            <div className={css.screen_sharing}>
                <img src={notebook} alt="Notebook image" className={css.screen_sharing_img} />
            </div>
            {ReactDOM.createPortal(
                <div className={css.screen_sharing_modal}>
                    <ScreensIcon /> Screen Sharing is On
                </div>,
                document.body
            )}
        </>
    );
};
