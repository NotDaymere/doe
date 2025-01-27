import React from "react";

export function usePrompt() {
    const [prompt, setPrompt] = React.useState({
        active: false,
        number: ""
    });

    const togglePrompt = (active: boolean) => {
        setPrompt({ active, number: "" });
    };

    const setNumber = (value: string) => {
        const n = value.match(/\d+/);
        setPrompt({ ...prompt, number: n?.toString() || "" });
    };

    return {
        ...prompt,
        togglePrompt,
        setNumber
    };
}