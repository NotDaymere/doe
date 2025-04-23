import { HTMLProps, useRef } from "react";
export type FileWithId = File & { id: string };
type UploadButtonProps = {
	className?: string;
	children: React.ReactNode;
	fileType?: string;
	onFileChange?: (file: FileWithId) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const UploadButton = ({ className = '', children, fileType = 'image/*', onFileChange, ...props }: UploadButtonProps) => {
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

	return (
		<>
			<button {...props} className={className} onClick={handleButtonClick}>
				{children}
			</button>
			<input
				type="file"
				accept={fileType}
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
		</>
	);
}
