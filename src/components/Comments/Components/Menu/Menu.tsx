import "./Menu.less";

function Menu() {
  return (
    <div className="menuBoxContainer">
      <button>
        <img src="/img/icons/edit_icon.svg" /> Edit
      </button>
      <button>
        <img src="/img/icons/link_icon.svg" />
        Copy link
      </button>
      <button>
        <img src="/img/icons/delete_icon.svg" />
        Delete
      </button>
    </div>
  );
}

export default Menu;
