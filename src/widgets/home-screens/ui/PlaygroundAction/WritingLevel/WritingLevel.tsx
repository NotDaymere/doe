import "./WritingLevel.less"
import Menu from "./Menu";
import PenIcon from "src/shared/icons/Pen.icon";
import CloseIcon from "src/shared/icons/CloseIcon";
import SendIcon from "src/shared/icons/SendIcon";
import { useState } from "react";

function WritingLevel() {
    const [writingLevelOption, setWritingLevelOption] = useState<string>("");
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [promptValue, setPromptValue] = useState<string>("");
    return (
        <>
            <div className={"writing-level-content"}>

                <p className={"text-columns-button-p"}>
                    Change<span className={"text-columns-button-span"}>Writing Level</span>to
                </p>
                <div className={"writing-level-option"}>
                    <div className={"writing-level-option-text"}>
                        {writingLevelOption}
                    </div>
                    <button className={"writing-level-option-button"}
                            onClick={() => setOpenMenu(!openMenu)}
                    >
                        <PenIcon className={"pen-icon-writing-level"} />
                    </button>
                    {openMenu && <Menu setOpenMenu = {setOpenMenu} setWritingLevelOption = {setWritingLevelOption}/>}
                </div>
                <span className={"text-columns-button-span ml--5"}>in</span>
                <div className={'text-columns-target'}>
                </div>
            </div>
        </>
    )
}

export default WritingLevel;