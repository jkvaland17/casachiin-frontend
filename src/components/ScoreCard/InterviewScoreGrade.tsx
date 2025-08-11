"use client";
import {
  CallGetApplicationSummaryUrl,
  CallUpdateInterviewStats,
} from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  // Snippet,
  Spinner,
  Textarea,
} from "@heroui/react";
import moment from "moment";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
type FormData = {
  marks: number | undefined;
  grade: string;
  remark: string;
};
type interviewGradesType = { grade: string; description: string };
type InterviewCandidateDetailType = {
  interview: {
    grades: interviewGradesType[];
    scheamOfScore: string[];
    minMarks?: string | number;
    maxMarks?: string | number;
  };
  _id: string;
};
type InterviewCandidateCardType = {
  candidateDetail: InterviewCandidateDetailType;
  scoreData: FormData;
  setIsInvalid: any;
  setScoreData: any;
  isInvalid: boolean;
  invalidField?: { marks: boolean; grade: boolean };
  marksArray?: number[];
};
const InterviewScoreGrade: React.FC<InterviewCandidateCardType> = ({
  candidateDetail,
  scoreData,
  setScoreData,
  invalidField,
  marksArray,
  isInvalid,
  setIsInvalid,
}) => {
  const handleMarks = (e: any, type: string) => {
    e.preventDefault();
    const newMarks: any = scoreData?.marks;

    if (newMarks && type === "increment") {
      if (
        candidateDetail?.interview?.maxMarks &&
        newMarks < candidateDetail?.interview?.maxMarks
      ) {
        setScoreData({ ...scoreData, marks: newMarks + 1 });
      } else {
        toast.error("Invalid Marks");
      }
    } else if (newMarks && type === "decrement") {
      if (
        candidateDetail?.interview?.minMarks &&
        newMarks > candidateDetail?.interview?.minMarks
      ) {
        setScoreData({ ...scoreData, marks: newMarks - 1 });
      } else {
        toast.error("Invalid Marks");
      }
    } else if (!newMarks && type === "increment") {
      setScoreData({ ...scoreData, marks: 1 });
    } else if (!newMarks && type === "decrement") {
      toast.error("Invalid Marks");
    }
  };

  const PreventWordInput = (val: any) => {
    const disableKey = [
      "e",
      "E",
      "ArrowUp",
      "ArrowDown",
      ".",
      "+",
      "-",
      "@",
      "#",
      "",
    ];
    if (disableKey.includes(val.key)) {
      val.preventDefault();
    }
  };

  if (candidateDetail?.interview?.scheamOfScore?.includes("Grade")) {
    return (<>
      <Divider />
      <h5 className="my-4  font-semibold text-primary">Award Grade</h5>
      <div className="custom_input">
        <Select
          label="Award Grade"
          required
          selectedKeys={[scoreData?.grade]}
          onSelectionChange={(e) => {
            const value = Array.from(e)[0] as any;
            setScoreData({ ...scoreData, grade: value });
          }}
          placeholder="Select Grade"
          className="max-w-xs mb-3 w-full"
        >
          {candidateDetail?.interview?.grades?.map(
            (item: interviewGradesType) => (
              <SelectItem key={item?.grade}>
                {`${item?.grade} ${item?.description ? `( ${item?.description} )` : ""} `}
              </SelectItem>
            ),
          )}
        </Select>
      </div>
      <div className="chip_wrapper grade gap-3 flex-wrap">
        {candidateDetail?.interview?.grades?.map(
          (item: interviewGradesType) => (
            <Button
              variant="flat"
              size="lg"
              key={item?.grade}
              className="chip border-black text-lg"
              onClick={() =>
                setScoreData({
                  ...scoreData,
                  grade: item?.grade,
                })
              }
            >
              {`${item?.grade} ${item?.description ? `( ${item?.description} )` : ""} `}
            </Button>
          ),
        )}
      </div>
      {scoreData?.grade === "Unfit" ? (
        <>
          <Divider />
          <h5 className="mt-4 mb-3 font-semibold text-primary">Reason</h5>
          <div className="mb-4">
            <Textarea
              isRequired
              placeholder="Enter your comments"
              className="max-w-full"
              value={scoreData?.remark}
              isInvalid={isInvalid}
              errorMessage="The reason is mandatory."
              onChange={(e) => {
                setScoreData({ ...scoreData, remark: e.target.value });
                setIsInvalid(false);
              }}
              onKeyPress={(e) => {
                const value = e.currentTarget.value;
                if (
                  !(/^[a-zA-Z0-9\s]*$/).test(e.key) ||
                  (value === "" && e.key === " ")
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </>);
  } else if (candidateDetail?.interview?.scheamOfScore?.includes("Marks")) {
    return (
      <>
        <Divider />
        <h5 className="my-4 mb-2 font-semibold text-primary">Award Marks</h5>
        <div className="custom_input">
          <Input
            type="number"
            label="Award"
            isInvalid={invalidField?.marks}
            labelPlacement="inside"
            placeholder="Enter Award"
            value={scoreData?.marks?.toString()}
            onKeyDown={PreventWordInput}
            onChange={(e) =>
              setScoreData({
                ...scoreData,
                marks: e.target.valueAsNumber,
              })
            }
          />
          {invalidField?.marks && (
            <span className="text-danger">Please fill this field</span>
          )}
          <div className="custom_intput_number">
            <Button
              variant="light"
              size="sm"
              onClick={(e) => handleMarks(e, "increment")}
            >
              <span className="material-symbols-outlined">add</span>
            </Button>
            <Button
              variant="light"
              size="sm"
              onClick={(e) => handleMarks(e, "decrement")}
            >
              <span className="material-symbols-outlined">remove</span>
            </Button>
          </div>
        </div>
        <div className="chip_wrapper flex-wrap">
          {marksArray?.map((items, idx) => (
            <div
              className="chip"
              key={idx}
              onClick={() => setScoreData({ ...scoreData, marks: items })}
            >
              {items}
            </div>
          ))}
        </div>
      </>
    );
  }

  //   // else if (candidateDetail?.interview?.scheamOfScore?.includes("APS")) {
  //   return (
  //     <>
  //       <Divider />
  //       <h5 className="my-4  font-semibold text-primary">Award Grade</h5>
  //       <div className="custom_input">
  //         <Select
  //           label="Award Grade"
  //           required
  //           selectedKeys={[scoreData?.grade]}
  //           onSelectionChange={(e) => {
  //             const value = Array.from(e)[0] as any;
  //             if (value === "Fit") {
  //               setScoreData({
  //                 ...scoreData,
  //                 grade: value,
  //                 remark: "",
  //               });
  //             } else {
  //               setScoreData({ ...scoreData, grade: value });
  //             }
  //           }}
  //           placeholder="Select"
  //           className="max-w-xs mb-3 w-full"
  //         >
  //           <SelectItem key="Fit">Fit</SelectItem>
  //           <SelectItem key="Unfit">Unfit</SelectItem>
  //         </Select>
  //       </div>
  //       <div className="chip_wrapper grade gap-3 flex-wrap">
  //         <Button
  //           variant="flat"
  //           size="sm"
  //           className="chip border-black"
  //           onClick={() =>
  //             setScoreData({
  //               ...scoreData,
  //               grade: "Fit",
  //               remark: "",
  //             })
  //           }
  //         >
  //           Fit
  //         </Button>
  //         <Button
  //           variant="flat"
  //           size="sm"
  //           className="chip border-black"
  //           onClick={() =>
  //             setScoreData({
  //               ...scoreData,
  //               grade: "Unfit",
  //             })
  //           }
  //         >
  //           Unfit
  //         </Button>
  //       </div>
  //       {scoreData?.grade === "Unfit" ? (
  //         <>
  //           <Divider />
  //           <h5 className="mt-4 mb-3 font-semibold text-primary">Reason</h5>
  //           <div className="mb-4">
  //             <Textarea
  //               placeholder="Enter your comments"
  //               required
  //               className="max-w-full"
  //               value={scoreData?.remark}
  //               onChange={(e) =>
  //                 setScoreData({ ...scoreData, remark: e.target.value })
  //               }
  //             />
  //           </div>
  //         </>
  //       ) : (
  //         ""
  //       )}
  //     </>
  //   );
  // };
};
export default InterviewScoreGrade;
