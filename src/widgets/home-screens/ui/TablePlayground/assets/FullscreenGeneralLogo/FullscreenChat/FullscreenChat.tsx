import { Flex } from "antd";
import { ChatLayout } from "../../../../ChatLayout";
import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground-active.svg"
import './FullscreenChat.less';

interface Props {
    onClick?: () => void
}
export default function FullscreenChat({onClick}: Props) {
    return (
        <Flex vertical>
            <button
                onClick={onClick}
                className={"decrease-chat-button"}
            >
            <DecreasePlaygroundIcon />
            </button>
            <ChatLayout />
        </Flex>
    )
}