import { Fragment, ReactElement, useEffect, useState } from "react";
import DoeIcon from "src/shared/icons/Doe.icon";
import WelcomeMagicIcon from "src/shared/icons/WelcomeMagic.icon";
import css from "./WelcomeScreen.module.less";
import TypingAnimationWithIconInText from "./TypingAnimation";

interface ITextPart {
    type: "text" | "icon";
    value: string | ReactElement;
    styles?: string;
}

const sleep = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

// const typeText = async (
//     textArray: ITextPart[],
//     setDisplayText: (value: any) => void,
//     speed: number
// ) => {
//     for (let i = 0; i < textArray.length; i++) {
//         // Using function form to ensure we update the state correctly in async
//         setDisplayText((prev: ITextPart[]) => [...prev, textArray[i]]);
//         await sleep(speed); // Ensure sleep is awaited properly
//     }
// };

const typeText = async (text: string, setDisplayText: any, speed: number) => {
    for (let i = 0; i < text.length; i++) {
        setDisplayText((prev: any) => prev + text[i]);
        await sleep(speed);
    }
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

    useEffect(() => {
        const typeEffect = async () => {
            await typeText("I'm ", setFirstPart, 100);
            setTimeout(() => {
                setSecondPart(<DoeIcon width={16} height={16} className={css.animatedIcon} />);
            }, 100);
            await typeText(" Doe, ", setThirdPart, 100);
            await typeText("powered by the new ", setFourthPart, 100);
            await typeText("Bilateral Cortex Model. ", setFifthPart, 100);
            await typeText("I’m the first non-LLM generative model capable of ", setSixthPart, 100);
            await typeText("actual reasoning. ", setSeventhPart, 100);
            await typeText("Ask me anything, and you’ll feel the...", setEighthPart, 100);
            // setTimeout(() => {
            //     setNinthPart(<WelcomeMagicIcon width={308} height={287} />);
            // }, 100);
        };

        typeEffect();
    }, []);

    return (
        <div className={css.welcomeScreen}>
            <div className={css.welcomeText}>
                <span>{firstPart}</span>
                {secondPart}
                <span className={css.italic}>{thirdPart}</span>
                <span>{fourthPart}</span>
                <span className={css.bold}>{fifthPart}</span>
                <span>{sixthPart}</span>
                <span className={css.bold}>{seventhPart}</span>
                <span>{eighthPart}</span>
            </div>
            {/* {ninthPart} */}

            <WelcomeMagicIcon width={308} height={287} />
        </div>
    );
};

export default WelcomeScreen;
