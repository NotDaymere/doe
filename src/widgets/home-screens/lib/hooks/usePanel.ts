import React from "react";

interface PanelValue {
    text: string;
    files: File[];
}

export function usePanel() {
    const [value, setValue] = React.useState<PanelValue>({
        files: [],
        text: ""
    })

    const setText = (text: string) => setValue({ ...value, text  });
    
    const setFiles = (files: File[]) => setValue({ ...value, files });

    const reset = () => setValue({ files: [], text: "" });

    return {
        ...value,
        setFiles,
        setText,
        reset
    };
}