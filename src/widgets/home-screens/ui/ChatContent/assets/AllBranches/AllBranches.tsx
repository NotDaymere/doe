import BranchIcon from "src/shared/icons/AllPlaygroundsIcon";
import './AllBranches.less';
import { useState } from "react";
import OpenAllBranches from "../OpenAllBranches/OpenAllBranches";

export default function AllBranches() {
    const [activeAllBranches, setActiveAllBranches] = useState<boolean>(false);
    const changeActiveAllBranches = () => setActiveAllBranches(!activeAllBranches)
    return (
        <div className={'all-branches-container'}>
            <button className={'all-branches-button'}
                    onClick={changeActiveAllBranches}
            >
                <div className={'all-branches-icon-container'}>
                     <BranchIcon />
                </div>
            </button>
            { activeAllBranches &&
                <OpenAllBranches
                    changeActiveAllBranches={changeActiveAllBranches}
                />
            }
        </div>
    )
}