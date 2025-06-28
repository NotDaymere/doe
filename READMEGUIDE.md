# Playground System - Developer Guide

## TablePlayground

### Overview
`TablePlayground` is a table-based editor with rich text capabilities, utilizing Ant Design’s `Table` and TipTap for dynamic table rendering and text editing.

### Key Features
- **Table Rendering**: Displays dynamic tables with saved data, supporting cell, row, and column selection with CSS-based visual feedback.
- **Rich Text Editing**: Uses TipTap with extensions (`StarterKit`, `Underline`, `TextStyle`, `Superscript`, `Subscript`, `Color`, `CustomBlock`, `Clickable`) for advanced formatting.
- **State Management**: Employs `useChatStore`, `usePlaygroundStore`, and `useVersionHistoryStore` for playground state, actions, and history.
- **Responsive Design**: Adapts UI to window size, supports collapse via middle-click, and ensures menus stay within the viewport using `adjustPosition`.

### Action and Formatting Components
- **TipTapTextFormatMenu**: Context menu for text styling (bold, italic, underline, strikethrough, case toggle, quotes, curly quotes, degree/superscript, subscript, links, color) with `ActivePaint` for colors and `ActiveMenu` for extra options. Supports clickable comments via `useCommentWindowStore`.
- **CloudPlusButton**: Toggles `CloudActionsSection`, closing on outside clicks.
- **CloudActionsSection**: Offers text-based actions (`Add a Prompt`, `Change Writing Level`, `Make Content Length`, `Change Tone`) in a toggleable menu.
- **PlaygroundAction**: Container for actions (`prompt`, `writing-level`) with drag-and-drop in full-screen mode and buttons for closing (`CloseIcon`) or executing (`SendIcon`).
- **Prompt**: Inserts custom text as a `customBlock` in TipTap via an input field.
- **WritingLevel**: Adjusts text complexity (e.g., primary school, university) with a `Menu` dropdown.

### Action Buttons
- **CloudPlusButton**: Opens action menu for text operations.
- **PenFormatingButton**: Activates `TipTapTextFormatMenu` for text styling.
- **ResizePlaygroundButton**: Adjusts playground size.
- **FullscreenGeneralLogo**: Toggles full-screen mode and opens `Chat` for chat interaction.

### Key Functions
- `adjustPosition`: Keeps menus within the viewport.
- `handleSetDataToInput`: Updates TipTap content based on table selections.
- `handleCollapsePlayground`: Collapses the playground and updates state.
- `handleRemoveFormat`, `applyBold`, etc.: Manages TipTap formatting.
- `handleClickOnClickableText`: Opens comment windows for clickable text.
- `addPrompt`, `updatePromptValue`: Handles prompt insertion and selection updates.

## CodePlayground

### Overview
`CodePlayground` is a code editor, built with Monaco Editor, offering robust code editing and formatting.

### Key Features
- **Code Editing**: Features Monaco Editor with a custom theme (`myCustomTheme`), word wrap, and line numbers.
- **Text Selection**: Detects selected code for formatting or querying via context menus.
- **State Management**: Uses `useChatStore`, `usePlaygroundStore`, and `useVersionHistoryStore` for state, actions, and history.
- **Responsive Design**: Adapts UI to window size, supports collapse via middle-click, and keeps menus within the viewport.

### Action and Formatting Components
- **MonacoEditorMenu**: Context menu for code formatting (bold, italic, underline, strikethrough, case toggle, quotes, degree, block quotes, links, color) with `ActivePaint` and `ActiveMenu`.
- **QuestionCode**: Displays a question button for querying selected code, storing selections in `useChatStore`.
- **CloudPlusButton**: Toggles `CloudActionsSectionCode`, closing on outside clicks.
- **CloudActionsSectionCode**: Provides code-specific actions (`Add a Prompt`, `Port Code`, `Add Comments`, `Fix Bugs`, `Add Logs`, `Run Code`, `Open in VSCode`) in a collapsible menu.
- **PlaygroundAction**: Container for actions (`prompt`, `port-code`) with drag-and-drop and buttons for closing (`CloseIcon`) or executing (`SendIcon`).
- **Prompt**: Appends custom text to Monaco Editor via an input field.
- **PortCode**: Ports selected code to another language, capturing Monaco Editor selections.

