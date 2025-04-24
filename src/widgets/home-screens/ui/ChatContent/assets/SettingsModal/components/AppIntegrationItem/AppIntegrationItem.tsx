import styles from "./AppIntegrationItem.module.less"
import modalStyles from '../../SettingsModal.module.less'
import clsx from "clsx"

type AppIntegrationItemProps = {
	icon: React.ReactNode
	title: string
	description: string
	onDisconnectClick: () => void
}

export const AppIntegrationItem = ({ icon, title, description, onDisconnectClick }: AppIntegrationItemProps) => {
	return (
		<div>
			<div className={styles.appIntegrationItem__headerContainer}>
				<div className={styles.appIntegrationItem__headerIcon}>{icon}</div>
				<p className={styles.appIntegrationItem__headerTitle}>{title}</p>
				<button className={clsx(modalStyles['settingsModal__delete-btn'], styles.appIntegrationItem__headerDisconnect)}>Disconnect</button>
			</div>
			<p className={styles.appIntegrationItem__description}>{description}</p>
		</div>
	)
}