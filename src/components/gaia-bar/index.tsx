import { Flex } from "antd"
import { FC, useEffect, useState } from "react"
import { useApp } from "../app"
import { IconsType, SvgIcon } from "../icon"
import "./index.less"

type Props = {
  onClose?: () => void
}

interface Items {
  icon: IconsType
  value: number
  unit: string
  classname?: string
}

const convertUnit = (value: number, unit: string): { value: number; unit: string } => {
  const unitConversions: Record<string, { thresholds: number[]; units: string[] }> = {
    "t-g": { thresholds: [1e3, 1e6], units: ["t-g", "t-kg", "t-MT"] },
    "mL": { thresholds: [1e3, 1e6], units: ["mL", "L", "kL"] },
    "cg": { thresholds: [1e3, 1e6], units: ["cg", "g", "kg"] },
    "mJ": { thresholds: [1e3, 1e6], units: ["mJ", "J", "kJ"] },
    "pm2": { thresholds: [1e3, 1e6], units: ["pm²", "nm²", "µm²"] },
  }

  const conversion = unitConversions[unit]
  if (!conversion) return { value, unit }

  let newValue = value
  let newUnit = unit

  for (let i = 0; i < conversion.thresholds.length; i++) {
    if (newValue >= conversion.thresholds[i]) {
      newValue /= 1e3
      newUnit = conversion.units[i + 1]
    } else {
      break
    }
  }

  return { value: Math.floor(newValue), unit: newUnit }
}

export const GaiaBar: FC<Props> = ({ onClose }) => {
  const [charCount, setCharCount] = useState(0)
  const { messages } = useApp().app

  useEffect(() => {
    const storedContent = localStorage.getItem("messagesContent")

    if (storedContent) {
      const parsedContent = JSON.parse(storedContent)
      const totalChars = parsedContent.reduce((acc: number, content: string) => acc + content.length, 0)
      setCharCount(totalChars)
    }
    console.log("charCount", charCount)
  }, [messages, charCount])

  const items: Items[] = [
    {
      icon: "tree",
      ...convertUnit(charCount * 1.34, "t-g"),
      classname: "tree",
    },
    {
      icon: "drop",
      ...convertUnit(charCount * 2, "mL"),
      classname: "drop",
    },
    {
      icon: "wind",
      ...convertUnit(charCount * 1.728, "cg"),
      classname: "wind",
    },
    {
      icon: "bolt",
      ...convertUnit(charCount * 173, "mJ"),
      classname: "bolt",
    },
    {
      icon: "leaf",
      ...convertUnit(charCount * 200, "pm2"),
      classname: "leaf",
    },
  ]

  return (
    <Flex className={"gaia-bar"} align={"center"} gap={6}>
      <Flex className={"gaia-bar-wrapper"} gap={25}>
        {items.map((item, index) => (
          <Flex vertical gap={12} key={index} className={"gaia-bar-item"}>
            <SvgIcon type={item.icon} />

            <Flex vertical gap={4} className={`gaia-bar-value ${item.classname}`}>
              <span className={"value-number"}>{item.value}</span>
              <span className={"value-unit"}>{item.unit}</span>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <button onClick={onClose} className={"close-button"}>
        <SvgIcon type={"stop"} />
      </button>
    </Flex>
  )
}
