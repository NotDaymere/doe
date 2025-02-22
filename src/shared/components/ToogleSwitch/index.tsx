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

// import React, { useState, ChangeEvent } from "react";
// import "./ToggleSwitch.css"; // Import your CSS file

// interface ToggleSwitchProps {
//     label: string;
//     initialChecked?: boolean;
//     onToggle?: (isChecked: boolean) => void;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, initialChecked = false, onToggle }) => {
//     const [isChecked, setIsChecked] = useState(initialChecked);

//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const checked = event.target.checked;
//         setIsChecked(checked);
//         onToggle?.(checked); // Call onToggle if provided, using optional chaining
//     };

//     return (
//         <div className="toggle-container">
//             <label className="toggle-label" htmlFor={label}>
//                 {label}
//             </label>
//             <div className="toggle-switch">
//                 <input type="checkbox" id={label} checked={isChecked} onChange={handleChange} />
//                 <span className="toggle-track"></span>
//             </div>
//         </div>
//     );
// };

// export default ToggleSwitch;
