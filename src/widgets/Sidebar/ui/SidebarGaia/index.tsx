import clsx from "clsx";
import React from "react";
import { CSSTransition } from "react-transition-group";
import EnergyIcon from "src/shared/icons/Energy.icon";
import GlobalIcon from "src/shared/icons/Global.icon";
import LeafIcon from "src/shared/icons/Leaf.icon";
import TreeIcon from "src/shared/icons/Tree.icon";
import WaterIcon from "src/shared/icons/Water.icon";
import WindIcon from "src/shared/icons/Wind.icon";
import { useAppStore } from "src/shared/providers";
import css from "./SidebarGaia.module.less";

export const SidebarGaia: React.FC = () => {
    const { gaiaActive, setGaiaActive } = useAppStore();
    const nodeRef = React.useRef<HTMLDivElement>(null);

    const toggleGaia = () => setGaiaActive(!gaiaActive);

    return (
        <div className={clsx(css.gaia, gaiaActive && css._active)}>
            <div className={css.gaia_btn_wrapper}>
                <button className={css.gaia_btn} onClick={toggleGaia}>
                    <GlobalIcon />
                </button>
                <CSSTransition
                    classNames={css}
                    timeout={1000}
                    in={!gaiaActive}
                    nodeRef={nodeRef}
                    // unmountOnExit
                    mountOnEnter
                >
                    <p className={css.gaia_hint} ref={nodeRef}>
                        Environmental savings per (calculated per token) by using our models compared to
                        existing SOTA models.
                        <br />
                        <br />
                        For each token you generate, we calculate tree mass <TreeIcon fill="#5B5B5B" />,
                        volume of water <WaterIcon fill="#268AFF" />, mass of carbon dioxide (CO2){" "}
                        <WindIcon fill="#FF4848" />, joules of energy <EnergyIcon fill="#FF8B12" />, and
                        size of land <LeafIcon fill="#8BCF16" /> conserved with the Bilateral Cortex
                        Model (BCM).
                    </p>
                </CSSTransition>
            </div>
        </div>
    );
};
