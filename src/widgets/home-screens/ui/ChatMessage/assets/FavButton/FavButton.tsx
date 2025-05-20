import React from "react";
import clsx from "clsx";
import css from "./FavButton.module.less";
import FavoriteIcon from "../../../../../../shared/icons/Favorite.icon";
import { useChatStore } from "../../../../../../shared/providers";
import { IMessage } from "../../../../../../shared/types/Message";

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
        <button
            className={clsx(
                css.fav_button,
                { [css.fav_button_liked]: data.isLiked },
                className
            )}
            onClick={handleLike}
        >
            <FavoriteIcon fill="currentColor" />
        </button>
    );
}