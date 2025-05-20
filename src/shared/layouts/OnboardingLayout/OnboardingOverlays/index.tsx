import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import BranchesMenuBox from "src/components/BranchesMenuBox";
import { GhostCursor } from "src/components/GhostCursor";
import { NavigationPrompt } from "src/components/NavigationPrompt";
import { OnboardingScreenSharing } from "src/components/OnboardingScreenSharing";
import PlaygroundsBox from "src/components/PlaygroundsBox";
import { QuickSearch } from "src/components/QuickSearch";
import { SettingsModal } from "src/components/SettingsModal";
import { TalkingAssistant } from "src/components/TalkingAssistant";
import { OnboardingStep } from "src/helpers/onboardingFlow";
import css from "../OnboardingLayout.module.less";

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
    handleVideoClick: () => void;
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
    handleVideoClick,
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
            <div
                className={clsx(css.overlay_boxes, {
                    [css.unfold]: (step >= 32 && step <= 34) || (step >= 42 && step <= 43),
                })}
            >
                <BranchesMenuBox step={step} />
                <PlaygroundsBox step={step} />
            </div>
            <TalkingAssistant step={step} handleVideoClick={handleVideoClick} />
            <SettingsModal
                nextStep={nextStep}
                step={step}
                profileData={profileData}
                setProfileData={setProfileData}
                handleSaveSettings={handleSaveSettings}
            />
            <OnboardingScreenSharing step={step} />
            <QuickSearch step={step} />
        </>,
        document.body
    );
}
