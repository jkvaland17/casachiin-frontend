import React from "react";
import PhotoUpload from "@/components/forms/CommanForm/PhotoUpload";

const UploadImages: React.FC<{
  formMethods: any;
  applicationId: string;
}> = ({ formMethods }) => {
  return (
    <>
      <h3 className="main_title my-2">Profile Photo</h3>

      <PhotoUpload formMethods={formMethods} name="photo" />

      <h3 className="main_title my-2">Signature</h3>

      <PhotoUpload formMethods={formMethods} name="signature" />

      <h3 className="main_title my-2">Left Thumb Impression</h3>

      <PhotoUpload formMethods={formMethods} name="thumbprint" />
    </>
  );
};

export default UploadImages;
