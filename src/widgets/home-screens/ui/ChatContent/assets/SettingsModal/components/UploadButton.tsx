import { useRef } from "react";
type UploadButtonProps = {
	className?: string;
	children: React.ReactNode;
	fileType?: string;
	onFileChange?: (file: File) => void;
} & React.HTMLProps<HTMLButtonElement>;
export const UploadButton = ({ className = '', children, fileType = 'image/*', onFileChange }: UploadButtonProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			onFileChange?.(file);
		}
	};

	return (
		<div>
			<button className={className} onClick={handleButtonClick}>
				{children}
			</button>
			<input
				type="file"
				accept={fileType}
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
		</div>
	);
}
