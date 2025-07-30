import React, { useEffect } from "react";
import { IMessage } from "src/shared/types/Message";
import { MessageNodeVersionSelector } from "../MessageNodeVersionSelector/MessageNodeVersionSelector";
import { FileListForDisplay } from "../../../../../../shared/components/FileList/FileListForDisplay";
import { Editor } from "src/shared/components/Editor";
import CrossIcon from "src/shared/icons/Cross.icon";
import SendIcon from "src/shared/icons/Send.icon";
import PenIcon from "src/shared/icons/Pen.icon";
import css from "./UserChatMessage.module.less";
import { useChatStore } from "../../../../../../shared/providers";
import { usePanel } from "../../../../lib";
import { FavButton } from "../FavButton/FavButton";
import { useEditorContext } from "src/contexts/EditorProvider";

interface UserChatMessageProps {
    data: IMessage;
    content: string;
    updatedContent: string;
    isCurrentBranchOpen: boolean;
    cancelEdit: (id: number) => void;
    editMsgMode: {
        isEditMsgMode: boolean;
        msgId: number | null;
    };
    setContent: (newValue: string) => void;
    handleEdit: () => void;
    toggleEdit: (id: number) => void;
    formulaIndex:number
}

export const UserChatMessage: React.FC<UserChatMessageProps> = ({
                                                                    data,
                                                                    content,
                                                                    updatedContent,
                                                                    isCurrentBranchOpen,
                                                                    cancelEdit,
                                                                    editMsgMode,
                                                                    setContent,
                                                                    handleEdit,
                                                                    toggleEdit,
                                                                    formulaIndex
                                                                }) => {

    const { setEditor, arrayOfFormulas, setArrayOfFormulas } = useChatStore();
    const { setFiles } = usePanel();
    const { setFormulaToDisplay } = useEditorContext()

    if (editMsgMode.isEditMsgMode && editMsgMode.msgId === data.id) {
        return (
            <div className={css.message_edit_container}>
                <div className={css.edit}>
                    <Editor
                        value={content}
                        onChange={setContent}
                        onFocus={setEditor}
                        onBlur={() => setEditor(null)}
                        className={css.edit_editor}
                        classNameEditor={css.edit_editor_editor}
                        placeholder="Edit message"
                    />
                    <div className={css.edit_controls}>
                        <button
                            className={css.edit_controls_cancelBtn}
                            onClick={() => cancelEdit(data.id)}
                        >
                            <span className={css.svg_wrapper}>
                                 <span className={css.tooltip}>Cancel</span>
                                <CrossIcon />
                            </span>
                        </button>

                        <button
                            className={css.edit_controls_saveBtn}
                            onClick={handleEdit}
                        >
                            <span className={css.svg_wrapper}>
                                <span className={css.tooltip}>Send edit</span>
                                <SendIcon />
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        );
    }
    // let formulaInChatMessage;
    // formulaInChatMessage = formulaInChatMessage
    // useEffect(()=>{
    //     console.log('formula that gotta be in chat message is ' + formulaInChatMessage)
    // },[formulaInChatMessage])
    // if(!arrayOfFormulas){
    //     setArrayOfFormulas([''])
    // }
    // useEffect(()=>{
    //     console.log(
    //         "arrayOfFormulas is changed, now it's " 
    //         + arrayOfFormulas 
    //         + " and under index " 
    //         + formulaIndex 
    //         + " it's value is " + arrayOfFormulas![formulaIndex])
    // },[arrayOfFormulas])
    useEffect(()=>{
        setFormulaToDisplay('')
    },[])

    return (
        <div className={css.message_with_button_container}>
            <div className={css.input_container}>
                <div className={`${isCurrentBranchOpen ? css.input_open_branch : css.input} `}>
                    <div className={css.user_message_container}>
                        <div className={css.user_message_and_edit_button}>
                            {!isCurrentBranchOpen &&
                                <button className={css.input_editBtn} onClick={() => toggleEdit(data.id)}>
                            <span className={css.svg_wrapper}>
                                <PenIcon />
                                <span className={css.tooltip}>Edit</span>
                            </span>
                                </button>
                            }

                            <div
                                className={`${isCurrentBranchOpen ? css.input_message_branch : css.input_message} `}
                            >
                                <div
                                dangerouslySetInnerHTML={{
                                    __html: updatedContent,
                                }}
                                ></div>
                                <div
                                className={data.formulaContent ? css.formulaToDisplay : css.formulaToDisplayHidden}
                                dangerouslySetInnerHTML={{
                                    __html: data.formulaContent ? data.formulaContent : ''
                                }}
                                ></div>
                            </div>
                        </div>


                        <div
                            className={css.file_container}
                            style={{
                                height: data.files && data.files.length > 0 ? "auto" : "0px",
                                overflow: "hidden",
                                transition: "height 0.3s ease",
                            }}
                        >
                            {data.files && data.files.length > 0 && (
                                <FileListForDisplay
                                    className={css.panel_files}
                                    files={data.files}
                                    onChange={setFiles}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {!isCurrentBranchOpen &&
                    <MessageNodeVersionSelector message={data} />
                }
            </div>
            {!isCurrentBranchOpen && <FavButton
                data={data}
                className={css.custom_fav_button}/>
            }
        </div>
    );
};