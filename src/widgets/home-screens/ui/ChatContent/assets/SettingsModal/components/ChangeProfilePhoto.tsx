import { useState } from 'react';
import styles from '../tabs/ProfileTab/ProfileTab.module.less'
import { UploadButton } from './UploadButton';

const placeholderImage = '/temp/profile2.jpg'
type ChangeProfilePhotoProps = {
	currentPhoto: string | null | undefined
	onImageChange: (url: string | null) => void
}
export const ChangeProfilePhoto = ({ currentPhoto, onImageChange }: ChangeProfilePhotoProps) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhoto ?? null);

	return <div className={styles['profileTab__user-info-content']}>
		<div className={styles['profileTab__user-info-photo']}>
			<img src={previewUrl ?? placeholderImage} alt="profile" />
		</div>
		<div className={styles['profileTab__user-info-control']}>
			<UploadButton className={styles['profileTab__user-info-add-photo']} onFileChange={file => {
				if (previewUrl) URL.revokeObjectURL(previewUrl)
				const url = URL.createObjectURL(file);
				setPreviewUrl(url);
				onImageChange(url);
			}} />
			<button className={styles['profileTab__user-info-delete-photo']} onClick={() => {
				setPreviewUrl(null);
				onImageChange(null)
			}}>Delete</button>
		</div>
	</div>
}