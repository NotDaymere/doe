import { useRef } from "react";
import { AddProfilePhotoIcon } from "src/shared/icons/AddProfilePhotoIcon";
type UploadButtonProps = {
	className?: string;
	onFileChange?: (file: File) => void;
}
export const UploadButton = ({ className = '', onFileChange }: UploadButtonProps) => {
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
				<AddProfilePhotoIcon />Change Photo
			</button>
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
		</div>
	);
}
