import React, { useEffect, useRef, useState } from "react";
import css from "./FileList.module.less";
import clsx from "clsx";
import { FileItem } from "../FileItem";
import FileUploadSuccessIcon from "../../icons/FileUploadSuccess.icon";
import UploadFilesProgressIcon from "../../icons/UploadFilesProgress.icon";
import ArrowDownIcon from "../../icons/ArrowDown.icon";
import { FileWithId } from "../../../widgets/home-screens/lib/hooks/useDragFile";

interface Props {
	className?: string;
	files: FileWithId[];
	onChange: (files: FileWithId[]) => void;
	onLoadingStatusChange?: (notLoadedFile: string | undefined) => void;
}

type ScrollPosition = "start" | "middle" | "end";

export const FileListForUpload: React.FC<Props> = ({
	files,
	onChange,
	className,
	onLoadingStatusChange
}) => {
	console.log(' files:', files)
	const containerRef = React.useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = React.useState(false);
	const startX = React.useRef(0);
	const scrollLeft = React.useRef(0);
	const [fileURLs, setFileURLs] = useState<Record<string, string>>({});
	const [scrollPosition, setScrollPosition] = useState<ScrollPosition>("start");
	const scrollTimeout = React.useRef<number | null>(null);
	const mouseDownTime = useRef<number | null>(null);
	const longPress = useRef<boolean>(false);
	const dragged = useRef<boolean>(false);
	const DRAG_THRESHOLD = 3;
	const CLICK_THRESHOLD = 1000;
	const [loadedFiles, setLoadedFiles] = useState<string[]>([]);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [showAllFiles, setShowAllFiles] = useState(false);

	const isLink = (file: FileWithId) =>
		file.name.startsWith("http://") || file.name.startsWith("https://");

	useEffect(() => {
		const urls: Record<string, string> = {};
		files.forEach(file => {
			urls[file.id] = URL.createObjectURL(file);
		});
		setFileURLs(urls);
		return () => {
			Object.values(urls).forEach(url => URL.revokeObjectURL(url));
		};
	}, [files]);

	useEffect(() => {
		setLoadedFiles(prev => prev.filter(id => files.some(file => file.id === id)));
	}, [files]);

	const activeFile = files.find(file => !loadedFiles.includes(file.id) && !isLink(file));

	useEffect(() => {
		if (activeFile) {
			const timer = setTimeout(() => {
				setLoadedFiles(prev => [...prev, activeFile.id]);
			}, 3000);
			return () => clearTimeout(timer);
		}
		return undefined;
	}, [activeFile]);

	useEffect(() => {
		if (onLoadingStatusChange) {
			onLoadingStatusChange(activeFile ? `${activeFile.name}|||${uploadProgress}` : undefined);
		}
	}, [activeFile, uploadProgress, onLoadingStatusChange]);

	useEffect(() => {
		if (activeFile) {
			setUploadProgress(0);
			const totalDuration = 3000;
			const startTime = Date.now();
			const interval = setInterval(() => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
				setUploadProgress(progress);
			}, 100);
			return () => clearInterval(interval);
		}
		return undefined;
	}, [activeFile]);

	const onMouseDown = (e: React.MouseEvent) => {
		if (!containerRef.current) return;
		setIsDragging(true);
		dragged.current = false;
		mouseDownTime.current = Date.now();
		longPress.current = false;
		startX.current = e.pageX - containerRef.current.offsetLeft;
		scrollLeft.current = containerRef.current.scrollLeft;
		containerRef.current.style.cursor = "grabbing";
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !containerRef.current) return;
		e.preventDefault();
		const x = e.pageX - containerRef.current.offsetLeft;
		const walk = x - startX.current;
		if (Math.abs(walk) > DRAG_THRESHOLD) {
			dragged.current = true;
		}
		containerRef.current.scrollLeft = scrollLeft.current - walk;
	};

	const onMouseUpOrLeave = () => {
		if (!containerRef.current) return;
		setIsDragging(false);
		containerRef.current.style.cursor = "grab";
		if (mouseDownTime.current) {
			const duration = Date.now() - mouseDownTime.current;
			longPress.current = duration >= CLICK_THRESHOLD;
		}
		mouseDownTime.current = null;
	};

	const updateScrollPosition = () => {
		if (!containerRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
		if (scrollLeft === 0) {
			setScrollPosition("start");
		} else if (scrollLeft >= scrollWidth - clientWidth - 1) {
			setScrollPosition("end");
		} else {
			setScrollPosition("middle");
		}
	};

	const handleScroll = () => {
		updateScrollPosition();
		if (scrollTimeout.current) {
			clearTimeout(scrollTimeout.current);
		}
		scrollTimeout.current = window.setTimeout(() => {
			updateScrollPosition();
		}, 200);
	};

	const handleClickCapture = (e: React.MouseEvent) => {
		if (dragged.current) {
			e.preventDefault();
			e.stopPropagation();
			dragged.current = false;
		}
	};

	React.useEffect(() => {
		if (containerRef.current) {
			containerRef.current.style.cursor = "grab";
			updateScrollPosition();
		}
	}, []);

	const nonLinkFiles = files.filter(file => !isLink(file));

	const allFilesLoaded = nonLinkFiles.length > 1
		? loadedFiles.length === nonLinkFiles.length
		: true;

	return (
		<>
			<div
				className={clsx(
					css.files,
					"scrollbar",
					className,
					{
						[css.scrollStart]: scrollPosition === "start",
						[css.scrollMiddle]: scrollPosition === "middle",
						[css.scrollEnd]: scrollPosition === "end",
					}
				)}
				ref={containerRef}
				onClickCapture={handleClickCapture}
				onScroll={handleScroll}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseUp={onMouseUpOrLeave}
				onMouseLeave={onMouseUpOrLeave}
			>
				{allFilesLoaded &&
					files.map(file =>
						(isLink(file) || loadedFiles.includes(file.id)) && (
							<FileItem
								name={file.name}
								mimetype={file.type}
								url={fileURLs[file.id]}
								onDelete={() => onChange(files.filter(item => item.id !== file.id))}
								key={file.id}
							/>
						)
					)
				}
			</div>
			{!allFilesLoaded && nonLinkFiles.length > 0 && (
				<div className={css.partial_loaded_files}>
					{nonLinkFiles.length > 2 && (
						<button
							className={css.toggle_loaded_files}
							onClick={() => setShowAllFiles(prev => !prev)}
						>
							{showAllFiles ? (
								<ArrowDownIcon className={css.partial_loaded_files_down_btn} />
							) : (
								<ArrowDownIcon className={css.partial_loaded_files_up_btn} />
							)}
						</button>
					)}
					<div className={clsx(css.all_files_container, { [css.expanded]: showAllFiles })}>
						{(showAllFiles ? nonLinkFiles : nonLinkFiles.slice(-2)).map(file => (
							<div key={file.id} className={css.partial_file_name_container}>
								<UploadFilesProgressIcon />
								<span className={css.partial_file_name}>{file.name}</span>
								{loadedFiles.includes(file.id) && <FileUploadSuccessIcon />}
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};
