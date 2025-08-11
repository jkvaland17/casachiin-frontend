"use client";

import { handleCommonErrors } from "@/Utils/HandleError";
import {
  CallAssignMultipleInterviews,
  CallUpdateApplicationInterviewReports,
} from "@/_ServerActions";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button, Divider, Switch } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Data = {
  typeOfReport: string | null;
  isOpen: boolean;
  candidateId: any;
  onOpenChange: (e: any) => void;
};

const ScheduleInterview: React.FC<Data> = ({
  typeOfReport,
  isOpen,
  candidateId,
  onOpenChange,
}) => {
  const [check, setCheck] = useState<boolean>(true);
  const [checkCover, setCheckCover] = useState<boolean>(false);
  const [totalYear, setTotalYear] = useState<number>(5);
  const [appraisalData, setAppraisalData] = useState<
    { year: number; grade: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: totalYear }, (_, i) => currentYear - i);
  const grades = ["A", "B", "C", "D", "NRC"];

  useEffect(() => {
    if (isOpen === false) {
      setCheck(true);
      setCheckCover(false);
      setAppraisalData([]);
      setTotalYear(5);
    }
  }, [isOpen]);

  const handleGradeSelection = (year: number, gradeData: any) => {
    const grade = Array.from(gradeData)[0];
    let dto: any = [];
    setAppraisalData((prevData: any) => {
      // Grade Not Selected
      if (!grade) {
        dto = prevData?.filter((data: any) => data.year !== year);
        const nrcData = dto?.filter((entry: any) => entry.grade === "NRC");
        if (nrcData?.length < 3 && dto?.length > 5) {
          setTotalYear(totalYear - 1);
          return dto.slice(0, -1);
        }
        return dto;
      }
      // Grade Updated
      const existingData = prevData?.find((data: any) => data.year === year);
      if (existingData) {
        dto = prevData?.map((data: any) =>
          data.year === year ? { ...data, grade } : data,
        );
        const nrcData = dto?.filter((entry: any) => entry.grade === "NRC");
        if (
          (nrcData?.length < 2 && dto?.length > 5) ||
          (totalYear > 5 && nrcData?.length < 2)
        ) {
          setTotalYear(totalYear - 1);
          return dto.slice(0, -1);
        }
        if (grade === "NRC" && years.length < 7 && nrcData?.length < 3) {
          setTotalYear(totalYear + 1);
          return dto;
        }
        return dto;
      }
      // Grade Created
      if (grade === "NRC" && years.length < 7) {
        setTotalYear(totalYear + 1);
      }
      dto = [...prevData, { year, grade }];
      return dto;
    });
  };

  const submitReport = async () => {
    try {
      const validate = appraisalData?.map((dto) => dto?.grade);
      if (validate?.length !== totalYear && typeOfReport === "appraisal") {
        toast.error("Please fill all the required fields");
        return;
      }
      setIsLoading(true);
      let dto: any;
      if (typeOfReport === "appraisal") {
        dto = {
          _id: candidateId,
          reportType: typeOfReport,
          data: appraisalData,
        };
      }
      if (typeOfReport === "vigilance" || typeOfReport === "legal") {
        dto = {
          _id: candidateId,
          reportType: typeOfReport,
          data: {
            report: check ? "yes" : "no",
            sealedCoverResult: checkCover ? "yes" : "no",
          },
        };
      }
      setIsLoading(true);
      const { data, error } = (await CallUpdateApplicationInterviewReports(
        dto,
      )) as any;
      if (data) {
        toast.success(data?.message);
        onOpenChange(false);
      }
      if (error) {
        handleCommonErrors(error);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="capitalize">
                  {typeOfReport === "appraisal Report"
                    ? typeOfReport
                    : `${typeOfReport} Clearance`}
                </span>
              </ModalHeader>
              <ModalBody>
                {typeOfReport === "appraisal" && (
                  <div>
                    {years.map((year) => (
                      <div key={year}>
                        <Select
                          isRequired
                          classNames={{ mainWrapper: "my-1.5" }}
                          label={`Select Grade for ${year}`}
                          placeholder="Select Grade"
                          labelPlacement="outside"
                          onSelectionChange={(e: any) =>
                            handleGradeSelection(year, e)
                          }
                          startContent={
                            <div className="pr-2">
                              <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                          }
                        >
                          {grades.map((grade) => (
                            <SelectItem key={grade}>{grade}</SelectItem>
                          ))}
                        </Select>
                      </div>
                    ))}
                  </div>
                )}
                {(typeOfReport === "vigilance" || typeOfReport === "legal") && (
                  <>
                    <Switch
                      color="success"
                      isSelected={check}
                      onValueChange={setCheck}
                    ></Switch>
                    {!check && (
                      <>
                        <Divider />
                        <div className="flex gap-x-2">
                          <h4>Sealed Cover Result</h4>
                          <Switch
                            color="success"
                            isSelected={checkCover}
                            onValueChange={setCheckCover}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  onClick={submitReport}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScheduleInterview;
