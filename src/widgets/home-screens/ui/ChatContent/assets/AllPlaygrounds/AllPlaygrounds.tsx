import AllPlaygroundsIcon from "src/shared/icons/AllPlaygroundsIcon";
import './AllPlaygrounds.less';
import { useState } from "react";
import OpenAllPlaygrounds from "../OpenAllPlaygrounds/OpenAllPlaygrounds";
import DoePlaygroundStars from "src/shared/icons/DoePlaygroundStars";

export default function AllPlaygrounds() {
    const [activeAllPlaygrounds, setActiveAllPlaygrounds] = useState<boolean>(false);
    const changeActiveAllPlaygrounds = () => {
        setActiveAllPlaygrounds(!activeAllPlaygrounds)
    }
    return (
        <div>
            <button className={'all-playgrounds-button'}
                    onClick={changeActiveAllPlaygrounds}
            >
                <div className={'all-playgrounds-icon-container'}>
                    {activeAllPlaygrounds && <AllPlaygroundsIcon />}
                    {!activeAllPlaygrounds && <DoePlaygroundStars />}
                </div>
            </button>
            {activeAllPlaygrounds && <OpenAllPlaygrounds changeActiveAllPlaygrounds = {changeActiveAllPlaygrounds} />}
        </div>
    )
}