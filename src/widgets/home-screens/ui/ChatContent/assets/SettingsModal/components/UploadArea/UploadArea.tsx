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
	const [file, setFile] = useState<FileWithId | null>(null);
	const {
		drag,
		handleDragDropTarget,
		handleDragLeaveTarget,
		handleDragOverTarget,
		handleDragStart,
	} = useDragFile({
		onUploadFiles(uploadFiles) {
			setFile(uploadFiles[0]);
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
				onFileChange={(file) => setFile(file)}
			>
				<div className={styles['upload-area-icon']}><FileFilledIcon /></div>
				<div className={clsx(styles['upload-area-drag'], drag && styles['upload-area-drag--dragging'])}>
					<div className={clsx(styles['upload-area-drag-icon'])} ><FileIcon /><HandCursorIcon className={styles['upload-area-hand-icon']} /></div>
					<div className={clsx(styles['upload-area-drag-glow'])} />
				</div>

				<p className={styles['upload-area-description']}>
					<span className={styles['upload-area-description-strong']}>Click to upload</span> or drag and drop PDF,<br /> DOC or TXT (1GB max file size)</p>
			</UploadButton>
			<UploadProgress file={file} onClear={() => setFile(null)} onCompleteUpload={onCompleteUpload} />
		</>
	)
}