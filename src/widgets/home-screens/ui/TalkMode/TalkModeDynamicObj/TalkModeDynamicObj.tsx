import React from "react";
import css from "./TalkModeDynamicObj.module.less"
import { TalkModeIcon } from "../../../../../shared/icons/TalkMode.icon";

interface TalkModeDynamicObjProps {
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

export const TalkModeDynamicObj: React.FC<TalkModeDynamicObjProps> = ({
                                                                          onMouseEnter,
                                                                          onMouseLeave,
                                                                      }) => {
    return (
        <section
            className={css.talkModeIconContainer}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <TalkModeIcon opacity={1} />
            <svg
                className={css.wave1}
                width="58"
                height="50"
                viewBox="0 0 58 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M44.999 8.62031L44.9988 8.62021L44.9857 8.61278L44.9328 8.58307C44.8858 8.55682 44.8157 8.51789 44.7236 8.46746C44.5393 8.36661 44.2671 8.21982 43.9165 8.0367C43.2153 7.67045 42.2006 7.159 40.9485 6.57923C38.4435 5.41934 34.992 3.98767 31.2018 2.89759C27.4097 1.80696 23.2909 1.06192 19.4477 1.26577C15.6065 1.46951 12.0583 2.61957 9.37651 5.30138C-1.47957 16.1575 -1.47957 33.7587 9.37651 44.6148C11.6562 46.8944 14.3825 47.7332 17.4776 48.0192C19.0276 48.1624 20.6647 48.1664 22.3818 48.1447C22.7455 48.1401 23.1129 48.1343 23.4837 48.1285C24.8597 48.1069 26.2825 48.0846 27.7384 48.1181C29.5952 48.1608 31.3598 48.3173 33.0415 48.4664C33.2636 48.4861 33.4843 48.5056 33.7036 48.5248C35.5869 48.6893 37.3639 48.8237 39.0724 48.7579C42.4742 48.6269 45.6015 47.7031 48.6899 44.6148C55.1585 38.1461 57.773 29.2829 56.5326 20.8777C56.3298 19.5032 55.5262 18.0483 54.4048 16.6266C53.2865 15.2088 51.8698 13.846 50.473 12.6568C49.0772 11.4685 47.7069 10.4581 46.6851 9.74463C46.1744 9.38803 45.7512 9.1059 45.456 8.91313C45.3084 8.81674 45.1928 8.74271 45.1143 8.69289C45.0971 8.68193 45.0816 8.67214 45.068 8.66355C45.0506 8.65261 45.0363 8.6436 45.025 8.63656L45.0025 8.62245L44.999 8.62031Z"
                    stroke="#FF8B12"
                    strokeWidth="0.5"
                />
            </svg>
            <svg
                className={css.wave2}
                width="82"
                height="82"
                viewBox="0 0 82 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g filter="url(#filter0_d_1141_16278)">
                    <path
                        d="M68.5819 40.9628C68.5819 56.1776 56.2479 68.5116 41.0331 68.5116C25.8184 68.5116 13.4844 56.1776 13.4844 40.9628C13.4844 37.8182 14.7825 35.3522 16.7477 32.9869C17.7335 31.8005 18.8801 30.6479 20.109 29.4496C20.3683 29.1968 20.6314 28.9418 20.8972 28.6842C21.8859 27.7261 22.9123 26.7314 23.9217 25.6744C25.2105 24.3249 26.3531 22.96 27.4363 21.666C27.5795 21.495 27.7216 21.3252 27.8629 21.1568C29.0786 19.7084 30.231 18.3681 31.4727 17.2184C33.9338 14.9399 36.74 13.4141 41.0331 13.4141C50.0987 13.4141 58.1416 17.7924 63.1627 24.5521C66.5676 29.1359 68.5819 34.8134 68.5819 40.9628Z"
                        stroke="#FF8B12"
                        strokeOpacity="0.4"
                        shapeRendering="crispEdges"
                    />
                </g>
                <defs>
                    <filter
                        id="filter0_d_1141_16278"
                        x="0.984375"
                        y="0.914062"
                        width="80.0977"
                        height="80.0977"
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
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1141_16278" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1141_16278" result="shape" />
                    </filter>
                </defs>
            </svg>
            <svg
                className={css.wave3}
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    opacity="0.3"
                    d="M29.0333 1.16811C13.6804 1.16811 1.23452 13.614 1.23452 28.9669C1.23452 44.3197 13.6804 56.7656 29.0333 56.7656C32.2572 56.7656 34.7781 55.4309 37.1689 53.4446C38.3662 52.4498 39.5266 51.2951 40.7255 50.0655C40.9794 49.8051 41.2351 49.5412 41.4932 49.2749C42.4509 48.2867 43.4412 47.2648 44.4943 46.2591C45.8375 44.9763 47.1959 43.8392 48.4904 42.7555C48.6614 42.6123 48.8313 42.4701 49 42.3286C50.448 41.1132 51.7995 39.9517 52.9611 38.6971C55.2739 36.1991 56.832 33.3345 56.832 28.9669C56.832 19.8188 52.4135 11.7029 45.5931 6.63659C40.9677 3.20076 35.2382 1.16811 29.0333 1.16811Z"
                    stroke="#FF8B12"
                    strokeWidth="0.5"
                />
            </svg>
        </section>
    );
};
