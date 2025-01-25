
import { Button,Form } from "antd";
import { FC, useState } from "react";
import { useApp } from "../app";
import { SvgIcon } from "../icon";
import { Dropdown } from "./assets/Dropdown";
import './index.less';
import { useEditorContext } from 'src/contexts/EditorProvider';
import { useEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import History from "@tiptap/extension-history"
import { 
  createDisableEnterWithShift, 
  createHandleTab, 
  CustomCodeBlock, 
  CustomInlineCode, 
  CustomSpan, 
  Div, 
  Formula 
} from "src/components/tiptap-editor/extensions/index";
import { CustomEditor } from '../tiptap-editor';
import { FileItem } from '../ui/FileItem';

interface ChatInputProps {
  onSendMessage: (message: string, files?: UploadFile[]) => void
}

export const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
  const { 
    setInputPosition,
    setLinkInputVisible,
    closeLinkInput,
    setLinkUrl,
    isEditing,
    isLinkFocused,
    isFormulaFocused,
    linkInputVisible,
  } = useEditorContext();

  const [form] = Form.useForm();
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
  const { isTyping, setIsTyping } = useApp().app;

  const handleStopTyping = () => {
    setIsTyping(false);
  };

  const onClick = () => {
    setIsTyping(true);
    const isEmpty = editor?.isEmpty;

    if (editor && !isEmpty) {
      onSendMessage(editor?.getHTML(), uploadedFiles);
      setUploadedFiles([]);
      editor.destroy();
    }
  };


  const handleFileUpload = (file: UploadFile) => {
    setUploadedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFinish = () => {
    if (isTyping) {
      handleStopTyping();
    } else {
      onClick();
    }
  };

  const editor = useEditor({
    extensions: [
      Div,
      Document,
      Text, 
      History.configure({
        depth: 100,
        newGroupDelay: 500,
      }),
      Paragraph,
      Bold,
      Italic,
      CustomSpan,
      Formula,
      Underline,
      CustomInlineCode,
      CustomCodeBlock,
      Link.configure({
        autolink: false,
      }),
      createHandleTab(),
      createDisableEnterWithShift({ 
        onSendMessage,
      }),
    ],
    onSelectionUpdate: () => {
      if (editor?.view) {
        const { from, to } = editor.state.selection;
        try {
          const selectionCoords = editor.view.coordsAtPos((from + to) / 2);
          setInputPosition({
            top: selectionCoords.top - 30,
            left: selectionCoords.left,
          });
        } catch (error) {
          console.error("Error in coordsAtPos:", error);
        }

        const linkAttrs = editor?.getAttributes("link");

        if (linkAttrs?.href) {
          setLinkUrl(linkAttrs.href);
          setLinkInputVisible(true);
        } else if (linkInputVisible) {
          closeLinkInput();
        }
      }
    },
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === "Enter" && !e.shiftKey && !isLinkFocused && !isFormulaFocused) {
      e.preventDefault();
      form.submit();
    }
  };

  return (
    <div className={"chat-input"}>
      <div className={'file-container'}>
        {uploadedFiles.map((file, index) => (
          <FileItem 
            key={file.name}
            index={index}
            file={file}
            onFileRemove={handleFileRemove}
          />
        ))}
      </div>
      <div className={"chat-input-wrapper"}>
        <div className={"integrations-button"}>
          <Dropdown onFileUpload={handleFileUpload} />
        </div>
        <Form 
          form={form} 
          className={'chat-input-form'} 
          onFinish={handleFinish} 
          onKeyDown={handleKeyPress}    
          style={{ width: '100%' }}
        >
          <Form.Item noStyle>
            {!isEditing && <CustomEditor editor={editor} />}
          </Form.Item>

          <Form.Item noStyle>
            <Button
              htmlType={'submit'}
              className={'send-button'}
              icon={<SvgIcon type={'arrowUp'} />}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
