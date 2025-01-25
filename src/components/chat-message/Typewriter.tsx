import { FC } from "react"
import useTypewriter from "src/hooks/useTypewriter"

interface TypewriterProps {
  text: string
  speed: number
  onComplete: () => void
}

const Typewriter: FC<TypewriterProps> = ({ text, speed, onComplete }) => {
  return <div dangerouslySetInnerHTML={{ __html: useTypewriter(text, speed, onComplete) }} />
}

export default Typewriter
