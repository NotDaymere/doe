import { AnimatedSidebar } from "src/components/AnimatedSidebar";

interface OnboardingSidebarProps {
    step: number;
    showSidebar: boolean;
    handleSidebarOpen: () => void;
    handleSidebarClose: () => void;
    handleUserClickedSidebarButton: (type: string) => void;
    profileData: {
        name: string;
        email: string;
        photo: string;
    };
}

export function OnboardingSidebar({
    step,
    showSidebar,
    handleSidebarOpen,
    handleSidebarClose,
    handleUserClickedSidebarButton,
    profileData,
}: OnboardingSidebarProps) {
    return (
        <AnimatedSidebar
            step={step}
            showSidebar={showSidebar && step <= 57}
            darkMode={step === 25}
            handleSidebarOpen={handleSidebarOpen}
            handleSidebarClose={handleSidebarClose}
            handleUserClickedSidebarButton={handleUserClickedSidebarButton}
            profileData={profileData}
        />
    );
}
