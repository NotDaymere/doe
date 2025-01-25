import React from "react";

interface YouTubeWidgetProps {
  src: string;
}

export const YouTubeWidget: React.FC<YouTubeWidgetProps> = ({ src }) => {
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={src}
        allow={"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
