import { useRef } from "react";
export type FileWithId = File & { id: string };
type UploadButtonProps = {
	className?: string;
	children: React.ReactNode;
	fileType?: string;
	multiple?: boolean;
	onFileChange?: (file: FileWithId) => void;
	onMultipleFilesChange?: (files: FileWithId[]) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const UploadButton = ({ className = '', children, fileType = 'image/*', multiple = false, onFileChange, onMultipleFilesChange, ...props }: UploadButtonProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			onFileChange?.(Object.assign(file, { id: crypto.randomUUID() }));
		}
	};
	const handleMultipleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files ?? []);
		if (files) {
			onMultipleFilesChange?.(files.map(file => Object.assign(file, { id: crypto.randomUUID() })));
		}
	};
	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		multiple ? handleMultipleFilesChange(event) : handleFileChange(event);
	}

	return (
		<>
			<button {...props} className={className} onClick={handleButtonClick}>
				{children}
			</button>
			<input
				type="file"
				accept={fileType}
				ref={fileInputRef}
				multiple={multiple}
				style={{ display: "none" }}
				onChange={handleOnChange}
			/>
		</>
	);
}
