import PlaygroundRenderer from "../index";
import { useChatStore, useVersionHistoryStore } from "src/shared/providers";
import { Flex } from "antd";
import OpenFromSavedPlayground from "../../TablePlayground/assets/OpenFromSavedPlayground/OpenFromSavedPlayground";
import React, { useEffect } from "react";
import './MultiplePlaygroundRenderer.less';
import DoePlaygroundStars from "src/shared/icons/DoePlaygroundStars";

export default function MultiplePlaygroundRenderer() {
    const {getOpenSavedPlaygrounds, savedPlaygrounds, playgroundFullscreen} = useChatStore();
    const {openHistory} = useVersionHistoryStore();

    useEffect(() => {
        const doePlaygroundOpen = document.querySelector(".doe-playground-open") as HTMLElement | null;

        if (doePlaygroundOpen) {
            // Спочатку ховаємо
            doePlaygroundOpen.classList.remove("show");

            // Через 300 мс показуємо
            setTimeout(() => {
                doePlaygroundOpen.classList.add("show");

                // Через 2 секунди після появи ховаємо
                setTimeout(() => {
                    doePlaygroundOpen.classList.remove("show");
                }, 2000);
            }, 300);
        }
    }, []);


    return (
        <Flex vertical className={`multiple-playground-renderer-container ${openHistory && ' multiple-playground-renderer-container-left-radius'}`}>
            {
                savedPlaygrounds.length > 1 && (
                    <div className={'saved-playgrounds'}>
                        <Flex className={"saved-playgrounds-container"}>
                            {savedPlaygrounds.map((savedPlayground, index) => (
                                <>
                                    <OpenFromSavedPlayground
                                        key={savedPlayground.id || index}
                                        savedPlayground={savedPlayground}
                                        length={savedPlaygrounds.length}
                                    />
                                    {(savedPlaygrounds.length < 4 && (savedPlaygrounds.length - 1) !== index) && <span className="separator" />}
                                </>
                            ))}
                        </Flex>
                    </div>
                )
            }

           <Flex className={`playground-render ${playgroundFullscreen?'flex-direction-row':'flex-direction-column'} ${savedPlaygrounds.length > 1 && 'padding-top-20 playground-render-with-saved-playgrounds'}`}>
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
            <Flex className={'doe-playground-open doe-playground-open.show'}>
                <DoePlaygroundStars /> Doe Playground
            </Flex>
        </Flex>
    )
}
