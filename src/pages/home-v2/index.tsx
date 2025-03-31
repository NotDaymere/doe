import "../../styles/reset.less";
import "../../styles/index.less";
import React from "react";
import {Helmet} from "react-helmet";
import { MainLayout } from "src/shared/layouts/MainLayout";
import { ChatLayout } from "src/widgets/home-screens";
import css from "./index.module.less";
import Console from "src/components/Console/Console";
import AddChartsAndWidgets from "src/components/AddChartsAndWidgets/AddChartsAndWidgets";

import Comments from "src/components/Comments/Comments";
import ChartWidgetsWindow from "src/components/widgetAndChart/Window/ChartWidgetsWindow";
import { useAppStore, useChatStore } from "src/shared/providers";
import Sharing from "src/widgets/home-screens/ui/LiveTools/Sharing/SharingLink"
import { SidebarGaia } from "src/widgets/Sidebar/ui";

const Home = () => {
    const { isSharingActive, setIsSharingActive } = useChatStore();
    const { gaiaSidebarActive, setGaiaSidebarActive } = useAppStore();

    return (
        <MainLayout>
            <Helmet>
                <title>Doe</title>
            </Helmet>
             <AddChartsAndWidgets/>

                           <Comments/>
                           <ChartWidgetsWindow/>
                <Console/>

            <ChatLayout />
            {gaiaSidebarActive && (
                <SidebarGaia isActive={gaiaSidebarActive} setIsActive={setGaiaSidebarActive} />
            )}
            {isSharingActive && (
                <Sharing isActive={isSharingActive} setIsActive={setIsSharingActive} />
            )}
        </MainLayout>
    );
};

export default Home;
