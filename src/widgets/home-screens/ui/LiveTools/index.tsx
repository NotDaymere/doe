import { useChatStore } from "src/shared/providers";
import { MODE, ModeType } from "src/shared/types/Chat";
import Translator from "./Translator";
import Listener from "./Listener";

const LiveTools = () => {
    const { mode } = useChatStore();

    const renderLiveTools = (mode: ModeType) => {
        switch (mode) {
            case MODE.TRANSLATION:
                return <Translator />;
            case MODE.RECORDING:
                return <Listener />;
            default:
                return null;
        }
    };

    return <>{renderLiveTools(mode)}</>;
};

export default LiveTools;
