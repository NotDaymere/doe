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
            <Gaia className={'gaia'} ref={gaiaRef} />
            <BaseLayout className={getOpenSavedPlaygrounds().length > 0 ? "main-layout-playground" : "main-layout" } hasSider>
            {/*    <BaseLayout.Sider width={"auto"} className={"sider-wrapper"}>*/}
                    <Sider />
                {/*</BaseLayout.Sider>*/}
                <div className={`children-main-layout ${((!playgroundFullscreen) || getOpenSavedPlaygrounds().length == 0) && 'children-main-layout-active'}`}>
                    {children}
                </div>
            {getOpenSavedPlaygrounds().length > 0 && (
                <>
                    <div className={`playground-sider ${playgroundFullscreen ? (openHistory? 'width-80' : 'width-100') : "width-550px"}`}>
                        <MultiplePlaygroundRenderer />
                    </div>
                    <div style={{ minWidth : "20%" }} className={`padding-left-0 ${openHistory ? "playground-sider" : "display-none"}`}>
                        <HistoryPlayground />
                    </div>
                </>
            )}
            </BaseLayout>
        </React.Fragment>
    );
};