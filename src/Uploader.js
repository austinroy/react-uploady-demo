import React, { useState, useCallback, useContext } from "react";
import "./App.css";

import Uploady, { useItemProgressListener, UploadyContext } from "@rpldy/uploady";
import { createMockSender } from "@rpldy/sender";
import { Button, Progress } from "antd";

const UploadProgress = () => {
  const [progress, setProgess] = useState(0);
  const progressData = useItemProgressListener();

  if (progressData && progressData.completed > progress) {
    setProgess(() => progressData.completed);
  }

  return (
    progressData && (
      <Progress
        type="circle"
        percent={progress}
      />
    )
  );
};

const CustomButton = () => { 
    const uploady = useContext(UploadyContext);

    const hanldeUpload = useCallback(()=> {
            uploady.showFileUpload();
        },[uploady]);

    return <Button onClick={hanldeUpload} type="primary">Custom Upload Button</Button>
}

 const Uploader = () => {
  return (
    <Uploady
      destination={{ url: "http://mock-server.com" }}
      enhancer={mockEnhancer}
    >
      <div className="Uploader">
        <CustomButton />
        <br />
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

export default Uploader;
