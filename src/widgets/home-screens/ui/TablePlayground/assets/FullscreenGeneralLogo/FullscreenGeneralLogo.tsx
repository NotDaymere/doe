import GeneralLogo from "../../../GeneralLogo/GeneralLogo";
import { useState } from "react";
import FullscreenChat from "./FullscreenChat/FullscreenChat";

interface FullscreenGeneralLogoProps {
    unique?: boolean;
}
export default function FullscreenGeneralLogo({unique = false}: FullscreenGeneralLogoProps) {
    const [activeChat, setActiveChat] = useState(false);
    return (
        <>
            {activeChat && <FullscreenChat unique={unique} onClick={() => { setActiveChat(false) }}/>}
            {!activeChat && <GeneralLogo onClick={() => { setActiveChat(true) }}/>}
        </>
    )
}