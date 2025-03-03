import React from "react";
import { useChatStore, useVersionHistoryStore } from "src/shared/providers";
import { Gaia } from "src/widgets/Gaia";
import "./MainLayout.less";
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
            <BaseLayout className={getOpenSavedPlaygrounds().length > 0 ? "main-layout-playground" : "main-layout" } hasSider>
                <BaseLayout.Sider width={"auto"} className={"sider-wrapper"}>
                    <Sider />
                </BaseLayout.Sider>
                {/*//TODO оберни чилдрен в контейнер и присваивай контейнера макс видс 0 оверфлоу хиден с транзишином 0ю5 а по умлчанию натрой фит контент или что то типо*/}
                <div className={`children-main-layout ${((!playgroundFullscreen) || getOpenSavedPlaygrounds().length == 0) && 'children-main-layout-active'}`}>
                    {children}
                </div>
            <Gaia className={'gaia'} ref={gaiaRef} />
            {getOpenSavedPlaygrounds().length > 0 && (
                <>
                    <BaseLayout.Sider width={"inherit"}  className={`playground-sider ${playgroundFullscreen ? (openHistory? 'width-80' : 'width-100') : "width-550px"}`}>
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