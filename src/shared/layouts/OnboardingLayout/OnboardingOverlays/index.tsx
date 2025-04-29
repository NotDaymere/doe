import { createPortal } from "react-dom";
import BranchesMenuBox from "src/components/BranchesMenuBox";
import { GhostCursor } from "src/components/GhostCursor";
import { NavigationPrompt } from "src/components/NavigationPrompt";
import PlaygroundsBox from "src/components/PlaygroundsBox";
import { QuickSearch } from "src/components/QuickSearch";
import { ScreenSharing } from "src/components/ScreenSharing";
import { SettingsModal } from "src/components/SettingsModal";
import { TalkingAssistant } from "src/components/TalkingAssistant";
import { OnboardingStep } from "src/helpers/onboardingFlow";

interface OnboardingOverlaysProps {
    step: number;
    nextStep: () => void;
    currentStep?: OnboardingStep;
    handleNavigationAnimation: () => void;
    handleCursorAcknowledged: () => void;
}

export function OnboardingOverlays({
    step,
    nextStep,
    currentStep,
    handleNavigationAnimation,
    handleCursorAcknowledged,
}: OnboardingOverlaysProps) {
    return createPortal(
        <>
            <GhostCursor
                currentStep={currentStep}
                handleCursorAcknowledged={handleCursorAcknowledged}
            />
            <NavigationPrompt step={step} handleNavigationAnimation={handleNavigationAnimation} />
            <BranchesMenuBox step={step} />
            <PlaygroundsBox step={step} />
            <TalkingAssistant step={step} />
            <SettingsModal nextStep={nextStep} step={step} />
            <ScreenSharing step={step} />
            <QuickSearch step={step} />
        </>,
        document.body
    );
}
