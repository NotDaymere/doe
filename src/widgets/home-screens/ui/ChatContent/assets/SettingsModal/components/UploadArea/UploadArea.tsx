import clsx from "clsx"
import FileIcon from "src/shared/icons/File.icon"
import FileFilledIcon from "src/shared/icons/FileFilled.icon"
import HandCursorIcon from "src/shared/icons/HandCursor.icon";
import { useDragFile } from "src/widgets/home-screens/lib";
import styles from "./UploadArea.module.less"
import { FileWithId, UploadButton } from "../UploadButton";
import { useState } from "react";
import { UploadProgress } from "../UploadProgress/UploadProgress";

type UploadAreaProps = {
	onCompleteUpload: (uploadedFile: FileWithId) => void;
}

export const UploadArea = ({ onCompleteUpload }: UploadAreaProps) => {
	const [files, setFiles] = useState<FileWithId[] | null>(null);
	const {
		drag,
		handleDragDropTarget,
		handleDragLeaveTarget,
		handleDragOverTarget,
		handleDragStart,
	} = useDragFile({
		onUploadFiles(uploadFiles) {
			setFiles(uploadFiles.filter(file => {
				const fileExtension = file.name.split('.').pop()?.toLowerCase();
				return fileExtension === 'pdf' || fileExtension === 'doc' || fileExtension === 'txt' || fileExtension === 'docx';
			}));
			console.log(uploadFiles);
		},
	});
	return (
		<>
			<UploadButton
				className={clsx(styles['upload-area'], drag && styles['upload-area--dragging'])}
				onDragStart={handleDragStart}
				onDragOver={handleDragOverTarget}
				onDrop={handleDragDropTarget}
				onDragLeave={handleDragLeaveTarget}
				fileType=".pdf,.doc,.txt, .docx"
				multiple
				onMultipleFilesChange={(files) => { console.log('files', files); setFiles(files) }}
			>
				<div className={styles['upload-area-icon']}><FileFilledIcon /></div>
				<div className={clsx(styles['upload-area-drag'], drag && styles['upload-area-drag--dragging'])}>
					<div className={clsx(styles['upload-area-drag-icon'])} ><FileIcon /><HandCursorIcon className={styles['upload-area-hand-icon']} /></div>
					<div className={clsx(styles['upload-area-drag-glow'])} />
				</div>

				<p className={styles['upload-area-description']}>
					<span className={styles['upload-area-description-strong']}>Click to upload</span> or drag and drop PDF,<br /> DOC or TXT (1GB max file size)</p>
			</UploadButton>
			{files && files.map((file) => (<UploadProgress key={file.id} file={file} onClear={() => setFiles(null)} onCompleteUpload={onCompleteUpload} />))}

		</>
	)
}