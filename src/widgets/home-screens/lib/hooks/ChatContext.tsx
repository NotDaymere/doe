import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';

type ChatContextType = {
    selectedText: string;
    setSelectedText: Dispatch<SetStateAction<string>>;
    isShowReferencePanel: boolean;
    setIsShowReferencePanel: Dispatch<SetStateAction<boolean>>;
};

const ChatContext = createContext<ChatContextType>({
    selectedText: '',
    setSelectedText: () => {},
    isShowReferencePanel: false,
    setIsShowReferencePanel: () => {},
});

type ChatProviderProps = {
    children: ReactNode;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [selectedText, setSelectedText] = useState<string>("");
    const [isShowReferencePanel, setIsShowReferencePanel] = useState<boolean>(false);

    return (
        <ChatContext.Provider
            value={{
                selectedText,
                setSelectedText,
                isShowReferencePanel,
                setIsShowReferencePanel,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);
