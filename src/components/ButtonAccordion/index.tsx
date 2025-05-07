import clsx from "clsx";
import { useEffect, useState } from "react";
import { ReactComponent as MonitorIcon } from "src/assets/icons/bluetooth.svg";
import { ReactComponent as BluetoothIcon } from "src/assets/icons/monitor.svg";
import { ReactComponent as UsbIcon } from "src/assets/icons/usb.svg";
import css from "./ButtonAccordion.module.less";

export const ButtonAccordion = ({
    handleCloseScreenSharing,
}: {
    handleCloseScreenSharing: () => void;
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        let current = 0;
        const interval = setInterval(() => {
            setActiveIndex(current);
            current++;
            if (current >= 4) {
                clearInterval(interval);
                handleCloseScreenSharing();
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={css.accordion_container}>
            <div className={clsx(css.accordion_button, { [css.active]: activeIndex === 2 })}>
                <UsbIcon />
            </div>
            <div className={clsx(css.accordion_button, { [css.active]: activeIndex === 1 })}>
                <MonitorIcon />
            </div>
            <div className={clsx(css.accordion_button, { [css.active]: activeIndex === 0 })}>
                <BluetoothIcon />
            </div>
        </div>
    );
};
