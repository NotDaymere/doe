import React from "react";
import { useAppStore, useChatStore } from "src/shared/providers";
import { Gaia } from "src/widgets/Gaia";
import css from "./MainLayout.module.less";
import { Layout as BaseLayout } from "antd";
import { Sider } from "../../../components/layout";
import PlaygroundRenderer from "../../../widgets/home-screens/ui/PlaygroundRenderer";

interface Props {
    children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({
    children
}) => {
    const gaiaRef = React.useRef<HTMLDivElement>(null);
    const { playground } = useChatStore()

    return (
        <React.Fragment>
            <BaseLayout className={"main-layout"} hasSider>
                <BaseLayout.Sider width={"auto"} className={"sider-wrapper"}>
                    <Sider />
                </BaseLayout.Sider>
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
            {playground.open && (
                <BaseLayout.Sider width={550} className={"playground-sider"}>
                    <PlaygroundRenderer type={playground.type} id={playground.id} />
                </BaseLayout.Sider>
            )}
            </BaseLayout>
        </React.Fragment>
    );
};