import styles from "./AppIntegrationItem.module.less";
import modalStyles from "../../SettingsModal.module.less";
import clsx from "clsx";
import { ModalButton } from "../ModalButton/ModalButton";

type AppIntegrationItemProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    onDisconnectClick: () => void;
};

export const AppIntegrationItem = ({
    icon,
    title,
    description,
    onDisconnectClick,
}: AppIntegrationItemProps) => {
    return (
        <div>
            <div className={styles.appIntegrationItem__header__container}>
                <div className={styles.appIntegrationItem__header__icon}>{icon}</div>
                <p className={styles.appIntegrationItem__header__title}>{title}</p>
                <ModalButton
                    variant="delete"
                    className={styles.appIntegrationItem__header__disconnect}
                    onClick={onDisconnectClick}
                >
                    Disconnect
                </ModalButton>
            </div>
            <p className={styles.appIntegrationItem__description}>{description}</p>
        </div>
    );
};
