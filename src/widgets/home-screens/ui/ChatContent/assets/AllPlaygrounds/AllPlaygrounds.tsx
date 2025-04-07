import AllPlaygroundsIcon from "src/shared/icons/AllPlaygroundsIcon";
import './AllPlaygrounds.less';
import { useState } from "react";
import OpenAllPlaygrounds from "../OpenAllPlaygrounds/OpenAllPlaygrounds";
import DoePlaygroundStars from "src/shared/icons/DoePlaygroundStars";

interface AllPlaygroundsProps {
    activeAllPlaygrounds: boolean;
    changeActiveAllPlaygrounds: () => void;
}

export default function AllPlaygrounds( { activeAllPlaygrounds, changeActiveAllPlaygrounds}: AllPlaygroundsProps) {

    return (
        <div className={'position-fixed'}>
            <button className={'all-playgrounds-button'}
                    onClick={changeActiveAllPlaygrounds}
            >
                <div className={'all-playgrounds-icon-container'}>
                     <DoePlaygroundStars />
                </div>
            </button>
            {activeAllPlaygrounds && <OpenAllPlaygrounds changeActiveAllPlaygrounds = {changeActiveAllPlaygrounds} activeAllPlaygrounds ={activeAllPlaygrounds} />}
        </div>
    )
}