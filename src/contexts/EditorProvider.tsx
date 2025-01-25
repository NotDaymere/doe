import { Editor } from "@tiptap/react";
import { FC, PropsWithChildren, createContext, useContext, useState } from "react";

interface EditorContextType {
    editor: Editor | null;
    isLinkFocused: boolean;
    linkUrl: string | null;
    formula: string | null;
    isEditing: boolean;
    closeLinkInput: () => void;
    closeFormulaInput: () => void;
    setLinkUrl: React.Dispatch<React.SetStateAction<string | null>>;
    setFormula: React.Dispatch<React.SetStateAction<string | null>>;
    setLinkFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    isFormulaFocused: boolean;
    setEditor: React.Dispatch<React.SetStateAction<Editor | null>>;
    setFormulaFocused: React.Dispatch<React.SetStateAction<boolean>>;
    formulaInputVisible: boolean;
    setFormulaInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
    linkInputVisible: boolean;
    setLinkInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
    inputPosition: { top: number | null; left: number | null };
    setInputPosition: (state: { top: number | null; left: number | null }) => void;
}

const EditorContext = createContext<EditorContextType>({
    editor: null,
    linkUrl: null,
    formula: null,
    isEditing: false,
    closeFormulaInput: () => {},
    closeLinkInput: () => {},
    setFormula: () => {},
    setLinkUrl: () => {},
    setEditor: () => {},
    isLinkFocused: false,
    setLinkFocused: () => {},
    isFormulaFocused: false,
    setFormulaFocused: () => {},
    formulaInputVisible: false,
    setFormulaInputVisible: () => {},
    linkInputVisible: false,
    setLinkInputVisible: () => {},
    inputPosition: { top: null, left: null },
    setInputPosition: () => {},
    setIsEditing: () => {},
});

export const useEditorContext = () => useContext(EditorContext);

export const EditorProvider: FC<PropsWithChildren> = ({ children }) => {
    const [formula, setFormula] = useState<string | null>(null);
    const [linkUrl, setLinkUrl] = useState<string | null>(null);
    const [isLinkFocused, setLinkFocused] = useState(false);
    const [isFormulaFocused, setFormulaFocused] = useState(false);
    const [formulaInputVisible, setFormulaInputVisible] = useState(false);
    const [linkInputVisible, setLinkInputVisible] = useState(false);
    const [inputPosition, setInputPosition] = useState<{ top: number | null; left: number | null }>(
        {
            top: null,
            left: null,
        }
    );
    const [editor, setEditor] = useState<Editor | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const closeLinkInput = () => setLinkInputVisible(false);
    const closeFormulaInput = () => setFormulaInputVisible(false);

    return (
        <EditorContext.Provider
            value={{
                editor,
                linkUrl,
                formula,
                isEditing,
                setFormula,
                setIsEditing,
                setLinkUrl,
                closeLinkInput,
                closeFormulaInput,
                setEditor,
                isLinkFocused,
                setLinkFocused,
                isFormulaFocused,
                setFormulaFocused,
                formulaInputVisible,
                setFormulaInputVisible,
                linkInputVisible,
                setLinkInputVisible,
                inputPosition,
                setInputPosition,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};
