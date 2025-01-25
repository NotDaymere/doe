import { Editor } from "@tiptap/react"
import { useState } from "react";

interface Props {
  editor: Editor | null
}

const useChatInput = ({ editor }: Props): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [content, setContent] = useState<string>('')

  if (editor || content) {
    editor?.chain().focus().insertContent(content).run();
  }

  return [
    content,
    setContent
  ]
}

export default useChatInput;