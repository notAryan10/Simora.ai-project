import React, { useState, useRef } from "react";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [muteVideo, setMuteVideo] = useState<boolean>(false);
  const [durationInFrames, setDurationInFrames] = useState<number>(0);
  const fps = 30;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      if (file.type.startsWith("video")) {
        setVideoSrc(url);
        const videoDuration = await getVideoDuration(file);
        setDurationInFrames(Math.ceil(videoDuration * fps));
      } else if (file.type.startsWith("audio")) {
        setAudioSrc(url);
      } else {
        alert("Please upload a valid video or audio file.");
      }
    }
  };

  return (
    <div style={{ padding: "10px", fontFamily: "sans-serif" }}>
      <h5 style={{color: "white"}}>Upload Video/Audio</h5>

      {/* Single Import Button */}
      <button
        style={buttonStyle}
        onClick={() => fileInputRef.current?.click()}>
        Import Video/Audio
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="video/*,audio/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      {/* Mute Checkbox */}
      {videoSrc && (
        <div style={{ marginTop: "5px" }}>
          <label style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={muteVideo}
              onChange={() => setMuteVideo(!muteVideo)}
            />{" "}
            Mute Video Audio
          </label>
        </div>
      )}

      {videoSrc && durationInFrames > 0 && (
        <div style={{ marginTop: "10px" }}>
          <Composition
            id="MyComp"
            component={MyComposition}
            durationInFrames={durationInFrames}
            fps={fps}
            width={1280}
            height={720}
            defaultProps={{ videoSrc, audioSrc, muteVideo }}
          />
        </div>
      )}
    </div>
  );
};

// Button Style
const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
};
