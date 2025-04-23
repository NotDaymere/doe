import "./CodingLanguageMenu.less";
import { forwardRef } from "react";

// Add onSelectLanguage prop to the component
const CodingLanguageMenu = forwardRef((props: { onSelectLanguage?: () => void }, ref) => {
    const { onSelectLanguage } = props;

    // Function to handle button click
    const handleButtonClick = () => {
        // Call the onSelectLanguage function if it exists
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

//CodingLanguageMenu.displayName = "CodingLanguageMenu";

export default CodingLanguageMenu;
