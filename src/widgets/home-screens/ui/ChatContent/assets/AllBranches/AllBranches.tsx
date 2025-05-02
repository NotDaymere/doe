import BranchIcon from "src/shared/icons/AllPlaygroundsIcon";
import "./AllBranches.less";
import { useState } from "react";
import OpenAllBranches from "../OpenAllBranches/OpenAllBranches";

interface AllBranchesProps {
    activeAllBranches: boolean;
    changeActiveAllBranches: () => void;
}

export default function AllBranches( { activeAllBranches, changeActiveAllBranches}: AllBranchesProps ) {
    return (
        <div className={"all-branches-container"}>
            <button className={"all-branches-button"} onClick={changeActiveAllBranches}>
                <div className={"all-branches-icon-container"}>
                    <BranchIcon />
                </div>
            </button>
            {activeAllBranches && (
                <OpenAllBranches changeActiveAllBranches={changeActiveAllBranches} />
            )}
        </div>
    );
}
