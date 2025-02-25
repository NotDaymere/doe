import "./Filter.less";

function Filter() {
  return (
    <div className="filterBoxContainer">
      <button>Sort by date</button>
      <button>Sort by unread</button>
      <button>Show Resolved</button>
    </div>
  );
}

export default Filter;
