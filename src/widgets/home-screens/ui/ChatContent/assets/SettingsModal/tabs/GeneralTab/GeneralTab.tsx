import ToggleSwitch from "src/shared/components/ToogleSwitch"
import { ContentHeader } from "../../components/ContentHeader/ContentHeader"
import styles from "./GeneralTab.module.less"
import modalStyles from '../../SettingsModal.module.less'
import { useState } from "react";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import { Profile } from "src/widgets/Sidebar/ui/Profile";
import { LogOutIcon } from "src/shared/icons/LogOutIcon";
import classNames from "classnames";
import { AddProfilePhotoIcon } from "src/shared/icons/AddProfilePhotoIcon";
import { EmailIcon } from "src/shared/icons/EmailIcon";
import { UploadButton } from "../../components/UploadButton";
import { KnowledgeView } from "./views/KnowledgeView";
type GeneralTabProps = {
	currentProfile: Profile
	profiles: Profile[]
}

export const GeneralTab = ({ profiles, currentProfile }: GeneralTabProps) => {
	const [systemTheme, setSystemTheme] = useState(false);
	const [showKnowledgeView, setShowKnowledgeView] = useState(false);
	if (showKnowledgeView) return <KnowledgeView back={() => setShowKnowledgeView(false)} />
	return (
		<div className={styles.generalTab__container}>
			<ContentHeader>General settings</ContentHeader>
			<div className={styles.generalTab__content}>
				<div className={styles['generalTab__setting-container']}>
					<p className={styles['generalTab__setting-title']}>Theme</p>
					<ToggleSwitch checked={systemTheme} label="Match system" onChange={() => setSystemTheme(!systemTheme)} />
				</div>
				<div className={styles['generalTab__setting-container']}>
					<p className={styles['generalTab__setting-title']}>Delete all chats</p>
					<button className={modalStyles['settingsModal__delete-btn']}>Delete All</button>
				</div>
				<div className={styles['generalTab__setting-container']}>
					<p className={styles['generalTab__setting-title']}>Knowledge</p>
					<div className={styles['generalTab__setting-control']}>
						<button className={styles['generalTab__knowledge-btn']} onClick={() => setShowKnowledgeView(!showKnowledgeView)}>See knowledge</button>
						<UploadButton className={styles['generalTab__upload-btn']} onFileChange={file => console.log(file)}><AttachmentIcon width={13.5} height={15} />Upload</UploadButton>
					</div>
				</div>
				<h2 className={styles['generalTab__subtitle']}>Managing accounts</h2>
				<div className={styles['generalTab__accounts-container']}>
					{profiles.map((profile) => {
						return <div key={profile.id} className={styles['generalTab__account-container']}>
							<img className={styles['generalTab__account-avatar']} src={profile.imgSrc} alt="avatar" />
							<div className={styles['generalTab__account-info']}>
								<p className={styles['generalTab__account-name']}>{profile.username}</p>
								<p className={styles['generalTab__account-email']}>{profile.email}</p>
							</div>
							<div className={styles['generalTab__account-actions']}>
								<button className={styles['generalTab__account-logout']}>Log Out <LogOutIcon /></button>
								<button className={classNames(modalStyles['settingsModal__delete-btn'], styles['generalTab__account-delete'])}>Delete</button>
							</div>
						</div>
					})}
					<div className={styles['generalTab__account-add-container']}>
						<p className={styles['generalTab__setting-title']}>Add new account</p>
						<button className={styles['generalTab__account-add-btn']}><AddProfilePhotoIcon />Add account</button>
					</div>
				</div>
				<div className={styles['generalTab__setting-container']}>
					<p className={styles['generalTab__setting-title']}>Contact support center</p>
					<button className={classNames(styles['generalTab__account-logout'], styles['generalTab__contact-btn'])}><EmailIcon />Contact Us</button>
				</div>
			</div>
		</div>
	)
}