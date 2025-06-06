import "../../styles/reset.less";
import "../../styles/index.less";
import { Helmet } from "react-helmet";
import { MainLayout } from "src/shared/layouts/MainLayout";
import { ChatLayout } from "src/widgets/home-screens";
import Console from "src/components/Console/Console";
import AddChartsAndWidgets from "src/components/AddChartsAndWidgets/AddChartsAndWidgets";

import Comments from "src/components/Comments/Comments";
import ChartWidgetsWindow from "src/components/widgetAndChart/Window/ChartWidgetsWindow";
import { useAppStore, useChatStore } from "src/shared/providers";
import { SidebarGaia } from "src/widgets/Sidebar/ui";
import Sharing from "../../widgets/home-screens/ui/LiveTools/Sharing/Sharing";
import QuickSearch from "src/widgets/home-screens/ui/QuickSearch";
import css from "./index.module.less";
import { useEffect } from "react";

const Home = () => {
    const { isSharingActive, setIsSharingActive } = useChatStore();
    const { showQuickSearch, setShowQuickSearch } = useChatStore();
    const { gaiaSidebarActive } = useAppStore();

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "f") {
                event.preventDefault();
                setShowQuickSearch(true);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <MainLayout>
            <Helmet>
                <title>Doe</title>
            </Helmet>
             

            <Comments />
            <ChartWidgetsWindow />
            <Console />

            <ChatLayout />
            {gaiaSidebarActive && <SidebarGaia />}
            {isSharingActive && (
                <Sharing isActive={isSharingActive} setIsActive={setIsSharingActive} />
            )}
            {showQuickSearch && (
                <div className={css.quickSearch}>
                    <QuickSearch onClose={setShowQuickSearch} />
                </div>
            )}
        </MainLayout>
    );
};

export default Home;
