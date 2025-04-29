import { Helmet } from "react-helmet";
import { MainLayout } from "src/shared/layouts/MainLayout";
import { ChatLayout } from "src/widgets/home-screens";
import "../../styles/index.less";
import "../../styles/reset.less";

const Home = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>Doe</title>
            </Helmet>
            <ChatLayout />
        </MainLayout>
    );
};

export default Home;
