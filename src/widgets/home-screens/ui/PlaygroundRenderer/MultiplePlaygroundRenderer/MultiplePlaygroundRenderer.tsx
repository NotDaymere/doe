import PlaygroundRenderer from "../index";
import { useChatStore, useVersionHistoryStore } from "src/shared/providers";
import { Flex } from "antd";
import OpenFromSavedPlayground from "../../TablePlayground/assets/OpenFromSavedPlayground/OpenFromSavedPlayground";
import React, { useEffect } from "react";
import './MultiplePlaygroundRenderer.less';
import DoePlaygroundStars from "src/shared/icons/DoePlaygroundStars";

export default function MultiplePlaygroundRenderer() {
    const {getOpenSavedPlaygrounds, savedPlaygrounds, playgroundFullscreen, updateSavedPlaygrounds, getOpenSavedPlaygroundsByType} = useChatStore();
    const {openHistory} = useVersionHistoryStore();

    useEffect(() => {
        const doePlaygroundOpen = document.querySelector(".doe-playground-open") as HTMLElement | null;

        if (doePlaygroundOpen) {
            doePlaygroundOpen.classList.remove("show");

            setTimeout(() => {
                doePlaygroundOpen.classList.add("show");

                setTimeout(() => {
                    doePlaygroundOpen.classList.remove("show");
                }, 2000);
            }, 300);
        }
    }, []);
    useEffect(() => {
        const openPlaygrounds = getOpenSavedPlaygrounds();

        const isSourceOpen = openPlaygrounds.some(p => p.type === 'source');
        const nonSourceOpen = openPlaygrounds.filter(p => p.type !== 'source');

        if (isSourceOpen && nonSourceOpen.length > 0) {
            nonSourceOpen.forEach(p => {
                p.open = false;
                updateSavedPlaygrounds(p);
            });
        }

        if (!isSourceOpen && nonSourceOpen.length > 0) {
            getOpenSavedPlaygroundsByType('source').forEach(p => {
                p.open = false;
                updateSavedPlaygrounds(p);
            });
        }
    }, [getOpenSavedPlaygrounds()]);



    return (
        <Flex vertical className={`multiple-playground-renderer-container ${openHistory && ' multiple-playground-renderer-container-left-radius'}`}>
            {
                savedPlaygrounds.filter(p => p.type !== "source").length > 1
                && !(getOpenSavedPlaygroundsByType('source').length >= 1)
                && (
                    <div className={'saved-playgrounds'}>
                        <Flex className={"saved-playgrounds-container"}>
                            {savedPlaygrounds.filter(p => p.type !== "source").map((savedPlayground, index) => (
                                <>
                                    <OpenFromSavedPlayground
                                        key={savedPlayground.id || index}
                                        savedPlayground={savedPlayground}
                                        length={savedPlaygrounds.length}
                                    />
                                    {(savedPlaygrounds.filter(p => p.type !== "source").length < 4 && (savedPlaygrounds.filter(p => p.type !== "source").length - 1) !== index) && <span className="separator" />}
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
