import BrilliantOrgIcon from "src/shared/icons/BrilliantOrg.icon";
import CodecademyIcon from "src/shared/icons/Codecademy.icon";
import NotionIcon from "src/shared/icons/Notion.icon";
import GoogleCalendarIcon from "src/shared/icons/GoogleCalendar.icon";
import ObsidianIcon from "src/shared/icons/Obsidian.icon";
import CaseStudyIcon from "src/shared/icons/CaseStudy.icon";
import FileFilledIcon from "src/shared/icons/FileFilled.icon";
import { IInfoCardNode } from "./InfoCardNode";
import { ISourceTypeNode } from "src/shared/types/Playground";
import AppsSourceIcon from "src/shared/icons/AppsSource.icon";
import DocsIcon from "src/shared/icons/Docs.icon";
import { IPlaygroundSourceData, SourceType } from "src/shared/types/Playground";
import MemoryIcon from "src/shared/icons/Memory.icon";
import WebIcon from "src/shared/icons/Web.icon";
import BrainIcon from "src/shared/icons/Brain.icon";

export const INFO_NODES: IInfoCardNode[] = [
    {
        icon: <BrainIcon fill="#cfcecf" width={16} height={16} />,
        title: "GO",
    },
    {
        icon: <MemoryIcon fill="#cfcecf" width={16} height={16} />,
        title: "Memory",
    },
];

export const SOURCE_NODES: ISourceTypeNode[] = [
    {
        icon: <WebIcon fill="#6091A3" width={16} height={16} />,
        title: "Web",
        type: "web",
    },
    {
        icon: <DocsIcon fill="#8BCF16" width={16} height={16} />,
        title: "Docs",
        type: "docs",
    },
    {
        icon: <AppsSourceIcon fill="#FBBC05" width={16} height={16} />,
        title: "Apps",
        type: "apps",
    },
];

export const PLAYGROUND_SOURCES: IPlaygroundSourceData = {
    web: {
        title: "Website resources",
        type: "web",
        items: [
            {
                title: "brilliant.org",
                icon: <BrilliantOrgIcon width={12} height={12} />,
                content: "https://brilliant.org",
            },
            {
                title: "codecade...com",
                icon: <CodecademyIcon width={12} height={12} />,
                content: "https://codecademy.com",
            },
            {
                title: "theinform...com",
                icon: <CaseStudyIcon width={12} height={12} />,
                content: "https://theinformation.com",
            },
        ],
    },
    apps: {
        title: "Documents resources",
        type: "apps",
        items: [
            { title: "Notion", icon: <NotionIcon width={12} height={12} />, content: "Notion app" },
            {
                title: "Obsidian",
                icon: <ObsidianIcon width={12} height={12} />,
                content: "Obsidian app",
            },
            {
                title: "Calendar",
                icon: <GoogleCalendarIcon width={12} height={12} />,
                content: "Calendar app",
            },
        ],
    },
    docs: {
        title: "App resources",
        type: "docs",
        items: [
            {
                title: "Work_file.pdf",
                icon: <FileFilledIcon width={12} height={12} />,
                content: "/file-samples/file-sample.pdf",
            },
            {
                title: "Work_file.txt",
                icon: <FileFilledIcon width={12} height={12} />,
                content: "/file-samples/file-sample.txt",
            },
            {
                title: "Work_file.doc",
                icon: <FileFilledIcon width={12} height={12} />,
                content: "/file-samples/file-sample.doc",
            },
        ],
    },
};
