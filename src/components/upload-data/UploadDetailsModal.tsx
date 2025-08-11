import { CallGetJobStatus } from "@/_ServerActions";
import { excelDownload } from "@/Utils/DownloadExcel";
import { handleCommonErrors } from "@/Utils/HandleError";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Progress,
} from "@heroui/react";
import {
  Calendar,
  Clock,
  Download,
  File,
  FileText,
  Hash,
  Type,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SkeletonCard from "../card/SkeletonCard";
import ProcessInfo from "./ProcessInfo";

type Props = {
  id: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

type ChipColor =
  | "success"
  | "danger"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | undefined;

function UploadDetailsModal({ id, isOpen, onOpenChange }: Props) {
  const [isLoading, setIsLoading] = useState<any>({
    page: false,
    downloadBtn: false,
  });
  const [allData, setAllData] = useState<any>([]);
  const totalCount = allData?.processedCount + allData?.failedCount;
  const statusColorMap: { [key: string]: ChipColor } = {
    COMPLETED: "success",
    PROCESSING: "primary",
    PENDING: "warning",
    FAILED: "danger",
    Download: "secondary",
    Upload: "primary",
  };

  const processDetails = [
    {
      label: "Process ID",
      icon: <Hash className="h-4 w-4 text-gray-500" />,
      valueKey: allData?._id,
      type: "text",
      customClass: "font-mono bg-gray-100",
    },
    {
      label: "Process Name",
      icon: <File className="h-4 w-4 text-gray-500" />,
      valueKey: allData?.type,
      type: "text",
    },
    {
      label: "Started",
      icon: <Calendar className="h-4 w-4 text-gray-500" />,
      valueKey: allData?.startDate,
      type: "date",
    },
    {
      label: "Process Type",
      icon: <Type className="h-4 w-4 text-gray-500" />,
      valueKey: allData?.jobType,
      type: "chip",
    },
  ];

  const fetchData = async () => {
    setIsLoading((prev: any) => ({ ...prev, page: true }));

    try {
      const { data, error } = (await CallGetJobStatus(id)) as any;
      console.log("jobStatus", data, error);
      if (data) {
        setAllData(data?.status);
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading((prev: any) => ({ ...prev, page: false }));
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-5">
              <div className="mb-6 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex-col gap-1">
                    <div className="font-semibold flex items-center gap-2 text-xl">
                      <FileText className="h-5 w-5" />
                      Process Details
                    </div>
                    <p className="text-gray-500 text-sm font-medium">
                      Detailed information about the current process execution
                    </p>
                  </div>
                  <Chip
                    color={statusColorMap[allData?.status]}
                    variant="flat"
                    radius="full"
                    size="md"
                  >
                    {allData?.status}
                  </Chip>
                </div>
                {isLoading?.page ? (
                  <SkeletonCard />
                ) : (
                  <div>
                    <Card shadow="none" radius="sm" className="border">
                      <CardHeader className="pb-3 font-semibold">
                        Progress Overview
                      </CardHeader>
                      <CardBody className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {allData?.processedCount}
                            </div>
                            <div className="text-sm text-gray-500">
                              Processed
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">
                              {allData?.failedCount}
                            </div>
                            <div className="text-sm text-gray-500">Failed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {totalCount}
                            </div>
                            <div className="text-sm text-gray-500">Total</div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card shadow="none" radius="sm" className="border mt-5">
                      <CardHeader className="pb-3 font-semibold">
                        Process Information
                      </CardHeader>
                      <CardBody className="space-y-3">
                        <ProcessInfo processDetails={processDetails} />
                      </CardBody>
                    </Card>

                    {allData?.fileUrl && allData?.status === "COMPLETED" && (
                      <Alert
                        className="mt-5"
                        variant="faded"
                        color="success"
                        description={`${allData?.type} file generated successfully`}
                        title={"Your file is ready for download"}
                        endContent={
                          <Button
                            size="md"
                            onPress={() => {
                              excelDownload(allData?.fileUrl, setIsLoading);
                            }}
                            color="success"
                            className="text-white"
                            isLoading={isLoading?.downloadBtn}
                            startContent={<Download className="h-4 w-4 " />}
                          >
                            Download File
                          </Button>
                        }
                      />
                    )}

                    {allData?.status === "FAILED" && (
                      <Alert
                        className="mt-5"
                        variant="faded"
                        color="danger"
                        title={allData?.error}
                      />
                    )}
                  </div>
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default UploadDetailsModal;