### Action Buttons
- **CloudPlusButton**: Opens action menu for code operations.
- **PenFormatingButton**: Activates `MonacoEditorMenu` for code styling.
- **ResizePlaygroundButton**: Adjusts playground size.
- **FullscreenGeneralLogo**: Toggles full-screen mode and opens `Chat` for chat interaction.

### Key Functions
- `adjustPosition`: Keeps menus within the viewport.
- `handleEditorMount`: Initializes Monaco Editor.
- `handleEditorMouseUp`, `updateSelectedText`: Manages code selection and menu positioning.
- `handleCollapsePlayground`: Collapses the playground.
- `applyEdit`, `applyBold`, etc.: Applies Monaco formatting.
- `getMonacoSelection`, `questionCode`: Retrieves and stores code selections.
- `addPrompt`: Appends prompt content.

## HistoryPlayground

### Overview
`HistoryPlayground` is a standalone panel for viewing and managing version history of `TablePlayground` and `CodePlayground`.

### Key Features
- **Version Listing**: Displays saved versions with timestamps, user info, and names, fetched via `useVersionHistoryStore`.
- **Collapsible View**: Toggles history entries with a plus/minus button.
- **Interactive Menu**: Shows `HistoryPlaygroundMenu` for version-specific actions on hover or click.

### Key Functions
- `handlerCloseHistoryPlayground`: Closes the panel.
- `setOpenContent`: Toggles history entry visibility.
- `setHoveredId`: Tracks hovered entries.
- `setActiveMenu`: Toggles version-specific menu.

### Dependencies
- **Ant Design**: `Table`, `Button`, `Flex`.
- **TipTap**: Rich text editing for `TablePlayground`.
- **Monaco Editor**: Code editing for `CodePlayground`.
- **React Hooks**: `useState`, `useEffect`, `useRef`.
- **Custom Hooks**: `useChatStore`, `usePlaygroundStore`, `useVersionHistoryStore`, `useCommentWindowStore`, `useTheme`.
- **Helpers**: `formatFriendlyDate`, `generateUUID`.

## Quick Usage Guide
1. **Open a Playground**:
    - Use `<TablePlayground id="table-1" />` for table editing or `<CodePlayground id="code-1" />` for code editing.
    - Tables display data; click cells, rows, or columns to select.
    - Code editor opens with Python by default; type or paste code.

2. **Edit Content**:
    - In `TablePlayground`, edit text below the table using TipTap. Select text to open `TipTapTextFormatMenu` for styling (bold, italic, etc.).
    - In `CodePlayground`, edit code in the Monaco Editor. Select code to enable `QuestionCode` for querying. To open the `MonacoEditorMenu` for formatting options, click the `PenFormatingButton`.

3. **Use Action Menus**:
    - Click `CloudPlusButton` to open `CloudActionsSection` (table) or `CloudActionsSectionCode` (code).
    - For tables, select actions like `Add a Prompt` or `Change Writing Level`.
    - For code, choose actions like `Port Code`, `Add Comments`, or `Run Code`.
    - Use `Prompt` to add custom text or `WritingLevel` to adjust text complexity.

4. **Interact with Chat**:
    - Click `FullscreenGeneralLogo` to open `FullscreenChat`. Right-click and drag to reposition.
    - Close chat with `DecreasePlaygroundIcon`.

5. **Manage Versions**:
    - Press `Ctrl+S` to save a version in either playground.
    - Open `<HistoryPlayground />` to view saved versions. Click the plus/minus button to expand/collapse entries.
    - Hover over versions to highlight; click `ThreeVerticalDots` for actions via `HistoryPlaygroundMenu`.



# 📊 ChartWidgets + Widget System – Developer Guide

