import PlaygroundRenderer from "../index";
import { useChatStore } from "src/shared/providers";
import { Flex } from "antd";
import OpenFromSavedPlayground from "../../TablePlayground/assets/OpenFromSavedPlayground/OpenFromSavedPlayground";
import React, { useEffect } from "react";
import './MultiplePlaygroundRenderer.less';
import DoePlaygroundStars from "src/shared/icons/DoePlaygroundStars";

export default function MultiplePlaygroundRenderer() {
    const {getOpenSavedPlaygrounds, savedPlaygrounds, playgroundFullscreen} = useChatStore();

    useEffect(() => {
      const doePlaygroundOpen = document.querySelector(".doe-playground-open") as HTMLElement | null;
      if (doePlaygroundOpen) {
        setTimeout(() => {
          doePlaygroundOpen.style.display = "none";
        }, 3000)
      }
    }, []);

    return (
        <Flex vertical className={'multiple-playground-renderer-container'}>
            {
                savedPlaygrounds.length > 1 && (
                    <div className={'saved-playgrounds'}>
                        <Flex className={"saved-playgrounds-container"}>
                            {
                                savedPlaygrounds.map((savedPlayground, index) => {
                                    const id = savedPlayground.id;
                                    return (
                                        <div key={id || index}>
                                            <OpenFromSavedPlayground savedPlayground={savedPlayground} />
                                        </div>
                                    );
                                })
                            }
                        </Flex>
                    </div>
                )
            }

           <Flex className={`playground-render ${playgroundFullscreen?'flex-direction-row':'flex-direction-column'}`}>
               {
                getOpenSavedPlaygrounds().map((savedPlayground) => {
                    return (
                        <PlaygroundRenderer
                            type={savedPlayground.type}
                            id={savedPlayground.id}
                            key={savedPlayground.id}
                        />
                    )
                })
            }
           </Flex>
            <Flex className={'doe-playground-open'}>
                <DoePlaygroundStars /> Doe Playground
            </Flex>
        </Flex>
    )
}
