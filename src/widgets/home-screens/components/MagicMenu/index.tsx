import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import BranchIcon from "src/shared/icons/Branch.icon";
import CallIcon from "src/shared/icons/Call.icon";
import StarsIcon from "src/shared/icons/Stars.icon";
import TalkIcon from "src/shared/icons/Talk.icon";
import UploadIcon from "src/shared/icons/Upload.icon";
import { MagicApplications, MagicMenuButton, MagicUploadApps } from "./ui";
import { useClickOut } from "src/shared/hooks/useClickOut";
import css from "./MagicMenu.module.less";
import { useAppStore, useChatStore } from "../../../../shared/providers";
import { MagicCreateNewBranch } from "./ui/MagicCreateNewBranch/MagicCreateNewBranch";
import { MagicUploadFromDesktop } from "./ui/MagicUploadFromDesktop/MagicUploadFromDesktop";
import { FileWithId } from "../../lib/hooks/useDragFile";
import MagicMenuUploadIcon from "../../../../shared/icons/MagicMenuUploadIcon";
import MagicMenuArrowRightIcon from "../../../../shared/icons/MagicMenuArrowRightIcon";


interface Props {
	onUploadFiles?: (files: FileWithId[]) => void;
	onDispatchDoe?: () => void;
}

export const MagicMenu: React.FC<Props> = ({
	onUploadFiles,
	onDispatchDoe
}) => {
	const [activeMenu, setActiveMenu] = React.useState(false);
	const nodeRef = React.useRef<HTMLDivElement>(null);
	const ref = useClickOut({
		handler: () => setActiveMenu(false)
	});
	const isUploadFileChatMode = useChatStore((state) => state.isUploadFileChatMode);
	const { setTalkModeActive } = useAppStore();
	const toggleMenu = () => setActiveMenu(!activeMenu);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const upload = () => {
		const input = document.createElement("input") as HTMLInputElement;
		input.type = "file";
		input.multiple = true;
		input.onchange = (ev: any) => {
			const files = Array.from(ev.target.files) as File[];
			onUploadFiles?.(files);
			input.remove();
		}
		input.click();
	};

	useEffect(() => {
		if (isUploadFileChatMode) {
			setActiveMenu(false);
		}
	}, [isUploadFileChatMode]);

	const setCloseHandler = (fn?: () => void) => {
		return () => {
			fn?.();
			setActiveMenu(false);
		}
	}

	return (
		<>
			<div
				className={css.magic}
				style={{
					zIndex: activeMenu ? 100 : ""
				}}
				ref={ref}
			>
				<button className={css.magic_btn} onClick={toggleMenu}>
					<StarsIcon />
				</button>

				<CSSTransition
					classNames={css}
					timeout={300}
					in={activeMenu}
					nodeRef={nodeRef}
					mountOnEnter
					unmountOnExit
				>
					<div className={css.menu} ref={nodeRef}>
						<MagicApplications />
						<MagicUploadFromDesktop
							setActiveMenu={setActiveMenu}
							onUploadFiles={onUploadFiles}
							fileInputRef={fileInputRef}
						/>
						<MagicUploadApps />

						<div className={css.magic_button_call_container}
							onClick={setCloseHandler(onDispatchDoe)}>
							<div className={css.magic_button_and_text}>
								<CallIcon fill="currentColor" height={18} width={18} />
								<span>Dispatch Doe</span>
							</div>
							<div className={css.call_icon}>
								<MagicMenuArrowRightIcon fill="currentColor" height={9} width={6} />
							</div>
						</div>

						<div className={css.magic_button_talkmode_container}
							onClick={setCloseHandler(() => setTalkModeActive(true))}>
							<div className={css.magic_button_and_text}>
								<TalkIcon fill="currentColor" height={18} width={18} />
								<span>Talk mode</span>
							</div>
							<div className={css.talkmode_icon}>
								<div className={css.talkmode_icon_inner}></div>
							</div>
						</div>

						<MagicCreateNewBranch setActiveMenu={setActiveMenu} />
					</div>
				</CSSTransition>
			</div>
			<input
				id={"fileInput"}
				ref={fileInputRef}
				type="file"
				multiple
				style={{ display: "none" }}
				onChange={(event) => {
					const files = event.target.files;
					if (!files) return;

					const filesArray = Array.from(files).map((file) =>
						Object.assign(file, {
							id: `${Date.now()}-${Math.random()}`,
						}) as FileWithId,
					);
					if (onUploadFiles) {
						onUploadFiles(filesArray);
					}
					event.target.value = "";
				}}
			/>
		</>
	);
};
