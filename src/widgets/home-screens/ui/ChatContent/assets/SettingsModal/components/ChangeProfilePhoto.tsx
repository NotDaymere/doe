import { useState } from 'react';
import styles from '../tabs/ProfileTab/ProfileTab.module.less'
import modalStyles from '../SettingsModal.module.less'
import { UploadButton } from './UploadButton';
import { AddProfilePhotoIcon } from 'src/shared/icons/AddProfilePhotoIcon';

const placeholderImage = '/temp/profile2.jpg'
type ChangeProfilePhotoProps = {
	currentPhoto: string | null | undefined
	onImageChange: (url: string | null) => void
}
export const ChangeProfilePhoto = ({ currentPhoto, onImageChange }: ChangeProfilePhotoProps) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhoto ?? null);

	return <div className={styles.profileTab__userInfo__content}>
		<div className={styles.profileTab__userInfo__photo}>
			<img src={previewUrl ?? placeholderImage} alt="profile" />
		</div>
		<div className={styles.profileTab__userInfo__control}>
			<UploadButton className={styles.profileTab__userInfo__addPhoto} onFileChange={file => {
				if (previewUrl) URL.revokeObjectURL(previewUrl)
				const url = URL.createObjectURL(file);
				setPreviewUrl(url);
				onImageChange(url);
			}} ><AddProfilePhotoIcon />Change Photo</UploadButton>
			<button className={modalStyles.settingsModal__deleteBtn} onClick={() => {
				setPreviewUrl(null);
				onImageChange(null);
			}}>Delete</button>
		</div>
	</div>
}