import { Layout as BaseLayout } from "antd"
import { FC, Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Sider } from "."
import { useApp } from "../app"
import PlaygroundRenderer from "../playground-renderer"
import "./Layout.less"

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const { playground } = useApp().app

  return (
    <BaseLayout className={"main-layout"} hasSider>
      <BaseLayout.Sider width={"auto"} className={"sider-wrapper"}>
        <Sider />
      </BaseLayout.Sider>

      <BaseLayout.Content className={"content"}>
        {/* <Suspense>
          <Outlet />
        </Suspense> */}
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

export { Layout }
