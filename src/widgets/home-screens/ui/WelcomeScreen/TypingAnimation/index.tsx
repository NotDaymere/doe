// // // import { useState, useEffect } from "react";

// // // const TypingAnimation = ({ text, speed = 100 }: any) => {
// // //     const [displayText, setDisplayText] = useState("");
// // //     const [index, setIndex] = useState(0);

// // //     useEffect(() => {
// // //         const timeout = setTimeout(() => {
// // //             setDisplayText((prev) => prev + text.charAt(index));
// // //             setIndex(index + 1);
// // //         }, speed);
// // //         return () => clearTimeout(timeout);
// // //     }, [index, text, speed]);

// // //     return (
// // //         <div style={{ fontFamily: "Courier", fontSize: "24px" }}>
// // //             {displayText}
// // //             <span className="caret">|</span>
// // //         </div>
// // //     );
// // // };

// // // export default TypingAnimation;

// // import { useState, useEffect, ReactElement, FC } from "react";
// // import css from "./TypingAnimation.module.less";

// // interface IProps {
// //     text: string;
// //     speed?: number;
// // }

// // const TypingAnimation: FC<IProps> = ({ text, speed = 100 }) => {
// //     const [displayText, setDisplayText] = useState("");
// //     const [index, setIndex] = useState(0);

// //     useEffect(() => {
// //         const timeout = setTimeout(() => {
// //             setDisplayText((prev) => prev + text.charAt(index));
// //             setIndex(index + 1);
// //         }, speed);
// //         return () => clearTimeout(timeout);
// //     }, [index, text, speed]);

// //     return (
// //         <div
// //             style={{
// //                 fontFamily: "Courier",
// //                 fontSize: "24px",
// //                 display: "inline-flex",
// //                 alignItems: "center",
// //             }}
// //         >
// //             {displayText}
// //         </div>
// //     );
// // };

// // export default TypingAnimation;

// import React, { useState, useEffect } from "react";

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// // The async function to handle the typing effect
// const typeText = async (text: string, setDisplayText: (text: any) => void, speed: number) => {
//     for (let i = 0; i < text.length; i++) {
//         setDisplayText((prev: any) => prev + text[i]);
//         await sleep(speed); // Wait for 'speed' milliseconds before typing next character
//     }
// };

// const TypingTextWithStyles = () => {
//     const [firstPart, setFirstPart] = useState("");
//     const [secondPart, setSecondPart] = useState("");
//     const [thirdPart, setThirdPart] = useState("");

//     useEffect(() => {
//         const typeEffect = async () => {
//             // Type the first part
//             await typeText("I'm ", setFirstPart, 100);
//             // Then type the second part
//             await typeText("Doe, powered by the new ", setSecondPart, 100);
//             // Finally type the third part
//             await typeText("Bilateral Cortex Model.", setThirdPart, 100);
//         };

//         typeEffect(); // Start the typing effect
//     }, []);

//     return (
//         <div style={{ fontSize: "24px" }}>
//             {/* First part - Regular */}
//             <span style={{ fontFamily: "Arial, sans-serif" }}>{firstPart}</span>

//             {/* Second part - Italics */}
//             <span style={{ fontFamily: "Times New Roman, serif", fontStyle: "italic" }}>
//                 {secondPart}
//             </span>

//             {/* Third part - Bold */}
//             <span style={{ fontFamily: "Arial Black, sans-serif", fontWeight: "bold" }}>
//                 {thirdPart}
//             </span>
//         </div>
//     );
// };

// export default TypingTextWithStyles;

import React, { useState, useEffect } from "react";

const TypingAnimationWithIconInText = ({ text, iconIndex, icon, speed = 100 }: any) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // if (index <= text.length) {
        const timeout = setTimeout(() => {
            // text.map((t: any) => {
            setDisplayText((prev) => prev + text.charAt(index));
            setIndex(index + 1);
            // });
        }, speed);
        return () => clearTimeout(timeout);
        // }
    }, [index, text, speed]);

    return (
        <div
            style={{
                fontFamily: "Courier",
                fontSize: "24px",
                display: "inline-flex",
                alignItems: "center",
            }}
        >
            {/* Відображення тексту до позиції іконки */}
            {/* {displayText.substring(0, iconIndex)} */}

            {/* Іконка, що з'являється на вказаній позиції */}
            {/* {index > iconIndex && icon} */}

            {/* Відображення решти тексту після іконки */}
            {displayText}
        </div>
    );
};

export default TypingAnimationWithIconInText;
