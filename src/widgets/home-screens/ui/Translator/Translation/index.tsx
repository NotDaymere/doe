import classNames from "classnames";
import {
    TEXT_TO_TRANSLATE_PART,
    TRANSLATED_TEXT_BOTTOM_PART,
    TRANSLATED_TEXT_TOP_PART,
} from "../MockData";
import TranslatedTextIcon from "src/shared/icons/TranslatedText.icon";
import VolumeIcon from "src/shared/icons/Volume.icon";
import PlanetIcon from "src/shared/icons/Planet.icon";
import AttachmentIcon from "src/shared/icons/Attachment.icon";
import TextForTranslateIcon from "src/shared/icons/TextForTranslate.icon";
import DictionaryIcon from "src/shared/icons/Dictionary.icon";
import RotateButton from "../RotateButton";
import { useMemo, useState } from "react";
import DeviceIcon from "src/shared/icons/Device.icon";
import AppsIcon from "src/shared/icons/Apps.icon";
import PlaygroundIcon from "src/shared/icons/Playground.icon";
import { MagicMenu } from "../MagicMenu";
import DoeIcon from "src/shared/icons/Doe.icon";
import { usePanel } from "src/widgets/home-screens/lib";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import CheckFilledIcon from "src/shared/icons/CheckFilled.icon";
import css from "./Translation.module.less";

const Translation = () => {
    const [showMagicMenu, setShowMagicMenu] = useState(false);
    const { files, setFiles } = usePanel();
    const [isUploadFiles, setIsUploadFiles] = useState(false);

    const upload = () => {
        setIsUploadFiles(true);
        const input = document.createElement("input") as HTMLInputElement;
        input.type = "file";
        input.multiple = true;
        input.onchange = (ev: any) => {
            const newFiles = Array.from(ev.target.files) as File[];
            setFiles([...files, ...newFiles]);

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
                <button onMouseEnter={() => setShowMagicMenu(true)}>
                    <AttachmentIcon width={15} height={15} />
                </button>
                <MagicMenu
                    items={MAGIC_MENU_ITEMS}
                    isActive={showMagicMenu}
                    setIsActive={setShowMagicMenu}
                    classes={css.menu}
                />
            </div>

            <PlanetIcon width={15} height={15} />
        </div>
    );

    return (
        <div className={css.translationWrapper}>
            <div className={css.translation}>
                <DictionaryIcon width={48} height={48} className={css.dictionaryIcon} />
                <div className={css.translationArea}>
                    <div className={css.logo}>
                        <DoeIcon width={26} height={26} />
                    </div>
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
                        {isUploadFiles && (
                            <div className={css.uploadIcons}>{renderUploadIcons()}</div>
                        )}
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
                                <div className={css.file}>
                                    <FileFilledIcon width={10} height={12} />
                                    {file.name}
                                    <CheckFilledIcon width={16} height={16} />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={css.icons}>
                        {TRANSLATED_TEXT_TOP_PART &&
                            TRANSLATED_TEXT_BOTTOM_PART &&
                            !isUploadFiles && (
                                <div className={css.volumeIcon}>
                                    <VolumeIcon width={17} height={13} />
                                </div>
                            )}
                        <div className={css.translateIcon}>
                            <TranslatedTextIcon width={20} height={20} />
                        </div>
                    </div>
                    {TRANSLATED_TEXT_TOP_PART && TRANSLATED_TEXT_BOTTOM_PART && !isUploadFiles && (
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
                </div>
            </div>
        </div>
    );
};

export default Translation;
