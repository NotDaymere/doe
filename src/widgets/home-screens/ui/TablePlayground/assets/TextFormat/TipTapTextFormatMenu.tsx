import { ReactComponent as General } from "src/assets/icons/general.svg";
import { ReactComponent as Bold } from "src/assets/icons/bold.svg";
import { ReactComponent as Indian } from "src/assets/icons/indian.svg";
import { ReactComponent as UnderLine } from "src/assets/icons/underlining.svg";
import { ReactComponent as StrikeThrough } from "src/assets/icons/strikethrough.svg";
import { ReactComponent as UpperLowerCase } from "src/assets/icons/upper-lower-case.svg";
import { ReactComponent as PencilUnderline } from "src/assets/icons/pencil-underline.svg";
import { ReactComponent as Paint } from "src/assets/icons/paint.svg";
import { ReactComponent as ActivePaintIcon } from "src/assets/icons/active-paint.svg";
import { ReactComponent as Quotes } from "src/assets/icons/quotes.svg";
import { ReactComponent as CloudQuotes } from "src/assets/icons/cloud-quotes.svg";
import { ReactComponent as Degree } from "src/assets/icons/degree.svg";
import { ReactComponent as Format } from "src/assets/icons/format.svg";
import { ReactComponent as LinkOther } from "src/assets/icons/link-other.svg";
import { ReactComponent as Menu } from "src/assets/icons/menu.svg";
import { ReactComponent as ActiveMenuIcon } from "src/assets/icons/active-menu.svg";
import { ReactComponent as CardPlus } from "src/assets/icons/card-plus.svg";
import './TipTapTextFormatMenu.less';
import { Button, Flex, message } from "antd";
import { useEffect, useRef, useState } from "react";
import ActivePaint from "../../../PlaygroundButtons/ActivePaint/ActivePaint";
import ActiveMenu from "../../../PlaygroundButtons/ActiveMenu/ActiveMenu";
import { Editor } from "@tiptap/react";
import { useCommentWindowStore } from "src/shared/providers/useCommentStore";
import formatFriendlyDate from "src/helpers/freindlyDate";
import { generateUUID } from "src/helpers/UUIDGenerator";

type TextFormatProps = {
    isPen?: boolean;
    buttonPosition: {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    };
    
    editor: Editor | null;
    handleTipTapTextFormatMenuOnClick: () => void;
};

function TipTapTextFormatMenu({ buttonPosition, isPen, editor, handleTipTapTextFormatMenuOnClick}: TextFormatProps) {
    const [activePaint, setActivePaint] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const comment = useCommentWindowStore((s) => s.comment);
    
    const isOpen = useCommentWindowStore((s) => s.isOpen);
    const setComment = useCommentWindowStore((s) => s.setComment);
    const openComments = useCommentWindowStore((s) => s.openComments);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                handleTipTapTextFormatMenuOnClick();
            }
       
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
   
  
  
    
 






const handleClickOnClickableText = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement;


  if (clickedElement && clickedElement.dataset.clickable) {
    const clickedId = clickedElement.dataset.id;
    openComments(clickedId); 
    // event.preventDefault();
    // event.stopPropagation(); 
 
}
};


