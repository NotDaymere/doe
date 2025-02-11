import { Flex } from "antd";
import './ActivePaint.less';

function ActivePaint() {
    return (
        <Flex className={'active-paint-container'} >
            <div className={'blue-circle'}/>
            <div className={'green-circle'}/>
            <div className={'red-circle'}/>
        </Flex>
    )
}
export default ActivePaint;