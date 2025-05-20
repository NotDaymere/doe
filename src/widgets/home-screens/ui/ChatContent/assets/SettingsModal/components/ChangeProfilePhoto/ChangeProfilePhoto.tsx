import { useState } from "react";
import styles from "./ChangeProfilePhoto.module.less";
import { UploadButton } from "../UploadButton/UploadButton";
import { AddProfilePhotoIcon } from "src/shared/icons/AddProfilePhotoIcon";
import { ModalButton } from "../ModalButton/ModalButton";

const placeholderImage = "/temp/profile2.jpg";
type ChangeProfilePhotoProps = {
    currentPhoto: string | null | undefined;
    onImageChange: (url: string | null) => void;
};
export const ChangeProfilePhoto = ({ currentPhoto, onImageChange }: ChangeProfilePhotoProps) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhoto ?? null);

    return (
        <div className={styles.changePhoto__content}>
            <div className={styles.changePhoto__photo}>
                <img src={previewUrl ?? placeholderImage} alt="profile" />
            </div>
            <div className={styles.changePhoto__control}>
                <UploadButton
                    className={styles.changePhoto__upload}
                    onFileChange={(file) => {
                        if (previewUrl) URL.revokeObjectURL(previewUrl);
                        const url = URL.createObjectURL(file);
                        setPreviewUrl(url);
                        onImageChange(url);
                    }}
                >
                    <AddProfilePhotoIcon />
                    <span>Change Photo</span>
                </UploadButton>
                <ModalButton
                    variant="delete"
                    onClick={() => {
                        setPreviewUrl(null);
                        onImageChange(null);
                    }}
                >
                    Delete
                </ModalButton>
            </div>
        </div>
    );
};
