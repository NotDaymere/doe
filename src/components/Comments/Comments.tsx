import { useEffect, useState } from "react";
import "./Comments.less";
import Filter from "./Components/Filter/Filter";
import Thread from "./Components/Thread/Thread";
import Menu from "./Components/Menu/Menu";
import { MOCKCOMMENTS } from "./Mock";

function Comments() {
  const [showFilter, setShowFilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className="Comment_Box"
      onClick={() => {
        showMenu ? setShowMenu(false) : null;
      }}
    >
      <div className="header">
        <div className="search">
          <img src="/icons/search.svg" alt="Search" />

          <input type="text" placeholder="Search" />
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={showFilter ? "active-filter" : ""}
        >
          <img src="/icons/filter.svg" className="filter-icon" alt="Filter" />
        </button>
        <button
          onClick={() => {
            setIsVisible(false);
          }}
        >
          <img src="/icons/close_2.svg" alt="Close" />
        </button>
      </div>
      {showFilter && <Filter />}
      <div className="body">
        <div className="comments_container">
          <div className="top">
            <div className="cp-header">
              <div className="left">
                <img className="profile" src="/profile_pic.png" alt="Profile" />
                <div className="profile-name-time">
                  <h4>John Doe</h4>
                  <p>Today, 9:41 AM</p>
                </div>
              </div>
              <div className="right">
                <img src="/icons/check.svg" alt="Check" />
                <button onClick={() => setShowMenu(!showMenu)}>
                  <img src="/icons/menu.svg" alt="Menu" />
                </button>
                {showMenu && <Menu />}
              </div>
            </div>
            <div className="cp-body">
              <p>This is your table looks like when it's in Doe Playground</p>
            </div>
            <div className="cp-footer">
              <input type="text" placeholder="Reply.." />
              <button>
                <img src="/icons/send.svg" alt="Send" />
              </button>
            </div>
          </div>

          <div className="">
            {MOCKCOMMENTS.map((comment: any, index: number) => {
              return <Thread key={index} comment={comment} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