> This document describes the architecture, components, context, and extension points of the ChartWidgets and Widget system. The system provides draggable windows for creating, editing, and managing charts, drawings, templates, and widgets.

---

## 🏗 Architecture

```text
ChartWidgetsWindow (root window)
├─ LeftPanel (sidebar navigation: charts, widgets, drawings)
├─ RightPanel (chart templates, previews)
├─ DrawingModal (fullscreen drawing editor)
├─ EditTemplateModal (fullscreen chart template editor)
│   ├─ Databox (data input and display)
│   ├─ UploadChartBody (file upload & chart processing)
│       └─ CustomBarChart (render uploaded bar chart)
├─ NewChart (create new chart form)
├─ PreviewChart (chart buttons + preview box)
├─ NewWidget (create new widget form)
├─ PreviewWidget (grid/list of widgets + preview box)
│   └─ PreviewWidgetBox (individual widget preview)
└─ WidgetInChat (embed widget inside chat view)
```

- **Draggable window**: Uses `react-draggable` for window movement.
- **Fullscreen mode**: Displays modals for editing drawings or templates.

---

## 🌐 Context

### ChartWidgetsContext

Provides global context for chart/drawing state management.

| Field             | Description                                      |
|-------------------|--------------------------------------------------|
| `page`            | Current active page (e.g. NEW_CHART, NEW_WIDGET) |
| `prevPage`        | Previous page for returning after modal close    |
| `paramter`        | Parameter ID or identifier for chart/drawing     |
| `link`            | Optional link or reference string                |
| `setPage()`       | Navigate to a specific page                      |
| `setFullWindow()` | Toggle fullscreen mode                           |
| `closeWindow()`   | Close the ChartWidgets window                    |

---

## ⚙ Components

### ChartWidgetsWindow
- Main container with draggable functionality.
- Opens via `openChartWidgets` event.
- Renders LeftPanel + RightPanel + modals.

### NewWidget
Form and logic to create new widgets.

### PreviewWidget
Displays list/grid of widgets with preview boxes.

### PreviewWidgetBox
Individual widget preview tile.

### WidgetInChat
Embeds widget inside chat or conversation view.

### EditTemplateModal / NewChart / DrawingModal
Chart + drawing management modals.

### LeftPanel / RightPanel
Sidebar + templates, charts, widgets display.

---

## 🔑 Features

✅ Draggable, resizable chart + widget window  
✅ Fullscreen drawing/template editing  
✅ Dynamic chart + widget previews  
✅ Widget embedding in chat view  
✅ File upload for chart creation  
✅ Custom bar chart rendering

---

## 🛠 Example Usage

Open ChartWidgets window:
```ts
eventEmitter.emit("openChartWidgets", {
  page: Page.NEW_WIDGET,
  parameter: "widget-id"
});
```

---

## 🚀 Extension Ideas

➡ Add real-time collaborative widgets (e.g. whiteboards)  
➡ Support for widget export/import  
➡ Integrate cloud sync for widgets

---

## 🐛 Debugging Tips

- Use `console.log(page, paramter)` to trace page transitions.
- Check `localStorage.drawings` or widget configs for expected structure.

---

## 🎨 Styling

- Styles:
    - `ChartWidgetsWindow.less`
    - `DrawingModal.less`
    - `PreviewChart.less`
    - `EditTemplate.less`
    - `Databox.less`
    - `UploadChartBody.less`
    - `CustomBarChart.less`
    - `NewWidget.less`
    - `PreviewWidget.less`
    - `PreviewWidgetBox.less`
    - `WidgetInChat.less`
- Icons: `/img/icons/`, `/img/colorChartIcons/`

---

# 🖥️ Console System – Developer Guide

> This document describes the architecture, context, state management, resizing logic, and extension points of the Console system. The Console provides a draggable, resizable, multi-tab terminal interface with a language selection menu.

---

## 📌 Components

### Console

The main component that renders:
- A **draggable window** (`react-draggable`) with header and body.
- A **resizable window** with top-left, top-right, bottom-left, and bottom-right drag handles.
- Multiple **console tabs** (dynamic via `splitConsole`).
- A **coding language menu** (via `CodingLanguageMenu`).

