import { Flex } from "antd"
import './ActivePaint.less'

type ActivePaintProps = {
    onColorSelect: (color: string) => void
}

function ActivePaint({ onColorSelect }: ActivePaintProps) {
    return (
        <Flex className="active-paint-container">
            <div
                className="blue-circle"
                onClick={() => onColorSelect('#28ABFB')}
            />
            <div
                className="green-circle"
                onClick={() => onColorSelect('#8BCF16')}
            />
            <div
                className="red-circle"
                onClick={() => onColorSelect('#FF5F5F')}
            />
        </Flex>
    )
}

export default ActivePaint
