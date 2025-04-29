import clsx from "clsx";
import { useMemo, useState } from "react";
import { Playground } from "src/components/Playground";
import { onboardingFlow } from "src/helpers/onboardingFlow";
import { useChat } from "src/hooks/useChat";
import { useOnboardingFlow } from "src/hooks/useOnboardingFlow";
import { OnboardingBody } from "./OnboardingBody";
import css from "./OnboardingLayout.module.less";
import { OnboardingOverlays } from "./OnboardingOverlays";
import { OnboardingSidebar } from "./OnboardingSidebar";

export default function OnboardingLayout() {
    const [showSidebar, setShowSidebar] = useState(false);
    const { messages, setMessages, handleUserMessage } = useChat(setShowSidebar);
    const flow = useOnboardingFlow(setMessages);
    const step = flow.step;
    const currentStep = useMemo(() => onboardingFlow.find((st) => st.id === step), [step]);
    const isDevMode = false;

    return (
        <main className={css.layout_main}>
            <div className={clsx(css.layout, { [css.dark]: flow.step === 25 })}>
                <OnboardingSidebar {...flow} showSidebar={showSidebar} />
                <OnboardingBody
                    {...flow}
                    currentStep={currentStep}
                    messages={messages}
                    onSendMessage={handleUserMessage}
                />
                <Playground currentStep={currentStep} />
            </div>

            <OnboardingOverlays {...flow} currentStep={currentStep} />
            {isDevMode && (
                <div style={{ display: "flex", position: "absolute", left: "28px", top: "20px" }}>
                    <div>dev mode </div>
                    <div style={{ marginBottom: "6px", fontWeight: 600 }}>Step:</div>
                    <input
                        type="number"
                        value={step}
                        onChange={(e) => flow.setStep(Number(e.target.value))}
                        min={0}
                        max={60}
                        style={{ paddingLeft: "10px", backgroundColor: "#E4F4FF" }}
                    />
                    <button onClick={() => setShowSidebar(true)} style={{ margin: "0 6px" }}>
                        sidebar
                    </button>
                    <button onClick={() => flow.handleCursorAcknowledged()}>cursor</button>
                    <button onClick={() => flow.setBlockSteps(false)} style={{ margin: "0 6px" }}>
                        Unblock steps
                    </button>
                </div>
            )}
        </main>
    );
}
