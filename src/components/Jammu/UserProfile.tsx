"use client";
import {
  CallGetApplicationSummaryUrl,
  CallUpdateInterviewStats,
} from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import { Button, Divider, Image, Input, Spinner } from "@heroui/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmptyInterviewApplications from "@/assets/img/brand/emptyInterviewApplications.svg";
import { useForm } from "react-hook-form";
const UserProfile: React.FC<any> = ({
  candidateDetail,
  getAllInterviewPanel,
  getAllScore,
  handleResetMarks,
  setIsMarksSubmitted,
  isAwardLocked,
  specialityId,
  setAllInterviewApplication,
  setAllPresentSearchData,
  formTemplate,
  positionId,
}) => {
  const params = useParams() as any;
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (candidateDetail) {
      setValue(
        "personalityAttributeMarks",
        candidateDetail?.stats?.personalityAttributeMarks,
      );
      setValue(
        "workExperienceMarks",
        candidateDetail?.stats?.workExperienceMarks,
      );
    }
  }, [candidateDetail]);

  const onSubmit = async (data: any) => {
    if (data?.workExperienceMarks < 5) {
      toast.error("Work Experience marks not less then 5.");
      return;
    }
    if (data?.personalityAttributeMarks < 5) {
      toast.error("Personality Attribute marks not less then 5.");
      return;
    }
    data.marks =
      parseInt(data?.workExperienceMarks) +
      parseInt(data?.personalityAttributeMarks);
    data._id = candidateDetail?._id;
    data.department = specialityId;
    data.position = positionId;
    setBtnLoading(true);
    try {
      const response = await CallUpdateInterviewStats(data);
      console.log("response::: ", response);
      if (response?.data) {
        const dataResponse = response as any;
        setBtnLoading(false);
        getAllInterviewPanel(
          params?.slug[1],
          false,
          candidateDetail?._id,
          specialityId,
          "Present",
          "Allowed",
          setAllInterviewApplication,
          setAllPresentSearchData,
          formTemplate,
          positionId,
        );
        getAllScore(params?.slug[1], specialityId, formTemplate, positionId);
        toast.success(dataResponse?.data?.message);
        // route.back();
      } else if (response?.error) {
        handleCommonErrors(response?.error);
        setBtnLoading(false);
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setBtnLoading(false);
    }
  };

  const handleResetScore = (e: any) => {
    handleResetMarks(candidateDetail?._id);
    setIsMarksSubmitted(candidateDetail?._id);
    getAllInterviewPanel(
      params?.slug[1],
      false,
      candidateDetail?._id,
      specialityId,
      "Present",
      "Allowed",
      setAllInterviewApplication,
      setAllPresentSearchData,
      formTemplate,
      positionId,
    );
    setValue("personalityAttributeMarks", "");
    setValue("workExperienceMarks", "");
  };
  return (
    (<div className="profile_area col-span-6 min-h-[100vh] interview relative">
      <div className="details_card ">
        <h5 className="mb-2 font-semibold text-lg">Candidate Information</h5>
        {Object.keys(candidateDetail)?.length > 0 ? (
          <>
            <div className="flex gap-3 ">
              <div>
                <h5 className="mb-2 text-lg">
                  Application No.:{" "}
                  <span className="font-semibold ">
                    {candidateDetail?.application?.registration}
                  </span>
                </h5>
              </div>
            </div>
            <div className="user_details mt-3">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <div>
                    <p className="heading">Name</p>
                    <h6 className="data">{candidateDetail?.candidate?.name}</h6>
                  </div>
                </div>
                {candidateDetail?.application?.father_name && (
                  <div>
                    <p className="heading">Father Name</p>
                    <h6 className="data">
                      {candidateDetail?.application?.father_name}
                    </h6>
                  </div>
                )}
              </div>
              {params?.slug[0] !== "Observer" &&
                candidateDetail?.candidateStatus === "Present" &&
                candidateDetail?.applicationInterviewStatus !== "NotAllowed" &&
                candidateDetail?.applicationInterviewStatus !==
                  "Not Eligible" && (
                  <div className="marks_form ">
                    {isAwardLocked ? (
                      <div className="bg-red-200 p-3 rounded-xl text-center">
                        Award Sheet has been Locked
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Divider />
                        <h5 className="my-1 font-semibold text-primary">
                          Award Marks
                        </h5>
                        <h5 className="my-1 font-semibold text-primary">
                          Work Experience and Skill (50 Marks)
                        </h5>
                        <div className="gap-1 flex flex-wrap my-1">
                          {Array.from({ length: 10 }).map(
                            (_, index: number) => (
                              <Button
                                variant="flat"
                                size="sm"
                                radius="none"
                                key={index}
                                className="chip p-0 border-black"
                                onClick={() => {
                                  setValue(
                                    "workExperienceMarks",
                                    (index + 1) * 5,
                                  );
                                }}
                                style={{ borderRadius: "3px" }}
                              >
                                {(index + 1) * 5}
                              </Button>
                            ),
                          )}
                        </div>
                        <Input
                          value={watch("workExperienceMarks")}
                          {...register("workExperienceMarks", {
                            required: "Work Experience marks are required",
                            validate: (value) =>
                              (/^\d*$/.test(value) && +value <= 50) ||
                              "Marks must be 0-50",
                          })}
                          radius="sm"
                          placeholder="Enter Work Experience and Skill"
                          className="max-w-full"
                          isInvalid={!!errors.workExperience}
                          errorMessage={"Work Experience marks are required"}
                          onKeyPress={(e) => {
                            const value = e.currentTarget.value + e.key;
                            if (!/^\d*$/.test(e.key) || +value > 50) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <h5 className="my-1 font-semibold text-primary">
                          Personality Attribute (50 Marks)
                        </h5>
                        <div className="gap-1 flex flex-wrap my-1">
                          {Array.from({ length: 10 }).map(
                            (_, index: number) => (
                              <Button
                                variant="flat"
                                size="sm"
                                radius="none"
                                key={index}
                                className="chip p-0 border-black"
                                onClick={() => {
                                  setValue(
                                    "personalityAttributeMarks",
                                    (index + 1) * 5,
                                  );
                                }}
                                style={{ borderRadius: "3px" }}
                              >
                                {(index + 1) * 5}
                              </Button>
                            ),
                          )}
                        </div>
                        <Input
                          value={watch("personalityAttributeMarks")}
                          {...register("personalityAttributeMarks", {
                            required:
                              "Personality Attribute marks are required",
                            validate: (value) =>
                              (/^[-]?\d*$/.test(value) &&
                                +value >= -50 &&
                                +value <= 50) ||
                              "Marks must be between -50 and 50",
                          })}
                          onKeyPress={(e) => {
                            const value = e.currentTarget.value + e.key;
                            if (
                              !/^[-]?\d*$/.test(value) ||
                              +value < -50 ||
                              +value > 50
                            ) {
                              e.preventDefault();
                            }
                          }}
                          radius="sm"
                          placeholder="Enter Personality Attribute Marks"
                          className="max-w-full"
                          isInvalid={!!errors.personalityAttribute}
                          errorMessage={
                            "Personality Attribute marks are required"
                          }
                        />
                        <div className="flex justify-center items-center gap-4">
                          <Button
                            type="submit"
                            radius="lg"
                            className="w-full"
                            size="lg"
                            color="primary"
                            isLoading={btnLoading}
                          >
                            Save Marks
                          </Button>
                          <Button
                            radius="lg"
                            className="w-full"
                            size="lg"
                            color="primary"
                            variant="bordered"
                            onClick={(e) => {
                              handleResetScore(e);
                            }}
                          >
                            Reset Marks
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
            </div>
          </>
        ) : (
          <div className="w-full">
            <div className="img-container mt-5 flex justify-center">
              <Image
                src={EmptyInterviewApplications?.src ?? ""}
                alt="img"
                classNames={{
                  wrapper: ["w-[300px]", "rounded-small", "overflow-hidden"],
                  img: ["h-full", "w-full", "object-cover"],
                }}
                radius="sm"
              />
            </div>
            <h1 className="text-center text-sm lg:text-md xl:text-lg xl:mx-5">
              Candidate information not found! Please select another candidate.
            </h1>
          </div>
        )}
      </div>
    </div>)
  );
};
export default UserProfile;
