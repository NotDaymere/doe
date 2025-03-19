import "../../styles/reset.less";
import "../../styles/index.less";
import {Helmet} from "react-helmet";
import { MainLayout } from "src/shared/layouts/MainLayout";
import { ChatLayout } from "src/widgets/home-screens";

const Home = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>Doe</title>
            </Helmet>
            <ChatLayout />
        </MainLayout>
    );
}

export default Home;