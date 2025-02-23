import { ChangeEvent, FC } from "react";
import css from "./ToggleSwitch.module.less";

interface IProps {
    label: string;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch: FC<IProps> = ({ label, checked, onChange }) => (
    <div className={css.toggleContainer}>
        <label className={css.toggleLabel} htmlFor={label}>
            {label}
        </label>
        <div className={css.toggleSwitch}>
            <input type="checkbox" id={label} checked={checked} onChange={onChange} />
            <span className={css.toggleTrack}></span>
        </div>
    </div>
);

export default ToggleSwitch;
