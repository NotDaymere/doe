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

const Home = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>Doe</title>
            </Helmet>


            
            {/* <Console/> */}
            
            
            
             
             <AddChartsAndWidgets/>
                         
                           <Comments/>
                           <ChartWidgetsWindow/>

            <ChatLayout />
        </MainLayout>
    );
}

export default Home;