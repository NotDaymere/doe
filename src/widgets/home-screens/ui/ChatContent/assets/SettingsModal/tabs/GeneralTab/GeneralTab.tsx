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
import { KnowledgeView } from "./views/KnowledgeView/KnowledgeView";

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
				<div className={styles.generalTab__setting__container}>
					<p className={styles.generalTab__setting__title}>Theme</p>
					<ToggleSwitch checked={systemTheme} label="Match system" onChange={() => setSystemTheme(!systemTheme)} />
				</div>
				<div className={styles.generalTab__setting__container}>
					<p className={styles.generalTab__setting__title}>Delete all chats</p>
					<button className={modalStyles.settingsModal__deleteBtn}>Delete All</button>
				</div>
				<div className={styles.generalTab__setting__container}>
					<p className={styles.generalTab__setting__title}>Knowledge</p>
					<div className={styles.generalTab__setting__control}>
						<button className={styles.generalTab__knowledgeBtn} onClick={() => setShowKnowledgeView(!showKnowledgeView)}>See knowledge</button>
						<UploadButton className={styles.generalTab__uploadBtn} onFileChange={file => console.log(file)}><AttachmentIcon width={13.5} height={15} />Upload</UploadButton>
					</div>
				</div>
				<h2 className={styles.generalTab__subtitle}>Managing accounts</h2>
				<div className={styles.generalTab__accounts__container}>
					{profiles.map((profile) => {
						return <div key={profile.id} className={styles.generalTab__account__container}>
							<img className={styles.generalTab__account__avatar} src={profile.imgSrc} alt="avatar" />
							<div className={styles.generalTab__account__info}>
								<p className={styles.generalTab__account__name}>{profile.username}</p>
								<p className={styles.generalTab__account__email}>{profile.email}</p>
							</div>
							<div className={styles.generalTab__account__actions}>
								<button className={styles.generalTab__account__logout}>Log Out <LogOutIcon /></button>
								<button className={classNames(modalStyles.settingsModal__deleteBtn, styles.generalTab__account__delete)}>Delete</button>
							</div>
						</div>
					})}
					<div className={styles.generalTab__account__add__container}>
						<p className={styles.generalTab__setting__title}>Add new account</p>
						<button className={styles.generalTab__account__addBtn}><AddProfilePhotoIcon />Add account</button>
					</div>
				</div>
				<div className={styles.generalTab__setting__container}>
					<p className={styles.generalTab__setting__title}>Contact support center</p>
					<button className={classNames(styles.generalTab__account__logout, styles.generalTab__contactBtn)}><EmailIcon />Contact Us</button>
				</div>
			</div>
		</div>
	)
}