import { CloseCircleOutlined } from "@ant-design/icons"
import { Divider,Flex,FloatButton,Typography } from "antd"
import React,{ FC,useEffect,useState } from "react"
import { useApp } from "../app"
import { SvgIcon } from "../icon"
import { SourceData,sourceDataParser } from "./helpers/sourceDataParser"
import "./index.less"
import { sourceData } from "./mockSourceData"
const { Title, Text } = Typography

const sourceIcons: { [key: string]: JSX.Element } = {
  "notion": <SvgIcon style={{ width: "20px", height: "20px" }} type={"notion"} />,
  "gdocs": <SvgIcon style={{ width: "20px", height: "20px" }} type={"googleDocs"} />,
  "gcal": <SvgIcon style={{ width: "20px", height: "20px" }} type={"googleDocs"} />,
  "gmail": <SvgIcon style={{ width: "20px", height: "20px" }} type={"gMail"} />,
  "google": <SvgIcon style={{ width: "20px", height: "20px" }} type={"google"} />,
  "online": <SvgIcon style={{ width: "20px", height: "20px" }} type={"deepWebSearchIntegrationIcon"} />,
  "miro": <SvgIcon style={{ width: "20px", height: "20px" }} type={"miro"} />,
  "wr": <SvgIcon style={{ width: "20px", height: "20px" }} type={"deepWebSearchIntegrationIcon"} />,
  "spotify": <SvgIcon style={{ width: "20px", height: "20px" }} type={"spotify"} />,
  "bcm": <SvgIcon style={{ width: "20px", height: "20px" }} type={"bilateralCortexModelIcon"} />,
  "phone": <SvgIcon type={"phone"} />,
  "notion-ed": <SvgIcon style={{ width: "20px", height: "20px" }} type={"notion"} />,
  "deep-web": <SvgIcon style={{ width: "20px", height: "20px" }} type={"deepWebSearchIntegrationIcon"} />,
  "default": <SvgIcon style={{ width: "20px", height: "20px" }} type={"deepWebSearchIntegrationIcon"} />,
}

const SourcePlayground: FC = () => {
  const [data, setData] = useState<SourceData>({ sources: [], behaviors: [], workflowSteps: [] })
  const { setPlayground } = useApp().app

  useEffect(() => {
    const parsedData = sourceDataParser(sourceData)
    setData(parsedData)
  }, [sourceData])

  const closeSourcePlayground = () => {
    setPlayground(prev => ({
      ...prev,
      type: null,
      open: false,
    }))
  }

  return (
    <Flex vertical className={"source-section"}>
      <Flex vertical className={"source-container"}>
        <Title className={"source-title"} level={4}>
          Sources
        </Title>
        <Flex wrap={"wrap"} gap={15}>
          {data.sources.map((source, index) => (
            <Flex className={"source-item"} key={index} gap={10}>
              <Flex>{sourceIcons[source.type] || sourceIcons["default"]}</Flex>
              <Text>{source.name}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Divider className={"divider"} />
      <Flex vertical className={"source-container"}>
        <Title className={"source-title"} level={4}>
          Agentic Behavior
        </Title>
        <Flex wrap={"wrap"} gap={15}>
          {data.behaviors.map((behavior, index) => (
            <Flex className={"source-item"} key={index} gap={10}>
              <Flex>{sourceIcons[behavior.type] || sourceIcons["default"]}</Flex>
              <Text>{behavior.name}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Divider className={"divider"} />
      <Flex vertical className={"source-container"}>
        <Title className={"source-title"} level={4}>
          Reasoning Workflow
        </Title>
        <Flex wrap={"wrap"} gap={15} vertical>
          {data.workflowSteps.map((step, index) => (
            <Flex key={index}>
              <Flex vertical>
                <Flex className={"source-item"} gap={10}>
                  <Flex>{sourceIcons[step.type] || sourceIcons["default"]}</Flex>
                  <Text>{step.behavior}</Text>
                </Flex>
                <small className={"annotation"}>{step.description}</small>
              </Flex>
              {step.gmr && (
                <React.Fragment>
                  <SvgIcon style={{ width: "60px" }} type={"lineIcon"} />
                  <Flex vertical>
                    <Text className={"source-item"}>{step.gmr}</Text>
                    <small className={"annotation"}>{step.gmrDescription}</small>
                  </Flex>
                </React.Fragment>
              )}
              {step.links.length > 0 && (
                <React.Fragment>
                  <SvgIcon style={{ width: "50px" }} type={"lineIcon"} />
                  <Flex vertical>
                    {step.links.map((link, index) => (
                      <a className={"link"} href={link}>
                        {link}
                      </a>
                    ))}
                  </Flex>
                </React.Fragment>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
      <div className={"closeBtn"}>
        <CloseCircleOutlined onClick={closeSourcePlayground} />
      </div>
    </Flex>
  )
}

export default SourcePlayground
