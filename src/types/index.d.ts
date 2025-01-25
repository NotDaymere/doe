import "vite-plugin-pwa/client"
import "vite-plugin-svgr/client"
import "vite/client"

declare namespace App {
  type ChartType =
    | "bar"
    | "line"
    | "pie"
    | "donut"
    | "area"
    | "scatter"
    | "bubble"
    | "column"
    | "histogram"
    | "boxplot"
    | "waterfall"
    | "table"

  interface Playground {
    id: string | null
    type: "code" | "table" | "source" | null
    open: boolean
    data: any
    text?: string
  }

  interface Message {
    id: number | null
    content: string
    files?: UploadFile[]
    isUser: boolean
    isCode?: true
  }
}
