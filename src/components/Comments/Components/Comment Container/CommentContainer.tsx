"use client";

import { useState, useRef, useEffect } from "react";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import Menu from "../Menu/Menu";
import "./CommentContainer.less";

export default function CommentContainer({ showMenu, setShowMenu }: any) {
    const { comment, addReply, updateComment, isResolved, toggleResolved } =
        useCommentWindowStore();

    const [replyMessage, setReplyMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(comment?.message || "");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const editAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                isEditing &&
                editAreaRef.current &&
                !editAreaRef.current.contains(event.target as Node)
            ) {
                // setIsEditing(false);
                handleSaveEdit();
            }
        }

        if (isEditing) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();

            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
        }
    }, [isEditing]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        handleSaveEdit();
    };

    const handleSaveEdit = () => {
        updateComment(editedMessage);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addReply(replyMessage);
            setReplyMessage("");
        }
    };

    return (
        <div className="top">
            <div className="cp-header">
                <div className="left">
                    <img className="profile" src="/img/profile_pic.png" alt="Profile" />
                    <div className="profile-name-time">
                        <h4>{comment?.user.name}</h4>
                        <p>{comment?.timestamp}</p>
                    </div>
                </div>
                <div className="right">
                    <button
                        onClick={() => {
                            toggleResolved();
                        }}
                    >
                        <img src={`/img/icons/check${isResolved ? "-on" : ""}.svg`} alt="Check" />
                    </button>
                    <button onClick={() => setShowMenu(!showMenu)}>
                        <img src="/img/icons/menu.svg" alt="Menu" />
                    </button>
                    {showMenu && (
                        <Menu
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            setShowMenu={setShowMenu}
                        />
                    )}
                </div>
            </div>
            <div className="cp-body">
                {isEditing ? (
                    <div ref={editAreaRef} className={isEditing ? "edit-mode" : ""}>
                        <textarea
                            ref={textareaRef}
                            onChange={(e) => setEditedMessage(e.target.value)}
                            className="edit-input"
                            autoFocus={isEditing}
                        >
                            {editedMessage}
                        </textarea>
                    </div>
                ) : (
                    <p>{/*comment?.message*/ editedMessage}</p>
                )}
            </div>
            <div className="cp-footer">
                <input
                    type="text"
                    value={replyMessage}
                    placeholder="Reply..."
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setReplyMessage(e.target.value)}
                />
                <button
                    onClick={() => {
                        addReply(replyMessage);
                        setReplyMessage("");
                    }}
                >
                    <img src="/img/icons/send.svg" alt="Send" />
                </button>
            </div>
        </div>
    );
}
