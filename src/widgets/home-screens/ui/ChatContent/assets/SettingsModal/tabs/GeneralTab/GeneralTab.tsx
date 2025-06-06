import ToggleSwitch from "src/shared/components/ToogleSwitch";
import { ContentHeader } from "../../components/ContentHeader/ContentHeader";
import styles from "./GeneralTab.module.less";
import { useState } from "react";
import { Profile } from "src/widgets/Sidebar/ui/Profile";
import { LogOutIcon } from "src/shared/icons/LogOutIcon";
import { AddProfilePhotoIcon } from "src/shared/icons/AddProfilePhotoIcon";
import { EmailIcon } from "src/shared/icons/EmailIcon";
import { UploadButton } from "../../components/UploadButton/UploadButton";
import { KnowledgeView } from "./views/KnowledgeView/KnowledgeView";
import { useSearchParams } from "react-router-dom";
import { ModalButton } from "../../components/ModalButton/ModalButton";
import { AttachmentIcon } from "src/shared/icons/AttachmentIcon";

type GeneralTabProps = {
    currentProfile: Profile;
    profiles: Profile[];
};

export const GeneralTab = ({ profiles, currentProfile }: GeneralTabProps) => {
    const [systemTheme, setSystemTheme] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    if (searchParams.get("view") === "knowledge" || searchParams.get("view") === "folder")
        return <KnowledgeView />;

    const moveToKnowledge = () => {
        searchParams.set("view", "knowledge");
        setSearchParams(searchParams);
    };
    return (
        <div className={styles.generalTab__container}>
            <ContentHeader>General settings</ContentHeader>
            <div className={styles.generalTab__content}>
                <div className={styles.generalTab__setting__container}>
                    <p className={styles.generalTab__setting__title}>Theme</p>
                    <ToggleSwitch
                        checked={systemTheme}
                        label="Match system"
                        onChange={() => setSystemTheme(!systemTheme)}
                    />
                </div>
                <div className={styles.generalTab__setting__container}>
                    <p className={styles.generalTab__setting__title}>Delete all chats</p>
                    <ModalButton variant="delete">Delete All</ModalButton>
                </div>
                <div className={styles.generalTab__setting__container}>
                    <p className={styles.generalTab__setting__title}>Knowledge</p>
                    <div className={styles.generalTab__setting__control}>
                        <ModalButton variant="outline secondary" onClick={() => moveToKnowledge()}>
                            See knowledge
                        </ModalButton>
                        <UploadButton
                            className={styles.generalTab__uploadBtn}
                            onFileChange={(file) => console.log(file)}
                        >
                            <AttachmentIcon />
                            Upload
                        </UploadButton>
                    </div>
                </div>
                <h2 className={styles.generalTab__subtitle}>Managing accounts</h2>
                <div className={styles.generalTab__accounts__container}>
                    {profiles.map((profile) => {
                        return (
                            <div key={profile.id} className={styles.generalTab__account__container}>
                                <img
                                    className={styles.generalTab__account__avatar}
                                    src={profile.imgSrc}
                                    alt="avatar"
                                />
                                <div className={styles.generalTab__account__info}>
                                    <p className={styles.generalTab__account__name}>
                                        {profile.username}
                                    </p>
                                    <p className={styles.generalTab__account__email}>
                                        {profile.email}
                                    </p>
                                </div>
                                <div className={styles.generalTab__account__actions}>
                                    <ModalButton
                                        variant="secondary"
                                        className={styles.generalTab__account__logout}
                                    >
                                        Log Out <LogOutIcon />
                                    </ModalButton>
                                    <ModalButton
                                        variant="delete"
                                        className={styles.generalTab__account__delete}
                                    >
                                        Delete
                                    </ModalButton>
                                </div>
                            </div>
                        );
                    })}
                    <div className={styles.generalTab__account__add__container}>
                        <p className={styles.generalTab__setting__title}>Add new account</p>
                        <ModalButton
                            variant="primary"
                            className={styles.generalTab__account__addBtn}
                        >
                            <AddProfilePhotoIcon />
                            Add account
                        </ModalButton>
                    </div>
                </div>
                <div className={styles.generalTab__setting__container}>
                    <p className={styles.generalTab__setting__title}>Contact support center</p>
                    <ModalButton variant="secondary">
                        <EmailIcon />
                        Contact Us
                    </ModalButton>
                </div>
            </div>
        </div>
    );
};
