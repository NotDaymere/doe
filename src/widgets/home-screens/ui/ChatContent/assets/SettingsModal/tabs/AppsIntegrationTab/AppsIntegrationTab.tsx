import PlusSquareIcon from "src/shared/icons/PlusSquare.icon";
import styles from "./AppsIntegrationTab.module.less";
import { GoogleDriveIcon } from "src/shared/icons/GoogleDriveIcon";
import NotionIcon from "src/shared/icons/Notion.icon";
import { AppIntegrationItem } from "../../components/AppIntegrationItem/AppIntegrationItem";
import { ModalButton } from "../../components/ModalButton/ModalButton";

const CONNECTED_APPS = [
    {
        icon: <GoogleDriveIcon />,
        title: "Google Drive",
        description: "Upload Google Docs, Sheets, Slides and other files.",
        onDisconnectClick: () => {
            console.log("Disconnect Google Drive");
        },
    },
    {
        icon: <NotionIcon />,
        title: "Notion",
        description: "Upload Notion Docs, Sheets, Slides and other files.",
        onDisconnectClick: () => {
            console.log("Disconnect Notion");
        },
    },
];

export const AppsIntegrationTab = () => {
    return (
        <div className={styles.appIntegration}>
            <div className={styles.appIntegration__header__container}>
                <h2 className={styles.appIntegration__header__title}>Apps integration</h2>
                <ModalButton variant="primary">
                    <PlusSquareIcon />
                    <span>Connect Applications</span>
                </ModalButton>
            </div>
            <div className={styles.appIntegration__contentWrapper}>
                <div className={styles.appIntegration__content}>
                    {CONNECTED_APPS.map((app) => (
                        <AppIntegrationItem {...app} />
                    ))}
                </div>
            </div>
        </div>
    );
};
