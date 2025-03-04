import { FC } from "react"
import { App } from "src/types"
import TablePlayground from "../TablePlayground"
import CodePlayground from "../CodePlayground";

const PlaygroundRenderer: FC<Partial<App.Playground>> = ({ id, type }) => {
  switch (type) {
    case "code":
       return <CodePlayground id={id}/>
    case "table":
      return <TablePlayground id={id}/>
    // case "source":
    //   return <SourcePlayground />
    default:
      return
  }
}

export default PlaygroundRenderer
