import { useEffect, useState, useRef } from "react";
import "./Comments.less";
import Filter from "./Components/Filter/Filter";
import Thread from "./Components/Thread/Thread";
import Menu from "./Components/Menu/Menu";
import { MOCKCOMMENTS } from "./Mock";

function Comments() {
    const [showFilter, setShowFilter] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Create refs for the filter button and filter container
    const filterButtonRef = useRef<HTMLButtonElement>(null);
    const filterContainerRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside the filter
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // If filter is not shown, no need to do anything
            if (!showFilter) return;

            // Check if the click is outside both the filter button and filter container
            const isClickOutsideFilter =
                filterContainerRef.current &&
                !filterContainerRef.current.contains(event.target as Node) &&
                filterButtonRef.current &&
                !filterButtonRef.current.contains(event.target as Node);

            // Close the filter if clicked outside
            if (isClickOutsideFilter) {
                setShowFilter(false);
            }
        }

        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFilter]);

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
                    <img src="/img/icons/search.svg" alt="Search" />

                    <input type="text" placeholder="Search" />
                </div>
                <button
                    ref={filterButtonRef}
                    onClick={() => setShowFilter(!showFilter)}
                    className={showFilter ? "active-filter" : ""}
                >
                    <img src="/img/icons/filter.svg" className="filter-icon" alt="Filter" />
                </button>
                <button
                    onClick={() => {
                        setIsVisible(false);
                    }}
                >
                    <img src="/img/icons/close_2.svg" alt="Close" />
                </button>
                {showFilter && (
                    <div ref={filterContainerRef} className="filterdiv">
                        <Filter />
                    </div>
                )}
            </div>

            <div className="body">
                <div className="comments_container">
                    <div className="top">
                        <div className="cp-header">
                            <div className="left">
                                <img className="profile" src="/img/profile_pic.png" alt="Profile" />
                                <div className="profile-name-time">
                                    <h4>John Doe</h4>
                                    <p>Today, 9:41 AM</p>
                                </div>
                            </div>
                            <div className="right">
                                <img src="/img/icons/check.svg" alt="Check" />
                                <button onClick={() => setShowMenu(!showMenu)}>
                                    <img src="/img/icons/menu.svg" alt="Menu" />
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
                                <img src="/img/icons/send.svg" alt="Send" />
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