**Features:**
- Toggleable language menu.
- Add (split) console tabs.
- Clear all tabs (reset to 1).
- Hide/close console.
- Resize dynamically via drag.

---

### ConsoleWindow

Renders each individual console/terminal tab.

---

### CodingLanguageMenu

Dropdown menu to select a coding language, closes on outside click.

---

## 🗂 Context

### ConsoleContext

Provides console-related state + actions to child components.

```ts
const ConsoleContext = createContext({
  showMenu: false,
  toggleMenu: () => {},
  isVisible: true,
  hideConsole: () => {},
  numberOfConsole: 1,
  splitConsole: () => {},
  clearConsole: () => {},
});
```

# 💬 Comments System – Developer Guide

> This document describes the architecture, components, state management, and extension points of the Comments system. The Comments system provides a threaded commenting interface with features like replying, resolving, copying links, and searching.

---

## Components

### Comments

Root component that displays the entire comment interface including header (search, filter, close buttons), thread list, and reply input.

**Features:**
- Header with search and filter options.
- Displays main comment and list of replies.
- Handles visibility and menu toggle states.
- Sends replies using input field at the bottom of the thread.

**Internal State:**
- `showFilter` – toggles the visibility of the Filter panel.
- `showMenu` – toggles the visibility of the comment options menu.
- `isVisible` – determines if the comments window is shown.

---

### Thread

Renders an individual comment and its replies recursively.  
Displays user info, timestamp, message content, and actions.

---

### Filter

Dropdown panel for sorting and filtering comments:
- Sort by date
- Sort by unread
- Show resolved / unresolved

---

### Menu

Dropdown menu for comment actions:
- Resolve / unresolve comment
- Copy link to comment
- Remove comment

Closes on outside click.

---

## State Management

### useCommentWindowStore

Zustand store that manages the global comment window state and actions.

**State Fields:**
- `isOpen` – whether the comment window is open.
- `isResolved` – status of current comment.
- `comment` – current comment object (with replies).

**Methods:**
- `openComments(id?)` – opens the comment window, optionally targeting a comment by ID.
- `closeComments()` – closes the comment window.
- `toggleComments()` – toggles comment window open/closed.
- `setComment(comment)` – sets the current comment.
- `addReply(content)` – adds a reply to the current comment.
- `updateComment(content)` – updates the main comment’s message.
- `removeComment()` – removes the current comment.
- `toggleResolved()` – toggles the resolved status of the comment.
- `copyLink()` – copies the comment link to clipboard.

---

## Features

- Search comments by text (via input field).
- Sort/filter comments using the `Filter` component.
- Add, update, and delete replies through the input box or `Menu`.
- Resolve/unresolve comments.
- Copy link to a specific comment (uses clipboard API).

---

## Styling & UX

- All styles are located in `Comments.less` and subcomponent `.less` files.
- Icons are loaded from `/img/icons/`.
- Profile pictures are static in mockup; replace with dynamic URLs when integrating real data.
- Menu and filter dropdowns auto-close when clicking outside.

---

## Example API Usage

```ts
const {
  isOpen,
  comment,
  addReply,
  updateComment,
  toggleResolved,
  copyLink
} = useCommentWindowStore();

// Example usage
addReply("This is a reply.");
updateComment("Updated comment content.");
toggleResolved();
copyLink();
```

# Onboarding System – Developer Guide

> This document gives new contributors a bird‑eye view of the interactive onboarding flow. It explains how the step engine works, which files own what responsibility, and how to extend or debug the flow.

---

## 1. Architecture

```text
OnboardingLayout (page wrapper)
├─ OnboardingSidebarWrapper ─┐
│                            └─ OnboardingSidebar (UI & buttons)
├─ OnboardingBody            – chat panel & main content
├─ OnboardingPlayground      – mock playground table
└─ OnboardingOverlays        – cursor, tooltips, modals, etc.
```

