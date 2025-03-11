import React, { FC } from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
}

const ChatResponseStopIcon: FC<IconProps> = ({
                                   fill = "#5B5B5B",
                                   width = 12,
                                   height = 12,
                                   ...props
                               }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M0 10.373C0 11.3963 0.618784 12 1.65009 12H10.3499C11.3886 12 12 11.3963 12 10.373V1.62699C12 0.60368 11.3886 0 10.3499 0H1.65009C0.618784 0 0 0.60368 0 1.62699V10.373Z"
            fill={fill}
        />
    </svg>
);

export default ChatResponseStopIcon;

