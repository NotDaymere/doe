import { OnboardingSidebar } from "src/components/OnboardingSidebar";

interface OnboardingSidebarProps {
    step: number;
    showSidebar: boolean;
    handleSidebarOpen: () => void;
    handleUserClickedSidebarButton: (type: string) => void;
    profileData: {
        name: string;
        email: string;
        photo: string;
    };
}

export function OnboardingSidebarWrapper({
    step,
    showSidebar,
    handleSidebarOpen,
    handleUserClickedSidebarButton,
    profileData,
}: OnboardingSidebarProps) {
    return (
        <OnboardingSidebar
            step={step}
            showSidebar={showSidebar && step <= 57}
            darkMode={step === 25}
            handleSidebarOpen={handleSidebarOpen}
            handleUserClickedSidebarButton={handleUserClickedSidebarButton}
            profileData={profileData}
        />
    );
}
