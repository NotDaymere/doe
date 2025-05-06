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
			<div className={styles.appIntegrationItem__header__container}>
				<div className={styles.appIntegrationItem__header__icon}>{icon}</div>
				<p className={styles.appIntegrationItem__header__title}>{title}</p>
				<button className={clsx(modalStyles.settingsModal__deleteBtn, styles.appIntegrationItem__header__disconnect)}>Disconnect</button>
			</div>
			<p className={styles.appIntegrationItem__description}>{description}</p>
		</div>
	)
}