import "../../styles/reset.less";
import "../../styles/index.less";
import React from "react";
import {Helmet} from "react-helmet";
import { MainLayout } from "src/shared/layouts/MainLayout";
import { ChatLayout } from "src/widgets/home-screens";
import Console from "src/components/Console/Console";
import AddChartsAndWidgets from "src/components/AddChartsAndWidgets/AddChartsAndWidgets";

import Comments from "src/components/Comments/Comments";
import ChartWidgetsWindow from "src/components/widgetAndChart/Window/ChartWidgetsWindow";
import { useAppStore, useChatStore } from "src/shared/providers";
import { SidebarGaia } from "src/widgets/Sidebar/ui";
import Sharing from "../../widgets/home-screens/ui/LiveTools/Sharing/Sharing";

const Home = () => {
    const { isSharingActive, setIsSharingActive } = useChatStore();
    const { gaiaSidebarActive } = useAppStore();

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
                <SidebarGaia />
            )}
            {isSharingActive && (
                <Sharing isActive={isSharingActive} setIsActive={setIsSharingActive} />
            )}
        </MainLayout>
    );
};

export default Home;
