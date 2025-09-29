import React from "react";
import { AbsoluteFill, OffthreadVideo, Audio } from "remotion";

export const MyComposition: React.FC<{
  videoSrc: string;
  audioSrc: string;
  muteVideo: boolean;
}> = ({ videoSrc, audioSrc, muteVideo }) => {
  return (
    <AbsoluteFill>
      {/* Video */}
      <OffthreadVideo
        src={videoSrc}
        style={{ width: "100%", height: "100%" }}
        muted={muteVideo}
      />

      {/* Audio */}
      {audioSrc && <Audio src={audioSrc} />}
    </AbsoluteFill>
  );
};
