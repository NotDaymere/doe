import React, { FC } from "react";

interface VideoPlayIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const VideoPlayIcon: FC<VideoPlayIconProps> = ({
                                                   fill = "#B5B5B5",
                                                   width = 60,
                                                   height = 60,
                                                   opacity = 1,
                                                   ...props
                                               }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 60 60"
            fill="none"
            opacity={opacity}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#clip0_1291_21526)">
                <foreignObject x="-5" y="-5" width="68.9316" height="69.9707">
                    <div
                        style={{
                            backdropFilter: "blur(2.5px)",
                            clipPath: "url(#bgblur_1_1291_21526_clip_path)",
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </foreignObject>
                <g data-figma-bg-blur-radius="5">
                    <path
                        d="
              M58.9312 29.9854
              C58.9312 46.5067 45.7295 59.9708 29.4656 59.9708
              C13.2306 59.9708 0 46.5067 0 29.9854
              C0 13.4346 13.2306 0 29.4656 0
              C45.7295 0 58.9312 13.4346 58.9312 29.9854
              Z
            "
                        fill="#00000033"
                    />
                    <path
                        d="
              M21.0014 19.4611
              V40.539
              C21.0014 42.009 22.5903 42.6851 23.9769 41.8326
              L40.9341 31.6611
              C42.1762 30.8968 42.1472 29.1328 40.9341 28.3979
              L23.9769 18.1676
              C22.7058 17.4033 21.0014 18.0206 21.0014 19.4611
              Z
            "
                        fill="white"
                    />
                    <path
                        d="M41.1913 32.0899L41.1913 32.0899L41.1961 32.0869C42.7593 31.125 42.7237 28.8975 41.1931 27.9702L41.1924 27.9698L24.2352 17.7395L24.2346 17.7391C23.4658 17.2768 22.5566 17.2253 21.8235 17.5246C21.0767 17.8296 20.5014 18.5108 20.5014 19.4611V40.539C20.5014 41.4774 21.0208 42.192 21.7711 42.5158C22.5074 42.8336 23.4214 42.7601 24.2363 42.26C24.2371 42.2595 24.2379 42.259 24.2388 42.2585L41.1913 32.0899ZM58.4312 29.9854C58.4312 46.2391 45.4448 59.4708 29.4656 59.4708C13.515 59.4708 0.5 46.2388 0.5 29.9854C0.5 13.7028 13.5147 0.5 29.4656 0.5C45.4451 0.5 58.4312 13.7025 58.4312 29.9854Z"
                        stroke="white"
                        strokeOpacity="0.1"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="bgblur_1_1291_21526_clip_path" transform="translate(5 5)">
                    <path d="M58.9312 29.9854C58.9312 46.5067 45.7295 59.9708 29.4656 59.9708C13.2306 59.9708 0 46.5067 0 29.9854C0 13.4346 13.2306 0 29.4656 0C45.7295 0 58.9312 13.4346 58.9312 29.9854ZM21.0014 19.4611V40.539C21.0014 42.009 22.5903 42.6851 23.9769 41.8326L40.9341 31.6611C42.1762 30.8968 42.1472 29.1328 40.9341 28.3979L23.9769 18.1676C22.7058 17.4033 21.0014 18.0206 21.0014 19.4611Z" />
                </clipPath>
                <clipPath id="clip0_1291_21526">
                    <rect width="60" height="60" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default VideoPlayIcon;
