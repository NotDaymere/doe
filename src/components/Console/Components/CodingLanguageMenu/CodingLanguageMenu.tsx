import "./CodingLanguageMenu.less";

function CodingLanguageMenu() {
  return (
    <div className="coding-language-menu">
      <button className="menu_button active">
        Python <span className=""></span>
      </button>
      <button className="menu_button">
        BatchBat <span className=""></span>
      </button>
      <button className="menu_button">
        C(c) <span className=""></span>
      </button>
      <button className="menu_button">
        C# (csharp) <span className=""></span>
      </button>
      <button className="menu_button">
        C++ (cpp) <span className=""></span>
      </button>
    </div>
  );
}

export default CodingLanguageMenu;
