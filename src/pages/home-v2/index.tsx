import "../../styles/reset.less";
import "../../styles/index.less";
import React from "react";
import {Helmet} from "react-helmet";
import { ChatLayout } from "src/widgets/home-screens";
import css from "./index.module.less";

const Home = () => {
    return (
        <React.Fragment>
            <Helmet>
                <title>Doe</title>
            </Helmet>
            <ChatLayout />
        </React.Fragment>
    );
}

export default Home;