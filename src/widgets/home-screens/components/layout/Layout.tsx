import { Layout as BaseLayout } from "antd"
import { FC } from "react"
import { Sider } from "."
import "./Layout.less"
import { useChatStore } from "src/shared/providers";
import PlaygroundRenderer from "../../ui/PlaygroundRenderer";

interface Props {
  children: React.ReactNode
}

const Layout2: FC<Props> = ({ children }) => {
  const { playground } = useChatStore()

  return (
    <BaseLayout className={playground.open ? "main-layout-playground" : "main-layout" } hasSider>
      <BaseLayout.Sider width={"auto"} className={"sider-wrapper"}>
        <Sider />
      </BaseLayout.Sider>

      <BaseLayout.Content className={"content"}>
        {children}
      </BaseLayout.Content>

      {playground.open && (
        <BaseLayout.Sider width={550} className={"playground-sider"}>
          <PlaygroundRenderer type={playground.type} id={playground.id} />
        </BaseLayout.Sider>
      )}
    </BaseLayout>
  )
}

export { Layout2 }
