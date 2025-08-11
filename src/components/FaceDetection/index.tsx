"use client";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsexports from "../../aws-exports";
import { FaceLivenessDetector } from "@aws-amplify/ui-react-liveness";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  CallCreateFaceSession,
  CallGetFaceSessionResult,
} from "@/_ServerActions";
Amplify.configure(awsexports);
interface CameraModalProps {
  action: (data: any) => void;
  modalToggle: () => void;
  newEnroll: boolean;
  loader: boolean;
}
const FaceDetection: React.FC<CameraModalProps> = ({
  action,
  newEnroll,
  loader,
  modalToggle,
}) => {
  const [loading, setLoading] = useState(true);
  const [createLivenessApiData, setCreateLivenessApiData] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const fetchCreateLiveness = async () => {
      try {
        const { data, error } = (await CallCreateFaceSession()) as any;
        if (data?.status === 200) {
          setCreateLivenessApiData(data?.data?.sessionId);
          setLoading(false);
        }
        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log("Getting sesssion Error", error);
      }
    };

    fetchCreateLiveness();
  }, []);

  const handleAnalysisComplete = async () => {
    try {
      const { data, error } = (await CallGetFaceSessionResult(
        createLivenessApiData,
      )) as any;

      if (data?.status === 200) {
        if (data?.data?.Confidence >= 98) {
          const byteArray: any = new Uint16Array(
            data?.data?.ReferenceImage?.Bytes?.data,
          );
          // Convert the byte array to a Base64 string
          const base64String = btoa(String.fromCharCode(...byteArray));
          // Create a Base64 image string with the appropriate MIME type (assuming JPEG here)
          const imageBase64: any = `data:image/png;base64,${base64String}`;
          console.log({ imageBase64 });
          //   const blob = new Blob([byteArray], { type: "image/png" });
          //   const url: any = URL.createObjectURL(blob);
          console.log({ imageBase64 });
          setImageSrc(imageBase64);
          //   action(imageBase64);
          setStatus(
            "Facial Recogination Successfully ✅ Click on Authenticate Face Recognition to login",
          );
        } else {
          setStatus("Please try again Face not found ...!");
          setImageSrc(null);
        }
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ThemeProvider>
        {loading ? (
          <Spinner size="lg" />
        ) : (
          <>
            {status ? (
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#000", textAlign: "center" }}>{status}</p>
                {imageSrc && (
                  <div className="border-4 border-blue-500 h-[200px] w-[200px] rounded-full my-4 p-2 m-auto">
                    <Image
                      src={imageSrc}
                      width={200}
                      height={200}
                      alt="Captured Preview"
                      style={{ width: "100%", height: "100%" }}
                      className="rounded-full shadow-lg object-cover"
                    />
                  </div>
                )}

                {imageSrc && (
                  <Button
                    color="primary"
                    isLoading={loader}
                    onPress={() => {
                      action(imageSrc);
                    }}
                    size="lg"
                    className="w-full mb-3"
                  >
                    {`${newEnroll ? "Register" : "Authenticate"} Face Recognition`}
                  </Button>
                )}

                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => {
                    setStatus(null);
                    setImageSrc(null);
                  }}
                  size="lg"
                  className="w-full"
                  startContent={
                    <span className="material-symbols-outlined">replay</span>
                  }
                >
                  Recapture Photo
                </Button>
              </div>
            ) : (
              <FaceLivenessDetector
                sessionId={createLivenessApiData}
                region="ap-south-1"
                onUserCancel={() =>
                  setStatus(
                    "Face Capture failed ! Please click on Recapture Photo",
                  )
                }
                onAnalysisComplete={handleAnalysisComplete}
                disableStartScreen
                onError={(error) => {
                  console.error({ error });
                  setStatus(null);
                  setImageSrc(null);
                  modalToggle();
                  toast.error(error.error.message);
                }}
              />
            )}
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export default FaceDetection;
