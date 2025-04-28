import styles from "../Personalization.module.less";
import modalStyles from "../../../../SettingsModal.module.less";
import personCSS from "./EditPersona.module.less";
import { GeneralSettingsIcon } from "src/shared/icons/GeneralSettingsIcon";
import { SettingsUploadIcon } from "src/shared/icons/SettingsUploadIcon";
import { useState } from "react";
import clsx from "clsx";
import { TextBlock } from "../tabs/TextBlock/TextBlock";
import { UploadFiles } from "../tabs/UploadFiles/UploadFiles";
import { FileWithId } from "../../../../components/UploadButton";
import { useNavigate } from "react-router";
import { UploadProgress } from "../../../../components/UploadProgress/UploadProgress";
type PersonaDataType = {
    id: string;
    name: string;
    text: string;
    files: FileWithId[];
};
type EditPersonaProps = {
    onSave: (data: PersonaDataType) => void;
    persona: PersonaDataType;
};

export const EditPersona = ({ onSave, persona }: EditPersonaProps) => {
    const [activeTab, setActiveTab] = useState<1 | 2>(1);
    const [personaData, setPersonaData] = useState<PersonaDataType>(persona);
    const navigate = useNavigate();
    const handleSave = () => {
        onSave(personaData);
        navigate(-1);
    };
    const onFileDelete = (fileId: string) => {
        setPersonaData((prev) => ({
            ...prev,
            files: prev.files.filter(({ id }) => id !== fileId),
        }));
    };
    return (
        <div className={styles.personalization}>
            <div className={styles.personalization__header}>
                <p
                    className={clsx(
                        styles.personalization__header__title,
                        personCSS.editPerson__header__title
                    )}
                >
                    {personaData.name}
                </p>

                <div className={styles.personalization__header__controls}>
                    <button
                        className={modalStyles.settingsModal__cancelBtn}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.personalization__saveBtn}
                        disabled={!personaData.text && !personaData.files.length}
                        onClick={() => handleSave()}
                    >
                        <GeneralSettingsIcon />
                        <span>Save changes</span>
                    </button>
                </div>
            </div>
            <div className={styles.personalization__container}>
                <div className={styles.personalization__content}>
                    <div className={styles.personalization__tabs}>
                        <div className={styles.personalization__tabs__buttons}>
                            <button
                                className={clsx(
                                    styles.personalization__tabs__tabBtn,
                                    activeTab === 1 &&
                                        styles["personalization__tabs__tabBtn--active"]
                                )}
                                onClick={() => setActiveTab(1)}
                            >
                                <GeneralSettingsIcon />
                                Create or edit text block
                            </button>
                            <button
                                className={clsx(
                                    styles.personalization__tabs__tabBtn,
                                    activeTab === 2 &&
                                        styles["personalization__tabs__tabBtn--active"]
                                )}
                                onClick={() => setActiveTab(2)}
                            >
                                <SettingsUploadIcon />
                                Upload files
                            </button>
                        </div>
                        <div className={styles.personalization__tabs__content}>
                            {activeTab === 1 && (
                                <TextBlock
                                    value={personaData.text}
                                    onChange={(text) =>
                                        setPersonaData((prev) => ({ ...prev, text }))
                                    }
                                />
                            )}
                            {activeTab === 2 && (
                                <>
                                    <UploadFiles
                                        files={personaData.files}
                                        setFile={(file) =>
                                            setPersonaData((prev) => ({
                                                ...prev,
                                                files: [file, ...prev.files],
                                            }))
                                        }
                                    >
                                        <>
                                            {!!personaData.files.length &&
                                                personaData.files.map((file) => (
                                                    <UploadProgress
                                                        file={file}
                                                        onClear={() => onFileDelete(file.id)}
                                                        onCompleteUpload={(file) =>
                                                            console.log(file)
                                                        }
                                                        disappearAfterUpload={false}
                                                        showAsUploaded
                                                    />
                                                ))}
                                        </>
                                    </UploadFiles>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
