"use client";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  CallFindPositionByDepartment,
  CallSendInterviewResultToCellAdmin,
} from "@/_ServerActions";
import GlobalAdvertisementFields from "@/components/Global/Advertisement/Fields";
import GlobalDepartmentFields from "@/components/Global/department/Fields";
import PrintAwardSheet from "@/components/PrintInterview";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Tab,
  Tabs,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Dataservice from "@/services/requestApi";
type PropsData = {
  showCellAdminBtn: boolean;
};

const ShowBothResult: React.FC<PropsData> = ({ showCellAdminBtn }) => {
  const router = useRouter();
  const { slug } = useParams();
  const session = useSession();
  const sessionData = session?.data?.user as any;
  const [isInterviewStart, setIsInterviewStart] = useState<boolean>(false);
  const [advertisement_noId, setAdvertisement_noId] = useState<any>("");
  const [specialtyId, setSpecialtyId] = useState<any>("");
  const [template, setTemplate] = useState<any>(null);
  const [positionList, setPositionList] = useState<any>([]);
  const [positionId, setPositionId] = useState<any>("");
  const [positionLoader, setPositionLoader] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("all_over_result");
  const [intId, setIntId] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setSpecialtyId(null);
  }, [advertisement_noId]);

  useEffect(() => {
    setPositionList("");
    if (
      specialtyId &&
      (template === "Faculty_APS" || template === "CA_JAMMU")
    ) {
      findPositionByDepartmentId(specialtyId);
    }
  }, [specialtyId]);

  const findPositionByDepartmentId = async (id: string) => {
    try {
      setPositionLoader(true);
      const dto = `${id}&advId=${advertisement_noId}`;
      const { data, error } = (await CallFindPositionByDepartment(dto)) as any;
      if (data?.message === "Success") {
        if (data?.data.length > 0) {
          setPositionList(data?.data);
          const positionFirstId = data?.data[0]?._id;
          setPositionId(positionFirstId);
          setPositionLoader(false);
        }
      }
      if (error) {
        console.log("error::: ", error);
        handleCommonErrors(error);
        setPositionLoader(false);
      }
    } catch (error) {
      setPositionLoader(false);
    }
  };

  const sendToCellAdmin = async () => {
    try {
      setIsSend(true);
      const dto = {
        advId: advertisement_noId,
        departmentId: specialtyId,
        positionId,
      };
      const { data, error } = (await CallSendInterviewResultToCellAdmin(
        dto,
      )) as any;
      if (data?.message === "Success") {
        toast.success("Successfully sent to cell admin");
      }
      if (error) {
        console.log("error::: ", error);
        handleCommonErrors(error);
      }
      setIsSend(false);
    } catch (error) {
      setIsSend(false);
      console.log("error::: ", error);
    }
  };

  const handlePrint = async () => {
    try {
      setLoading(true);
      let params = `interviewId=${intId}&departmentId=${specialtyId}&advertisementId=${advertisement_noId}`;
      if (template === "Faculty_APS" || template === "CA_JAMMU") {
        params += `&position=${positionId}`;
      }
      const token = sessionData?.token;
      const printResponse = await Dataservice.FinalSelectionListDownload(
        params,
        token,
      );

      console.log("printResponse::: ", printResponse);
      if (printResponse?.data?.message === "Success") {
        window.open(printResponse?.data?.URL, "_blank");
        setLoading(false);
        return;
      }
      toast.error(printResponse?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    // if (printeResponse) {
    //   window.open(printeResponse?.data?.URL, "_blank");
    //   setLoading(false);
    //   return;
    // }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl">Interview Result</h1>
            <Button onClick={() => router.back()}>
              <span className="material-symbols-outlined">arrow_back</span>
              Go Back
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="">
            <GlobalAdvertisementFields
              status="interview"
              value={advertisement_noId}
              setValue={(id: any, temp: any) => {
                setAdvertisement_noId(id);
                if (temp === "Faculty_APS" || temp === "CA_JAMMU") {
                  setTemplate(temp);
                } else {
                  setPositionList([]);
                  setTemplate(null);
                }
              }}
            />
            {advertisement_noId && (
              <div>
                <GlobalDepartmentFields
                  value={specialtyId}
                  setValue={setSpecialtyId}
                  advId={advertisement_noId}
                />
              </div>
            )}
            {positionList?.length > 0 && specialtyId && (
              <div className="col">
                <p className="mb-1">Position</p>
                <Select
                  value={positionId}
                  selectedKeys={[positionId]}
                  items={positionList}
                  isLoading={positionLoader}
                  onSelectionChange={(e: any) => {
                    const id: any = Array.from(e)[0];
                    if (id) {
                      setPositionId(id);
                    }
                  }}
                  placeholder="Position"
                  labelPlacement="outside"
                >
                  {(option: any) => (
                    <SelectItem key={option?._id}>{option?.value}</SelectItem>
                  )}
                </Select>
              </div>
            )}
          </div>
          <div className="mt-4">
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(value) => {
                setSelectedTab(String(value));
              }}
              color="primary"
              aria-label="Options"
            >
              <Tab key="all_over_result" title="All Over Result">
                <div className="text-center mt-3 flex justify-end">
                  {specialtyId && advertisement_noId && showCellAdminBtn && (
                    <>
                      <Button
                        onClick={sendToCellAdmin}
                        color="primary"
                        radius="sm"
                        className="text-white ml-2"
                      >
                        Send Cell Admin
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={handlePrint}
                    color="primary"
                    isLoading={loading}
                    radius="sm"
                    className="text-white ml-2"
                  >
                    Download Result
                  </Button>
                </div>
                {template === "Faculty_APS" || template === "CA_JAMMU" ? (
                  <>
                    {advertisement_noId && specialtyId && positionId && (
                      <>
                        <PrintAwardSheet
                          advId={advertisement_noId}
                          depId={specialtyId}
                          isInterviewStart={isInterviewStart}
                          setIsInterviewStart={setIsInterviewStart}
                          positionId={positionId}
                          template={template}
                          individualAwardSheet={false}
                          intId={intId}
                          setIntId={setIntId}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {advertisement_noId && specialtyId && (
                      <>
                        <PrintAwardSheet
                          advId={advertisement_noId}
                          depId={specialtyId}
                          isInterviewStart={isInterviewStart}
                          setIsInterviewStart={setIsInterviewStart}
                          positionId={positionId}
                          template={template}
                          individualAwardSheet={false}
                          intId={intId}
                          setIntId={setIntId}
                        />
                      </>
                    )}
                  </>
                )}
              </Tab>
              <Tab key="individual_award_sheet" title="Individual Award Sheet">
                {template === "Faculty_APS" || template === "CA_JAMMU" ? (
                  <>
                    {advertisement_noId && specialtyId && positionId && (
                      <>
                        <PrintAwardSheet
                          advId={advertisement_noId}
                          depId={specialtyId}
                          isInterviewStart={isInterviewStart}
                          setIsInterviewStart={setIsInterviewStart}
                          positionId={positionId}
                          template={template}
                          individualAwardSheet={true}
                          selectedTab={selectedTab}
                          intId={intId}
                          setIntId={setIntId}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {advertisement_noId && specialtyId && (
                      <>
                        <PrintAwardSheet
                          advId={advertisement_noId}
                          depId={specialtyId}
                          isInterviewStart={isInterviewStart}
                          setIsInterviewStart={setIsInterviewStart}
                          positionId={positionId}
                          template={template}
                          individualAwardSheet={true}
                          selectedTab={selectedTab}
                          intId={intId}
                          setIntId={setIntId}
                        />
                      </>
                    )}
                  </>
                )}
              </Tab>
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ShowBothResult;
