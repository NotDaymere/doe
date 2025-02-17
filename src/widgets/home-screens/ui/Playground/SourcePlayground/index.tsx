import { useEffect, useState } from "react";
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
import Preview from "../PreviewSource";
import "@react-pdf-viewer/core/lib/styles/index.css";
import css from "./SourcePlayground.module.less";

const SourcePlayground = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [sourceType, setSourceType] = useState<SourceType>("web");
    const { previewPlayground, setPreviewPlayground } = useAppStore();

    useEffect(() => {
        return () => {
            setPreviewPlayground({
                type: null,
                data: "",
            });
        };
    }, []);

    const handleOpenSourcePreviewClick = (type: any, data: any) => {
        setPreviewPlayground({
            type,
            data,
        });
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
                            onClick={() => handleOpenSourcePreviewClick(type, item.link)}
                        >
                            {item.icon}
                            <span className={css.itemText}>{item.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const handleShowResources = (type: SourceType) => {
        setIsVisible(true);
        setSourceType(type);
    };

    return (
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
                                    isActiveButton={isVisible && sourceType === node.type}
                                />
                            ))}
                        </div>
                        <div className={css[`popover${sourceType}`]}>
                            {isVisible && (
                                <Popover
                                    content={renderSourcePopoverContent(sourceType)}
                                    onClickOutside={setIsVisible}
                                />
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
            <div className={css.detailsSection}>
                {!previewPlayground.data ? (
                    <>
                        <SourcesIcon />
                        <span className={css.defaultText}>
                            Choose resource from Web, Docs or Apps to view here.
                        </span>
                    </>
                ) : (
                    <Preview data={previewPlayground.data || ""} type={previewPlayground.type} />
                )}
            </div>
        </div>
    );
};

export default SourcePlayground;
