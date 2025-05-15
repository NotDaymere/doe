import { useEffect, useState, useRef } from "react";
import "./Comments.less";
import Filter from "./Components/Filter/Filter";
import Thread from "./Components/Thread/Thread";
import Menu from "./Components/Menu/Menu";

import { MOCKCOMMENTS } from "./Mock";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import CommentContainer from "./Components/Comment Container/CommentContainer";
import LinesIcon from "src/shared/icons/LinesIcon";
import clsx from "clsx";
import { Close } from "src/shared/icons/Close";
import SearchIcon from "src/shared/icons/SearchIcon";

function Comments() {
    const { isOpen, comment, setComment, closeComments } = useCommentWindowStore();

    const [showFilter, setShowFilter] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const filterButtonRef = useRef<HTMLButtonElement>(null);
    const filterContainerRef = useRef<HTMLDivElement>(null);

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

    if (!isOpen) return null;

    return (
        <div
            className="Comment_Box"
            onClick={() => {
                showMenu ? setShowMenu(false) : null;
            }}
        >
            <div className="header">
                <div className="search">
                    <SearchIcon />

                    <input type="text" placeholder="Search" />
                </div>
                <button
                    ref={filterButtonRef}
                    onClick={() => setShowFilter(!showFilter)}
                    className={clsx("action-button", showFilter ? "active" : "")}
                >
                    <LinesIcon />
                </button>
                <button
                    onClick={() => {
                        closeComments();
                    }}
                    className="action-button close"
                >
                    <Close />
                </button>
                {showFilter && (
                    <div ref={filterContainerRef} className="filterdiv">
                        <Filter />
                    </div>
                )}
            </div>

            <div className="body">
                <div className="comments_container">
                    {comment && <CommentContainer showMenu={showMenu} setShowMenu={setShowMenu} />}

                    <div className="">
                        {comment?.replies.map((comment: any, index: number) => {
                            return <Thread key={index} comment={comment} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;
