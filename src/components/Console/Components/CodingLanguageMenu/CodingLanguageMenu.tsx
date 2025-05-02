import "./CodingLanguageMenu.less";
import { forwardRef } from "react";

const CodingLanguageMenu = forwardRef((props: { onSelectLanguage?: () => void }, ref) => {
    const { onSelectLanguage } = props;

    const handleButtonClick = () => {
        if (onSelectLanguage) {
            onSelectLanguage();
        }
    };

    return (
        <div ref={ref} className="coding-language-menu">
            <button className="menu_button active" onClick={handleButtonClick}>
                Python <span className=""></span>
            </button>
            <button className="menu_button" onClick={handleButtonClick}>
                BatchBat <span className=""></span>
            </button>
            <button className="menu_button" onClick={handleButtonClick}>
                C(c) <span className=""></span>
            </button>
            <button className="menu_button" onClick={handleButtonClick}>
                C# (csharp) <span className=""></span>
            </button>
            <button className="menu_button" onClick={handleButtonClick}>
                C++ (cpp) <span className=""></span>
            </button>
        </div>
    );
});

export default CodingLanguageMenu;
