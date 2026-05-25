import ReactDOM from "react-dom";
import styles from "./SettingsModal.module.less";
import { ProfileIcon } from "src/shared/icons/ProfileIcon";
import { GeneralSettingsIcon } from "src/shared/icons/GeneralSettingsIcon";
import { ModelSettingsIcon } from "src/shared/icons/ModelSettingsIcon";
import { AppsIntegrationSettingsIcon } from "src/shared/icons/AppsIntegrationSettingsIcon";
import { useCallback, useEffect, useMemo } from "react";
import classNames from "classnames";
import { CrossIcon } from "src/shared/icons/CrossIcon";
import { AppsIntegrationTab, GeneralTab, ModelSettingsTab, ProfileTab } from "./tabs";
import { Profile } from "src/widgets/Sidebar/ui/Profile";
import { useSearchParams } from "react-router-dom";

type SettingsModalProps = {
    onClose: () => void;
    currentProfile: Profile;
    isSideBarOpen: boolean;
    profiles: Profile[];
    changeProfile: (data: Partial<Omit<Profile, "id" | "isCurrent">>) => void;
};

export const SettingsModal = ({
    onClose,
    changeProfile,
    currentProfile,
    profiles,
    isSideBarOpen,
}: SettingsModalProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get("tab");

    const settingsTabsList = useMemo(
        () =>
            [
                {
                    name: "Profile",
                    tabName: "profile",
                    icon: <ProfileIcon />,
                    component: (
                        <ProfileTab
                            currentProfile={currentProfile}
                            onClose={onClose}
                            changeProfile={changeProfile}
                        />
                    ),
                },
                {
                    name: "General",
                    tabName: "general",
                    icon: <GeneralSettingsIcon />,
                    component: <GeneralTab currentProfile={currentProfile} profiles={profiles} />,
                },
                {
                    name: "Model Settings",
                    tabName: "model_settings",
                    icon: <ModelSettingsIcon />,
                    component: <ModelSettingsTab />,
                },
                {
                    name: "Apps Integration ",
                    tabName: "apps_integration",
                    icon: <AppsIntegrationSettingsIcon />,
                    component: <AppsIntegrationTab />,
                },
            ] as const,
        [currentProfile, onClose, profiles]
    );
    const clearSearchParams = useCallback(() => {
        searchParams.delete("tab");
        searchParams.delete("view");
        searchParams.delete("action");
        searchParams.delete("folderId");
        searchParams.delete("personaId");
        searchParams.delete("styleId");
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);

    useEffect(() => {
        clearSearchParams();
        searchParams.set("tab", "profile");
        setSearchParams(searchParams);
    }, []);
    const changeTab = (tabName: (typeof settingsTabsList)[number]["tabName"]) => {
        clearSearchParams();
        searchParams.set("tab", tabName);
        setSearchParams(searchParams);
    };

    const handleClose = () => {
        clearSearchParams();
        onClose();
    };
    const currentComponent = settingsTabsList.find((elem) => elem.tabName === tab)?.component;

    return ReactDOM.createPortal(
        <>
            <div className={styles.settingsModal__backdrop} onClick={handleClose} />
            <div
                style={{ left: isSideBarOpen ? "300px" : "92px" }}
                className={styles.settingsModal__container}
            >
                <div className={styles.settingsModal__header}>
                    <h2 className={styles.settingsModal__title}>Settings</h2>
                    <button className={styles.settingsModal__closeButton} onClick={handleClose}>
                        <CrossIcon />
                    </button>
                </div>
                <div className={styles.settingsModal__content}>
                    <div className={styles.settingsModal__tabsContainer}>
                        {settingsTabsList.map(({ name, icon, tabName }, index) => {
                            return (
                                <button
                                    key={name}
                                    className={classNames(
                                        styles.settingsModal__tab,
                                        tab === tabName && styles["settingsModal__tab--active"]
                                    )}
                                    onClick={() => changeTab(tabName)}
                                >
                                    {icon}
                                    <span>{name}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className={styles.settingsModal__tabContent}>{currentComponent}</div>
                </div>
            </div>
        </>,
        document.body
    );
};