-   **Step state** sits in **`useOnboardingFlow`** (a custom hook). It exposes the current `step`, a handful of flags (e.g. `blockInput`) and a large set of handlers (e.g. `handleLogoSlideComplete`). Components subscribe to these signals and react visually.
-   **Motion** (ghost cursor, auto‑skip timers, arrow‑key navigation) is orchestrated by four hooks:

    -   `useOnboardingFlow` – owns the truth of _which_ step we are on.
    -   `useArrowNavigation` – lets the user jump with ⬅️ / ➡️ and enforces bespoke navigation rules.
    -   `useStepEffects` – runs `onEnter`/`onExit` callbacks plus auto‑skip timers whenever the step changes.
    -   `useChat` – keeps the messages array, updates profileData, dispatches auto‑responses (handleUserMessage), and triggers UI side‑effects such as showing the sidebar after the greeting.

        _Note:_ right now useChat handles some side-effects (e.g. sidebar opening) which is not ideal

    -   and a declarative array of all step configurations **`onboardingFlow`** in **`src/helpers/onboardingFlow.tsx`**

-   **NOTE:** a lot of the components used in the onboarding flow are duplicates/alternatives to the ones in the main app due to the fact that such components will need props and/or state related exclusively to the onboarding flow.

---

## 2. Key Concepts

| Concept              | Location                         | Responsibility                                                                                                                   |
| -------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Step**             | `src/helpers/onboardingFlow.ts`  | Declarative description of every frame of the tutorial. The shape is `OnboardingStep` (id, cursor position, tooltip text, etc.). |
| **CursorContext**    | `src/contexts/CursorContext.tsx` | Provides information about current _GhostCursor_ status and options to change said status                                        |
| **Navigation rules** | `src/helpers/navigationRules.ts` | Fine‑grained overrides for ⬅️ / ➡️. Keeps keyboard jumps intuitive even with sub‑steps (e.g. `4 → 4.5 → 4.6`).                   |
| **Dev Mode panel**   | Inline in `OnboardingLayout`     | Visible only when `isDevMode` is `true`. Lets you jump to any step, open the sidebar, or release safety locks.                   |

### 2.1 Step Identifiers

-   Whole numbers (`4`, `5`, `23`) are _major_ steps.
-   Decimals (`4.1`, `8.3`) are _sub‑steps_ – most often used for intermediate animations.
-   Max step today is **60** (see `useOnboardingFlow` upper bound).

### 2.2 Blocking Flags

| Flag            | Default | Effect                                                                     |
| --------------- | ------- | -------------------------------------------------------------------------- |
| `blockInput`    | `true`  | Disables user typing until the flow reaches a safe point.                  |
| `blockSteps`    | `false` | Freezes the step counter.                                                  |
| `blockAutoSkip` | `false` | Prevents automatic progression – used when the user needs to pick a theme. |

### 2.3 The Ghost Cursor

`GhostCursor` reads `currentStep.cursor*` props and animates a fake pointer. The cursor fires `onTransitionEnd`, which allows chained animations (e.g. click after move). Most of the time tooltips are rendered near the cursor. Otherwise they're rendered at an overridden selector or at a specified Tooltip positions inside components (rare).

### 2.4. Cursor Movement State (`CursorContext`)

`CursorContext` provides a global flag that tells components whether the ghost cursor is currently traveling. It is defined in **`src/contexts/CursorContext.tsx`**.

```ts
interface CursorContextType {
    cursorMoving: boolean; // true while the pointer is animating
    setCursorMoving: () => void; // call before starting a move
    setCursorStopped: () => void; // call on movement end
}
```

### Usage Pattern

1. **Wrap** the desired location with `<CursorProvider>`.
2. **Signal motion** from any effect that initiates a cursor jump:

```ts
const { setCursorMoving } = useCursor();
setCursorMoving(); // fire before changing step
```

3. **Mark arrival** – `GhostCursor` listens to `transitionend` and invokes `setCursorStopped()`. Other animations (e.g., clicks simulated by CSS) can call it as well.
4. **Read‑only checks** – components like tooltips, sidebar highlights, or navigation prompts use `cursorMoving` to withhold UI until the cursor stops traveling.

