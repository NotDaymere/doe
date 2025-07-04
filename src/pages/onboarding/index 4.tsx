import { Helmet } from "react-helmet";
import { CursorProvider } from "src/contexts/CursorContext";
import { MainLayout } from "src/shared/layouts/MainLayout";
import OnboardingLayout from "src/shared/layouts/OnboardingLayout";
import "../../styles/index.less";
import "../../styles/reset.less";

const Onboarding = () => {
    return (
        <MainLayout>
            <Helmet>
                <title>Onboarding</title>
            </Helmet>
            <CursorProvider>
                <OnboardingLayout />
            </CursorProvider>
        </MainLayout>
    );
};

export default Onboarding;
