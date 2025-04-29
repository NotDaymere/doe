import { AnimatedSidebar } from "src/components/AnimatedSidebar";

interface OnboardingSidebarProps {
    step: number;
    showSidebar: boolean;
    handleSidebarOpen: () => void;
    handleSidebarClose: () => void;
    handleUserClickedSidebarButton: (type: string) => void;
}

export function OnboardingSidebar({
    step,
    showSidebar,
    handleSidebarOpen,
    handleSidebarClose,
    handleUserClickedSidebarButton,
}: OnboardingSidebarProps) {
    return (
        <AnimatedSidebar
            step={step}
            showSidebar={showSidebar}
            darkMode={step === 25}
            handleSidebarOpen={handleSidebarOpen}
            handleSidebarClose={handleSidebarClose}
            handleUserClickedSidebarButton={handleUserClickedSidebarButton}
        />
    );
}
