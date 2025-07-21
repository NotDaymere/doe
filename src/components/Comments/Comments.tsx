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
    const { isOpen, comment, comments, setComment, closeComments } = useCommentWindowStore();
    const [showFilter, setShowFilter] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const filterButtonRef = useRef<HTMLButtonElement>(null);
    const filterContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
       
        function handleClickOutside(event: MouseEvent) {
          
            if (!showFilter) return;

            
            const isClickOutsideFilter =
                filterContainerRef.current &&
                !filterContainerRef.current.contains(event.target as Node) &&
                filterButtonRef.current &&
        
                !filterButtonRef.current.contains(event.target as Node);

           
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
        <div className="CommentsOverlayContainer">
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
                        closeComments(comment?.id);
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
  {comments.length > 0 ? (
    <div className="comments_container">
      {comments.map((c: any, index: number) => (
        <div key={index}>
          <CommentContainer
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            commmentFromProp={c}
          />
          <div>
            {c.replies?.map((reply: any, idx: number) => (
              <Thread key={idx} comment={reply} />
            ))}
          </div>
        </div>
    
    ))}
    </div>
  ) : (
    <p>No comments yet.</p>
  )}
</div>
        </div>
   
        </div>
    );
}
export default Comments;