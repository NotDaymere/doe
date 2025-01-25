import { useEffect, useState } from "react"
import { useApp } from "../components/app"

const useTypewriter = (text: string, speed: number, onComplete: () => void) => {
  const [displayText, setDisplayText] = useState("")
  const { isTyping } = useApp().app

  useEffect(() => {
    if (isTyping && displayText === "") {
      setDisplayText("")
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          onComplete()
        }
      }, speed)
      return () => {
        clearInterval(typingInterval)
      }
    }
    return
  }, [text, speed, isTyping])

  return displayText
}

export default useTypewriter
