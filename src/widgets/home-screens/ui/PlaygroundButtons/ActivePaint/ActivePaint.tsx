import { Flex } from "antd"
import './ActivePaint.less'

type ActivePaintProps = {
    onColorSelect: (color: string) => void
    onClick: () => void
}

function ActivePaint({ onColorSelect, onClick }: ActivePaintProps) {
    return (
        <Flex className="active-paint-container">
            <div
                className="blue-circle"
                onClick={() => {
                    onColorSelect("#28ABFB");
                    onClick()
                }}
            />
            <div
                className="green-circle"
                onClick={() => {
                    onColorSelect('#8BCF16')
                    onClick()
                }}
            />
            <div
                className="red-circle"
                onClick={() => {
                    onColorSelect("#FF5F5F");
                }}
            />
        </Flex>
    )
}

export default ActivePaint
