import classNames from "classnames";
import {
    TEXT_TO_TRANSLATE_PART,
    TRANSLATED_TEXT_BOTTOM_PART,
    TRANSLATED_TEXT_TOP_PART,
} from "../../MockData";
import TranslatedTextIcon from "src/shared/icons/TranslatedText.icon";
import VolumeIcon from "src/shared/icons/Volume.icon";
import PlanetIcon from "src/shared/icons/Planet.icon";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import TextForTranslateIcon from "src/shared/icons/TextForTranslate.icon";
import RotateButton from "../RotateButton";
import { useMemo, useState } from "react";
import DeviceIcon from "src/shared/icons/Device.icon";
import AppsIcon from "src/shared/icons/Apps.icon";
import PlaygroundIcon from "src/shared/icons/Playground.icon";
import { MagicMenu } from "../../MagicMenu";
import { usePanel } from "src/widgets/home-screens/lib";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import CheckFilledIcon from "src/shared/icons/CheckFilled.icon";
import css from "./Translation.module.less";

const Translation = () => {
    const { files, setFiles } = usePanel();
    const [isUploadFiles, setIsUploadFiles] = useState(false);
    // const [fileProgress, setFileProgress] = useState(0);

    const [fileProgress, setFileProgress] = useState<{ [fileName: string]: number }>({});
    const [fileStatuses, setFileStatuses] = useState<{
        [fileName: string]: "pending" | "success" | "error";
    }>({});

    const updateFileProgress = (fileName: string, progress: number) => {
        setFileProgress((prevProgress) => ({
            ...prevProgress,
            [fileName]: progress,
        }));
    };

    const updateFileStatus = (fileName: string, status: "success" | "error") => {
        setFileStatuses((prevStatuses) => ({
            ...prevStatuses,
            [fileName]: status,
        }));
    };

    const upload = () => {
        setIsUploadFiles(true);
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = true;

        input.onchange = (ev: any) => {
            const selectedFiles = Array.from(ev.target.files) as File[];

            selectedFiles.forEach((file) => {
                const formData = new FormData();
                formData.append("file", file);

                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        console.log(`Progress for ${file.name}: ${percentComplete}%`);
                        // setFileProgress(percentComplete);
                        updateFileProgress(file.name, percentComplete);
                    }
                };

                xhr.onload = () => {
                    console.log(`File ${file.name} uploaded successfully!`);
                    updateFileStatus(file.name, "success");
                    setFiles([...files, file]);
                };

                xhr.onerror = () => {
                    console.error(`Error uploading file ${file.name}.`);
                    updateFileStatus(file.name, "error");
                };

                xhr.open("POST", "/upload");
                xhr.send(formData);
            });

            input.remove();
        };

        input.click();
    };

    const MAGIC_MENU_ITEMS = useMemo(
        () => [
            {
                icon: <DeviceIcon width={18} height={11} />,
                text: "Device Files",
                onClick: upload,
            },
            {
                icon: <AppsIcon width={9} height={15} />,
                text: "Applications",
                onClick: () => {
                    console.log("Applications");
                },
            },
            {
                icon: <PlaygroundIcon width={15} height={15} />,
                text: "Playgrounds",
                onClick: () => {
                    console.log("Playgrounds");
                },
            },
        ],
        []
    );

    const renderUploadIcons = () => (
        <div className={css.icons}>
            <div className={css.magicMenu}>
                <MagicMenu
                    items={MAGIC_MENU_ITEMS}
                    magicButtonIcon={<AttachmentIcon width={15} height={15} />}
                    classes={css.menu}
                />
            </div>

            <PlanetIcon width={15} height={15} />
        </div>
    );

    return (
        <>
            <div className={css.iconsForTranslated}>
                <div className={css.translateIcon}>
                    <TextForTranslateIcon width={20} height={20} />
                </div>
                <RotateButton
                    onClick={function (): void {
                        throw new Error("Function not implemented.");
                    }}
                />
            </div>
            <div
                className={classNames(css.textForTranslateWrapper, {
                    [css.uploadArea]: isUploadFiles,
                })}
            >
                {/* {isUploadFiles && (
                            <progress value={fileProgress} max="100" />

                            // <div>
                            //     <div className={css.progressBar} />
                            //     <div
                            //         className={css.fileProgress}
                            //         style={{ width: `${fileProgress}%` }}
                            //     />
                            // </div>
                        )} */}
                {isUploadFiles && <div className={css.uploadIcons}>{renderUploadIcons()}</div>}
                <div className={css.textForTranslate}>
                    {TEXT_TO_TRANSLATE_PART && !isUploadFiles && (
                        <div
                            className={css.text}
                            dangerouslySetInnerHTML={{ __html: TEXT_TO_TRANSLATE_PART }}
                        />
                    )}
                    {!isUploadFiles && renderUploadIcons()}
                </div>
            </div>
            {isUploadFiles && (
                <div className={css.filesList}>
                    {files.map((file) => (
                        <div className={css.file} key={file.name}>
                            <FileFilledIcon width={10} height={12} />
                            {file.name}
                            <CheckFilledIcon width={16} height={16} />
                        </div>
                    ))}
                </div>
            )}
            <div className={css.icons}>
                {TRANSLATED_TEXT_TOP_PART && TRANSLATED_TEXT_BOTTOM_PART && (
                    <div className={css.volumeIcon}>
                        <VolumeIcon width={17} height={13} />
                    </div>
                )}
                <div className={css.translateIcon}>
                    <TranslatedTextIcon width={20} height={20} />
                </div>
            </div>
            {TRANSLATED_TEXT_TOP_PART && TRANSLATED_TEXT_BOTTOM_PART && (
                <div className={css.translatedTextWrapper}>
                    <div
                        className={css.text}
                        dangerouslySetInnerHTML={{ __html: TRANSLATED_TEXT_TOP_PART }}
                    />
                    <div
                        className={classNames(css.text, css.bottomText)}
                        dangerouslySetInnerHTML={{
                            __html: TRANSLATED_TEXT_BOTTOM_PART,
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default Translation;
