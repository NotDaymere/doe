import Format from "../../../../../../shared/icons/Format";
import General from "src/shared/icons/General"
import Bold from "../../../../../../shared/icons/Bold";
import Indian from "../../../../../../shared/icons/Indian";
import Underline from "../../../../../../shared/icons/Underline";
import StrikeThrough from "../../../../../../shared/icons/StrikeThrough";
import UpperLowerCase from "../../../../../../shared/icons/UpperLowerCase";
import PencilUnderline from "../../../../../../shared/icons/PencilUnderline";
import Paint from "../../../../../../shared/icons/Paint";
import ActivePaintIcon from "../../../../../../shared/icons/ActivePaintIcon";
import Quotes from "../../../../../../shared/icons/Quotes";
import CloudQuotes from "../../../../../../shared/icons/CloudQuotes";
import Degree from "../../../../../../shared/icons/Degree";
import LinkOther from "../../../../../../shared/icons/LinkOther";
import Menu from "../../../../../../shared/icons/Menu";
import ActiveMenuIcon from "../../../../../../shared/icons/ActiveMenuIcon";
import CardPlus from "../../../../../../shared/icons/CardPlus";
import './TipTapTextFormatMenu.less';
import { Button, Flex } from "antd";
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
    const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0 });
    const {setComment,openComments} = useCommentWindowStore();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                handleTipTapTextFormatMenuOnClick();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        // return () => {
        //     document.removeEventListener("mousedown", handleClickOutside);
        // };
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
  const handleClick = (event: MouseEvent) => handleClickOnClickableText(event);

  document.addEventListener('mousedown', handleClick); // Use mousedown for quicker response

 
//   return () => {
//     document.removeEventListener('mousedown', handleClick);
//   };
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

    function adjustPositionIfOverflowing(
        position: { top?: number; left?: number },
        menuWidth: number,
        menuHeight: number,
        margin = 10
    ) {
        const { innerWidth, innerHeight } = window;
        let top = position.top ?? 0;
        let left = position.left ?? 0;

        if (left + menuWidth + margin > innerWidth) {
            left = innerWidth - menuWidth - margin;
        }

        if (top + menuHeight + margin > innerHeight) {
            top = innerHeight - menuHeight - margin;
        }

        if (left < margin) left = margin;
        if (top < margin) top = margin;

        return { top, left };
    }

    useEffect(() => {
        if (!buttonPosition?.top || !buttonPosition?.left) return;

        const adjusted = adjustPositionIfOverflowing(
            {
                top: buttonPosition.top - 10,
                left: buttonPosition.left - 200, // як у тебе
            },
            400, // Ширина меню (приблизно, підбери сам)
            48,  // Висота меню (можна уточнити через getBoundingClientRect)
        );

        setMenuCoords(adjusted);
    }, [buttonPosition]);

    return (
        <>
            <Flex
                ref={menuRef}
                className={"text-format-container"}
                style={{
                    top: `${menuCoords.top}px`,
                    left: `${menuCoords.left}px`,
                }}
            >
                <Button className={"button"} onClick={handleRemoveFormat}>
                    <General />
                </Button>

                <Button className={"button"} onClick={applyBold}>
                    <Bold />
                </Button>

                <Button className={"button"} onClick={applyItalic}>
                    <Indian />
                </Button>

                <Button className={"button"} onClick={applyUnderline}>
                    <Underline />
                </Button>

                <Button className={"button"} onClick={applyStrikeThrough}>
                    <StrikeThrough />
                </Button>

                <Button className={"button"} onClick={toggleUpperLowerCase}>
                    <UpperLowerCase />
                </Button>

                <Button className={"button"} onClick={applyPencilUnderline}>
                    <PencilUnderline />
                </Button>

                <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                    <Button
                        className={activePaint ? "button-active" : "button"}
                        onClick={handlePenClick}
                    >
                        {!activePaint ? <Paint /> : <ActivePaintIcon />}
                    </Button>
                    {activePaint && <ActivePaint onColorSelect={applyColor} onClick={handlePenClick} />}
                </div>

                <Button className={"button"} onClick={applyQuotes}>
                    <Quotes />
                </Button>

                <Button className={"button"} onClick={applyCloudQuotes}>
                    <CloudQuotes />
                </Button>

                <Button className={"button"} onClick={insertDegreeSymbol}>
                    <Degree />
                </Button>

                <Button className={"button"} onClick={applyFormatBlock}>
                    <Format />
                </Button>

                <Button className={"button"} onClick={applyLink}>
                    <LinkOther />
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
