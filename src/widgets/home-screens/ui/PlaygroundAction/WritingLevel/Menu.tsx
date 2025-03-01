import "./WritingLevel.less"

interface Props {
    setOpenMenu: (openMenu: boolean) => void,
    setWritingLevelOption: (writingLevelOption: string) => void
}
function Menu({ setOpenMenu, setWritingLevelOption }: Props) {
    const updateWritingLevelOption: (option: string) => void = (option) => {
        setWritingLevelOption(option)
        setOpenMenu(false)
    }

    return (
        <div className={'text-columns-button-menu-container'}>
            <span className={'text-columns-button-menu'}
            onClick={() => updateWritingLevelOption('primary school')}
            >primary school</span>
            <span className={'text-columns-button-menu'}
            onClick={() => updateWritingLevelOption('secondary school')}
            >secondary school</span>
            <span className={'text-columns-button-menu'}
            onClick={() => updateWritingLevelOption('university')}
            >university</span>
            <span className={'text-columns-button-menu'}
            onClick={() => updateWritingLevelOption('graduate')}
            >graduate</span>
            <span className={'text-columns-button-menu'}
            onClick={() => updateWritingLevelOption('postgraduate')}
            >postgraduate</span>
            <span className={'text-columns-button-menu'}
            onClick={() => updateWritingLevelOption('custom')}
            >custom</span>
        </div>
    )
}

export default Menu;