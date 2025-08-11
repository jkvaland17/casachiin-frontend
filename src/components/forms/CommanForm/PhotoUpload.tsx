import React, { useEffect, useState } from "react";

interface PhotoUploadProps {
  formMethods: any;
  name: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ formMethods, name }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  console.log("fileList::: ", fileList);
  const { getValues } = formMethods;

  useEffect(() => {
    setFileList(
      getValues(name) && getValues(name)?.length !== 0
        ? [{ url: getValues(name) }]
        : [],
    );
  }, [name, getValues]);
  return (
    <>
      <div
        className="border flex items-center"
        style={{ height: "100px", width: "100px" }}
      >
        <img src={fileList[0]?.url?.presignedUrl} className="p-2" alt="" />
      </div>
    </>
  );
};

export default PhotoUpload;
