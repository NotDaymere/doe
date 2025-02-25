import React from "react";
import { useChatStore, useVersionHistoryStore } from "src/shared/providers";
import { Gaia } from "src/widgets/Gaia";
import css from "./MainLayout.module.less";
import { Layout as BaseLayout } from "antd";
import { Sider } from "src/components/layout";
import MultiplePlaygroundRenderer from "src/widgets/home-screens/ui/PlaygroundRenderer/MultiplePlaygroundRenderer/MultiplePlaygroundRenderer";
import HistoryPlayground from "../../../widgets/home-screens/ui/TablePlayground/assets/HistoryPlayground/HistoryPlayground";

interface Props {
    children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({
    children
}) => {
    const gaiaRef = React.useRef<HTMLDivElement>(null);
    const { playgroundFullscreen, getOpenSavedPlaygrounds } = useChatStore()
    const {openHistory} = useVersionHistoryStore();
    return (
        <React.Fragment>
            <BaseLayout className={getOpenSavedPlaygrounds().length > 0 ? "main-layout-playground" : "main-layout"} hasSider>
                <BaseLayout.Sider width={"auto"} className={"sider-wrapper"}>
                    <Sider />
                </BaseLayout.Sider>
                {!playgroundFullscreen && children}
            <Gaia className={css.gaia} ref={gaiaRef} />
            {getOpenSavedPlaygrounds().length > 0 && (
                <>
                    <BaseLayout.Sider width={playgroundFullscreen ? (openHistory? '80%' : '100%') : 550} className={"playground-sider"}>
                        <MultiplePlaygroundRenderer />
                    </BaseLayout.Sider>
                    <BaseLayout.Sider width='20%' className={openHistory ? 'playground-sider' : "display-none"}>
                        <HistoryPlayground />
                    </BaseLayout.Sider>
                </>
            )}
            </BaseLayout>
        </React.Fragment>
    );
};