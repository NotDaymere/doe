import './OpenAllPlaygrounds.less';
import { useEffect, useRef, useState } from "react";
import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg";
import DoePlaygroundStars from "src/shared/icons/DoePlaygroundStars";
import { useChatStore } from "src/shared/providers";
import ThreeVerticalDots from "src/shared/icons/ThreeVerticalDots";
import AllPlaygroundsMenu from "../AllPlaygroundsMenu/AllPlaygroundsMenu";

type OpenAllPlaygroundsProps = {
    changeActiveAllPlaygrounds: () => void;
};

export default function OpenAllPlaygrounds({ changeActiveAllPlaygrounds }: OpenAllPlaygroundsProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { savedPlaygrounds, getOpenSavedPlaygrounds, updateSavedPlaygrounds, getSavedPlayground } = useChatStore();
    const [activeOpenAllPlaygroundsMenu, setActiveOpenAllPlaygroundsMenu] = useState<string | null>(null);
    const [contentIdHover, setContentIdHover] = useState<string | null>(null);
    const contentMouseUp = (id: string | null) => {
        if (activeOpenAllPlaygroundsMenu) {
            return;
        }
        setContentIdHover(id);
    }
    const contentMouseDown = () => {
        if (activeOpenAllPlaygroundsMenu) {
            return;
        }
        setContentIdHover(null);
    }
    const changeActiveOpenAllPlaygroundsMenu = (id: string | null = null) => {
        if (activeOpenAllPlaygroundsMenu) {
            setActiveOpenAllPlaygroundsMenu(null)
            return;
        }
        setActiveOpenAllPlaygroundsMenu(id)
    }

    const openSavedPlaygroundStatus = (id: string | null) => {
        const savedPlayground = getSavedPlayground(id)
        const maxLength = 2;
        if (getOpenSavedPlaygrounds().length >= maxLength) {
            return;
        }
        if (!savedPlayground) return;
        savedPlayground.open = true;
        updateSavedPlaygrounds(savedPlayground);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                changeActiveAllPlaygrounds();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [changeActiveAllPlaygrounds]);

    return (
        <div ref={containerRef} className={'open-all-playgrounds-container'}>
            <div className={'open-all-playgrounds-header'}>
                <div className={'open-all-playgrounds-header-text'}>
                    <DoePlaygroundStars />All Playgrounds
                </div>
                <button className={'open-all-playgrounds-header-button'}
                        onClick={changeActiveAllPlaygrounds}>
                    <DecreasePlaygroundIcon />
                </button>
            </div>
            <div className={'open-all-playgrounds-content'}>
                {savedPlaygrounds.map((savedPlayground, index) => (
                    <div
                        key={savedPlayground.id}
                        className={`open-all-playgrounds-content-example ${
                            contentIdHover == savedPlayground.id && 'open-all-playgrounds-content-example-hover'
                        }`}
                        onMouseMove={() => contentMouseUp(savedPlayground.id)}
                        onMouseOut={contentMouseDown}
                        onClick={() => openSavedPlaygroundStatus(savedPlayground.id)}
                    >
                       <div className={'open-all-playgrounds-content-name'}>
                           <DoePlaygroundStars/>
                           { savedPlayground.name }
                       </div>
                        <button
                            className={'open-all-playgrounds-content-example-button'}
                            onClick={(event) => {
                                event.stopPropagation();
                                changeActiveOpenAllPlaygroundsMenu(savedPlayground.id);
                            }}
                        >
                            {!activeOpenAllPlaygroundsMenu && <span className={'open-all-playgrounds-example-span'} />}
                            {activeOpenAllPlaygroundsMenu && (
                                <span>
                <ThreeVerticalDots />
            </span>
                            )}
                        </button>
                    </div>
                ))}
            </div>
            {activeOpenAllPlaygroundsMenu
                && <AllPlaygroundsMenu
                    activeOpenAllPlaygroundsMenu = {activeOpenAllPlaygroundsMenu}
                    changeActiveOpenAllPlaygroundsMenu = {changeActiveOpenAllPlaygroundsMenu}
                />
            }
        </div>
    );
}
