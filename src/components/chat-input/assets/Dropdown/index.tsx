import "@react-pdf-viewer/core/lib/styles/index.css"
import type { UploadProps } from "antd"
import { Dropdown as AntdDropdown, MenuProps, Upload } from "antd"
import { GlobalWorkerOptions } from "pdfjs-dist"
import React, { FC } from "react"
import { useApp } from "src/components/app"
import { SvgIcon } from "src/components/icon"
import { useEditorContext } from "src/contexts/EditorProvider"
import { ReactComponent as DispatchIcon } from "../icons/dispatch-icon.svg"
import { ReactComponent as IntegrationsIcon } from "../icons/integrations-icon.svg"
import { ReactComponent as UploadIcon } from "../icons/upload-icon.svg"

GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"

interface DropdownProps {
  onFileUpload: (file: any) => void
}

export const Dropdown: FC<DropdownProps> = ({ onFileUpload }) => {
  const { setDispatchActive } = useApp().app
  const { editor } = useEditorContext()

  const props: UploadProps = {
    multiple: true,
    beforeUpload: file => {
      onFileUpload(file as any)
      return false
    },
    showUploadList: false,
    listType: "text",
  }

  const handleDispatchDoe = () => {
    const dispatchTemplate = `<div>Can you call <span data-deletable="true" class="custom-tag blue">number</span> about <span data-deletable="true" class="custom-tag red">context</span> ?</div>`
    setDispatchActive(true)

    if (editor) {
      editor.chain().clearContent().insertContent(dispatchTemplate).run()
    }
  }

  const menu: MenuProps = {
    className: "integrations",
    items: [
      {
        key: "1",
        label: "Integrations",
        icon: <IntegrationsIcon />,
        popupClassName: "integrations-submenu",
        popupOffset: [10, -110],
        children: [
          { key: "1.1", icon: <SvgIcon type={"notion"} /> },
          { key: "1.2", icon: <SvgIcon type={"google"} /> },
          { key: "1.3", icon: <SvgIcon type={"spotify"} /> },
          { key: "1.4", icon: <SvgIcon type={"phone"} /> },
        ],
      },
      { key: "2", label: "Dispatch Doe", icon: <DispatchIcon />, onClick: handleDispatchDoe },
      {
        key: "3",
        label: <Upload {...props}>Upload file</Upload>,
        icon: <UploadIcon />,
      },
      {
        key: "4",
        label: (
          <Upload directory {...props}>
            Upload folder
          </Upload>
        ),
        icon: <UploadIcon />,
      },
    ],
  }

  return (
    <React.Fragment>
      <AntdDropdown
        overlayClassName={"integrations"}
        placement={"top"}
        menu={{ ...menu }}
        getPopupContainer={node => node.parentNode as HTMLElement}
      >
        <SvgIcon style={{ cursor: "pointer" }} type={"sparkles"} />
      </AntdDropdown>
    </React.Fragment>
  )
}
