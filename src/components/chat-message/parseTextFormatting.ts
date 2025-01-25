type TagType =
  | "inline-code"
  | "block-code"
  | "code-with-output"
  | "bold"
  | "italic"
  | "underline"
  | "inline-math"
  | "block-math"
  | "link"
  | "block-text"
  | "quote"
  | "strikethrough"
  | "red"
  | "blue"
  | "medium-text"
  | "large-text"
  | "superscript"
  | "subscript"
  | "highlight"
  | "tab"
  | "citation"
  | "footnote"

interface ParsedTag {
  type: TagType
  content: string
  attributes?: Record<string, string>
}

export function parseTextFormatting(input: string): string {
  const tagPatterns: Record<TagType, RegExp> = {
    "inline-code": /<inline-code>(.*?)<\/inline-code>/g,
    "block-code": /<block-code>([\s\S]*?)<\/block-code>/g,
    "code-with-output": /<code-with-output>([\s\S]*?)<\/code-with-output>/g,
    "bold": /<bold>(.*?)<\/bold>/g,
    "italic": /<italic>(.*?)<\/italic>/g,
    "underline": /<underline>(.*?)<\/underline>/g,
    "inline-math": /\$(.*?)\$/g,
    "block-math": /\$\$(.*?)\$\$/g,
    "link": /<link url="(.*?)">(.*?)<\/link>/g,
    "block-text": /<block-text>([\s\S]*?)<\/block-text>/g,
    "quote": /<quote>([\s\S]*?)<\/quote>/g,
    "strikethrough": /<strikethrough>(.*?)<\/strikethrough>/g,
    "red": /<red>(.*?)<\/red>/g,
    "blue": /<blue>(.*?)<\/blue>/g,
    "medium-text": /<medium-text>(.*?)<\/medium-text>/g,
    "large-text": /<large-text>(.*?)<\/large-text>/g,
    "superscript": /<superscript>(.*?)<\/superscript>/g,
    "subscript": /<subscript>(.*?)<\/subscript>/g,
    "highlight": /<highlight>(.*?)<\/highlight>/g,
    "tab": /<tab \/>/g,
    "citation": /<citation id="(\d+)">(.*?)<\/citation>/g,
    "footnote": /<footnote id="(\d+)">(.*?)<\/footnote>/g,
  }

  const formatTag = (input: string, tag: TagType): string => {
    const pattern = tagPatterns[tag]
    if (!pattern) return input

    switch (tag) {
      case "inline-code":
        return input.replace(pattern, "<code>$1</code>")
      case "block-code":
        return input.replace(pattern, `<div class="code-without-output"><pre><code>$1</code></pre></div>`)
      case "code-with-output":
        return input.replace(pattern, (_, content) => {
          const blockCodeMatch = content.match(/<pre>([\s\S]*?)<\/pre>/)
          const outputMatch = content.match(/<output>([\s\S]*?)<\/output>/)

          const blockCode = blockCodeMatch ? blockCodeMatch[1].trim() : ""
          const output = outputMatch ? outputMatch[1].trim() : ""

          return `
        <div class="code-with-output">
          <pre><code>${blockCode}</code></pre>
          <div class="output">${output}</div>
        </div>
      `
        })
      case "bold":
        return input.replace(pattern, "<strong>$1</strong>")
      case "italic":
        return input.replace(pattern, "<em>$1</em>")
      case "underline":
        return input.replace(pattern, "<u>$1</u>")
      case "inline-math":
        return input.replace(pattern, `$$$1$`)
      case "block-math":
        return input.replace(pattern, `$$$1$$`)
      case "link":
        return input.replace(pattern, '<a href="$1">$2</a>')
      case "block-text":
        return input.replace(pattern, "<p>$1</p>")
      case "quote":
        return input.replace(pattern, "<q>$1</q>")
      case "strikethrough":
        return input.replace(pattern, "<del>$1</del>")
      case "red":
        return input.replace(pattern, '<span style="color: red;">$1</span>')
      case "blue":
        return input.replace(pattern, '<span style="color: blue;">$1</span>')
      case "medium-text":
        return input.replace(pattern, "<h3>$1</h3>")
      case "large-text":
        return input.replace(pattern, "<h1>$1</h1>")
      case "superscript":
        return input.replace(pattern, "<sup>$1</sup>")
      case "subscript":
        return input.replace(pattern, "<sub>$1</sub>")
      case "highlight":
        return input.replace(pattern, "<mark>$1</mark>")
      case "tab":
        return input.replace(pattern, "&nbsp;&nbsp;&nbsp;&nbsp;")
      case "citation":
        return input.replace(pattern, '<blockquote class="citation" data-id="$1">$2</blockquote>')
      case "footnote":
        return input.replace(pattern, '<cite class="footnote" data-id="$1">$2</cite>')
      default:
        return input
    }
  }

  let parsedOutput = input
  Object.keys(tagPatterns).forEach(tag => {
    parsedOutput = formatTag(parsedOutput, tag as TagType)
  })

  return parsedOutput
}
