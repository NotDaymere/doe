import styles from './ProfileTab.module.less'
import modalStyles from '../../SettingsModal.module.less'
import { ChangeProfilePhoto } from '../../components/ChangeProfilePhoto';
import { Profile } from 'src/widgets/Sidebar/ui/Profile';
import { CrossIcon } from 'src/shared/icons/CrossIcon';
import { useEffect, useRef, useState } from 'react';
import { GeneralSettingsIcon } from 'src/shared/icons/GeneralSettingsIcon';
import { ContentHeader } from '../../components/ContentHeader/ContentHeader';
type ProfileTabProps = {
	currentProfile: Profile
	onClose: () => void
}
type formDataType = {
	username: string,
	email: string,
	imgSrc: string | null
}
export const ProfileTab = ({ currentProfile, onClose }: ProfileTabProps) => {
	const inputRefs = useRef<Record<keyof Omit<formDataType, 'imgSrc'>, React.RefObject<HTMLInputElement>>>({
		username: useRef<HTMLInputElement>(null),
		email: useRef<HTMLInputElement>(null),
	});
	const [formData, setFormData] = useState<formDataType>({
		username: currentProfile.username,
		email: currentProfile.email,
		imgSrc: currentProfile.imgSrc || null
	});
	const [isDirty, setIsDirty] = useState(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};
	const handleImageChange = (url: string | null) => {
		setFormData(prev => ({
			...prev,
			imgSrc: url
		}));
	};
	const handleClearField = (field: keyof formDataType) => {
		setFormData(prev => ({
			...prev,
			[field]: ''
		}));
	};
	useEffect(() => {
		const keys = Object.keys(formData) as Array<keyof typeof formData>;
		const isDirty = keys.some(key => formData[key] !== currentProfile[key]);
		setIsDirty(isDirty);
	}, [formData]);
	const onSaveChanges = () => {
		if (isDirty) {
			console.log('Saved changes', formData);
			onClose();
		}
	}
	return (
		<div className={styles.profileTab__container}>
			<ContentHeader>Edit profile info</ContentHeader>
			<div className={styles.profileTab__content}>
				<div className={styles.profileTab__userInfo__container}>
					<p className={styles.profileTab__userInfo__title}>Profile photo</p>
					<ChangeProfilePhoto currentPhoto={formData.imgSrc} onImageChange={handleImageChange} />
				</div>
				<div className={styles.profileTab__userInfo__container}>
					<p className={styles.profileTab__userInfo__title}>Profile Name </p>
					<div className={styles.profileTab__userInfo__content}>
						<input name='username' value={formData.username} className={styles.profileTab__userInfo__input} type="text" placeholder='Type Profile Name' onChange={handleChange} ref={inputRefs.current.username} />
						<button tabIndex={1} className={styles.profileTab__userInfo__inputReset} onMouseDown={e => e.preventDefault()} onClick={() => handleClearField('username')}><CrossIcon /></button>
					</div>
				</div>
				<div className={styles.profileTab__userInfo__container}>
					<p className={styles.profileTab__userInfo__title}>Email address</p>
					<div className={styles.profileTab__userInfo__content}>
						<input name='email' value={formData.email} className={styles.profileTab__userInfo__input} type="text" placeholder='Type Email address' onChange={handleChange} ref={inputRefs.current.email} />
						<button tabIndex={0} className={styles.profileTab__userInfo__inputReset} onMouseDown={e => e.preventDefault()} onClick={() => handleClearField('email')}><CrossIcon /></button>
					</div>
				</div>
			</div>
			<div className={styles.profileTab__footer}>

				<div className={styles.profileTab__footer__content}>
					<button className={modalStyles.settingsModal__cancelBtn} onClick={onClose} >Cancel</button>
					<button className={styles.profileTab__saveBtn} disabled={!isDirty} onClick={onSaveChanges} >
						<GeneralSettingsIcon />
						<span>Save changes</span>
					</button>
				</div>
			</div>
		</div>)
}