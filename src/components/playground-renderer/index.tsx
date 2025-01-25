import { FC } from "react"
import { App } from "src/types"
import CodePlayground from "../code-playground"
import SourcePlayground from "../source-playground"
import TablePlayground from "../table-playground"

const PlaygroundRenderer: FC<Partial<App.Playground>> = ({ id, type }) => {
  switch (type) {
    case "code":
      return <CodePlayground />
    case "table":
      return <TablePlayground />
    case "source":
      return <SourcePlayground />
    default:
      return
  }
}

export default PlaygroundRenderer
