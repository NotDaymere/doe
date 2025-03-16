import { CSSTransition } from "react-transition-group";
import { FC, useEffect, useState } from "react";
import { useClickOut } from "src/shared/hooks/useClickOut";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import css from "./LangPopup.module.less";

interface IProps {
    text: string;
    onChange: (e: any) => void;
    isActive: boolean;
    setIsActive: (value: boolean) => void;
}

const LangPopup: FC<IProps> = ({ text, onChange, isActive, setIsActive }) => {
    const [showPopup, setShowPopup] = useState(false);

    const ref = useClickOut({
        handler: () => setIsActive(false),
    });

    useEffect(() => {
        if (isActive) {
            setShowPopup(true);

            return () => {
                setShowPopup(false);
                setIsActive(false);
            };
        } else {
            setShowPopup(false);
        }
    }, [isActive]);

    return (
        <CSSTransition in={showPopup} timeout={500} classNames={css} unmountOnExit>
            <div className={css.langPopup} ref={ref}>
                <textarea onChange={onChange} value={text} className={css.textarea} />
                <div className={css.attachmentIcon}>
                    <AttachmentIcon width={15} height={15} />
                </div>
            </div>
        </CSSTransition>
    );
};

export default LangPopup;