useEffect(() => {
  const editorContainer = document.querySelector(".tiptap-editor");

  if (!editorContainer) return;


  
  const handleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
  
    if (target?.dataset?.clickable === "true") {
      
      const clickedId = target.dataset.id;
      if (clickedId) {
        openComments(clickedId); // ✅ Open your comment thread
      }
   
    }
  
};


// document.querySelector(".tiptap-editor")?.addEventListener("click", (e) => {
//   console.log("Target:", e.target);
// });


 editorContainer.addEventListener("click", handleClick);

  
  return () => {
 
    // editorContainer.removeEventListener("click", handleClick);
  };
}, []);


    const handleRemoveFormat = () => {
        if (!editor) return;
        editor.chain().focus().unsetAllMarks().clearNodes().run();
    };

    const applyBold = () => {
        if (!editor) return;
        editor.chain().focus().toggleBold().run();
    };

    const applyItalic = () => {
        if (!editor) return;
        editor.chain().focus().toggleItalic().run();
    };

    const applyUnderline = () => {
        if (!editor) return;
        editor.chain().focus().toggleUnderline().run();
    };

    const applyStrikeThrough = () => {
     
        if (!editor) return;
        editor.chain().focus().toggleStrike().run();
    };

    const toggleUpperLowerCase = () => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return;
        const selectedText = editor.state.doc.textBetween(from, to, "");
       
        
        const newText = 
        selectedText === selectedText.toUpperCase()
                ? selectedText.toLowerCase()
                : selectedText.toUpperCase();
        editor.chain().focus().deleteRange({ from, to }).insertContent(newText).run();
    };

    const applyPencilUnderline = () => {
        if (!editor) return;
       
        editor.chain().focus().toggleUnderline().run();
    };

    const applyQuotes = () => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return;
        const selectedText = editor.state.doc.textBetween(from, to, "");
        const newText = `"${selectedText}"`;
        editor.chain().focus().deleteRange({ from, to }).insertContent(newText).run();
    };

    const applyCloudQuotes = () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    if (from === to) return;

    const selectedText = editor.state.doc.textBetween(from, to, "");
    const UUID = generateUUID();
    //

  
    setComment({
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar.jpg",
      },
      timestamp: formatFriendlyDate(new Date()),
      message: "",
      from,
      to,
      replies: [],
      _version:Date.now(),
   
    });

    
    setTimeout(() => {
      openComments(UUID);
    }, 0);
    
    
    const className =  "highlighted-typing";

   
    editor.chain().focus().deleteRange({ from, to }).insertContent({
     
      type: "text",
      text: selectedText,

      marks: [
       
        { type: "clickable", attrs: { id: UUID } },
        { type: "highlight", attrs: { class: className } },
      ],
  

    }).run();
  };




    const insertDegreeSymbol = () => {
      
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return;

        const selectedText = editor.state.doc.textBetween(from, to, "");

        if (/^\d+$/.test(selectedText)) {
            editor.chain().focus().toggleSuperscript().run();
        } else {
            editor.chain()
                .focus()
                .deleteRange({ from, to })
                .insertContent([
                    { type: 'text', text: selectedText },
                    {
                        type: 'text',
                        text: '²',
                        marks: [{ type: 'superscript' }],
                    },
                ])
                .run();
        }
    };


    const applyFormatBlock = () => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        if (from === to) return;

        const selectedText = editor.state.doc.textBetween(from, to, "");

        if (/^\d+$/.test(selectedText)) {
            editor.chain().focus().toggleSubscript().run();
        } else {
            editor.chain()
               
            .focus()
                .deleteRange({ from, to })
                .insertContent([
                   
                    { type: 'text', text: selectedText },
                    {
                        type: 'text',
                        text: '¹',
                        marks: [{ type: 'subscript' }],
                    },
              
                ])
                .run();
        }
   

    };

    const applyLink = () => {
        if (!editor) return;
       
        const { from, to } = editor.state.selection;
        
        if (from === to) return;
        const selectedText = editor.state.doc.textBetween(from, to, "");
        const url = prompt("Enter URL:", "https://");

        if (url) {
            editor.chain().focus()
                .deleteRange({ from, to })
                
                .insertContent(selectedText)
                .setTextSelection({ from, to: from + selectedText.length })
                .toggleLink({ href: url, target: '_blank' })
                .run();

        }
    };

    const handlePenClick = () => {
        setActivePaint(!activePaint);
    };

    const applyColor = (color: string) => {
        if (!editor) return;
        editor.chain().focus().setColor(color).run();
    };

    const handleMenuClick = () => {
        setActiveMenu(!activeMenu);
    };

    const handleCardPlus = () => {
        if (!editor) return;
        editor.chain().focus().insertContent('<div class="card">New Card</div>').run();
    };

    return (
        <>
            <Flex
                ref={menuRef}
                className={"text-format-container"}
                style={{
                            top: `${buttonPosition?.top}px`,
                            left: buttonPosition?.left ? `${buttonPosition.left - 200}px` : "auto",
                            bottom: `${buttonPosition?.bottom}px`,
                            right: `${buttonPosition?.right}px`,
                        }
                }
            >
                
                
                <Button className={"button"} onClick={handleRemoveFormat}>
                    <General width={25} height={25}/>
                </Button>

               
                <Button className={"button"} onClick={applyBold}>
                    <Bold />
                </Button>

                <Button className={"button"} onClick={applyItalic}>
                   
                    <Indian />
                </Button>

                <Button className={"button"} onClick={applyUnderline}>
                    <UnderLine width={20} height={20}/>
                </Button>

                <Button className={"button"} onClick={applyStrikeThrough}>
                    <StrikeThrough width={17} height={17}/>
                </Button>

                <Button className={"button"} onClick={toggleUpperLowerCase}>
                    <UpperLowerCase width={20} height={20}/>
                </Button>

                <Button className={"button"} onClick={applyPencilUnderline}>
                    <PencilUnderline width={17} height={17}/>
                </Button>

                <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                    <Button
                        className={activePaint ? "button-active" : "button"}
                        onClick={handlePenClick}
                    >
                        {!activePaint ? <Paint width={25} height={25}/> : <ActivePaintIcon width={17} height={17    }/>}
                    </Button>
                    {activePaint && <ActivePaint onColorSelect={applyColor} onClick={handlePenClick} />}
                </div>

                <Button className={"button"} onClick={applyQuotes}>
                    <Quotes width={20} height={20}/>
                </Button>

                <Button className={"button"} onClick={applyCloudQuotes}>
                    <CloudQuotes width={15} height={15}/>
                </Button>

                <Button className={"button"} onClick={insertDegreeSymbol}>
                    
                    <Degree width={17} height={17}/>
                </Button>

                <Button className={"button"} onClick={applyFormatBlock}>
                    <Format width={25} height={25}/>
                </Button>

                <Button className={"button"} onClick={applyLink}>
                    <LinkOther width={25} height={25}/>
                </Button>
             
                {isPen && (
                 
                 <>
                        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                            <Button
                                className={activeMenu ? "button-active" : "button"}
                                onClick={handleMenuClick}
                            >
                                {activeMenu ? <Menu /> : <ActiveMenuIcon />}
                            </Button>
                            {activeMenu && <ActiveMenu />}
                     
                        </div>

                        <Button className={"button"} onClick={handleCardPlus}>
                            <CardPlus />
                        </Button>
                    </>
                )}
            </Flex>
        </>
  
);

}

export default TipTapTextFormatMenu;
