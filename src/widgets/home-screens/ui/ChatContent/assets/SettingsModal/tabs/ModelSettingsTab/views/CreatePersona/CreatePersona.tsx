import { MagicIcon } from "src/shared/icons/MagicIcon";
import styles from "../Personalization.module.less";
import personCSS from "./CreatePersona.module.less";
import { GeneralSettingsIcon } from "src/shared/icons/GeneralSettingsIcon";
import { SettingsUploadIcon } from "src/shared/icons/SettingsUploadIcon";
import { useState } from "react";
import clsx from "clsx";
import { TextBlock } from "../tabs/TextBlock/TextBlock";
import { UploadFiles } from "../tabs/UploadFiles/UploadFiles";
import { FileWithId } from "../../../../components/UploadButton/UploadButton";
import { useNavigate } from "react-router";
import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import { UploadProgress } from "../../../../components/UploadProgress/UploadProgress";
type PersonaDataType = {
    text: string;
    files: FileWithId[];
};
type SavePersonaDataType = PersonaDataType & { id: string; name: string };
type CreatePersonaProps = {
    onSave: (data: SavePersonaDataType) => void;
};

export const CreatePersona = ({ onSave }: CreatePersonaProps) => {
    const [activeTab, setActiveTab] = useState<1 | 2>(1);
    const [personaData, setPersonaData] = useState<PersonaDataType>({
        text: "",
        files: [],
    });
    const navigate = useNavigate();
    const handleSave = () => {
        const persona: SavePersonaDataType = {
            ...personaData,
            id: crypto.randomUUID(),
            name: "New persona",
        };
        onSave(persona);
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
                <div
                    className={clsx(
                        styles.personalization__header__info,
                        personCSS.createPerson__header__info
                    )}
                >
                    <MagicIcon />
                    <p
                        className={clsx(
                            styles.personalization__header__title,
                            personCSS.createPerson__header__title
                        )}
                    >
                        Creating Persona
                    </p>
                </div>
                <div className={styles.personalization__header__controls}>
                    <ModalButton variant="outline primary" onClick={() => navigate(-1)}>
                        Cancel
                    </ModalButton>
                    <ModalButton
                        variant="primary"
                        disabled={!personaData.text && !personaData.files.length}
                        onClick={() => handleSave()}
                    >
                        <GeneralSettingsIcon />
                        <span>Save changes</span>
                    </ModalButton>
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
                                    onChange={(text) =>
                                        setPersonaData((prev) => ({ ...prev, text }))
                                    }
                                />
                            )}
                            {activeTab === 2 && (
                                <UploadFiles
                                    setFile={(file) =>
                                        setPersonaData((prev) => ({
                                            ...prev,
                                            files: [file, ...prev.files],
                                        }))
                                    }
                                    files={personaData.files}
                                >
                                    <>
                                        {!!personaData.files.length &&
                                            personaData.files.map((file) => (
                                                <UploadProgress
                                                    file={file}
                                                    onClear={() => onFileDelete(file.id)}
                                                    onCompleteUpload={(file) => console.log(file)}
                                                    disappearAfterUpload={false}
                                                    showAsUploaded
                                                />
                                            ))}
                                    </>
                                </UploadFiles>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