> **Debug tip** The provider logs `cursorMoving` to the console, so you can trace stray state flips.

---

## 3. Control Flow

1. **`OnboardingLayout`** mounts and initialises `useOnboardingFlow`.
2. The hook immediately sets `step = 1`, which shows the welcome text.
3. When the typewriter finishes it calls **`handleWelcomeTextTypedOut`** ➜ `step = 2` ➜ logo slide.
4. When the logo finishes sliding ➜ **`handleLogoSlideComplete`** ➜ `step = 3` ➜ ghost cursor appears with tooltip explaining arrow keys.
5. User presses **Arrow Right** or clicks ➜ **`handleCursorAcknowledged`** ➜ `step = 4` and so on…
6. Auto‑skip or keyboard navigation advances through the rest of the scripted path until **`step = 60`** which terminates onboarding.

After the initial set of handlers that fire on animations/transitions/etc. (around `step = 5` ) most of the control around step manipulation is handed to user in the form of clicking on a specific location on the screen or using the **➜** to advance.

Some of the steps are auto-skipped after a short duration. Auto‑skips are declared directly inside each `OnboardingStep` as `autoSkip` / `autoSkipSubStep` in milliseconds.

---

## 4. Adding / Editing Steps

1. Open **`src/helpers/onboardingFlow.ts`**.
2. Append a new object to the array – give it a unique `id` (decimal allowed).
3. Provide the minimum fields:

    ```ts
    {
      id: 61,
      location: '[data-step="input"]',
      cursorVisible: true,
      tooltip: false,
      onEnter: (ctx) => {/* side‑effects */},
      onExit:  (ctx) => {/* cleanup      */},
    }
    ```

4. **Keyboard path** – if the default _previous/next_ arrows are wrong, add a rule to `navigationRules.ts`.
5. **Side‑effects** – heavy logic should live in `onEnter`/`onExit` instead of React effects inside components.

---

## 5. Styling & UX Notes

-   All onboarding‑specific styles live under `OnboardingLayout.module.less` and component sub‑folders.
-   Tooltips accept Markdown/ReactNodes.

---

## 6. Debugging Tips

-   Toggle **Dev Mode** (`isDevMode = true`) to reveal a fixed panel where you can:

    -   Jump to an arbitrary step
    -   Force open the sidebar
    -   Clear input / step locks

-   `console.log(currentStep)` is already wired inside `useStepEffects` – uncomment as needed.
-   Arrow keys are globally captured; if they stop working make sure the page body still has focus.

---

## 7. Typing Animations (`useTypewriterEffect`)

The onboarding relies on **`useTypewriterEffect`** to animate placeholder text, prompts, and code blocks. It progressively reveals characters, lets the user fast‑forward with **Arrow Right**, and can rewind when the step changes.

```ts
const { text, isDone, skip } = useTypewriterEffect({
    text: "Hello Doe!",
    speed: 90, // ms between characters
    delay: 500, // wait before typing starts
    startTyping: step === 4.5, // gate by onboarding step
    enableSkip: true, // allow Arrow‑Right to finish instantly
    onComplete: () => console.log("done"),
    onSkip: () => console.log("skipped"),
    reset: step === 7, // rewinds on step change
});
```

### How it works

1. **Progressive rendering** – after `delay`, an interval appends a character every `speed` ms until the full string is shown.
2. **Skip shortcut** – if the user presses → and `enableSkip` is `true`, the hook flushes the interval, prints the remainder, triggers `onSkip`, then `onComplete`.
3. **Reset** – toggling `reset` clears timers and empties the buffer so the next mount starts from zero.

---

# Components

## LimitScreen

Displays a screen when the user has reached the daily message limit including sending and editing (MAX_MESSAGES_LIMIT=50). Encourages sharing an invitation link to extend the limit.

## AudioRecorder

An interactive audio recording component with waveform visualization and playback functionality. Uses wavesurfer.js with RecordPlugin to handle audio capture and visualization.

