import { useState } from "react"
import { UploadArea } from "../../../../../components/UploadArea/UploadArea"
import { UploadProgress } from "../../../../../components/UploadProgress/UploadProgress"
import styles from './UploadFiles.module.less'
import { FileWithId } from "../../../../../components/UploadButton"

type UploadFilesProps = {
	setFile: (file: FileWithId) => void
}

export const UploadFiles = ({ setFile }: UploadFilesProps) => {
	const [uploadedFiles, setUploadedFiles] = useState<FileWithId[]>([])

	return (
		<div className={styles.uploadTab__container}>
			<UploadArea onCompleteUpload={files => setUploadedFiles(prev => [...files, ...prev])} />
			{uploadedFiles.length === 0 && <p className={styles.uploadTab__description}>To create a compelling persona, consider several steps, like defining purpose and target audience, choose name, voice and tone etc.</p>}
			<div className={styles.uploadTab__list__wrapper} >
				<div className={styles.uploadTab__list__container}>
					{uploadedFiles.map(file => <UploadProgress key={file.id} onClear={() => setUploadedFiles(prev => prev.filter(item => item.id !== file.id))} onCompleteUpload={setFile} file={file} disappearAfterUpload={false} />)}
				</div>
			</div>
		</div>
	)
}