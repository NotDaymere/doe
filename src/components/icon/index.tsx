import { FC, SVGProps } from "react"
import { ReactComponent as ArrowUpIcon } from "src/assets/icons/arrowUp.svg"
import { ReactComponent as BilateralCortexModelIcon } from "src/assets/icons/bilateral-cortex-model-icon.svg"
import { ReactComponent as BoldTextIcon } from "src/assets/icons/bold-text-icon.svg"
import { ReactComponent as BoltIcon } from "src/assets/icons/bolt.svg"
import { ReactComponent as BracesIcon } from "src/assets/icons/braces-icon.svg"
import { ReactComponent as CallIcon } from "src/assets/icons/call.svg"
import { ReactComponent as CollapseIcon } from "src/assets/icons/collapse.svg"
import { ReactComponent as CopyAnswerIcon } from "src/assets/icons/copy-icon.svg"
import { ReactComponent as CopyAnswerGreenIcon } from "src/assets/icons/copy-green-icon.svg"
import { ReactComponent as DeepWebSearchIntegrationIcon } from "src/assets/icons/deep-web-search-integration-icon.svg"
import { ReactComponent as GdocsIcon } from "src/assets/icons/docs.svg"
import { ReactComponent as DownloadAnswerIcon } from "src/assets/icons/download-icon.svg"
import { ReactComponent as DownloadGreenIcon } from "src/assets/icons/download-green-icon.svg"
import { ReactComponent as DownloadIcon } from "src/assets/icons/download.svg"
import { ReactComponent as DropIcon } from "src/assets/icons/drop.svg"
import { ReactComponent as EarthIcon } from "src/assets/icons/earth-icon.svg"
import { ReactComponent as ExpandIcon } from "src/assets/icons/expand.svg"
import { ReactComponent as FIcon } from "src/assets/icons/f-icon.svg"
import { ReactComponent as GdriveIcon } from "src/assets/icons/g-drive.svg"
import { ReactComponent as GmailIcon } from "src/assets/icons/gmail.svg"
import { ReactComponent as GoogleIcon } from "src/assets/icons/google-icon.svg"
import { ReactComponent as GraphMemoryRecursionIcon } from "src/assets/icons/graph-memory-recursion-icon.svg"
import { ReactComponent as InfoIcon } from "src/assets/icons/info-icon.svg"
import { ReactComponent as ItalicTextIcon } from "src/assets/icons/italic-text-icon.svg"
import { ReactComponent as LeafIcon } from "src/assets/icons/leaf.svg"
import { ReactComponent as LineIcon } from "src/assets/icons/line.svg"
import { ReactComponent as LinkIcon } from "src/assets/icons/link-icon.svg"
import { ReactComponent as ListenIcon } from "src/assets/icons/listen-icon.svg"
import { ReactComponent as MiroIcon } from "src/assets/icons/miro.svg"
import { ReactComponent as MoonIcon } from "src/assets/icons/moon-icon.svg"
import { ReactComponent as NotionIcon } from "src/assets/icons/notion-icon.svg"
import { ReactComponent as PdfIcon } from "src/assets/icons/pdf-icon.svg"
import { ReactComponent as PencilIcon } from "src/assets/icons/pencil.svg"
import { ReactComponent as PhoneIcon } from "src/assets/icons/phone-icon.svg"
import { ReactComponent as PythonIcon } from "src/assets/icons/python-icon.svg"
import { ReactComponent as SeeAllStepsIcon } from "src/assets/icons/see-all-steps-icon.svg"
import { ReactComponent as SeeAllStepsIconViolet } from "src/assets/icons/see-all-steps-violet.svg"
import { ReactComponent as SendMessageIcon } from "src/assets/icons/sendMessage.svg"
import { ReactComponent as SparklesIcon } from "src/assets/icons/sparkles-icon.svg"
import { ReactComponent as SpotifyIcon } from "src/assets/icons/spotify-icon.svg"
import { ReactComponent as StopChatIcon } from "src/assets/icons/stop-chat.svg"
import { ReactComponent as StopIcon } from "src/assets/icons/stop.svg"
import { ReactComponent as SunIcon } from "src/assets/icons/sun-icon.svg"
import { ReactComponent as TrashCanIcon } from "src/assets/icons/trash-can-icon.svg"
import { ReactComponent as TreeIcon } from "src/assets/icons/tree.svg"
import { ReactComponent as UnderlineTextIcon } from "src/assets/icons/underline-text-icon.svg"
import { ReactComponent as WindIcon } from "src/assets/icons/wind.svg"
import { ReactComponent as WorldKnowledgeIcon } from "src/assets/icons/world-knowledge-icon.svg"
import { ReactComponent as XMark } from "src/assets/icons/xmark.svg"

export const icons = {
  sun: SunIcon,
  moon: MoonIcon,
  underlineText: UnderlineTextIcon,
  boldText: BoldTextIcon,
  italicText: ItalicTextIcon,
  link: LinkIcon,
  braces: BracesIcon,
  f: FIcon,
  trashCan: TrashCanIcon,
  earth: EarthIcon,
  info: InfoIcon,
  sparkles: SparklesIcon,
  google: GoogleIcon,
  notion: NotionIcon,
  phone: PhoneIcon,
  spotify: SpotifyIcon,
  arrowUp: ArrowUpIcon,
  pdfIcon: PdfIcon,
  downloadAnswerIcon: DownloadAnswerIcon,
  copyAnswerIcon: CopyAnswerIcon,
  copyAnswerGreenIcon: CopyAnswerGreenIcon,
  seeAllStepsIcon: SeeAllStepsIcon,
  seeAllStepsVioletIcon: SeeAllStepsIconViolet,
  miro: MiroIcon,
  googleDocs: GdocsIcon,
  gMail: GmailIcon,
  googleDrive: GdriveIcon,
  bilateralCortexModelIcon: BilateralCortexModelIcon,
  deepWebSearchIntegrationIcon: DeepWebSearchIntegrationIcon,
  graphMemoryRecursionIcon: GraphMemoryRecursionIcon,
  worldKnowledgeIcon: WorldKnowledgeIcon,
  lineIcon: LineIcon,
  leaf: LeafIcon,
  tree: TreeIcon,
  wind: WindIcon,
  drop: DropIcon,
  bolt: BoltIcon,
  stop: StopIcon,
  download: DownloadIcon,
  downloadGreen: DownloadGreenIcon,
  expand: ExpandIcon,
  collapse: CollapseIcon,
  call: CallIcon,
  pencil: PencilIcon,
  stopChat: StopChatIcon,
  xMark: XMark,
  sendMessage: SendMessageIcon,
  pythonIcon: PythonIcon,
  listenIcon: ListenIcon,
} as const

export type IconsType = keyof typeof icons & string
type SvgIconProps = SVGProps<SVGSVGElement> & { type: IconsType }

export const SvgIcon: FC<SvgIconProps> = ({ type, ...svgProps }) => {
  const Icon = icons[type as IconsType] ?? null
  return Icon && <Icon {...svgProps} />
}
