import "./WritingLevel.less"

function Menu() {

    return (
        <div className={'text-columns-button-menu-container'}>
            <span className={'text-columns-button-menu'}>primary school</span>
            <span className={'text-columns-button-menu'}>secondary school</span>
            <span className={'text-columns-button-menu'}>university</span>
            <span className={'text-columns-button-menu'}>graduate</span>
            <span className={'text-columns-button-menu'}>postgraduate</span>
            <span className={'text-columns-button-menu'}>custom</span>
        </div>
    )
}

export default Menu;