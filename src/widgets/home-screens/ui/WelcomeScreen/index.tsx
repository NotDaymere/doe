import { ReactElement, useEffect, useState } from "react";
import DoeLogoIcon from "src/shared/icons/DoeLogo.icon";
import WelcomeMagicIcon from "src/shared/icons/WelcomeMagic.icon";
import css from "./WelcomeScreen.module.less";

const TYPING_SPEED = 50;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const typeText = async (text: string, setDisplayText: any, speed: number, setDotVisible: any) => {
    for (let i = 0; i < text.length; i++) {
        setDisplayText((prev: any) => prev + text[i]);
        setDotVisible(true);
        await sleep(speed);
    }
    setDotVisible(false);
};

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
    const [dotVisible, setDotVisible] = useState(false);

    useEffect(() => {
        const typeEffect = async () => {
            await typeText("I'm ", setFirstPart, TYPING_SPEED, setDotVisible);
            setTimeout(() => {
                setSecondPart(<DoeLogoIcon width={16} height={16} className={css.icon} />);
            }, TYPING_SPEED);
            await typeText(" Doe, ", setThirdPart, TYPING_SPEED, setDotVisible);
            await typeText("powered by the new ", setFourthPart, TYPING_SPEED, setDotVisible);
            await typeText("Bilateral Cortex Model.", setFifthPart, TYPING_SPEED, setDotVisible);
            await typeText(
                "I’m the first non-LLM generative model capable of ",
                setSixthPart,
                TYPING_SPEED,
                setDotVisible
            );
            await typeText("actual reasoning. ", setSeventhPart, TYPING_SPEED, setDotVisible);
            await typeText(
                "Ask me anything, and you’ll feel the...",
                setEighthPart,
                TYPING_SPEED,
                setDotVisible
            );
            setTimeout(() => {
                setNinthPart(<WelcomeMagicIcon width={308} height={287} className={css.magic} />);
            }, TYPING_SPEED);
        };

        typeEffect();
    }, []);

    return (
        <div className={css.welcomeScreen}>
            <div className={css.welcomeText}>
                <span>{firstPart}</span>
                &nbsp;{secondPart}&nbsp;
                <span className={css.italic}>{thirdPart}&nbsp;</span>
                <span>{fourthPart}&nbsp;</span>
                <span className={css.bold}>{fifthPart}&nbsp;</span>
                <span>{sixthPart}</span>
                <span className={css.bold}>&nbsp;{seventhPart}</span>
                <span>&nbsp;{eighthPart}</span>
                {dotVisible && <span className={css.dot}>●</span>}
            </div>
            {ninthPart}
        </div>
    );
};

export default WelcomeScreen;
