import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import BluetoothIcon from "src/shared/icons/Bluetooth.icon";
import CableIcon from "src/shared/icons/Cable.icon";
import ScreenIcon from "src/shared/icons/Screen.icon";
import { FC, ReactElement, useEffect, useRef } from "react";
import { ShareType } from "src/shared/types/ScreenShare";
import css from "./ScreenShareMenu.module.less";

interface IProps {
    isActive: boolean;
    type: ShareType | null;
    onConfig: (type: ShareType | null) => void;
    onClickOutside: () => void;
}

interface IExpandedMenuConfig {
    icon: ReactElement;
    type: ShareType | null;
    classes: string;
}

const EXPANDED_MENU_CONFIG: IExpandedMenuConfig[] = [
    {
        icon: <CableIcon width={21} height={5} />,
        type: "shareViaCabel",
        classes: css.expandedIcon,
    },
    {
        icon: <BluetoothIcon width={9} height={13} />,
        type: "shareViaBluetooth",
        classes: css.bluetoothIcon,
    },
    {
        icon: <ScreenIcon width={16} height={13} />,
        type: "shareScreen",
        classes: css.expandedIcon,
    },
];

const ScreenShareMenu: FC<IProps> = ({ isActive, type, onConfig, onClickOutside }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            onClickOutside();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <CSSTransition in={isActive} timeout={500} classNames={css} unmountOnExit>
            <div className={css.shareScreenExpanded} ref={ref}>
                {EXPANDED_MENU_CONFIG.map((item) => (
                    <button
                        key={item.type}
                        className={classNames(item.classes, {
                            [css.activeShareType]: type === item.type,
                        })}
                        onMouseEnter={() => onConfig(item.type)}
                    >
                        {item.icon}
                    </button>
                ))}
            </div>
        </CSSTransition>
    );
};

export default ScreenShareMenu;
