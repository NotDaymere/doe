import "./WritingLevel.less"
import Menu from "./Menu";
import PenIcon from "src/shared/icons/Pen.icon";
import CloseIcon from "src/shared/icons/CloseIcon";
import SendIcon from "src/shared/icons/SendIcon";

function WritingLevel() {

    return (
        <>
            {/*<div className={'writing-level-content'}>*/}
            {/*    Change Writing Level to*/}
            {/*    <div>*/}
            {/*        primary school*/}
            {/*        <button>*/}
            {/*            <PenIcon className={'pen-icon-writing-level'} />*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*    in*/}
            {/*    <div>*/}
            {/*        This is what your table looks like when it's in Doe Playground!*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={'actions'}>*/}
            {/*    <button*/}
            {/*        className={'prompt-button prompt-button-close'}*/}
            {/*        onClick={() => {}}*/}
            {/*    >*/}
            {/*        <CloseIcon />*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        className={'prompt-button prompt-button-send'}*/}
            {/*        onClick={()=> {}}*/}
            {/*    >*/}
            {/*        <SendIcon />*/}
            {/*    </button>*/}
            {/*</div>*/}
            <Menu />
        </>
    )
}

export default WritingLevel;