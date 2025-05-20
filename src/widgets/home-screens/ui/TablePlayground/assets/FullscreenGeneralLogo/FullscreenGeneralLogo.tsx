import GeneralLogo from "../../../GeneralLogo/GeneralLogo";
import { useState } from "react";
import FullscreenChat from "./FullscreenChat/FullscreenChat";

export default function FullscreenGeneralLogo() {
    const [activeChat, setActiveChat] = useState(false);
    return (
        <>
            {activeChat && <FullscreenChat onClick={() => { setActiveChat(false) }}/>}
            {!activeChat && <GeneralLogo onClick={() => { setActiveChat(true) }}/>}
        </>
    )
}