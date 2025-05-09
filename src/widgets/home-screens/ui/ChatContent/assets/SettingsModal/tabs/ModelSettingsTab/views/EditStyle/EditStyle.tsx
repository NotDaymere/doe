import styles from "../Personalization.module.less";
import styleCSS from "./EditStyle.module.less";
import { GeneralSettingsIcon } from "src/shared/icons/GeneralSettingsIcon";
import { SettingsUploadIcon } from "src/shared/icons/SettingsUploadIcon";
import { useState } from "react";
import clsx from "clsx";
import { TextBlock } from "../tabs/TextBlock/TextBlock";
import { UploadFiles } from "../tabs/UploadFiles/UploadFiles";
import { FileWithId } from "../../../../components/UploadButton/UploadButton";
import { useNavigate } from "react-router";
import { UploadProgress } from "../../../../components/UploadProgress/UploadProgress";
import { ModalButton } from "../../../../components/ModalButton/ModalButton";
type StyleDataType = {
    id: string;
    name: string;
    text: string;
    files: FileWithId[];
};
type EditStyleProps = {
    onSave: (data: StyleDataType) => void;
    style: StyleDataType;
};

export const EditStyle = ({ onSave, style }: EditStyleProps) => {
    const [activeTab, setActiveTab] = useState<1 | 2>(1);
    const [styleData, setStyleData] = useState<StyleDataType>(style);
    const navigate = useNavigate();
    const handleSave = () => {
        onSave(styleData);
        navigate(-1);
    };
    const onFileDelete = (fileId: string) => {
        setStyleData((prev) => ({
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
                        styleCSS.editStyle__header__title
                    )}
                >
                    {styleData.name}
                </p>

                <div className={styles.personalization__header__controls}>
                    <ModalButton variant="outline primary" onClick={() => navigate(-1)}>
                        Cancel
                    </ModalButton>
                    <ModalButton
                        variant="primary"
                        disabled={!styleData.text && !styleData.files.length}
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
                                    value={styleData.text}
                                    onChange={(text) => setStyleData((prev) => ({ ...prev, text }))}
                                />
                            )}
                            {activeTab === 2 && (
                                <>
                                    <UploadFiles
                                        files={styleData.files}
                                        setFile={(file) =>
                                            setStyleData((prev) => ({
                                                ...prev,
                                                files: [file, ...prev.files],
                                            }))
                                        }
                                    >
                                        <>
                                            {!!styleData.files.length &&
                                                styleData.files.map((file) => (
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
