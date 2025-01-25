import { FC } from "react";

type Props = {
  url: string
}

export const GoogleDocWidget: FC<Props> = ({ url }) => {
  return (
    <iframe 
      src={url}
      width={"100%"} 
      height={"400"}
      frameBorder={0}
    />
  )
}