Features:

- Start, pause/resume, and stop audio recording.
- Visual waveform display during recording and playback.
- Timer showing recording or playback duration.
- Playback controls after recording is stopped.
- Responsive to user actions with real-time updates.

Internal State:

- isRecording, isPaused, isStopped, isPlaying – track recording and playback flow.
- seconds – simple timer implementation.
- wavesurfer, wavesurferRecord – instances of waveform visualizers.
- refs for waveform containers.

## MagicMenu

Dropdown menu triggered by an icon button. Supports animation and closes on outside click. Renders a list of items (`IMagicMenuItem[]`) with custom styles and actions.

## Sharing

Displays a panel for creating and managing sharing links. Toggles between the SharingLink and LinkCreated views based on user actions. Includes an expandable SeeAllLinks section.

### SharingLink

Displays a form for generating a shareable conversation link. Allows users to enable optional settings (password, indexing) via toggle switches before creating the link.

### LinkCreated

Displays a confirmation screen after a shareable link is generated.

### SeeAllLinks

Displays a searchable list of all previously created shareable links.
Features:

- Search links with optional case sensitivity.
- Toggle between link types (with/without password/indexing).
- Show/hide and copy passwords on hover/click.
- Remove individual links.

## Translator

Switches between translation, voice, and practice modes. Displays mode chip and wraps content in a live tools layout.

### LiveToolsWrapper

Wrapper component for translation and recording modes

### Translation

A component for entering text, uploading files, and translating with the ability to rotate the interface:

- Supports file upload mode with drag-and-drop and a progress bar.
  -Displays a list of uploaded files (FilesList)
- Displays text for translation via the TextToTranslate component.
- Uses a custom action menu (MagicMenu) to download files from various sources (devices, applications, playgrounds).

### TranslatedText

A component for displaying translated text in two modes: normal translation and voice mode.

### TextToTranslate

The component displays text for translation or alternative content (picture).

### PracticeMode

A component for demonstrating a practice regimen (e.g., TOEFL speaking preparation) with pronunciation quality assessment and tips.
Main features:

- Talking animation:
  The TalkingAnimation component simulates the process of speaking.
- Displaying the level of pronunciation quality:
  A visual quality indicator in the form of a 10-point progress bar with colored blocks corresponding to the levels: BAD, LOW, MEDIUM, HIGH. The color and number of filled blocks depend on the qualityLevel props transmitted.
- Showing practice results:
  Displays your current “simulated TOEFL score” and a list of tips for improvement.
- IsPracticeStopped mode:
  When you stop practice, the list of tips changes and buttons appear:
- “Back to Translation” - calls the onTranslationBack callback.
- "Retry Practice - no action for now.

### FileLoadingProgress

The component displays information about the file upload progress.

### Bookmarks

Displays a list of saved bookmarks.

### useFileLoading hook

This is a custom hook for simulating file uploads with gradual progress, file list management, and control of upload states.
Functions:

- simulateFileUpload(duration) - simulates a gradual upload with progress updates every 100ms to 100% for the specified time (4 seconds).
- resetProgress() - quickly resets the progress from 100% to 0% to show a new upload cycle.
- addFilesWithDelay(filesArray, delay) - asynchronously adds files to files one by one, simulating their upload with a pause between them (delay in ms).
- uploadFiles() - opens the system dialog for selecting files, and after selecting them, launches addFilesWithDelay for the selected files.

Returns:
{
uploadFiles, // function to open the file selection dialog
progress, // upload progress (0-100)
isUploadingFile, // is the current file being uploaded
isUploadFiles, // is the upload process in general
addFilesWithDelay, // function to add files with a delay (simulation)
files, // array of uploaded files
currentFile // file being uploaded now
}

## QuickSearch

Сomponent for implementing local search with match highlighting, case-sensitivity support, and UI controls for additional actions. Uses a mocked list of results.

## WelcomeScreen

Component of the start screen with a “print text” effect that simulates the sequential output of a presentation message - similar to typographic animation with a visual cursor.
Main features:

