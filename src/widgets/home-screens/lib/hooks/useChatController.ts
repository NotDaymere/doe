import React from "react";

export function useChatController() {
    const chatRef = React.useRef<HTMLDivElement>(null);

    return {
        chatRef
    }
}