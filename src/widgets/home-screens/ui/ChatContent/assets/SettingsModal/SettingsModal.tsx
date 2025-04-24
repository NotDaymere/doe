import ReactDOM from "react-dom"
import styles from './SettingsModal.module.less'
import { ProfileIcon } from "src/shared/icons/ProfileIcon"
import { GeneralSettingsIcon } from "src/shared/icons/GeneralSettingsIcon"
import { ModelSettingsIcon } from "src/shared/icons/ModelSettingsIcon"
import { AppsIntegrationSettingsIcon } from "src/shared/icons/AppsIntegrationSettingsIcon"
import { useMemo, useState } from "react"
import classNames from "classnames"
import { CrossIcon } from "src/shared/icons/CrossIcon"
import { AppsIntegrationTab, GeneralTab, ModelSettingsTab, ProfileTab } from "./tabs"
import { Profile } from "src/widgets/Sidebar/ui/Profile"

type SettingsModalProps = {
	onClose: () => void
	isOpen?: boolean
	currentProfile: Profile
	profiles: Profile[]
}

export const SettingsModal = ({ onClose, isOpen = false, currentProfile, profiles }: SettingsModalProps) => {
	const settingsTabsList = useMemo(() => [
		{
			name: 'Profile', icon: <ProfileIcon />, component: <ProfileTab currentProfile={currentProfile} onClose={onClose} />
		},
		{
			name: 'General', icon: <GeneralSettingsIcon />, component: <GeneralTab currentProfile={currentProfile} profiles={profiles} />
		},
		{
			name: 'Model Settings', icon: <ModelSettingsIcon />, component: <ModelSettingsTab />
		},
		{
			name: 'Apps Integration ', icon: <AppsIntegrationSettingsIcon />, component: <AppsIntegrationTab />
		}
	] as const, [currentProfile, onClose, profiles])
	const [activeTab, setActiveTab] = useState<(typeof settingsTabsList)[number]['name']>(settingsTabsList[0].name);

	return ReactDOM.createPortal(
		<>
			<div className={styles.settingsModal__backdrop} onClick={onClose} />
			<div className={styles.settingsModal__container}>
				<div className={styles.settingsModal__header}>
					<h2 className={styles.settingsModal__title}>Settings</h2>
					<button className={styles.settingsModal__closeButton} onClick={onClose}>
						<CrossIcon />
					</button>
				</div>
				<div className={styles.settingsModal__content} >
					<div className={styles.settingsModal__tabsContainer}>{
						settingsTabsList.map(({ name, icon }, index) => {
							return <button key={name} className={classNames(styles.settingsModal__tab, activeTab === name && styles['settingsModal__tab--active'])} onClick={() => setActiveTab(name)}>{icon}<span>{name}</span></button>
						})}</div>
					<div className={styles.settingsModal__tabContent}>{settingsTabsList.find(tab => tab.name === activeTab)?.component}</div>
				</div>
			</div>
		</>, document.body)
} 