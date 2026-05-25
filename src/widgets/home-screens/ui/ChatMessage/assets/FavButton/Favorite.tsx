import React from "react";
import FavoriteIcon from "../../../../../../shared/icons/Favorite.icon";
import clsx from "clsx";
import css from "./FavButton.module.less";



interface Props {
    isLiked?: boolean;
    className?: string;
    onClick: () => void;
}

 const Favorite = ({isLiked, className, onClick}: Props) => {
    return (
        <button
            className={clsx(
                css.fav_button,
                { [css.fav_button_liked]: isLiked },
                className
            )}
            onClick={onClick}
        >
            <FavoriteIcon fill="currentColor" />
        </button>
    )
}
export default Favorite;
