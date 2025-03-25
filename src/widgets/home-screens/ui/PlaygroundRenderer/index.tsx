import { FC } from "react"
import { App } from "src/types"
import TablePlayground from "../TablePlayground"
import CodePlayground from "../CodePlayground";
import IframePlayground from "../IframePlayground/IframePlayground";
import SourcePlayground from "../Playground/SourcePlayground";

const PlaygroundRenderer: FC<Partial<App.Playground>> = ({ id, type }) => {
  switch (type) {
    case "code":
       return <CodePlayground id={id}/>
    case "table":
      return <TablePlayground id={id}/>
    case "source":
      return <SourcePlayground isActive={true}/>
    case "iframe":
          return <IframePlayground/>
    default:
      return
  }
}

export default PlaygroundRenderer
