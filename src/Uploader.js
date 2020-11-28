import React, { useState } from "react";
import "./App.css";

import { Circle } from "rc-progress";
import Uploady, { useItemProgressListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { createMockSender } from "@rpldy/sender";

const UploadProgress = () => {
  const [progress, setProgess] = useState(0);
  const progressData = useItemProgressListener();

  if (progressData && progressData.completed > progress) {
    setProgess(() => progressData.completed);
  }

  return (
    progressData && (
      <Circle
        style={{ height: "100px", marginTop: "20px" }}
        strokeWidth={2}
        strokeColor={progress === 100 ? "#00a626" : "#2db7f5"}
        percent={progress}
      />
    )
  );
};

export default function Uploader() {
  return (
    <Uploady
      destination={{ url: "http://mock-server.com" }}
      enhancer={mockEnhancer}
    >
      <div className="Uploader">
        <UploadButton />
        <br />
        <UploadProgress />
      </div>
    </Uploady>
  );
}

const mockEnhancer = uploader => {
  const mockSender = createMockSender({ delay: 1000 });
  uploader.update({ send: mockSender.send });
  return uploader;
};
