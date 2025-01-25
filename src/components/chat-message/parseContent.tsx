export const parseContent = (content: string) => {
  const parts = []
  const chartPattern = /<chart.*?<\/chart>/gs

  let match
  let lastIndex = 0

  while ((match = chartPattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textPart = content.slice(lastIndex, match.index)
      parts.push({ type: "text", content: textPart })
    }

    parts.push({ type: "chart", content: match[0] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", content: content.slice(lastIndex) })
  }

  return parts
}
