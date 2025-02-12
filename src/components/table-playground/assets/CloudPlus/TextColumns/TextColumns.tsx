import { ReactComponent as Stars } from "src/assets/icons/stars.svg";
import { ReactComponent as Plus } from "src/assets/icons/Plus.svg";
import { Button, Flex } from "antd";
import './TextColumns.less';

function TextColumns() {
    return (
        <Flex className = {'text-columns-container'} >
            <Flex className={'text-columns-button'} style={{ justifyContent: "space-between" }}>
                <p>Add a <b>Prompt</b></p>
                <Button className={"button-plus"}> <Plus className={'plus-icon'} /> </Button>
            </Flex>
            <div className={'text-columns-line'}/>
            <Flex className={'text-columns-button'} justify-content={'flex-start'}><Stars /> <p>Change <b>Writing Level</b></p></Flex>
            <div className={'text-columns-line'}/>
            <Flex className={'text-columns-button'} justify-content={'flex-start'}><Stars /> <p>Make <b>Content Length</b></p></Flex>
            <div className={'text-columns-line'}/>
            <Flex className={'text-columns-button'} justify-content={'flex-start'}><Stars /> <p>Change <b>Tone</b></p></Flex>
        </Flex>
    )
}

export default TextColumns;