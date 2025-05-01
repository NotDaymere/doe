import React, { useRef, useEffect } from "react";
import css from "./ChatTagsPanel.module.less";
import { ChatTagsEnum } from "../../../../../../shared/enums/ChatTagsEnum";
import { TAG_META } from "../../SideBarMenu";
import TagsIcon from "../../../../../../shared/icons/TagsIcon";
import ThreeDotsIcon from "../../../../../../shared/icons/ThreeDotsIcon";
import PenIcon from "../../../../../../shared/icons/Pen.icon";

interface ChatTagsPanelProps {
    chatId: string;
    currentTags: ChatTagsEnum[];
    customTagNames: Map<ChatTagsEnum, string>;
    selectedTags: ChatTagsEnum[];
    showAllTags: boolean;
    inputValue: string;
    editValue: string;
    editingTag: ChatTagsEnum | null;
    onToggleShowAll: () => void;
    onSelectTag: (tag: ChatTagsEnum) => void;
    onRenameTag: (tag: ChatTagsEnum, name: string) => void;
    onInputChange: (val: string) => void;
    onKeyPressInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onStartEditTag: (tag: ChatTagsEnum) => void;
    setEditValue: (val: string) => void;
}

export const ChatTagsPanel: React.FC<ChatTagsPanelProps> = ({
                                                                currentTags,
                                                                customTagNames,
                                                                selectedTags,
                                                                showAllTags,
                                                                inputValue,
                                                                editValue,
                                                                editingTag,
                                                                onToggleShowAll,
                                                                onSelectTag,
                                                                onRenameTag,
                                                                onInputChange,
                                                                onKeyPressInput,
                                                                onStartEditTag,
                                                                setEditValue,
                                                            }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingTag && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingTag]);

    return showAllTags ? (
        <div className={css.all_tags_panel}>
            <div className={css.assigning_tags}><TagsIcon /><div>Assigning Tag</div></div>
            <div className={css.input_container}>
                {selectedTags.map(tag => (
                    <div key={tag} className={css.tag_chip} style={{ backgroundColor: TAG_META[tag].color }}>
                        {customTagNames.get(tag) ?? TAG_META[tag].defaultName}
                    </div>
                ))}
                <input
                    ref={inputRef}
                    className={css.tag_input}
                    value={inputValue}
                    onChange={e => onInputChange(e.target.value)}
                    onKeyDown={onKeyPressInput}
                    autoFocus
                />
            </div>
            {Object.entries(TAG_META).map(([key, { defaultName, color }]) => {
                const tag = key as ChatTagsEnum;
                const isSelected = selectedTags.includes(tag);
                const customName = customTagNames.get(tag) ?? defaultName;
                const isEditing = editingTag === tag;

                return (
                    <div key={tag}
                         className={`${css.tag_item} ${isSelected ? css.selected_tag_item : ""}`}
                         onClick={() => onSelectTag(tag)}>
                        <div className={`${css.chat_tag} ${isSelected ? css.current_chat_tag : ""}`}
                             style={{ backgroundColor: color }} />
                        {isEditing ? (
                            <input
                                ref={editInputRef}
                                className={css.edit_tag_input}
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                onBlur={() => onRenameTag(tag, editValue.trim() || defaultName)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        onRenameTag(tag, editValue.trim() || defaultName);
                                    }
                                }}
                            />
                        ) : (
                            <div>{customName}</div>
                        )}
                        {!isEditing && (
                            <div className={css.edit_tag_name_btn} onClick={e => {
                                e.stopPropagation();
                                onStartEditTag(tag);
                            }}>
                                <PenIcon width={11} height={11} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    ) : (
        <div className={css.tag_panel}>
            {(() => {
                const allTags = Object.keys(TAG_META) as ChatTagsEnum[];
                const primary = currentTags;
                const extras = allTags.filter(t => !primary.includes(t)).slice(0, 4 - primary.length);
                const tagsToRender = [...primary, ...extras];

                return tagsToRender.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                        <div
                            key={tag}
                            className={`${css.chat_tag} ${isSelected ? css.current_chat_tag : ""}`}
                            style={{ backgroundColor: TAG_META[tag].color }}
                            onClick={() => onSelectTag(tag)}
                        />
                    );
                });
            })()}
            <div className={css.three_dots} onClick={onToggleShowAll}>
                <ThreeDotsIcon />
            </div>
        </div>
    );
};