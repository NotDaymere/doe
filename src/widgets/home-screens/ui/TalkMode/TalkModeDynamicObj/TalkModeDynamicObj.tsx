import React from "react";
import css from "./TalkModeDynamicObj.module.less";
import { TalkModeIcon } from "../../../../../shared/icons/TalkMode.icon";

interface TalkModeDynamicObjProps {
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    volume?: number;
    isThinkDoeMode?: boolean;
}

export const TalkModeDynamicObj: React.FC<TalkModeDynamicObjProps> = ({
                                                                          onMouseEnter,
                                                                          onMouseLeave,
                                                                          volume = 0,
                                                                          isThinkDoeMode = false,
                                                                      }) => {
    const defaultBoxShadow = `0 0 ${5 + volume * 130}px rgba(255, 139, 18, ${0.3 + volume * 0.7})`;
    const answerModeBoxShadow = `0 0 ${20 + volume * 100}px rgba(255, 139, 18, ${0.4 + volume * 0.4})`;
    const boxShadow = isThinkDoeMode ? answerModeBoxShadow : defaultBoxShadow;
    let answerK = isThinkDoeMode ? 2 : 1;
    const scale = 1 + volume * 0.3 * answerK;

    const wave1Width = 58 + volume * 31;
    const wave1Height = 50 + volume * 33;
    const wave1Opacity = Math.min(0.3 + volume * 0.4, 1);

    const wave2Width = 82 + volume * 29;
    const wave2Height = 82 + volume * 28;
    const wave2Opacity = Math.min(0.5 + volume * 0.3, 1);

    const wave3Width = 58 + volume * 30;
    const wave3Height = 58 + volume * 32;
    const wave3Opacity = Math.min(0.3 + volume * 0.7, 1);

    return (
        <section
            className={`${css.talkModeIconContainer} ${isThinkDoeMode ? css.answerMode : ""}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                position: "relative",
                boxShadow,
            }}
        >
            {isThinkDoeMode ? (
                <>
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 65 65"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            transform: `scale(${scale * 1.3})`,
                            pointerEvents: "none"
                        } as React.CSSProperties}
                    >
                        <g filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feDropShadow dx="1" dy="1" stdDeviation="0.5" floodOpacity="0.1" />
                            <path
                                d="M32.5,0
                                   C44.69,0 59.58,20.31 59.58,32.5
                                   C59.58,44.69 44.69,59.58 32.5,59.58
                                   C20.31,59.58 5.42,44.69 5.42,32.5
                                   C5.42,20.31 20.31,0 32.5,0 Z"
                                stroke="white"
                                strokeOpacity="0.74"
                                fill="none"
                                shapeRendering="crispEdges"
                            >
                                <animate attributeName="d" dur="5s" repeatCount="indefinite" values="
                                  M32.5,0 C44.69,0 59.58,20.31 59.58,32.5 C59.58,44.69 44.69,59.58 32.5,59.58 C20.31,59.58 5.42,44.69 5.42,32.5 C5.42,20.31 20.31,0 32.5,0 Z;
                                  M32.5,5.42 C45,5.42 63,22 63,32.5 C63,43 45,59.58 32.5,59.58 C20,59.58 5.42,43 5.42,32.5 C5.42,22 20,5.42 32.5,5.42 Z;
                                  M32.5,4 C46,2 60,18 58,32.5 C56,47 42,60 32.5,59 C23,58 4,45 5,32.5 C6,20 18,6 32.5,4 Z;
                                  M33,3 C47,0 62,25 60,33 C58,41 40,62 28,60 C15,58 2,38 4,25 C6,12 18,6 33,3 Z;
                                  M32.5,7 C50,3 65,30 60,35 C55,40 35,60 20,58 C8,56 3,32 5,20 C7,8 18,10 32.5,7 Z;
                                  M30,5 C45,10 60,15 62,32.5 C64,50 50,60 35,58 C20,56 10,42 8,25 C6,8 15,2 30,5 Z;
                                  M32.5,0 C48,5 60,22 59,35 C58,48 42,60 28,58 C12,56 5,40 5,32.5 C5,25 10,2 32.5,0 Z;
                                  M32.5,6 C46,4 58,20 60,32 C62,44 48,58 32.5,60 C17,58 4,44 5,32 C6,20 18,8 32.5,6 Z;
                                  M32.5,3 C44,2 57,25 55,33 C53,41 35,59 22,57 C9,55 3,35 5,20 C7,5 18,4 32.5,3 Z;
                                  M32.5,0 C44.69,0 59.58,20.31 59.58,32.5 C59.58,44.69 44.69,59.58 32.5,59.58 C20.31,59.58 5.42,44.69 5.42,32.5 C5.42,20.31 20.31,0 32.5,0 Z
                                " />
                            </path>
                        </g>
                        <defs>
                            <filter
                                id="filter0_d_1141_16427"
                                x="0.762695"
                                y="0.0703125"
                                width="85.5801"
                                height="87.9268"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.0705882 0 0 0 1 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_1141_16427"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_1141_16427"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>


                    <svg className={css.wave1}
                         width={wave1Width}
                         height={wave1Height}
                         viewBox="0 0 70 69"
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                         style={{
                             opacity: wave3Opacity,
                             pointerEvents: "none"
                         }}
                    >
                        <path
                            d="M62.6629 6.17588C56.3782 -0.28883 48.0812 -0.549817 39.8239 2.31691C31.5624 5.18507 23.3908 11.1723 17.4522 17.1109C11.5216 23.0415 4.70544 33.3278 1.92041 43.1485C0.528084 48.0582 0.150526 52.8262 1.36978 56.8674C2.58509 60.8956 5.39413 64.2277 10.436 66.2704C16.4406 68.7032 21.1467 68.0309 25.3639 66.7666C26.4208 66.4497 27.4466 66.0957 28.4572 65.7428C28.5518 65.7098 28.6463 65.6768 28.7407 65.6438C29.6527 65.325 30.5539 65.01 31.449 64.7302C33.4249 64.1126 35.3904 63.6598 37.4337 63.7068C39.452 63.7532 41.37 63.9233 43.1987 64.0854C43.4403 64.1068 43.6804 64.1281 43.9189 64.1489C45.9667 64.3279 47.9002 64.4741 49.7596 64.4025C53.4631 64.2599 56.8693 63.2537 60.2321 59.8909C67.2712 52.8518 70.1161 43.207 68.7664 34.0608C68.5326 32.4758 68.5201 30.4247 68.5085 28.1385L68.5081 28.0594C68.4966 25.786 68.4839 23.2705 68.2619 20.7022C67.8125 15.5023 66.508 10.1311 62.6629 6.17588Z"
                            stroke="#FF8B12" strokeWidth="0.5" />
                    </svg>

                    <svg
                        className={css.wave2}
                        width={wave2Width}
                        height={wave2Height}
                        viewBox="0 0 82 82"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            transform: `scale(${scale})`,
                            pointerEvents: "none",
                            opacity: wave2Opacity,
                        }}
                    >
                        <g filter="url(#filter0_d)">
                            <path
                                d="M68.5819 40.9628C68.5819 56.1776 56.2479 68.5116 41.0331 68.5116C25.8184 68.5116 13.4844 56.1776 13.4844 40.9628C13.4844 37.8182 14.7825 35.3522 16.7477 32.9869C17.7335 31.8005 18.8801 30.6479 20.109 29.4496C20.3683 29.1968 20.6314 28.9418 20.8972 28.6842C21.8859 27.7261 22.9123 26.7314 23.9217 25.6744C25.2105 24.3249 26.3531 22.96 27.4363 21.666C27.5795 21.495 27.7216 21.3252 27.8629 21.1568C29.0786 19.7084 30.231 18.3681 31.4727 17.2184C33.9338 14.9399 36.74 13.4141 41.0331 13.4141C50.0987 13.4141 58.1416 17.7924 63.1627 24.5521C66.5676 29.1359 68.5819 34.8134 68.5819 40.9628Z"
                                stroke="#FF8B12"
                                strokeOpacity="0.4"
                                shapeRendering="crispEdges"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_d"
                                x="0"
                                y="0"
                                width="82"
                                height="82"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.0705882 0 0 0 1 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>
                </>
            ) : (
                <>
                    <TalkModeIcon opacity={1} />

                    <svg
                        className={css.wave1}
                        width={wave1Width}
                        height={wave1Height}
                        viewBox="0 0 58 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            transform: `scale(${scale + 1.5})`,
                            pointerEvents: "none",
                            opacity: wave1Opacity,
                        }}
                    >
                        <path
                            d="M44.999 8.62031L44.9988 8.62021L44.9857 8.61278L44.9328 8.58307C44.8858 8.55682 44.8157 8.51789 44.7236 8.46746C44.5393 8.36661 44.2671 8.21982 43.9165 8.0367C43.2153 7.67045 42.2006 7.159 40.9485 6.57923C38.4435 5.41934 34.992 3.98767 31.2018 2.89759C27.4097 1.80696 23.2909 1.06192 19.4477 1.26577C15.6065 1.46951 12.0583 2.61957 9.37651 5.30138C-1.47957 16.1575 -1.47957 33.7587 9.37651 44.6148C11.6562 46.8944 14.3825 47.7332 17.4776 48.0192C19.0276 48.1624 20.6647 48.1664 22.3818 48.1447C22.7455 48.1401 23.1129 48.1343 23.4837 48.1285C24.8597 48.1069 26.2825 48.0846 27.7384 48.1181C29.5952 48.1608 31.3598 48.3173 33.0415 48.4664C33.2636 48.4861 33.4843 48.5056 33.7036 48.5248C35.5869 48.6893 37.3639 48.8237 39.0724 48.7579C42.4742 48.6269 45.6015 47.7031 48.6899 44.6148C55.1585 38.1461 57.773 29.2829 56.5326 20.8777C56.3298 19.5032 55.5262 18.0483 54.4048 16.6266C53.2865 15.2088 51.8698 13.846 50.473 12.6568C49.0772 11.4685 47.7069 10.4581 46.6851 9.74463C46.1744 9.38803 45.7512 9.1059 45.456 8.91313C45.3084 8.81674 45.1928 8.74271 45.1143 8.69289C45.0971 8.68193 45.0816 8.67214 45.068 8.66355C45.0506 8.65261 45.0363 8.6436 45.025 8.63656L45.0025 8.62245L44.999 8.62031Z"
                            stroke="#FF8B12"
                            strokeWidth="0.5"
                        />
                    </svg>

                    <svg
                        className={css.wave3}
                        width={wave3Width}
                        height={wave3Height}
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ opacity: wave3Opacity,
                            pointerEvents: "none"
                        }}
                    >
                        <path
                            d="M29.0333 1.16811C13.6804 1.16811 1.23452 13.614 1.23452 28.9669C1.23452 44.3197 13.6804 56.7656 29.0333 56.7656C32.2572 56.7656 34.7781 55.4309 37.1689 53.4446C38.3662 52.4498 39.5266 51.2951 40.7255 50.0655C40.9794 49.8051 41.2351 49.5412 41.4932 49.2749C42.4509 48.2867 43.4412 47.2648 44.4943 46.2591C45.8375 44.9763 47.1959 43.8392 48.4904 42.7555C48.6614 42.6123 48.8313 42.4701 49 42.3286C50.448 41.1132 51.7995 39.9517 52.9611 38.6971C55.2739 36.1991 56.832 33.3345 56.832 28.9669C56.832 19.8188 52.4135 11.7029 45.5931 6.63659C40.9677 3.20076 35.2382 1.16811 29.0333 1.16811Z"
                            stroke="#FF8B12"
                            strokeWidth="0.5"
                        />
                    </svg>
                    <svg
                        className={css.wave2}
                        width={wave2Width}
                        height={wave2Height}
                        viewBox="0 0 82 82"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            transform: `scale(${scale + 1.2})`,
                            pointerEvents: "none",
                            opacity: wave2Opacity,
                        }}
                    >
                        <g filter="url(#filter0_d)">
                            <path
                                d="M68.5819 40.9628C68.5819 56.1776 56.2479 68.5116 41.0331 68.5116C25.8184 68.5116 13.4844 56.1776 13.4844 40.9628C13.4844 37.8182 14.7825 35.3522 16.7477 32.9869C17.7335 31.8005 18.8801 30.6479 20.109 29.4496C20.3683 29.1968 20.6314 28.9418 20.8972 28.6842C21.8859 27.7261 22.9123 26.7314 23.9217 25.6744C25.2105 24.3249 26.3531 22.96 27.4363 21.666C27.5795 21.495 27.7216 21.3252 27.8629 21.1568C29.0786 19.7084 30.231 18.3681 31.4727 17.2184C33.9338 14.9399 36.74 13.4141 41.0331 13.4141C50.0987 13.4141 58.1416 17.7924 63.1627 24.5521C66.5676 29.1359 68.5819 34.8134 68.5819 40.9628Z"
                                stroke="#FF8B12"
                                strokeOpacity="0.4"
                                shapeRendering="crispEdges"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_d"
                                x="0"
                                y="0"
                                width="82"
                                height="82"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="6" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 1 0 0 0 0 0.545098 0 0 0 0 0.0705882 0 0 0 1 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>
                </>
            )}
        </section>
    );
};
