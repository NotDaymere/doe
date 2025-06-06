import { createContext, ReactNode, useContext, useState } from "react";

interface CursorContextType {
    cursorMoving: boolean;
    setCursorMoving: () => void;
    setCursorStopped: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
    const [cursorMoving, setCursorMovingState] = useState(false);
    console.log("cursorMoving: ", cursorMoving);

    const setCursorMoving = () => setCursorMovingState(true);
    const setCursorStopped = () => setCursorMovingState(false);

    return (
        <CursorContext.Provider value={{ cursorMoving, setCursorMoving, setCursorStopped }}>
            {children}
        </CursorContext.Provider>
    );
};

export const useCursor = () => {
    const context = useContext(CursorContext);
    if (context === undefined) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
};
