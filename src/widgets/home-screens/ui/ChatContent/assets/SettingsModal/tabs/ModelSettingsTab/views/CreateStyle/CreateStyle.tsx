import { MagicIcon } from "src/shared/icons/MagicIcon";
import styles from "../Personalization.module.less";
import styleCSS from "./CreateStyle.module.less";
import modalStyles from "../../../../SettingsModal.module.less";
import { GeneralSettingsIcon } from "src/shared/icons/GeneralSettingsIcon";
import { SettingsUploadIcon } from "src/shared/icons/SettingsUploadIcon";
import { useState } from "react";
import clsx from "clsx";
import { TextBlock } from "../tabs/TextBlock/TextBlock";
import { UploadFiles } from "../tabs/UploadFiles/UploadFiles";
import { FileWithId } from "../../../../components/UploadButton";
import { useNavigate } from "react-router";
type StyleDataType = {
    text: string;
    files: FileWithId[];
};
type SaveStyleDataType = StyleDataType & { id: string; name: string };
type CreateStyleProps = {
    onSave: (data: SaveStyleDataType) => void;
};

export const CreateStyle = ({ onSave }: CreateStyleProps) => {
    const [activeTab, setActiveTab] = useState<1 | 2>(1);
    const [styleData, setStyleData] = useState<StyleDataType>({
        text: "",
        files: [],
    });
    console.log(" CreateStyle ~ styleData:", styleData);
    const navigate = useNavigate();
    const handleSave = () => {
        const style: SaveStyleDataType = {
            ...styleData,
            id: crypto.randomUUID(),
            name: "New style",
        };
        onSave(style);
        navigate(-1);
    };
    return (
        <div className={styles.personalization}>
            <div className={styles.personalization__header}>
                <div
                    className={clsx(
                        styles.personalization__header__info,
                        styleCSS.createStyle__header__info
                    )}
                >
                    <MagicIcon />
                    <p
                        className={clsx(
                            styles.personalization__header__title,
                            styleCSS.createStyle__header__title
                        )}
                    >
                        Creating Writing Style
                    </p>
                </div>
                <div className={styles.personalization__header__controls}>
                    <button
                        className={modalStyles.settingsModal__cancelBtn}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.personalization__saveBtn}
                        disabled={!styleData.text && !styleData.files.length}
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
                                    // onChange={(text) => console.log(text)}
                                    onChange={(text) => setStyleData((prev) => ({ ...prev, text }))}
                                />
                            )}
                            {activeTab === 2 && (
                                <UploadFiles
                                    setFile={(file) =>
                                        setStyleData((prev) => ({
                                            ...prev,
                                            files: [file, ...prev.files],
                                        }))
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
