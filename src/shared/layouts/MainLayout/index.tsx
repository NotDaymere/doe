import React from "react";
import { useChatStore } from "src/shared/providers";
import { Gaia } from "src/widgets/Gaia";
import css from "./MainLayout.module.less";
import { Layout as BaseLayout } from "antd";
import { Sider } from "../../../components/layout";
import MultiplePlaygroundRenderer from "../../../widgets/home-screens/ui/PlaygroundRenderer/MultiplePlaygroundRenderer/MultiplePlaygroundRenderer";

interface Props {
    children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({
    children
}) => {
    const gaiaRef = React.useRef<HTMLDivElement>(null);
    const { playgroundFullscreen, getOpenSavedPlaygrounds } = useChatStore()
    return (
        <React.Fragment>
            <BaseLayout className={getOpenSavedPlaygrounds().length > 0 ? "main-layout-playground" : "main-layout"} hasSider>
                <BaseLayout.Sider width={"auto"} className={"sider-wrapper"}>
                    <Sider />
                </BaseLayout.Sider>
                {!playgroundFullscreen && children}
            <Gaia className={css.gaia} ref={gaiaRef} />
            {getOpenSavedPlaygrounds().length > 0 && (
                <BaseLayout.Sider width={playgroundFullscreen ? '100%' : 550} className={"playground-sider"}>
                    <MultiplePlaygroundRenderer />
                </BaseLayout.Sider>
            )}
            </BaseLayout>
        </React.Fragment>
    );
};