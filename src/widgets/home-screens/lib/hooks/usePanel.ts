import React from "react";

import {FileWithId} from "./useDragFile";

interface PanelValue {
    text: string;
    files: FileWithId[];
}

export function usePanel() {
    const [value, setValue] = React.useState<PanelValue>({
        files: [],
        text: ""
    })

    const setText = (text: string) => setValue({ ...value, text  });

    const setFiles = (files: FileWithId[]) => setValue({ ...value, files });

    const reset = () => setValue({ files: [], text: "" });

    return {
        ...value,
        setFiles,
        setText,
        reset
    };
}