- Interactive text animation: phrases are displayed letter by letter with a controlled delay (TYPING_SPEED = 25ms).
- SVG icons are used: DoeLogoIcon and WelcomeIcon are inserted dynamically.
- The cursor (caretVisible) appears during "printing".
- Disable interaction: during the animation, actions are disabled through the global setDisableButtons from useChatStore.

### WelcomeIcon

Is an animated SVG component that sequentially draws sets of paths for multiple SVG icons, simulating the effect of “printing” with a visual cursor following the tip of the path.

### HintsTyping

Displays a list of pop-up tips until a chat message is sent

### Hints

Renders a set of hints unless first massage is sent.

## ShareScreen

### ScreenShareMenu

Is an animated context menu for selecting the type of screen sharing. It supports cable connection, Bluetooth and direct screen sharing.

### ShareScreenInfo

Component displays instructions or information about the selected type of screen sharing.

### SourcePlayground

The SourcePlayground component is an interactive environment for viewing materials from three types of sources: Web, Docs, Apps. Visually, it consists of two main sections: resources and viewing area.
Purpose:

- Visualization of available learning nodes (InfoCardNode, SourceTypeNode).
- Viewing sources by category (through popovers).
- Preview of the selected resource (PreviewSource).
  Source and node data come from mocks PLAYGROUND_SOURCES, INFO_NODES, SOURCE_NODES.

### ScalableContainer

Is a wrapper that automatically scales the internal content to fit the size of the external container, keeping it within the available space. Scaling is implemented through a CSS variable.

How it works
The component uses ResizeObserver to determine the size of the outer container and inner content. The scale scale = min(container / inner) is calculated and set as a CSS variable --scalable-container-factor. This allows you to apply the scale using transform: scale(var(--scalable-container-factor)) in styles.

### SourceTypeNode

Is a button block that displays the source of a resource (type: Web, Docs, Apps) in the form of an icon and a name. It also contains a button with an “expand” icon that opens the associated resource.

### PdfDocument

The PdfDocument component renders a PDF file page by page with the ability to zoom, respond to scrolling, and support different viewing modes (modal/normal).

Purpose:

- Render PDF documents from a URL source.
- Support for scaling.
- Calling callbacks when loading a document and changing pages.
- Support for modal mode (reduced scaling).
- Determining the width of the container for adaptive viewing.

### PageInView

The PageInView component allows you to determine when a certain page of a PDF document (or any other block) enters the viewport and calls a callback with the page number.

- Used in conjunction with a PDF reader (e.g., react-pdf) to keep track of which page is currently in the user's viewport.

### DocxDocument

The DocxDocument component renders .docx files as paginated HTML content in a React application. It uses the mammoth library to convert Word documents to semantic HTML.
Functionality:

- Fetches a .docx file via fetch.
- Converts it to HTML using mammoth.
- Splits the resulting HTML string into virtual pages based on character count.
- Renders each chunk as a separate block using dangerouslySetInnerHTML.
  This method enables basic paging behavior for .docx content without requiring a full-featured document viewer.

Notes:

- The paging is virtual — based on character count, not actual document page breaks.
- dangerouslySetInnerHTML is used for rendering, so sanitize input or ensure the source is trusted.

### DocxDocumentWithPagination

Renders .docx files as virtual paginated HTML, tracks visible pages, and supports zooming via scaling. It integrates with scroll-based pagination via the PageInView utility.
Features:

- Loads .docx documents from a given URL.
- Converts them to semantic HTML using mammoth.
- Splits the content into virtual pages based on character count.
- Displays each page wrapped in PageInView to detect when it’s in view.
- Calls onPageChange when a new page is scrolled into view.
- Applies a CSS scale transform to zoom in/out.

Viewport Awareness

The component uses a PageInView wrapper to determine when a page enters the viewport. When a page is visible, it notifies the parent via onPageChange.
Notes:

- Pagination is not based on real document pages, but on character chunks.
- Rendering is done via dangerouslySetInnerHTML, so the .docx file source must be trusted,
