import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { FC, useEffect, useState } from "react";
import StyledLineIcon from "src/shared/icons/StyledLine.icon";
import SourcesIcon from "src/shared/icons/Sources.icon";
import { SourceType } from "src/shared/types/Playground";
import Popover from "src/shared/components/Popover";
import InfoCardNode from "../InfoCardNode";
import ListIcon from "src/shared/icons/List.icon";
import SourceTypeNode from "../SourceTypeNode";
import { PLAYGROUND_SOURCES, INFO_NODES, SOURCE_NODES } from "../MockData";
import GlowIcon from "src/shared/icons/Glow.icon";
import { ScalableContainer } from "../ScalableContainer";
import { useAppStore } from "src/shared/providers";
import PreviewSource from "../PreviewSource";
import "@react-pdf-viewer/core/lib/styles/index.css";
import css from "./SourcePlayground.module.less";
import { useTheme } from "src/shared/hooks/useTheme";

interface IProps {
    isActive: boolean;
}

const SourcePlayground: FC<IProps> = ({ isActive }) => {
    const { previewPlayground, setPreviewPlayground } = useAppStore();
    const { theme } = useTheme();
    const [openedPopover, setOpenedPopover] = useState({
        web: false,
        docs: false,
        apps: false,
    });

    useEffect(() => {
        return () => {
            setPreviewPlayground({
                type: null,
                data: "",
                title: "",
            });
        };
    }, []);

    const handleOpenSourcePreviewClick = (type: any, data: any, title: string) => {
        setPreviewPlayground({
            type,
            data,
            title,
        });
    };

    const handleShowResources = (type: SourceType) => {
        setOpenedPopover((prevOpenedPopover) => ({
            ...prevOpenedPopover,
            [type]: !prevOpenedPopover[type],
        }));
    };

    const renderSourcePopoverContent = (type: SourceType): JSX.Element => (
        <div className={css.popoverContent}>
            <span className={css.title}>{PLAYGROUND_SOURCES[type].title}</span>
            <div className={css.list}>
                <ListIcon />
                <div className={css.items}>
                    {PLAYGROUND_SOURCES[type].items.map((item) => (
                        <button
                            className={css.item}
                            key={item.title}
                            onClick={() =>
                                handleOpenSourcePreviewClick(type, item.link, item.title)
                            }
                        >
                            {item.icon}
                            <span
                                className={classNames(css.itemText, {
                                    [css.bold]: item.isBoldText,
                                    [css.link]: item.isLink,
                                })}
                            >
                                {item.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);

        return () => {
            setShow(false);
        };
    }, [isActive]);

    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames={{
                enter: css.enter,
                enterActive: css.enterActive,
                exit: css.exit,
                exitActive: css.exitActive,
            }}
            unmountOnExit
        >
            <div className={css.sourcePlayground}>
                <div className={css.generalSection}>
                    <ScalableContainer>
                        <div className={css.infoCardNodes}>
                            {INFO_NODES.map((node) => (
                                <InfoCardNode key={node.title} {...node} />
                            ))}
                        </div>
                        <div className={css.styledLineIcon}>
                            <StyledLineIcon className={css.lineIcon} />
                        </div>
                        <div className={css.sourceNodes}>
                            <div className={css.nodes}>
                                {SOURCE_NODES.map((node) => (
                                    <SourceTypeNode
                                        key={node.title}
                                        {...node}
                                        onOpenResource={handleShowResources}
                                        isActiveButton={openedPopover[node.type]}
                                    />
                                ))}
                            </div>
                            <div className={css.popoverapps}>
                                {openedPopover.apps && (
                                    <Popover content={renderSourcePopoverContent("apps")} />
                                )}
                            </div>
                            <div className={css.popoverdocs}>
                                {openedPopover.docs && (
                                    <Popover content={renderSourcePopoverContent("docs")} />
                                )}
                            </div>
                            <div className={css.popoverweb}>
                                {openedPopover.web && (
                                    <Popover content={renderSourcePopoverContent("web")} />
                                )}
                            </div>
                        </div>
                        <div className={css.infoCardNodes}>
                            <GlowIcon className={css.glowIcon} />
                            {INFO_NODES.map((node) => (
                                <InfoCardNode key={node.title} {...node} />
                            ))}
                        </div>
                    </ScalableContainer>
                </div>
                <div
                    className={classNames(css.detailsSection, {
                        [css.detailsSectionWithData]: previewPlayground.data,
                    })}
                >
                    {!previewPlayground.data ? (
                        <>
                            <SourcesIcon theme={theme} />
                            <span className={css.defaultText}>
                                Choose resource from Web, Docs or Apps to view here.
                            </span>
                        </>
                    ) : (
                        <PreviewSource
                            data={previewPlayground.data || ""}
                            type={previewPlayground.type}
                            title={previewPlayground.title}
                        />
                    )}
                </div>
            </div>
        </CSSTransition>
    );
};

export default SourcePlayground;
