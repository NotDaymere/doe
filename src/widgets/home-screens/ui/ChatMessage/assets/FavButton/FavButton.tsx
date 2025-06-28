import React from "react";
import { useChatStore } from "../../../../../../shared/providers";
import { IMessage } from "../../../../../../shared/types/Message";
import Favorite from "./Favorite";

interface FavButtonProps {
    data: IMessage;
    className?: string;
}

export const FavButton = ({data, className}: FavButtonProps) => {

    const {setMessageLike} = useChatStore();

    const handleLike = () => {
        setMessageLike(data.id, !data.isLiked);
    };

    return (
        <Favorite onClick={handleLike} isLiked={data.isLiked} className={className} />
    );
}