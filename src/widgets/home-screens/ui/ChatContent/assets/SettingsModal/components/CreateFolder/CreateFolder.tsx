import { generateBrightColor } from "../../utils/colors"
import styles from "./CreateFolder.module.less"
type CreateFolderProps = {
	onCreate: (color: string) => void
}

export const CreateFolder = ({ onCreate }: CreateFolderProps) => {
	return <button className={styles.createFolder} onClick={() => onCreate(generateBrightColor())}>
		<p>New folder</p>
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 6H11" stroke="#B5B5B5" stroke-width="1.5" stroke-linecap="round" />
			<path d="M6 1L6 11" stroke="#B5B5B5" stroke-width="1.5" stroke-linecap="round" />
		</svg>
	</button>
}