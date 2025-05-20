import { useChatStore } from "src/shared/providers";
import { MODE } from "src/shared/types/Chat";
import Translator from "./Translator";
import Listener from "./Listener";

const LiveTools = () => {
    const { mode } = useChatStore();

    return (
        <>
            {mode === MODE.TRANSLATION && <Translator />}
            {mode === MODE.RECORDING && <Listener />}
        </>
    );
};

export default LiveTools;
