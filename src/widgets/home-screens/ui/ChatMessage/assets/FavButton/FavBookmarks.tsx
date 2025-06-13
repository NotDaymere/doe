import React from "react";
import Favorite from "./Favorite";
import { IBookmark } from "../../../../../../shared/types/Bookmark";
import { useChatStore } from "../../../../../../shared/providers";

interface FavButtonProps {
    bookmark: IBookmark;
    className?: string;
}

export const FavBookmarks = ({bookmark, className}: FavButtonProps) => {
    const { savedBookmarks, addBookmark, deleteBookmark } = useChatStore();

    const isLiked = savedBookmarks.some(b => b.id === bookmark.id);

    const handleLike = () => {
        if (isLiked) {
            deleteBookmark(bookmark.id)
        } else {
            addBookmark(bookmark)
        }
    };

    return (
        <Favorite onClick={handleLike} isLiked={isLiked} className={className} />
    );
}