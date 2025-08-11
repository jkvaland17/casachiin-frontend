"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CallGetQrCodeData } from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import { Button, Spinner } from "@heroui/react";

const InterviewResult = () => {
  const router = useRouter() as any;
  const searchParams = useSearchParams();
  const id = searchParams.get("qrId") || "";

  const [loading, setLoading] = useState<boolean>(true);
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (id) {
      getAllList(id);
    }
  }, [id]);

  const getAllList = async (qrId: string) => {
    try {
      setLoading(true);
      const { data, error } = (await CallGetQrCodeData(qrId)) as any;
      if (data?.data?.resultUrl) {
        setLink(data?.data?.resultUrl);
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="interview-result">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : link ? (
        <iframe
          src={link}
          width="100%"
          style={{ border: "none", height: "100vh" }}
          title="Interview Result"
        />
      ) : (
        <div className="h-screen flex flex-col items-center justify-center gap-5 ">
          <p className="text-xl font-semibold">No Result Available.</p>
          <Button onClick={() => router.push("/")}>
            <span className="material-symbols-outlined">home</span> Go Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default InterviewResult;
