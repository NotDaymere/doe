import { useEffect, useState } from "react";
import { FileWithId } from "../UploadButton"
import styles from "./UploadProgress.module.less"
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import { CrossIcon } from "src/shared/icons/CrossIcon";
import clsx from "clsx";
import FileUploadSuccessIcon from "src/shared/icons/FileUploadSuccess.icon";
import { calculateSize } from "../../utils/calculateFileSize";

type UploadProgressProps = {
	file: FileWithId | null
	onClear: () => void;
	onCompleteUpload: (uploadedFile: FileWithId) => void;
}

export const UploadProgress = ({ file, onClear, onCompleteUpload }: UploadProgressProps) => {
	const [progress, setProgress] = useState(0);
	const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
	const complete = status === 'success';
	useEffect(() => {
		if (!file) {
			setProgress(0);
			setStatus('idle');
			return;
		}

		setStatus('uploading');
		setProgress(0);

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setStatus('success');
					onCompleteUpload(file);
					return 100;
				}
				return Math.min(Math.round(prev + Math.random() * 10 + 5), 100);
			});
		}, 100);

		return () => clearInterval(interval);
	}, [file]);

	useEffect(() => {
		if (status === 'success') {
			const timeout = setTimeout(() => {
				onClear();
			}, 1000);

			return () => clearTimeout(timeout);
		}
	}, [status, onClear]);


	if (!file) return null;

	return (
		<div className={clsx(styles.uploadProgress__container, complete && styles['uploadProgress__container--complete'])}>
			<div className={styles['uploadProgress__file-icon-wrapper']}><FileFilledIcon /></div>
			<div className={styles.uploadProgress__info}>
				<div className={styles['uploadProgress__file-info']}>
					<p className={styles['uploadProgress__file-name']}>{file.name} </p>
					{complete && <FileUploadSuccessIcon />}
				</div>
				<div className={styles.uploadProgress__progress}>
					<p className={styles['uploadProgress__file-size']}>{calculateSize(file.size)}mb</p>
					{status === 'uploading' && <p className={styles.uploadProgress__percentage}>{progress}%</p>}
				</div>
				<div className={clsx(styles.uploadProgress__progressBar, status === 'uploading' && styles['uploadProgress__progressBar--uploading'])}>
					<div
						style={{ width: `${progress}%` }}
						className={styles.uploadProgress__progressFill}
					/>
				</div>
			</div>
			{status === 'uploading' && <button className={styles.uploadProgress__delete} onClick={onClear}><CrossIcon /></button>}
		</div>

	);
};