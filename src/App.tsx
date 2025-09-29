import React, { useState } from "react";

export const App: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.type !== "video/mp4") {
        alert("Please upload an MP4 file");
        return;
      }
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file)); 
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload MP4</h1>

      <input type="file" accept="video/mp4" onChange={handleUpload}/>

      {videoFile && videoURL && (
        <div style={{ marginTop: "20px" }}>
          <h3>Preview:</h3>
          <video
            src={videoURL}
            controls
            style={{ width: "640px", height: "360px" }}
          />
          <p>{videoFile.name}</p>
        </div>
      )}
    </div>
  );
}
