import { FC } from "react";
import { IPlayground } from "src/shared/types/Playground";
import SourcePlayground from "./SourcePlayground";
// import CodePlayground from "../code-playground";
// import TablePlayground from "../table-playground";

const PlaygroundRenderer: FC<Partial<IPlayground>> = ({ type }) => {
    switch (type) {
        // TODO
        // case "code":
        //     return <CodePlayground />;
        // case "table":
        //     return <TablePlayground />;
        case "source":
            return <SourcePlayground />;
        default:
            return;
    }
};

export default PlaygroundRenderer;
