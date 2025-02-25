import { FC, SVGProps, useEffect, useState } from "react";

const DoeLogoIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
    const [animate, setAnimate] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none" {...props}>
            <path
                d="M19.3237 0.198709C16.7259 0.901438 15.5493 2.69363 15.4787 6.0705L15.4364 8.02776L11.7515 8.05134L8.06659 8.07492L8.04306 11.7678L8.01953 15.4606L6.06648 15.5031C2.80513 15.5738 1.13445 16.6067 0.296762 19.0733C-1.46333 24.2471 5.01701 28.322 8.91369 24.4924C10.2173 23.2095 10.4667 22.4738 10.495 19.7996L10.5138 17.9791L12.9845 17.9556L15.4552 17.9273V19.6063C15.4599 22.1295 15.7517 23.1199 16.8529 24.2848C20.999 28.6757 28.0677 23.8368 25.4228 18.4178C24.411 16.3426 22.7027 15.4842 19.5731 15.4795H17.9024V13.0412V10.5981L19.8084 10.5557C22.3968 10.4897 23.3945 10.1312 24.5475 8.8484C28.0771 4.915 24.3969 -1.17845 19.3237 0.198709ZM21.8038 2.68892C23.9404 3.58501 23.5858 6.67097 21.9309 7.74006V7.74006C21.5744 7.97033 21.1382 8.02776 20.7139 8.02776H19.6296H17.9024V6.62702C17.9024 4.87256 17.9965 4.34905 18.4295 3.71707C19.1731 2.63232 20.6178 2.1937 21.8038 2.68892ZM15.4552 13.027V15.4842L12.9845 15.4559L10.5138 15.4323L10.4902 13.0035L10.462 10.5746H12.961H15.4552V13.027ZM8.01953 19.6629V21.3937L7.72775 21.9786C6.41944 24.6008 2.53218 23.6529 2.52276 20.7146C2.51806 19.9223 2.73925 19.394 3.3181 18.8092C4.04755 18.0688 4.4664 17.9603 6.53709 17.9414L8.01953 17.932V19.6629ZM21.8085 18.2008C22.7968 18.6489 23.3662 19.4648 23.4368 20.5307C23.6392 23.6859 19.4648 24.6904 18.1518 21.8041C17.9542 21.3702 17.7895 18.4555 17.9401 18.064C18.0389 17.8046 21.1826 17.9131 21.8085 18.2008Z"
                fill={animate ? "url(#redBlueBlackGradient)" : "url(#rgb_gradient)"}
                style={{ animation: animate ? "gradientChange 1s ease-in-out forwards" : "" }}
            />
            <defs>
                <linearGradient id="redBlackBlackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF5F5F" />
                    <stop offset="50%" stopColor="#1F1F1F" />
                    <stop offset="100%" stopColor="#1F1F1F" />
                </linearGradient>
                <linearGradient id="redBlueBlackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF5F5F" />
                    <stop offset="50%" stopColor="#127FFF" />
                    <stop offset="100%" stopColor="#1F1F1F" />
                </linearGradient>
                <linearGradient
                    id="rgb_gradient"
                    x1="-1.49872"
                    y1="34.0456"
                    x2="38.5654"
                    y2="-11.9288"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#1F1F1F" />
                    <stop offset="18%" stopColor="#FF5F5F" />
                    <stop offset="48%" stopColor="#127FFF" />
                    <stop offset="82%" stopColor="#8BCF16" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default DoeLogoIcon;
