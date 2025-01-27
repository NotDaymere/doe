import clsx from "clsx";
import React from "react";
import { useAppStore } from "src/shared/providers";
import CrossIcon from "src/shared/icons/Cross.icon";
import EnergyIcon from "src/shared/icons/Energy.icon";
import LeafIcon from "src/shared/icons/Leaf.icon";
import TreeIcon from "src/shared/icons/Tree.icon";
import WaterIcon from "src/shared/icons/Water.icon";
import WindIcon from "src/shared/icons/Wind.icon";
import css from "./Gaia.module.less";
import LeafResourceIcon from "src/shared/icons/LeafResource.icon";

interface Props {
    className?: string;
}

export const Gaia = React.forwardRef<HTMLDivElement, Props>(({ 
    className 
}, ref) => {
    const statsRef = React.useRef<HTMLDivElement>(null);
    const { gaiaActive, setGaiaActive } = useAppStore();

    const closeGaia = () => setGaiaActive(false);

    React.useEffect(() => {
        const element = statsRef.current;
        if(element) {
            element.style.height = `${gaiaActive ? element.scrollHeight : 0}px`;
        }
    }, [gaiaActive]);

    return (
        <div className={clsx(
            css.gaia,
            gaiaActive && css._active, 
            className
        )} ref={ref}>
            <button className={css.gaia_closeBtn} onClick={closeGaia}>
                <CrossIcon />
            </button>
            <p className={css.gaia_savedResources}>
                <LeafResourceIcon /> <span>Saved resources</span>
            </p>
            <div className={css.gaia_box}>
                <div className={css.gaia_wrapper}>
                    <div className={css.gaia_items}>
                        <p className={css.gaia_items_item}>
                            <TreeIcon fill="#5B5B5B" />
                        </p>
                        <p className={css.gaia_items_item}>
                            <WaterIcon fill="#268AFF" />
                        </p>
                        <p className={css.gaia_items_item}>
                            <WindIcon fill="#FF4848" />
                        </p>
                        <p className={css.gaia_items_item}>
                            <EnergyIcon fill="#FF8B12" />
                        </p>
                        <p className={css.gaia_items_item}>
                            <LeafIcon fill="#8BCF16" />
                        </p>
                    </div>
                    <div className={css.gaia_stats} ref={statsRef}>
                        <ul className={css.gaia_stats_list}>
                            <li className={css.gaia_stats_item}>
                                <p>
                                    <span>1.34</span>
                                    <span>t-g</span>
                                </p>
                            </li>
                            <li className={css.gaia_stats_item}>
                                <p>
                                    <span>2</span>
                                    <span>mL</span>
                                </p>
                            </li>
                            <li className={css.gaia_stats_item}>
                                <p>
                                    <span>1.728</span>
                                    <span>cg</span>
                                </p>
                            </li>
                            <li className={css.gaia_stats_item}>
                                <p>
                                    <span>173</span>
                                    <span>mJ</span>
                                </p>
                            </li>
                            <li className={css.gaia_stats_item}>
                                <p>
                                    <span>200</span>
                                    <span>pm<sup>2</sup></span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
});
