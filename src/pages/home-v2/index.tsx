import "../../styles/reset.less";
import "../../styles/index.less";
import { Helmet } from "react-helmet";
import { MainLayout } from "src/shared/layouts/MainLayout";
import { ChatLayout } from "src/widgets/home-screens";
import { useChatStore } from "src/shared/providers";
import Sharing from "src/widgets/home-screens/ui/LiveTools/Sharing";

const Home = () => {
    const { isSharingActive, setIsSharingActive } = useChatStore();
    return (
        <MainLayout>
            <Helmet>
                <title>Doe</title>
            </Helmet>
            <ChatLayout />
            {isSharingActive && (
                <Sharing isActive={isSharingActive} setIsActive={setIsSharingActive} />
            )}
        </MainLayout>
    );
};

export default Home;
