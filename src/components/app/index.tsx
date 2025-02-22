import { ConfigProvider } from "antd";
import { MathJaxContext } from "better-react-mathjax";
import { createContext, memo, useContext, useState, type FC, type PropsWithChildren } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App as AppTypes } from "src/types";
import { version } from "../../../package.json";
import routes from "../../pages";
import theme from "../../themes";
import { EditorProvider } from "../../../src/contexts/EditorProvider";

type ContextProps = {
    app: {
        version: string;
        playground: AppTypes.Playground;
        dispatchActive: boolean;
        setDispatchActive: React.Dispatch<React.SetStateAction<boolean>>;
        setPlayground: React.Dispatch<React.SetStateAction<AppTypes.Playground>>;
        isTyping: boolean;
        messages: AppTypes.Message[];
        setMessages: React.Dispatch<React.SetStateAction<AppTypes.Message[]>>;
        setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
    };
};

const app: ContextProps["app"] = {
    version,
    dispatchActive: false,
    messages: [],
    isTyping: false,
    playground: {
        type: null,
        open: false,
        data: null,
        text: "",
        id: "code",
    },
    setMessages: () => {},
    setDispatchActive: () => {},
    setPlayground: () => {},
    setIsTyping: () => {},
};

const Context = createContext({ app });

const ContextProvider: FC<PropsWithChildren<ContextProps>> = ({ children, ...props }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [dispatchActive, setDispatchActive] = useState(false);
    const [messages, setMessages] = useState<AppTypes.Message[]>([]);
    const [playground, setPlayground] = useState<AppTypes.Playground>({
        type: null,
        open: false,
        data: null,
        text: "",
        id: "code",
    });

    return (
        <Context.Provider
            value={{
                ...props,
                app: {
                    ...props.app,
                    playground,
                    isTyping,
                    dispatchActive,
                    messages,
                    setMessages,
                    setDispatchActive,
                    setPlayground,
                    setIsTyping,
                },
            }}
        >
            {children}
        </Context.Provider>
    );
};

const useApp: () => ContextProps = () => useContext(Context);

const router = createBrowserRouter(routes);

const mathJaxconfig = {
    loader: { load: ["input/asciimath"] },
    asciimath: {
        displaystyle: true,
        delimiters: [
            ["$", "$"],
            ["`", "`"],
        ],
    },
};

const App: FC = memo(() => (
    <MathJaxContext version={3} config={mathJaxconfig}>
        <EditorProvider>
            <ContextProvider app={app}>
                <ConfigProvider theme={theme}>
                    <RouterProvider router={router} />
                </ConfigProvider>
            </ContextProvider>
        </EditorProvider>
    </MathJaxContext>
));

export { useApp };

export default App;
