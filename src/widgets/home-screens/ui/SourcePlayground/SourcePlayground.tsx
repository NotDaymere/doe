import React, { FC, useEffect, useRef, useState } from "react";
import "./SourcePlayground.less";
import { useChatStore} from "src/shared/providers";
import { App } from "src/types";
import { SourceData, sourceDataParser } from "../../../../components/source-playground/helpers/sourceDataParser";
import { sourceData } from "../../../../components/source-playground/mockSourceData";
import { Divider, Flex, Typography } from "antd";
import { SvgIcon } from "../../../../components/icon";
import { CloseCircleOutlined } from "@ant-design/icons";

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

const SourcePlayground: FC<Partial<App.Playground>> = ({ id = null }) => {
    const divRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<SourceData>({ sources: [], behaviors: [], workflowSteps: [] })

    useEffect(() => {
        const parsedData = sourceDataParser(sourceData)
        setData(parsedData)
    }, [sourceData])

    return (
        <div
            className="source-playground"
            ref={divRef}
        >
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
            </Flex>
        </div>
    );
};

export default SourcePlayground;
