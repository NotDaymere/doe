import PlaygroundRenderer from "../index";
import { useChatStore } from "src/shared/providers";
import { Flex } from "antd";

export default function MultiPlaygroundRenderer() {
    const {getOpenSavedPlaygrounds} = useChatStore();
    return (
        <Flex vertical style={{height: '100%'}}>
            {
                getOpenSavedPlaygrounds().map((savedPlayground) => {
                    return (
                        <div style={{height: `${100 / getOpenSavedPlaygrounds().length}%`}}>
                            <PlaygroundRenderer
                                type={savedPlayground.type}
                                id={savedPlayground.id}
                                key={savedPlayground.id}
                            />
                        </div>
                    )
                })
            }
        </Flex>
    )
}
