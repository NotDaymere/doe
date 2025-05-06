import PlusSquareIcon from "src/shared/icons/PlusSquare.icon"
import styles from "./AppsIntegrationTab.module.less"
import { GoogleDriveIcon } from "src/shared/icons/GoogleDriveIcon"
import NotionIcon from "src/shared/icons/Notion.icon"
import { AppIntegrationItem } from "../../components/AppIntegrationItem/AppIntegrationItem"

const CONNECTED_APPS = [
	{
		icon: <GoogleDriveIcon />,
		title: 'Google Drive',
		description: 'Upload Google Docs, Sheets, Slides and other files.',
		onDisconnectClick: () => { console.log('Disconnect Google Drive') }
	},
	{
		icon: <NotionIcon />,
		title: 'Notion',
		description: 'Upload Notion Docs, Sheets, Slides and other files.',
		onDisconnectClick: () => { console.log('Disconnect Notion') }
	}
]

export const AppsIntegrationTab = () => {
	return (
		<div className={styles.appIntegration}>
			<div className={styles.appIntegration__headerContainer}>
				<h2 className={styles.appIntegration__headerTitle}>Apps integration</h2>
				<button className={styles.appIntegration__headerBtn}><PlusSquareIcon />Connect Applications</button>
			</div >
			<div className={styles.appIntegration__contentWrapper}>
				<div className={styles.appIntegration__content}>
					{CONNECTED_APPS.map((app) => (<AppIntegrationItem {...app} />))}
				</div>
			</div>
		</div>)
}