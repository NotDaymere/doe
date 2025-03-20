import { ReactElement, useEffect, useRef, useState } from "react";
import DoeLogoIcon from "src/shared/icons/DoeLogo.icon";
import WelcomeMagicIcon from "src/shared/icons/WelcomeMagic.icon";
import { useChatStore } from "src/shared/providers";
import css from "./WelcomeScreen.module.less";

const TYPING_SPEED = 50;

const WelcomeScreen = () => {
    const [firstPart, setFirstPart] = useState("");
    const [secondPart, setSecondPart] = useState<ReactElement | null>(null);
    const [thirdPart, setThirdPart] = useState("");
    const [fourthPart, setFourthPart] = useState("");
    const [fifthPart, setFifthPart] = useState("");
    const [sixthPart, setSixthPart] = useState("");
    const [seventhPart, setSeventhPart] = useState("");
    const [eighthPart, setEighthPart] = useState("");
    const [ninthPart, setNinthPart] = useState<ReactElement | null>(null);
    const [caretVisible, setCaretVisible] = useState(false);
    const { setDisableButtons } = useChatStore();
    const textContainerRef = useRef<HTMLDivElement | null>(null);

    const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

    const typeText = async (
        text: string,
        setDisplayText: React.Dispatch<React.SetStateAction<string>>,
        speed: number,
        setCaretVisible: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<void> => {
        for (let i = 0; i < text.length; i++) {
            setCaretVisible(true);
            await sleep(speed);
            setDisplayText((prev) => prev + text[i]);
            setCaretVisible(false);
            await sleep(speed);
        }
    };

    useEffect(() => {
        const typeEffect = async (): Promise<void> => {
            setDisableButtons(true);
            await typeText("I'm ", setFirstPart, TYPING_SPEED, setCaretVisible);
            setTimeout(() => {
                setSecondPart(<DoeLogoIcon width={26} height={26} className={css.icon} />);
            }, TYPING_SPEED);
            await typeText(" Doe, ", setThirdPart, TYPING_SPEED, setCaretVisible);
            await typeText("powered by the new ", setFourthPart, TYPING_SPEED, setCaretVisible);
            await typeText("Bilateral Cortex Model. ", setFifthPart, TYPING_SPEED, setCaretVisible);
            await typeText(
                "I’m the first non-LLM generative model capable of ",
                setSixthPart,
                TYPING_SPEED,
                setCaretVisible
            );
            await typeText("actual reasoning. ", setSeventhPart, TYPING_SPEED, setCaretVisible);
            await typeText(
                "Ask me anything, and you’ll feel the...",
                setEighthPart,
                TYPING_SPEED,
                setCaretVisible
            );
            setTimeout(() => {
                setNinthPart(<WelcomeMagicIcon width={308} height={287} className={css.magic} />);
            }, TYPING_SPEED);
            setDisableButtons(false);
        };
        typeEffect();
    }, []);

    return (
        <div className={css.welcomeScreenWrapper}>
            <div className={css.welcomeScreen}>
                <div className={css.welcomeText} ref={textContainerRef}>
                    <span>{firstPart}</span>
                    <span>{secondPart}</span>
                    <span className={css.italic}>{thirdPart}</span>
                    <span>{fourthPart}</span>
                    <span className={css.bold}>{fifthPart}</span>
                    <span>{sixthPart}</span>
                    <span className={css.bold}>{seventhPart}</span>
                    <span>{eighthPart}</span>
                    {caretVisible && <span className={css.caret} />}
                </div>
                <span>{ninthPart}</span>
            </div>
        </div>
    );
};

export default WelcomeScreen;
