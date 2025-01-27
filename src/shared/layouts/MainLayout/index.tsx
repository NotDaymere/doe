import React from "react";
import { useAppStore } from "src/shared/providers";
import { CSSTransition } from "react-transition-group";
import { Gaia } from "src/widgets/Gaia";
import css from "./MainLayout.module.less";

interface Props {
    children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({
    children
}) => {
    const gaiaRef = React.useRef<HTMLDivElement>(null);
    const { gaiaActive } = useAppStore();

    return (
        <React.Fragment>
            {children}
            {/* <CSSTransition
                classNames={{
                    enter: css.gaiaEnter,
                    enterActive: css.gaiaEnterActive,
                    exit: css.gaiaExit,
                    exitActive: css.gaiaExitActive
                }}
                timeout={1500}
                in={gaiaActive}
                unmountOnExit
                mountOnEnter
                nodeRef={gaiaRef}
            > */}
                <Gaia className={css.gaia} ref={gaiaRef} />
            {/* </CSSTransition> */}
        </React.Fragment>
    );
};