import "../../styles/reset.less";
import "../../styles/index.less";
import { Helmet } from "react-helmet";
import { MainLayout } from "src/shared/layouts/MainLayout";
import { ChatLayout } from "src/widgets/home-screens";
import { useAppStore, useChatStore } from "src/shared/providers";
import Sharing from "src/widgets/home-screens/ui/LiveTools/Sharing";
import { SidebarGaia } from "src/widgets/Sidebar/ui";

const Home = () => {
    const { isSharingActive, setIsSharingActive } = useChatStore();
    const { gaiaSidebarActive, setGaiaSidebarActive } = useAppStore();

    return (
        <MainLayout>
            <Helmet>
                <title>Doe</title>
            </Helmet>
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
