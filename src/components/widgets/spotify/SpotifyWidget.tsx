import { FC } from "react";

type Props = {
  url: string
}

export const SpotifyWidget: FC<Props> = ({ url }) => {
  return (
    <iframe 
    style={{ borderRadius: "12px" }}
    src={url}
    width={"100%"} 
    height={"152"} 
    frameBorder={"0"} 
    allow={"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"}
  />
  )
}