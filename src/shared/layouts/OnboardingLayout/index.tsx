import clsx from "clsx";
import { useState } from "react";
import { Playground } from "src/components/Playground";
import { useChat } from "src/hooks/useChat";
import { useOnboardingFlow } from "src/hooks/useOnboardingFlow";
import { OnboardingBody } from "./OnboardingBody";
import css from "./OnboardingLayout.module.less";
import { OnboardingOverlays } from "./OnboardingOverlays";
import { OnboardingSidebar } from "./OnboardingSidebar";

export default function OnboardingLayout() {
    const [showSidebar, setShowSidebar] = useState(false);
    const { messages, setMessages, handleUserMessage, profileData, setProfileData } =
        useChat(setShowSidebar);
    const flow = useOnboardingFlow(setMessages);
    const step = flow.step;
    const isDevMode = false;

    return (
        <main className={css.layout_main}>
            <div
                className={clsx(css.layout, {
                    [css.dark]: flow.step === 25,
                    [css.white_bg]: step >= 28.1 && step < 58,
                })}
            >
                <OnboardingSidebar {...flow} showSidebar={showSidebar} profileData={profileData} />
                <OnboardingBody {...flow} messages={messages} onSendMessage={handleUserMessage} />
                <Playground currentStep={flow.currentStep} />
            </div>

            <OnboardingOverlays
                {...flow}
                profileData={profileData}
                setProfileData={setProfileData}
            />
            {isDevMode && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        position: "absolute",
                        left: "28px",
                        top: "20px",
                        background: "#f5f5f5",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        fontSize: "14px",
                        zIndex: 999,
                    }}
                >
                    <div style={{ fontWeight: "bold" }}>Dev Mode</div>
                    <label>
                        Step:
                        <input
                            type="number"
                            value={step}
                            onChange={(e) => flow.setStep(Number(e.target.value))}
                            min={0}
                            max={60}
                            style={{
                                marginLeft: "6px",
                                padding: "4px 6px",
                                width: "60px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                backgroundColor: "#fff",
                            }}
                        />
                    </label>
                    <button style={btnStyle} onClick={() => setShowSidebar(true)}>
                        Sidebar
                    </button>
                    <button style={btnStyle} onClick={() => flow.handleCursorAcknowledged()}>
                        Cursor
                    </button>
                    <button style={btnStyle} onClick={() => flow.setBlockSteps(false)}>
                        Unblock Steps
                    </button>
                    <button style={btnStyle} onClick={() => flow.setBlockInput(false)}>
                        Unblock Input
                    </button>
                </div>
            )}
        </main>
    );
}

const btnStyle = {
    padding: "4px 10px",
    backgroundColor: "#e0e0e0",
    border: "1px solid #bbb",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
};
