import styles from './File.module.less'
import FileFilledIcon from 'src/shared/icons/FileFilled.icon'

export const File = () => {
	return <div className={styles.file}>
		<div className={styles['file__icon-container']}><FileFilledIcon /></div>
		<div className={styles['file__name-container']}><p className={styles.file__name}>work_file</p>.<p>pdf</p></div>
		<p className={styles.file__size}>460mb</p>
	</div>
}