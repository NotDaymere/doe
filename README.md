# Chart Parser Overview

The chart parser is a utility that processes XML chart definitions into a structured format for rendering various types of charts. It supports multiple charting libraries like Google Charts and Ant Design Charts, adapting data and configurations dynamically based on the input.

## Key Features

1. **Flexible Chart Type Mapping**  
   The parser maps custom chart types (`bar`, `line`, `pie`, etc.) to corresponding chart types in the target library using helper functions like `getChartType()` and `getBaseChartType()`.

2. **Dynamic Layout Parsing**  
   XML elements such as `<layout>` define axis labels and orientations, which are parsed into structured objects (`hAxis` and `vAxis`) to customize the chart's appearance.

3. **Style Customization**  
   Styles are extracted from `<style>` elements, including bar width, color palettes, inner radius (for donut charts), and candlestick-specific options. Defaults ensure graceful handling of missing attributes.

4. **Data Processing**  
   Each chart type has its own parsing logic (`parseLineChartData`, `parsePieChartData`, etc.), converting raw XML data into arrays formatted for specific charting libraries.

5. **Error Handling**  
   The parser defaults to a `ColumnChart` for unsupported or invalid chart types, logging warnings for better debugging.

6. **Scalability**  
   The modular design makes it easy to add support for new chart types or adapt to additional charting libraries by extending the `parseData` function and related helpers.

# Text Formatting Parser

## Overview

This utility function, `parseTextFormatting`, is designed to parse input strings containing custom tags and replace them with corresponding HTML or formatted text. It supports various formatting options such as inline styles, block-level elements, and complex structures like links and code blocks.

## Supported Tags

The parser recognizes the following custom tags:

- **Inline Styles**
  - `<inline-code>`: Formats inline code snippets.
  - `<bold>`: Applies bold styling.
  - `<italic>`: Applies italic styling.
  - `<underline>`: Underlines the text.
  - `<strikethrough>`: Strikes through the text.
  - `<inline-math>`: Renders inline mathematical expressions.

- **Block-Level Elements**
  - `<block-code>`: Formats multi-line code blocks.
  - `<code-with-output>`: Displays code along with its output.
  - `<block-text>`: Wraps content in a block of text.
  - `<block-math>`: Renders block-level mathematical expressions.
  - `<quote>`: Formats block quotations.

- **Text Appearance**
  - `<red>`: Styles text in red.
  - `<blue>`: Styles text in blue.
  - `<highlight>`: Highlights text.
  - `<superscript>`: Displays superscript text.
  - `<subscript>`: Displays subscript text.

- **Links and References**
  - `<link>`: Creates hyperlinks with a URL and text.
  - `<citation>`: Adds citations with a reference ID.
  - `<footnote>`: Adds footnotes with a reference ID.

- **Headers**
  - `<medium-text>`: Formats text as a medium-sized heading.
  - `<large-text>`: Formats text as a large-sized heading.

- **Special Features**
  - `<tab>`: Adds a tab space.

## How It Works

1. **Tag Patterns**  
   Each custom tag is associated with a regular expression (RegExp) to identify its syntax in the input string.

2. **Transformation**  
   The parser processes the input string and replaces matched tags with appropriate HTML elements or formatted content.

3. **Iterative Replacement**  
   All supported tags are iteratively matched and replaced until the input string is fully processed.

## Extensibility

The parser can be extended by:
- Adding new tag types and their patterns in the `tagPatterns` object.
- Defining transformation logic for new tags in the `formatTag` function.

## Usage

Import the parser and pass a string containing custom tags. The output will be a string with the tags replaced by formatted HTML or other structures.


# General Content Parser

## Overview

The `parseContent` function processes a given string (`content`) and splits it into identifiable parts. It detects specific patterns, such as `<chart>` tags, and categorizes them into structured objects, allowing easier handling of mixed content types.

## Functionality

### Input
- **`content` (string):** A string containing text and potential `<chart>` tags.

### Output
- **Array of Parts:** The function returns an array of objects, where each object represents a distinct section of the input string.
  - `type`: The type of content (`"text"` or `"chart"`).
  - `content`: The actual string content for this part.

### Process
1. **Pattern Matching**  
   A regular expression (`<chart.*?<\/chart>`) is used to locate all `<chart>` tags, including their nested content.

2. **Segmentation**  
   The string is divided into segments:
  - Text sections (anything outside the `<chart>` tags).
  - Chart sections (entire `<chart>` tags with their content).

3. **Iterative Parsing**  
   The function processes the input string in chunks:
  - Adds text segments before a `<chart>` tag.
  - Adds the matched `<chart>` tag as a separate part.
  - Handles remaining text after the last `<chart>` tag.

4. **Result Compilation**  
   The function compiles these segments into a structured array for further use.

## Example Output Structure
The returned array has the following format:
```json
[
  { "type": "text", "content": "Text before the chart." },
  { "type": "chart", "content": "<chart>...</chart>" },
  { "type": "text", "content": "Text after the chart." }
]
```



# Typewriter Animation Logic

## Overview

The **Typewriter Animation** replicates the effect of text being typed out character by character. This is achieved through the interaction between a React component (`Typewriter`) and a custom hook (`useTypewriter`). The hook manages the animation logic, ensuring each character of the given text appears sequentially over time.

---

## Component: `Typewriter`

### Purpose
The `Typewriter` component is a functional React component responsible for displaying the text with the typewriter animation effect. It receives the following props:

- **`text`**: The string to animate.
- **`speed`**: The delay in milliseconds between each character's appearance.
- **`onComplete`**: A callback function executed after the animation is complete.

### Implementation
The `Typewriter` component uses the `useTypewriter` hook to generate the animated text and renders it using `dangerouslySetInnerHTML`.

---

## Hook: `useTypewriter`

### Purpose
The `useTypewriter` hook encapsulates the logic for simulating the typewriter effect. It manages the current state of the displayed text and updates it at specified intervals.

### Key Features

#### **1. State Management**
- **`displayText`**: Stores the current portion of the text being displayed.
- Initialized as an empty string and updated character by character.

#### **2. Typing Effect**
- The `useEffect` hook triggers when:
  - The provided `text` or `speed` changes.
  - The `isTyping` flag from the global state is active.
- A typing interval is initiated to append characters from the `text` string to `displayText`:
  - Each character is appended at intervals specified by `speed`.
  - The interval stops once all characters are displayed.
- On completion, the `onComplete` callback is executed.

#### **3. Cleanup**
- The typing interval is cleared on unmount or when dependencies (`text`, `speed`, or `isTyping`) change, ensuring no memory leaks.

---

## Animation Logic Workflow

1. **Initialization**
   - The `useTypewriter` hook resets `displayText` to an empty string.
   - It waits for the `isTyping` flag to be `true` before starting the animation.

2. **Character Addition**
   - Characters from `text` are appended one by one to `displayText` using the `setInterval` function.
   - The interval's delay is controlled by the `speed` prop.

3. **Completion**
   - Once all characters are displayed, the interval is cleared, and `onComplete` is called.

---

## Current Behavior

### **Animation Inactive**
The typing animation is currently **not active**

---

## Extensibility

You can enhance the logic by:
- Adding a blinking cursor for more realism.
- Supporting pauses or delays in typing.
- Allowing for customizable styles or effects during the typing animation.


