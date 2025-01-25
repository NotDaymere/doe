import { FC } from "react";

type Props = {
  url: string
}

export const MiroWidget: FC<Props> = ({ url }) => {
  return (
    <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
      <iframe
        src={url}
        width={"100%"}
        height={"100%"}
        frameBorder={"0"}
        allow={"fullscreen; clipboard-read; clipboard-write"}
      ></iframe>
    </div>
  );
};
