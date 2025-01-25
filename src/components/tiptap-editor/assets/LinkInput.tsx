import { Input } from "antd";
import { FC, useCallback } from "react";

type Props = {
  linkUrl: string | null
  setLinkUrl: React.Dispatch<React.SetStateAction<string | null>>
  inputPosition: {
    top: number | null;
    left: number | null;
  }
  closeLinkInput: () => void
  handleLinkSubmit: () => void
  setLinkFocused: React.Dispatch<React.SetStateAction<boolean>>
}

export const LinkInput: FC<Props> = ({ 
  linkUrl, 
  setLinkUrl, 
  inputPosition, 
  closeLinkInput, 
  handleLinkSubmit,
  setLinkFocused 
}) => {
  const onBlur = () => {
    handleLinkSubmit()
    setLinkFocused(false);

    if (!linkUrl) {
      closeLinkInput();
    }
  }

  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLinkSubmit();
      setLinkFocused(false)
    }
  }, [handleLinkSubmit]);

  return (
    <Input
      type={"text"}
      placeholder={"Enter URL"}
      value={linkUrl ? linkUrl : ''}
      onFocus={() => setLinkFocused(true)}
      onChange={(e) => setLinkUrl(e.target.value)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyUp={(e) => e.key === 'Enter' && handleLinkSubmit()}
      style={{
        position: 'fixed',
        top: `${inputPosition.top}px`,
        left: `${inputPosition.left}px`,
        width: 'fit-content'
      }}
      className={"link-input"}
    />
  )
}