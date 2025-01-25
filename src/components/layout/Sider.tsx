import { FC, useState } from "react";
import './Sider.less';
import useTheme from "src/hooks/useTheme";
import ButtonWithIcon from "../ui/ButtonWithIcon";
import { IconsType, SvgIcon } from "../icon";
import { useApp } from "../app";
import useEditorFormatting from "src/hooks/useEditorFormatting";
import { GaiaBar } from "../gaia-bar";
import { Dropdown, Tooltip } from "antd";
import { useEditorContext } from "src/contexts/EditorProvider";

interface Button {
  icon: IconsType;
  active?: boolean
  action?: () => void;
}

const Sider: FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [gaiaBarOpen, setGaiaBarOpen] = useState(false);
  const { setMessages } = useApp().app
  const deleteChat = () => (
    setMessages([])
  )

  const { 
    editor,
    linkInputVisible, 
    formulaInputVisible,
    setLinkInputVisible,
    setFormulaInputVisible 
  } = useEditorContext()

  const { 
    toggleBold, 
    toggleItalic,
    toggleUnderline,
    toggleCode,
    activeFormats,
  } = useEditorFormatting(editor!);
  
  if (!editor) {
    return null;
  }

  const buttons: Button[] = [
    {
      icon: 'sun',
      action: () => toggleTheme('light'),
    },
    {
      icon: 'moon',
      action: () => toggleTheme('dark'),
    },
    {
      icon: 'underlineText',
      active: activeFormats.underline,
      action: toggleUnderline,
    },
    {
      icon: 'boldText',
      active: activeFormats.bold,
      action: toggleBold,
    },
    {
      icon: 'italicText',
      active: activeFormats.italic,
      action: toggleItalic,
    },
    {
      icon: 'f',
      action: () => setFormulaInputVisible((prev) => !prev),
      active: formulaInputVisible
    },
    {
      icon: 'braces',
      active: activeFormats.code,
      action: toggleCode,
    },
    {
      icon: 'link',
      active: linkInputVisible,
      action: () => setLinkInputVisible((prev) => !prev),
    },
  ];

  const handleEarthButtonClick = () => {
    setGaiaBarOpen((prev) => !prev);
  };

  return (
    <div className={'sider'}>
      <div className={"earth-button-wrapper"}>
        <div className={`info ${gaiaBarOpen && 'hide'}`}>
          <Tooltip 
            title={'Environmental savings per (calculated per token) by using our models compared to existing SOTA models. For each token you input or output, we calculate tree mass, volume of water, mass of carbon dioxide (CO2), joules of energy, and land mass conserved using the bilateral cortex model.'} 
            placement={'right'} 
            overlayInnerStyle={{ 
              backgroundColor: 'var(--bg-color-main)', 
              color: 'var(--icon-color-primary)',
              textAlign: 'center',
              padding: '14px' 
            }}
          >
            <SvgIcon type={'info'} />
          </Tooltip>
        </div>

        <ButtonWithIcon
          active
          className={`earth-button ${gaiaBarOpen && 'hide'}`}
          icon={'earth'}
          onClick={handleEarthButtonClick}
        />

        {gaiaBarOpen && <div className={'gaia-bar-container'}>
            <GaiaBar onClose={() => setGaiaBarOpen(false)} />
          </div>
        }
      </div>

      <div className={'sider-control-buttons'}>
        {buttons.map(({ icon, action, active }) => (
          <ButtonWithIcon
            key={icon}
            icon={icon}
            active={active}
            onClick={action}
          />
        ))}
      </div>

      <ButtonWithIcon 
        active
        onClick={deleteChat}
        icon={'trashCan'}
      />
    </div>
  );
};

export { Sider };
