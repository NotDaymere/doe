import { Dispatch, SetStateAction } from "react";
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
    profileData: {
        name: string;
        email: string;
        photo: string;
    };
    setProfileData: Dispatch<
        SetStateAction<{
            name: string;
            email: string;
            photo: string;
        }>
    >;
    handleNavigationAnimation: () => void;
    handleCursorAcknowledged: () => void;
    handleSaveSettings: () => void;
}

export function OnboardingOverlays({
    step,
    nextStep,
    currentStep,
    profileData,
    setProfileData,
    handleNavigationAnimation,
    handleCursorAcknowledged,
    handleSaveSettings,
}: OnboardingOverlaysProps) {
    return createPortal(
        <>
            <GhostCursor
                currentStep={currentStep}
                handleCursorAcknowledged={handleCursorAcknowledged}
            />
            <NavigationPrompt
                step={step}
                currentStep={currentStep}
                handleNavigationAnimation={handleNavigationAnimation}
            />
            <BranchesMenuBox step={step} />
            <PlaygroundsBox step={step} />
            <TalkingAssistant step={step} />
            <SettingsModal
                nextStep={nextStep}
                step={step}
                profileData={profileData}
                setProfileData={setProfileData}
                handleSaveSettings={handleSaveSettings}
            />
            <ScreenSharing step={step} />
            <QuickSearch step={step} />
        </>,
        document.body
    );
}
