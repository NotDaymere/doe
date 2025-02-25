import { ReactComponent as Reboot } from "src/assets/icons/reboot.svg";
import { ReactComponent as Note } from "src/assets/icons/note.svg";
import { ReactComponent as NotePlus } from "src/assets/icons/note-plus.svg";
import { ReactComponent as Arrows } from "src/assets/icons/arrows.svg";
import { ReactComponent as Massage } from "src/assets/icons/massage.svg";
import { ReactComponent as LikeP } from "src/assets/icons/like-p.svg";
import { ReactComponent as Router } from "src/assets/icons/router.svg";
import { ReactComponent as File } from "src/assets/icons/file.svg";
import { ReactComponent as Picture } from "src/assets/icons/picture.svg";
import { Button, Flex } from "antd";
import './ActiveMenu.less';

function ActiveMenu() {
    return (
        <Flex className={'active-menu-container'}>
            <Button className={'button'}><Picture /></Button>
            <Button className={'button'}><File /></Button>
            <Button className={'button'}><Router /></Button>
            <Button className={'button'}><LikeP /></Button>
            <Button className={'button'}><Massage /></Button>
            <Button className={'button'}><Arrows /></Button>
            <Button className={'button'}><NotePlus /></Button>
            <Button className={'button'}><Note /></Button>
            <Button className={'button'}><Reboot /></Button>
        </Flex>
    )
}
export default ActiveMenu;





