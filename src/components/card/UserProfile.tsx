"use client";
import {
  // CallGetApplicationById,
  CallGetApplicationSummaryUrl,
  CallUpdateInterviewStats,
} from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  // Snippet,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import pdficon from "@/assets/img/icons/common/pdf-icon.png";
import InterviewScoreGrade from "../ScoreCard/InterviewScoreGrade";
import EmptyInterviewApplications from "@/assets/img/brand/emptyInterviewApplications.svg";

type FormData = {
  marks: number | undefined;
  grade: string;
  remark: string;
  position?: string;
};
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
  const [marksArray, setMarksArray] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  // const [pubResData, setPubResData] = useState<any>([]);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenReport,
    onOpen: onOpenReport,
    onOpenChange: onOpenChangeReport,
  } = useDisclosure();
  const [invalidField, setInvalidField] = useState<any>({
    marks: false,
    grade: false,
  });

  const [scoreData, setScoreData] = useState<FormData>({
    marks: undefined,
    grade: "",
    remark: "",
    position: "",
  });
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  useEffect(() => {
    if (candidateDetail) {
      const newScoreData = {
        marks: candidateDetail?.stats?.marks ?? undefined,
        grade: candidateDetail?.stats?.grade ?? "",
        remark: candidateDetail?.stats?.remark ?? "",
      };
      setScoreData(newScoreData);
    }
  }, [candidateDetail]);

  // useEffect(() => {
  //   if (isOpen && pubResData?.length === 0 && candidateDetail?._id) {
  //     // API call
  //     getPubResData();
  //   } else {
  //     setPubResData([]);
  //   }
  // }, [isOpen]);

  useEffect(() => {
    if (scoreData?.grade) {
      setInvalidField({ ...invalidField, grade: false });
    } else if (scoreData?.marks) {
      setInvalidField({ ...invalidField, marks: false });
    }
  }, [scoreData?.grade, scoreData?.marks]);

  // const getPubResData = async () => {
  //   try {
  //     const { data, error } = (await CallGetApplicationById(
  //       candidateDetail?.application?._id,
  //     )) as any;
  //     console.log("data::: ", data);
  //     if (data) {
  //       setPubResData(data?.data);
  //     } else if (error) {
  //       handleCommonErrors(error);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  const getApplicationSummaryUrl = async (id: any) => {
    try {
      setLoading(true);
      const { data, error } = (await CallGetApplicationSummaryUrl(id)) as any;

      if (data?.message === "Success") {
        if (data?.data) {
          const link = document.createElement("a");
          link.href = data?.data;
          link.target = "_blank"; // Open in a new tab
          link.rel = "noopener noreferrer"; // Security best practices
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
        setLoading(false);
      } else if (error) {
        handleCommonErrors(error);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!scoreData?.remark && scoreData?.grade === "Unfit") {
      setIsInvalid(true);
      return;
    }
    setBtnLoading(true);
    const newMarks = scoreData?.marks ? Number(scoreData?.marks) : 0;
    const formData = {
      ...scoreData,
      marks: newMarks,
      department: specialityId,
      _id: candidateDetail?._id,
    };
    if (positionId) {
      formData.position = positionId;
    }
    console.log({ formData });

    if (
      candidateDetail?.interview?.scheamOfScore?.includes("Marks") &&
      !scoreData?.marks
    ) {
      setInvalidField({ ...invalidField, marks: true });
      setBtnLoading(false);
      return;
    }

    if (
      candidateDetail?.interview?.scheamOfScore?.includes("Grade") &&
      !scoreData?.grade
    ) {
      setInvalidField({ ...invalidField, grade: true });
      setBtnLoading(false);
      return;
    }
    setInvalidField({
      marks: false,
      grade: false,
    });
    setIsMarksSubmitted(candidateDetail?._id);
    try {
      // console.log({ formData });

      const response = await CallUpdateInterviewStats(formData);
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
  useEffect(() => {
    if (
      candidateDetail?.interview?.minMarks &&
      candidateDetail?.interview?.maxMarks
    ) {
      handleMarksArray(
        candidateDetail?.interview?.minMarks,
        candidateDetail?.interview?.maxMarks,
      );
    }
  }, [
    candidateDetail?.interview?.minMarks,
    candidateDetail?.interview?.maxMarks,
  ]);
  const handleMarksArray = (minMarks: number, maxMarks: number) => {
    const multiplesOfFive = [];

    for (let i = Math.ceil(minMarks / 5) * 5; i <= maxMarks; i += 5) {
      multiplesOfFive.push(i);
    }
    setMarksArray(multiplesOfFive);
  };
  const handleMarks = (e: any, type: string) => {
    e.preventDefault();
    const newMarks: any = scoreData?.marks;

    if (newMarks && type === "increment") {
      if (newMarks < candidateDetail?.interview?.maxMarks) {
        setScoreData({ ...scoreData, marks: newMarks + 1 });
      } else {
        toast.error("Invalid Marks");
      }
    } else if (newMarks && type === "decrement") {
      if (newMarks > candidateDetail?.interview?.minMarks) {
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
  const handleResetScore = (e: any) => {
    e?.preventDefault();
    handleResetMarks(candidateDetail?._id);
    setIsMarksSubmitted(candidateDetail?._id);

    setScoreData({
      marks: undefined,
      grade: "",
      remark: "",
    });

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

  const reportData = (data: any, name: string) => {
    return (
      <>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <tr>
            <td className="p-1 text-sm text-start border-b border-gray-300 font-semibold">
              {name} Report
            </td>
            <td className="p-1 text-sm text-start border-b border-gray-300 font-semibold w-16">
              <Chip
                className="capitalize"
                radius="sm"
                color={data?.report === "yes" ? "success" : "danger"}
                size="sm"
                variant="flat"
              >
                {data?.report}
              </Chip>
            </td>
          </tr>
        </table>
      </>
    );
  };
  return (
    <div className="profile_area col-span-6 min-h-[100vh] interview relative">
      {/* {loader && (
        <div className="flex absolute h-[90vh] w-full justify-center items-center">
          <Spinner />
        </div>
      )} */}
      <div className="details_card ">
        <h5 className="mb-2 font-semibold text-lg">Candidate Information</h5>
        {Object.keys(candidateDetail)?.length > 0 ? (
          <>
            <div className="flex gap-3 flex-wrap">
              <div className="w-[80px] h-[80px]">
                <Avatar
                  className="w-[80px] h-[80px] text-large"
                  radius="sm"
                  isBordered
                  src={candidateDetail?.application?.photo}
                  name={candidateDetail?.candidate?.name}
                />
              </div>
              <div>
                <h5 className="mb-2 font-semibold text-lg break-all">
                  {candidateDetail?.candidate?.name}
                </h5>
                <div className="flex gap-2 justify-start mb-1 flex-wrap">
                  <Button
                    onClick={() =>
                      getApplicationSummaryUrl(
                        candidateDetail?.application?._id,
                      )
                    }
                    // as={Link}
                    // href={summaryUrl}
                    // target="_blank"
                    radius="sm"
                    size="sm"
                    color="primary"
                    variant="flat"
                  >
                    {loading && <Spinner size="sm" className="me-1" />}Candidate
                    Profile
                  </Button>
                  {/* {candidateDetail?.interviewFile ? (
                <Button
                  as={Link}
                  href={candidateDetail?.interviewFile}
                  target="_blank"
                  type="button"
                  radius="sm"
                  size="sm"
                  color="primary"
                  variant="flat"
                >
                  View Presentation
                </Button>
              ) : (
                <Button
                  onClick={() => toast.error("Presentation Not Available")}
                  type="button"
                  radius="sm"
                  size="sm"
                  color="primary"
                  variant="flat"
                >
                  View Presentation
                </Button>
              )} */}
                  {formTemplate === "Faculty_APS" && (
                    <>
                      <Button
                        onClick={onOpen}
                        type="button"
                        radius="sm"
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        View Research Publication
                      </Button>
                      {/* <Button
                        radius="sm"
                        size="sm"
                        color="primary"
                        variant="flat"
                        onPress={onOpenReport}
                      >
                        Reports
                      </Button> */}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="user_details mt-3">
              <div className="grid grid-cols-2 break-all gap-4 mb-5">
                <div>
                  <div>
                    <p className="heading">Candidate Id.</p>
                    <h6 className="data">
                      {candidateDetail?.candidate?.candidateId}
                    </h6>
                  </div>
                  <div>
                    <p className="heading">Registration No.</p>
                    <h6 className="data">
                      {candidateDetail?.application?.registration
                        ? candidateDetail?.application?.registration
                        : " -- "}
                    </h6>
                  </div>
                </div>
                <div>
                  <p className="heading">Father Name</p>
                  <h6 className="data">
                    {candidateDetail?.application?.father_name
                      ? candidateDetail?.application?.father_name
                      : " -- "}
                  </h6>
                  <p className="heading">DOB</p>
                  <h6 className="data">
                    {candidateDetail?.application?.date_of_birth
                      ? moment(
                          candidateDetail?.application?.date_of_birth,
                        ).format("DD/MM/YYYY")
                      : " -- "}
                  </h6>
                </div>
              </div>
              {candidateDetail?.candidateStatus === "Present" &&
                candidateDetail?.applicationInterviewStatus !== "NotAllowed" &&
                candidateDetail?.applicationInterviewStatus !==
                  "Not Eligible" && (
                  <div className="marks_form ">
                    {isAwardLocked ? (
                      <div className="bg-red-200 p-3 rounded-xl text-center">
                        Award Sheet has been Locked
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        {params?.slug[0] !== "Observer" && (
                          <InterviewScoreGrade
                            candidateDetail={candidateDetail}
                            scoreData={scoreData}
                            setScoreData={setScoreData}
                            invalidField={invalidField}
                            marksArray={marksArray}
                            isInvalid={isInvalid}
                            setIsInvalid={setIsInvalid}
                          />
                        )}
                        {params?.slug[0] !== "Observer" && (
                          <div className="flex justify-center items-center gap-4">
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
                              Reset{" "}
                              {candidateDetail?.interview?.scheamOfScore?.length
                                ? candidateDetail?.interview?.scheamOfScore[0]
                                : ""}
                            </Button>
                            <Button
                              type="submit"
                              radius="lg"
                              className="w-full"
                              size="lg"
                              color="primary"
                              isLoading={btnLoading}
                            >
                              Save{" "}
                              {candidateDetail?.interview?.scheamOfScore?.length
                                ? candidateDetail?.interview?.scheamOfScore[0]
                                : ""}
                            </Button>
                          </div>
                        )}
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

      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onOpenChange) => (
            <>
              <ModalHeader>Research Publication Details</ModalHeader>
              <ModalBody className="pt-0">
                <div className="">
                  <p className="mb-0 text-sm">
                    Applicant Name: {candidateDetail?.candidate?.name}
                  </p>
                  <p className="mb-0 text-sm">
                    Department Name: {candidateDetail?.department?.value}
                  </p>
                  <p className="mb-0 text-sm">
                    Promotion to the Grade: {candidateDetail?.position?.value}
                  </p>
                  <p className="mb-0 text-sm">
                    Date:{" "}
                    {moment(
                      candidateDetail?.applicationInterview?.interview
                        ?.startDate,
                    ).format("LL")}
                  </p>
                </div>
                <Table
                  removeWrapper
                  isStriped
                  aria-label="Example table with custom cells"
                >
                  <TableHeader>
                    <TableColumn>S.No.</TableColumn>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Doc</TableColumn>
                  </TableHeader>
                  <TableBody
                    emptyContent={
                      <div>
                        <p className="mb-3 font-medium text-xl">
                          There is no research publication data.
                        </p>
                      </div>
                    }
                  >
                    {candidateDetail?.application?.pubResearchWork?.map(
                      (item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item?.title}</TableCell>
                          <TableCell>
                            {item?.file?.url ? (
                              <Tooltip content="Click to view document">
                                <div className="w-[40px] h-[40px] mb-3">
                                  <Link href={item?.file?.url} target="_blank">
                                    <Image
                                      src={pdficon.src}
                                      className="h-full w-full object-contain"
                                      alt="No-Pdf"
                                    />
                                  </Link>
                                </div>
                              </Tooltip>
                            ) : (
                              <p className="text-mefont-medium truncate text-nowrap text-sm capitalize text-center">
                                No Docs
                              </p>
                            )}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenReport} onOpenChange={onOpenChangeReport}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary">
                APAR report
              </ModalHeader>
              <ModalBody>
                {candidateDetail?.appraisalReport?.length > 0 ||
                candidateDetail?.vigilanceReport?.report ||
                candidateDetail?.legalClearance?.report ? (
                  <>
                    <Divider />
                    {candidateDetail?.appraisalReport?.length > 0 && (
                      <>
                        <h2 className="font-semibold text-start">
                          Appraisal Report
                        </h2>
                        <div className="overflow-x-auto text-sm">
                          <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                              <tr>
                                <th className="px-4 py-1 border-b">Year</th>
                                <th className="px-4 py-1 border-b">Grade</th>
                              </tr>
                            </thead>
                            <tbody>
                              {candidateDetail?.appraisalReport?.map(
                                (report: any) => (
                                  <tr key={report._id} className="text-center">
                                    <td className="px-4 py-1 border-b">
                                      {report.year}
                                    </td>
                                    <td className="px-4 py-1 border-b">
                                      {report.grade}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                    {candidateDetail?.vigilanceReport?.report && (
                      <>
                        {reportData(
                          candidateDetail?.vigilanceReport,
                          "Vigilance",
                        )}
                      </>
                    )}
                    {candidateDetail?.legalClearance?.report && (
                      <>
                        {reportData(candidateDetail?.legalClearance, "Legal")}
                      </>
                    )}
                  </>
                ) : (
                  <h1 className="text-center text-xl">No report found</h1>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default UserProfile;
