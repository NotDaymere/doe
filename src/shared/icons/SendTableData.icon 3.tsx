import React, { FC } from 'react';

interface SendTableDataIconProps extends React.SVGProps<SVGSVGElement> {
    fill?: string;
    width?: string | number;
    height?: string | number;
    opacity?: number;
}

const SendTableDataIcon: FC<SendTableDataIconProps> = ({
                                                           fill = "#5B5B5B",
                                                           width = "16",
                                                           height = "15",
                                                           opacity = 1,
                                                           ...props
                                                       }) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 16 15"
        fill="none"
        opacity={opacity}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M0 13.8603C0 14.4187 0.317431 14.74 0.861597 14.74C1.0581 14.74 1.24705 14.6787 1.49646 14.5411L4.67077 12.8047V0.130036C4.53473 0.198878 4.38357 0.275369 4.24752 0.351861L0.665093 2.43243C0.211621 2.68485 0 3.05201 0 3.56451V13.8603ZM5.7062 12.6593L9.51535 14.8241C9.62873 14.8853 9.74969 14.9388 9.863 14.9694V2.48598L6.12944 0.17593C6.00096 0.0917903 5.84979 0.0305966 5.7062 0V12.6593ZM10.8909 14.9464C10.9665 14.9235 11.0496 14.8929 11.1176 14.847L15.0553 12.5829C15.5088 12.3304 15.7204 11.9632 15.7204 11.4508V1.14737C15.7204 0.581336 15.4029 0.267721 14.8588 0.267721C14.6623 0.267721 14.4734 0.328914 14.2239 0.466598L10.8909 2.34064V14.9464Z"
            fill={fill}
        />
    </svg>
);

export default SendTableDataIcon;
