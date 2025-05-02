import { useState } from "react";
import {
    mathBlock,
    mathBlock2,
    pythonCode,
    pythonCodeSmall,
    simpleProjectText,
} from "src/helpers/onboardingMessages";
import { OnboardingMessage } from "src/shared/types/Message";

export type MessageType = "greeting" | "project" | "math" | "code";

export const useChat = (setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [messages, setMessages] = useState<OnboardingMessage[]>([]);
    console.log("messages: ", messages);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "johndoe@gmail.com",
        photo: "/temp/profile.jpg",
    });

    const addMessage = (
        role: "user" | "ai",
        content: string,
        noTypeEffect?: boolean,
        mathBlock?: string
    ) => {
        setMessages((prev) => [...prev, { role, content, noTypeEffect, mathBlock }]);
    };

    const handleUserMessage = (message: string, type: MessageType) => {
        if (type === "greeting") {
            setProfileData((prev) => ({ ...prev, name: message }));
            addMessage("user", `Hey Doe, I'm ${message}`, true);
            setTimeout(() => {
                addMessage("ai", `Hey, ${message}, I'm Doe!`);
            }, 1000);
            setTimeout(() => {
                addMessage("ai", "Let me introduce my main functionality.");
            }, 3000);
            setTimeout(() => {
                setShowSidebar(true);
            }, 6000);
        } else if (type === "project") {
            addMessage("user", message, true);
            setTimeout(() => {
                addMessage(
                    "ai",
                    `Here's a simple project idea: a Task Manager command-line application in Python. It will allow you to add, view, and delete tasks. In the structure, we'll be able to add and view all tasks, delete tasks by number, and mark tasks as completed.<br/><br/><span id="simulate-selection">We will write this code completely in Python.<span id="selection-handle" /></span></span> <br/><br/>The Python code for the deletion function is as follows:\n\n<pre><code><span style="color: #27ADF7;">def</span> <span style="color: #FF605F;">delete_element</span>(my_list, element):\n    <span style="color: #00A47F;">\"\"\"Removes the first occurrence of the element from the list.\"\"\"\n</span>    <span style="color: #27ADF7;">try</span>:\n        my_list.remove(element)\n        <span style="color: #27ADF7;">return</span> my_list\n    <span style="color: #27ADF7;">except</span> ValueError:\n        <span style="color: #27ADF7;">return</span> f"Element {element} not found in the list."\n\n<span style="color: #7B7B7B;"># Example usage</span>\nmy_list = [<span style="color: #FF605F;">1</span>, <span style="color: #FF605F;">2</span>, <span style="color: #FF605F;">3</span>, <span style="color: #FF605F;">4</span>, <span style="color: #FF605F;">5</span>]\nelement_to_delete = <span style="color: #FF605F;">3</span>\n\nresult = delete_element(my_list, element_to_delete)\n<span style="color: #FFB86C;">print</span>(result)  <span style="color: #7B7B7B;"># Output: [1, 2, 4, 5]</span></code></pre>`,
                    true
                );
            }, 1000);
        } else if (type === "math") {
            setTimeout(() => {
                addMessage(
                    "user",
                    `Please put together a sample project that uses the equation`,
                    true,
                    mathBlock2
                );
            }, 1000);
            setTimeout(() => {
                addMessage("ai", simpleProjectText, false, mathBlock);
            }, 2000);
        } else if (type === "code") {
            setTimeout(() => {
                addMessage(
                    "user",
                    `Write me the deletion function in Python that starts with:<br/> ${pythonCodeSmall}`,
                    true
                );
            }, 1000);
            setTimeout(() => {
                addMessage("ai", pythonCode);
            }, 2000);
        }
    };

    return { messages, setMessages, handleUserMessage, profileData, setProfileData };
};
