"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import React, { useEffect, useState } from "react";
import HeadersSection from "./HeadersSection";
import { Button, Spinner } from "@heroui/react";
import { handleCommonErrors } from "@/Utils/HandleError";
import { CallDownloadApplicationExcelHeaders } from "@/_ServerActions";
import toast from "react-hot-toast";

const DownloadExcelBtn: React.FC<any> = ({ filterData, headerApi, type }) => {
  const {
    isOpen: isOpenExcel,
    onOpen: onOpenExcel,
    onOpenChange: onOpenChangeExcel,
  } = useDisclosure();

  const [ExcelLoader, setExcelLoader] = useState<boolean>(false);
  const [Loading, setLoading] = useState<any>(false);

  useEffect(() => {
    if (isOpenExcel && filterData?.advertisement_noId) {
      getApplicationExcelHeadersList();
    } else {
      setExcelHeaders(null);
      setExcelDownloadData({
        headerArray: [],
        pubHeadersArray: [],
        awardsHeadersArray: [],
        notableHeadersArray: [],
        postHeldHeadersArray: [],
        screenScoreHeadersArray: [],
      });
    }
  }, [isOpenExcel, filterData?.advertisement_noId]);

  const [ExcelHeaders, setExcelHeaders] = useState<any>(null);

  const [ExcelDownloadData, setExcelDownloadData] = useState<any>({
    headerArray: [],
    pubHeadersArray: [],
    awardsHeadersArray: [],
    notableHeadersArray: [],
    postHeldHeadersArray: [],
    screenScoreHeadersArray: [],
  });

  const transformHeaders = (data: any) => {
    const transformedData: any = {};
    for (const key in data) {
      if (Array.isArray(data[key])) {
        transformedData[key] = data[key].map((header: string) => ({
          label: header,
          value: header,
        }));
      } else {
        transformedData[key] = data[key];
      }
    }

    return transformedData;
  };

  const getApplicationExcelHeadersList = async () => {
    try {
      setExcelLoader(true);
      const { data, error } = (await headerApi(
        filterData?.advertisement_noId,
      )) as any;
      if (data?.data) {
        const transformed = transformHeaders(data?.data);
        setExcelHeaders(transformed);
        setExcelDownloadData({
          headerArray: data?.data?.headerArray || [],
          pubHeadersArray: data?.data?.pubHeadersArray || [],
          awardsHeadersArray: data?.data?.awardsHeadersArray || [],
          notableHeadersArray: data?.data?.notableHeadersArray || [],
          postHeldHeadersArray: data?.data?.postHeldHeadersArray || [],
          screenScoreHeadersArray: data?.data?.screenScoreHeadersArray || [],
        });
      }
      if (error) {
        handleCommonErrors(error);
      }
      setExcelLoader(false);
    } catch (error) {
      setExcelLoader(false);
      console.error("Error fetching headers: ", error);
    }
  };

  const DownloadExcelQueue = async () => {
    try {
      setLoading(true);
      const { data: Dto, error } = (await CallDownloadApplicationExcelHeaders({
        advId: filterData?.advertisement_noId,
        type,
        isSampleFile: false,
        data: {
          ...filterData,
          advertisementId: filterData?.advertisement_noId,
          isSelectSpecificFields: true,
          ...ExcelDownloadData,
        },
      })) as any;
      if (Dto?.data) {
        toast.success(Dto?.message);
      }
      if (error) {
        toast(error, {
          icon: <i className="fa-solid fa-triangle-exclamation"></i>,
        });
      }
      // setLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      setExcelLoader(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        size="full"
        isOpen={isOpenExcel}
        onOpenChange={onOpenChangeExcel}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Data
              </ModalHeader>
              {ExcelLoader ? (
                <ModalBody>
                  <div className="flex justify-center items-center w-full h-full">
                    <Spinner />
                  </div>
                </ModalBody>
              ) : (
                <ModalBody className="overflow-y-auto">
                  {ExcelHeaders?.headerArray?.length > 0 && (
                    <HeadersSection
                      title="Basic Details"
                      headersArray={ExcelHeaders.headerArray}
                      selectedHeaders={ExcelDownloadData.headerArray}
                      onSelect={(updatedHeaders) =>
                        setExcelDownloadData({
                          ...ExcelDownloadData,
                          headerArray: updatedHeaders,
                        })
                      }
                    />
                  )}
                  {ExcelHeaders?.postHeldHeadersArray?.length > 0 && (
                    <HeadersSection
                      title="Post Held"
                      headersArray={ExcelHeaders.postHeldHeadersArray}
                      selectedHeaders={ExcelDownloadData.postHeldHeadersArray}
                      onSelect={(updatedHeaders) =>
                        setExcelDownloadData({
                          ...ExcelDownloadData,
                          postHeldHeadersArray: updatedHeaders,
                        })
                      }
                    />
                  )}
                  {ExcelHeaders?.screenScoreHeadersArray?.length > 0 && (
                    <HeadersSection
                      title="Screen Score"
                      headersArray={ExcelHeaders.screenScoreHeadersArray}
                      selectedHeaders={
                        ExcelDownloadData.screenScoreHeadersArray
                      }
                      onSelect={(updatedHeaders) =>
                        setExcelDownloadData({
                          ...ExcelDownloadData,
                          screenScoreHeadersArray: updatedHeaders,
                        })
                      }
                    />
                  )}
                  {ExcelHeaders?.pubHeadersArray?.length > 0 && (
                    <HeadersSection
                      title="Publication and Research"
                      headersArray={ExcelHeaders.pubHeadersArray}
                      selectedHeaders={ExcelDownloadData.pubHeadersArray}
                      onSelect={(updatedHeaders) =>
                        setExcelDownloadData({
                          ...ExcelDownloadData,
                          pubHeadersArray: updatedHeaders,
                        })
                      }
                    />
                  )}
                  {ExcelHeaders?.awardsHeadersArray?.length > 0 && (
                    <HeadersSection
                      title="Awards"
                      headersArray={ExcelHeaders.awardsHeadersArray}
                      selectedHeaders={ExcelDownloadData.awardsHeadersArray}
                      onSelect={(updatedHeaders) =>
                        setExcelDownloadData({
                          ...ExcelDownloadData,
                          awardsHeadersArray: updatedHeaders,
                        })
                      }
                    />
                  )}
                  {ExcelHeaders?.notableHeadersArray?.length > 0 && (
                    <HeadersSection
                      title="Notable"
                      headersArray={ExcelHeaders.notableHeadersArray}
                      selectedHeaders={ExcelDownloadData.notableHeadersArray}
                      onSelect={(updatedHeaders) =>
                        setExcelDownloadData({
                          ...ExcelDownloadData,
                          notableHeadersArray: updatedHeaders,
                        })
                      }
                    />
                  )}
                </ModalBody>
              )}
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isDisabled={ExcelLoader}
                  type="submit"
                  color="primary"
                  isLoading={Loading}
                  onPress={() => {
                    DownloadExcelQueue();
                  }}
                >
                  Download Excel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button
        variant="shadow"
        color="primary"
        size="md"
        isDisabled={!filterData?.advertisement_noId}
        className="py-2 px-5 me-2 cursor-pointer w-full md:w-fit"
        onPress={() => {
          onOpenExcel();
        }}
        startContent={<i className="fa-solid fa-download" />}
      >
        Download Excel
      </Button>
    </>
  );
};

export default DownloadExcelBtn;
