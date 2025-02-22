import './OpenAllPlaygrounds.less';
import { useEffect, useRef } from 'react';
import { ReactComponent as DecreasePlaygroundIcon } from "src/assets/icons/decrease-playground.svg";
import DoePlaygroundStars from "src/shared/icons/DoePlaygroundStars";
import { useChatStore } from "src/shared/providers";

type OpenAllPlaygroundsProps = {
    changeActiveAllPlaygrounds: () => void;
};

export default function OpenAllPlaygrounds({ changeActiveAllPlaygrounds }: OpenAllPlaygroundsProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { savedPlaygrounds } = useChatStore();
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
                        {savedPlayground.type == 'table' && 'Tabular Random Values'}
                        {savedPlayground.type == 'code' && 'Python Task Manager'}
                       <button className={'open-all-playgrounds-content-example-button'}>
                           <span className={'open-all-playgrounds-example-span'}/>
                       </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
