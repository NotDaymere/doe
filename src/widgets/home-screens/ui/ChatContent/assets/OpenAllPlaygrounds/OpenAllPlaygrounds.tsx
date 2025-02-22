import './OpenAllPlaygrounds.less';
import { useEffect, useRef, useState } from "react";
import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg";
import DoePlaygroundStars from "src/shared/icons/DoePlaygroundStars";
import { useChatStore } from "src/shared/providers";
import ThreeVerticalDots from "../../../../../../shared/icons/ThreeVerticalDots";
import AllPlaygroundsMenu from "../AllPlaygroundsMenu/AllPlaygroundsMenu";

type OpenAllPlaygroundsProps = {
    changeActiveAllPlaygrounds: () => void;
};

export default function OpenAllPlaygrounds({ changeActiveAllPlaygrounds }: OpenAllPlaygroundsProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { savedPlaygrounds } = useChatStore();
    const [activeOpenAllPlaygroundsMenu, setActiveOpenAllPlaygroundsMenu] = useState<boolean>(false);
    const changeActiveOpenAllPlaygroundsMenu = () => {
        setActiveOpenAllPlaygroundsMenu(!activeOpenAllPlaygroundsMenu)
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
                        key={index}
                        className={"open-all-playgrounds-content-example"}
                    >
                       <div className={'open-all-playgrounds-content-name'}>
                           <DoePlaygroundStars/>
                           {savedPlayground.type == 'table' && 'Tabular Random Values'}
                           {savedPlayground.type == 'code' && 'Python Task Manager'}
                       </div>
                       <button className={'open-all-playgrounds-content-example-button'}
                       onClick={changeActiveOpenAllPlaygroundsMenu}
                       >
                           {!activeOpenAllPlaygroundsMenu && <span className={'open-all-playgrounds-example-span'}/>}
                           {activeOpenAllPlaygroundsMenu && <span><ThreeVerticalDots/></span>}
                       </button>
                    </div>
                ))}
            </div>
            <AllPlaygroundsMenu />
        </div>
    );
}
