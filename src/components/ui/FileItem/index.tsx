import { CloseCircleOutlined } from "@ant-design/icons"
import { Viewer } from "@react-pdf-viewer/core"
import { Image, Modal } from "antd"
import { FC, useState } from "react"
import { SvgIcon } from "src/components/icon"
import { shortFileName } from "src/helpers/shortFileName"
import "./index.less"
import React from "react"

type Props = {
  index: number
  file: UploadFile
  onFileRemove?: (index: number) => void
  isLink?: boolean
}

type FileType = "image" | "pdf"

export const FileItem: FC<Props> = ({ onFileRemove, file, index, isLink }) => {
  const [preview, setPreview] = useState<{ type: FileType; url: string } | undefined>(undefined)
  const [isPreviewOpened, setIsPreviewOpened] = useState(false)

  const fileType = file.name.split(".").pop()
  const isImage = fileType && ["jpg", "jpeg", "png", "gif", "bmp"].includes(fileType.toLowerCase())
  const isPdf = fileType && fileType.toLowerCase() === "pdf"

  const getBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const getPreview = async () => {
    if (!isPreviewOpened) {
      if (isImage) {
        const imageUrl = await getBase64(file)
        setPreview({
          type: "image",
          url: imageUrl,
        })
      } else if (isPdf) {
        const pdfUrl = URL.createObjectURL(file as any)
        setPreview({
          type: "pdf",
          url: pdfUrl,
        })
      }
      setIsPreviewOpened(true)
    }
  }

  const closePreview = () => {
    setPreview(undefined)
    setIsPreviewOpened(false)
  }

  return (
    <React.Fragment>
      <div className={"file-item"} key={index} onClick={getPreview}>
        {onFileRemove && (
          <CloseCircleOutlined
            onClick={e => {
              e.stopPropagation()
              onFileRemove(index)
            }}
            className={"file-item-remove-icon"}
          />
        )}
        <SvgIcon className={"file-item-icon"} type={"pdfIcon"} />
        <div className={"file-item-info"}>
          <div className={"file-item-name"}>{shortFileName(file.name, 15)}</div>
          <div className={"file-item-format"}>{fileType}</div>
        </div>

        {preview && preview.type === "image" && (
          <Image
            src={preview.url}
            style={{ display: "none" }}
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: true,
              destroyOnClose: true,
              onVisibleChange(value) {
                if (!value) {
                  setPreview(undefined)
                  setIsPreviewOpened(false)
                }
              },
            }}
          />
        )}
        {preview && preview.type === "pdf" && (
          <Modal
            open={isPreviewOpened}
            onCancel={closePreview}
            footer={null}
            width={"50%"}
            style={{ height: "80vh", overflowY: "auto" }}
          >
            {preview.url ? <Viewer fileUrl={preview.url} /> : <p>Loading PDF...</p>}
          </Modal>
        )}
      </div>
      {isLink && (
        <div className={"file-item"}>
          <SvgIcon className={"file-item-icon"} type={"pythonIcon"} />
          <div className={"file-item-info"}>
            <div className={"file-item-name"}>File Programming in Pyt…</div>
            <div className={"file-item-format"}>python.org</div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
