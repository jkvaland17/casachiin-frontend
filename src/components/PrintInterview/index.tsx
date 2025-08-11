"use client";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  CallGetIndividualScores,
  CallGetInterviewResult,
} from "@/_ServerActions";
import CustomLoader from "@/components/loader/CustomLoader";
import {
  Button,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import EmptyInterviewApplications from "@/assets/img/brand/emptyInterviewApplications.svg";
import { useSession } from "next-auth/react";
import { PrintReciept } from "@/Utils/PrintReciept";

type PropsData = {
  depId: string;
  advId: string;
  template: string;
  isInterviewStart: any;
  setIsInterviewStart: any;
  positionId: any;
  individualAwardSheet: boolean;
  selectedTab?: string;
  intId: any;
  setIntId: any;
};

const PrintAwardSheet: React.FC<PropsData> = ({
  depId,
  advId,
  template,
  isInterviewStart,
  setIsInterviewStart,
  positionId,
  individualAwardSheet,
  selectedTab,
  intId,
  setIntId,
}) => {
  const { slug } = useParams();
  const router = useRouter();
  const session = useSession() as any;
  const isHead =
    (session?.data?.user?.data?.position?.value === "Head" &&
      session?.data?.user?.data?.userType?.type === "admin") ||
    false;
  const sessionData = session?.data?.user as any;
  const printRef = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [awardSheetList, setAwardSheetList] = useState([]);
  const [awardPanelMembers, setAwardPanelMembers] = useState([]);
  const [awardMember, setAwardMember] = useState<any>(null);
  const [waitList, setWaitList] = useState<any>([]);
  const [selectedList, setSelectedList] = useState<any>([]);
  const [data, setData] = useState<any>(null);
  const [notQualifiedFor, setNotQualifiedFor] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [gradeData, setGradeData] = useState<any>(null);

  useEffect(() => {
    if (depId && advId) {
      getData(depId, advId);
      setAwardPanelMembers([]);
      setAwardMember(null);
    }
  }, [depId, advId, positionId]);

  useEffect(() => {
    if (
      depId &&
      advId &&
      awardMember &&
      selectedTab === "individual_award_sheet"
    ) {
      getDataIndividualAwardSheet(advId, depId, awardMember);
    }
  }, [awardMember]);

  useEffect(() => {
    if (isOpen === false) {
      setGradeData(null);
    }
  }, [isOpen]);

  const getData = async (dep: string, adv: string) => {
    try {
      setIsLoading(true);
      const dto = `departmentId=${dep}&advertisementId=${adv}&position=${positionId}&groupMemberRole=Chairperson&allowExpert=true`;
      const { data, error } = (await CallGetInterviewResult(dto)) as any;
      if (data?.message === "Success") {
        setIsInterviewStart(!!data?.data?.length);
        const awardSheetList = data?.data;
        setAwardSheetList(
          awardSheetList?.filter(
            (ele: any) =>
              (ele?.allottedCategory !== null && ele?.allottedCategory) ||
              ele?.qualifiedForWaitlist,
          ),
        );
        setNotQualifiedFor(
          awardSheetList?.filter(
            (ele: any) =>
              (ele?.allottedCategory === null || !ele?.allottedCategory) &&
              !ele?.qualifiedForWaitlist,
          ),
        );
        if (awardSheetList?.length > 0) {
          setData(awardSheetList[0]);
          setIntId(awardSheetList[0]?.applicationInterview?.interview?._id);
        }
        setWaitList(
          awardSheetList?.filter(
            (ele: any) => ele?.isWaitlistCandidate === true,
          ),
        );
        setSelectedList(
          awardSheetList.filter(
            (item: any) =>
              !item.hasOwnProperty("isWaitlistCandidate") &&
              item?.allottedCategory !== null,
          ),
        );

        setAwardPanelMembers(data?.panelMembers);
        if (data?.panelMembers?.length > 0) {
          setAwardMember(data?.panelMembers[0]?._id);
        }
        setIsLoading(false);
      }
      if (error) {
        console.log("error::: ", error);
        setIsInterviewStart(false);
        handleCommonErrors(error);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getDataIndividualAwardSheet = async (
    advId: string,
    depId: string,
    awardMemberId: string,
  ) => {
    try {
      setIsLoading(true);
      const findAward: any = awardPanelMembers?.find(
        (ele: any) => ele?._id === awardMemberId,
      );
      let params = `interview=${intId}&role=${findAward?.role?.value}&department=${depId}&memberId=${findAward?.user?._id}`;
      if (template === "Faculty_APS" || template === "CA_JAMMU") {
        params += `&position=${positionId}`;
      }
      const { data, error } = (await CallGetIndividualScores(params)) as any;
      if (data?.message === "Success") {
        setSelectedList(data?.data?.STATS);
      }
      if (error) {
        console.log("error::: ", error);
        handleCommonErrors(error);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <CustomLoader />;
  }
  const printDownload = () => {
    const findAward: any = awardPanelMembers?.find(
      (ele: any) => ele?._id === awardMember,
    );
    let params = `${intId}&role=${findAward?.role?.value}&department=${depId}&memberId=${findAward?.user?._id}`;
    if (template === "Faculty_APS" || template === "CA_JAMMU") {
      params += `&position=${positionId}`;
    }
    PrintReciept(
      params,
      "downloadScoreSummary",
      session?.data?.user?.token,
      setLoading,
      "Award Sheet.pdf",
      "interview",
      "printOnly",
    );
  };

  return (
    <div className="m-3">
      {individualAwardSheet && (
        <div className="my-2 flex">
          <Select
            value={awardMember}
            selectedKeys={[awardMember]}
            items={awardPanelMembers}
            onSelectionChange={(e: any) => {
              const id: any = Array.from(e)[0];
              setAwardMember(id);
            }}
            placeholder="Position"
            labelPlacement="outside"
          >
            {(option: any) => (
              <SelectItem key={option?._id}>
                {`${option?.user?.name} (${option?.role?.value})`}
              </SelectItem>
            )}
          </Select>
          <Button
            onClick={printDownload}
            color="primary"
            radius="sm"
            isLoading={loading}
            isDisabled={!awardMember}
            className="text-white ml-2 w-96"
          >
            Individual Award Sheet Download
          </Button>
        </div>
      )}
      <div className="relative">
        <div className="overflow-hidden absolute top-0 left-0 w-full h-full grid grid-cols-4 gap-5 opacity-10 pointer-events-none">
          {Array(100)
            .fill(null)
            .map((_, index) => (
              <p key={index} className="watermark-text rotate-[-30deg]">
                {sessionData?.data?.name}
              </p>
            ))}
        </div>
        {!isInterviewStart ? (
          <div className="w-full">
            <div className="img-container mt-5 flex justify-center">
              <Image
                src={EmptyInterviewApplications?.src ?? ""}
                alt="img"
                classNames={{
                  wrapper: [
                    "w-[300px]",
                    "min-w-[300px]",
                    "rounded-small",
                    "overflow-hidden",
                  ],
                  img: ["h-full", "w-full", "object-cover"],
                }}
                radius="sm"
              />
            </div>
            <h1 className="text-center text-2xl">Interview not start yet</h1>
          </div>
        ) : (
          <>
            {template === "Faculty_APS" || template === "CA_JAMMU" ? (
              <div
                className="print_container "
                ref={printRef}
                style={{
                  border: "1px solid rgb(206, 206, 206)",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  padding: "1.5rem 0",
                  marginBottom: 50,
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <td
                        style={{
                          position: "relative",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ width: "60px", margin: "25px auto 0" }}>
                          <Image
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            src="https://rrp.CAexams.ac.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.a81a34ab.png&w=384&q=75"
                            alt="CA Logo"
                          />
                        </div>
                        <div
                          style={{
                            width: "fit-content",
                            background: "red",
                            color: "white",
                            fontWeight: 700,
                            padding: "8px",
                            fontSize: "12px",
                            borderRadius: "10px",
                            textAlign: "center",
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        >
                          Confidential
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "0.5rem",
                          borderBottom: "1px solid black",
                        }}
                      >
                        <p
                          className="english_title"
                          style={{
                            fontWeight: 700,
                            textAlign: "center",
                            color: "black",
                            margin: "2px",
                            fontFamily: "'Noto Sans', Arial, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          CA Admin Panel, New Delhi
                        </p>
                        <p
                          className="english_title"
                          style={{
                            fontWeight: 700,
                            textAlign: "center",
                            color: "black",
                            margin: "2px",
                            fontFamily: "'Noto Sans', Arial, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          Ansari Nagar, New Delhi - 110029
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center", padding: "0.5rem" }}>
                        <p
                          style={{
                            margin: "5px 0px",
                            color: "rgb(32, 115, 223)",
                            fontWeight: 600,
                            fontSize: "12px",
                          }}
                        >
                          {data?.advertisement?.formTemplate ===
                          "Faculty_APS" ? (
                            <p>
                              {`Taking into consideration the performance of candidates and their records, and also the opinion of the Technical Experts, the Committee recommends the following candidates for promotion to the grade of ${data?.position?.value} of ${data?.department?.value} under the Assessment Promotion Scheme w.e.f. 01.07.2024 who are found “FIT/UNFIT” only as shown below :-`}
                            </p>
                          ) : (
                            <p>
                              {`Considering the performance of candidates and their records, and also the opinion of the technical Expert, the Committee recommends the following candidates for the post of Assistant Professor for department of ${data?.department?.value} for ${data?.advertisement?.description} in order of merit including the candidates on the waiting list specified separately.`}
                            </p>
                          )}
                        </p>
                      </td>
                    </tr>
                  </thead>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}
                  >
                    Advertisement Notice No: {data?.advertisement?.value}
                  </div>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}
                  >
                    Department: {data?.department?.value}
                  </div>
                  {(data?.advertisement?.formTemplate === "Faculty_APS" ||
                    data?.advertisement?.formTemplate === "CA_JAMMU") && (
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        padding: "0 18px",
                      }}
                    >
                      Promotion To the Grade Of : {data?.position?.value}
                    </div>
                  )}
                  <div
                    style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}
                  >
                    Date Of Interview:{" "}
                    {moment(
                      new Date(
                        data?.applicationInterview?.interview?.startDate,
                      ),
                    ).format("DD-MM-YYYY")}
                  </div>
                  <tbody>
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          padding: "1rem",
                          fontSize: "14px",
                          textAlign: "left",
                        }}
                      >
                        <h1
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            marginBottom: 8,
                          }}
                        >
                          Recommendation List
                        </h1>
                        <div
                          style={{
                            borderRadius: "0.5rem",
                            overflow: "hidden",
                            border: "1px solid rgb(191, 191, 191)",
                            marginBottom: "1.5rem",
                          }}
                        >
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: "rgb(20, 114, 255)",
                                  color: "white",
                                  textAlign: "left",
                                }}
                              >
                                <th
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                  }}
                                >
                                  SL.No
                                </th>
                                <th
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                  }}
                                >
                                  Candidate Id.
                                </th>
                                <th
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                  }}
                                >
                                  Name
                                </th>
                                <th
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                  }}
                                >
                                  Recommendation
                                </th>
                                <th
                                  style={{
                                    padding: "0.6rem 1rem",
                                    fontWeight: 600,
                                    fontSize: "12px",
                                  }}
                                >
                                  Remark
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedList?.map(
                                (selected: any, index: number) => (
                                  <tr
                                    key={index}
                                    style={{
                                      borderBottom:
                                        "1px solid rgb(212, 212, 212)",
                                    }}
                                  >
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {index + 1}
                                    </td>
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {selected?.user?.candidateId ||
                                        selected?.CANDIDATE_ID}
                                    </td>
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {selected?.user?.name ||
                                        selected?.CANDIDATE_NAME}
                                    </td>
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {selected?.isSealedCoverResult ? (
                                        <div
                                          className="cursor-pointer"
                                          onClick={() => {
                                            onOpen();
                                            setGradeData(selected);
                                          }}
                                        >
                                          ****(Sealed Cover)
                                        </div>
                                      ) : (
                                        <div>
                                          {selected?.finalGrade ||
                                            selected?.GRADE ||
                                            selected?.average_marks ||
                                            selected?.MARKS}
                                        </div>
                                      )}
                                    </td>
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {selected?.finalGradeUpdateRemarks ||
                                        selected?.REMARK ||
                                        "-"}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  className="footer"
                  style={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#000",
                  }}
                >
                  <span className="page-number"></span>
                </div>
              </div>
            ) : (
              <div
                className="print_container "
                ref={printRef}
                style={{
                  border: "1px solid rgb(206, 206, 206)",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  padding: "1.5rem 0",
                  marginBottom: 50,
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <td
                        style={{
                          position: "relative",
                          textAlign: "center",
                        }}
                      >
                        <div style={{ width: "60px", margin: "25px auto 0" }}>
                          <Image
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            src="https://rrp.CAexams.ac.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.a81a34ab.png&w=384&q=75"
                            alt="CA Logo"
                          />
                        </div>
                        <div
                          style={{
                            width: "fit-content",
                            background: "red",
                            color: "white",
                            fontWeight: 700,
                            padding: "8px",
                            fontSize: "12px",
                            borderRadius: "10px",
                            textAlign: "center",
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        >
                          Confidential
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          textAlign: "center",
                          padding: "0.5rem",
                          borderBottom: "1px solid black",
                        }}
                      >
                        {data?.advertisement?.value ===
                        "Advt.No.CA/NewDelhi/Fac.Rect/CAPFIMS/Contract2024/1" ? (
                          <>
                            <p
                              className="english_title"
                              style={{
                                fontWeight: 700,
                                textAlign: "center",
                                color: "black",
                                margin: "2px",
                                fontFamily: "'Noto Sans', Arial, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              CA Admin Panel
                            </p>
                            <p
                              className="english_title"
                              style={{
                                fontWeight: 700,
                                textAlign: "center",
                                color: "black",
                                margin: "2px",
                                fontFamily: "'Noto Sans', Arial, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              Maidan Garhi, New Delhi-110068
                            </p>
                          </>
                        ) : (
                          <>
                            <p
                              className="english_title"
                              style={{
                                fontWeight: 700,
                                textAlign: "center",
                                color: "black",
                                margin: "2px",
                                fontFamily: "'Noto Sans', Arial, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              CA Admin Panel, New
                              Delhi-110029
                            </p>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center", padding: "0.5rem" }}>
                        <p
                          style={{
                            margin: "5px 0px",
                            color: "rgb(32, 115, 223)",
                            fontWeight: 600,
                            fontSize: "12px",
                          }}
                        >
                          {`Considering the performance of candidates and their records, and also the opinion of the technical Expert, the Committee recommends the following candidates for the post of Assistant Professor for department of ${data?.department?.value} for ${data?.advertisement?.value === "Advt.No.CA/NewDelhi/Fac.Rect/CAPFIMS/Contract2024/1" ? "CAPFIMS" : "CA-New Delhi"} (on Contract Basis) in order of merit including the candidates on the waiting list specified separately.`}
                        </p>
                      </td>
                    </tr>
                  </thead>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}
                  >
                    Advertisement Notice No: {data?.advertisement?.value}
                  </div>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}
                  >
                    Department: {data?.department?.value}
                  </div>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}
                  >
                    Date Of Interview:{" "}
                    {moment(
                      new Date(
                        data?.applicationInterview?.interview?.startDate,
                      ),
                    ).format("DD-MM-YYYY")}
                  </div>
                  {selectedTab === "individual_award_sheet" ? (
                    <tbody>
                      <tr>
                        <td
                          colSpan={5}
                          style={{
                            padding: "1rem",
                            fontSize: "14px",
                            textAlign: "left",
                          }}
                        >
                          <h1
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              marginBottom: 8,
                            }}
                          >
                            Candidates List
                          </h1>
                          <div
                            style={{
                              borderRadius: "0.5rem",
                              overflow: "hidden",
                              border: "1px solid rgb(191, 191, 191)",
                              marginBottom: "1.5rem",
                            }}
                          >
                            <table
                              style={{
                                width: "100%",
                                borderCollapse: "collapse",
                              }}
                            >
                              <thead>
                                <tr
                                  style={{
                                    backgroundColor: "rgb(20, 114, 255)",
                                    color: "white",
                                    textAlign: "left",
                                  }}
                                >
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    SL.No
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Candidate Id.
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Awarded Grade
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Remark
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedList?.map(
                                  (selected: any, index: number) => (
                                    <tr
                                      key={index}
                                      style={{
                                        borderBottom:
                                          "1px solid rgb(212, 212, 212)",
                                      }}
                                    >
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {index + 1}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.CANDIDATE_ID || "-"}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.CANDIDATE_NAME || "-"}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.GRADE || "-"}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.REMARK || "-"}
                                      </td>
                                    </tr>
                                  ),
                                )}
                                {selectedList?.length === 0 && (
                                  <tr
                                    style={{
                                      borderBottom:
                                        "1px solid rgb(212, 212, 212)",
                                    }}
                                  >
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                        textAlign: "center",
                                      }}
                                      colSpan={7}
                                    >
                                      There is no candidates in this list
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td
                          colSpan={5}
                          style={{
                            padding: "1rem",
                            fontSize: "14px",
                            textAlign: "left",
                          }}
                        >
                          <h1
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              marginBottom: 8,
                            }}
                          >
                            Selected Candidates List
                          </h1>
                          <div
                            style={{
                              borderRadius: "0.5rem",
                              overflow: "hidden",
                              border: "1px solid rgb(191, 191, 191)",
                              marginBottom: "1.5rem",
                            }}
                          >
                            <table
                              style={{
                                width: "100%",
                                borderCollapse: "collapse",
                              }}
                            >
                              <thead>
                                <tr
                                  style={{
                                    backgroundColor: "rgb(20, 114, 255)",
                                    color: "white",
                                    textAlign: "left",
                                  }}
                                >
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    SL.No
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Candidate Id.
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Applied Category
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Allotted Against Category
                                  </th>
                                  {data?.advertisement?.value !==
                                    "Advt.No.CA/NewDelhi/Fac.Rect/CAPFIMS/Contract2024/1" && (
                                    <th
                                      style={{
                                        padding: "0.6rem 1rem",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                      }}
                                    >
                                      Alloted Center
                                    </th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {selectedList?.map(
                                  (selected: any, index: number) => (
                                    <tr
                                      key={index}
                                      style={{
                                        borderBottom:
                                          "1px solid rgb(212, 212, 212)",
                                      }}
                                    >
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {index + 1}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.user?.candidateId}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.user?.name}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.appliedCategory
                                          ? selected?.appliedCategory
                                          : selected?.application?.category
                                              ?.value}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.allottedCategory}{" "}
                                        {selected?.convertedEWSSeat &&
                                          `(${selected?.remarks})`}
                                      </td>
                                      {data?.advertisement?.value !==
                                        "Advt.No.CA/NewDelhi/Fac.Rect/CAPFIMS/Contract2024/1" && (
                                        <td
                                          style={{
                                            padding: "0.5rem 1rem",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {selected?.allottedCentre?.value ||
                                            "-"}
                                        </td>
                                      )}
                                    </tr>
                                  ),
                                )}
                                {selectedList?.length === 0 && (
                                  <tr
                                    style={{
                                      borderBottom:
                                        "1px solid rgb(212, 212, 212)",
                                    }}
                                  >
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                        textAlign: "center",
                                      }}
                                      colSpan={7}
                                    >
                                      There is no candidates in this list
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>

                          <h1
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              marginTop: "20px",
                              marginBottom: 8,
                            }}
                          >
                            Over All Merit
                          </h1>
                          <div
                            style={{
                              borderRadius: "0.5rem",
                              overflow: "hidden",
                              border: "1px solid rgb(191, 191, 191)",
                              marginBottom: 20,
                            }}
                          >
                            <table
                              style={{
                                width: "100%",
                                borderCollapse: "collapse",
                              }}
                            >
                              <thead>
                                <tr
                                  style={{
                                    backgroundColor: "rgb(20, 114, 255)",
                                    color: "white",
                                    textAlign: "left",
                                  }}
                                >
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    SL.No
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Rank
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Candidate Id.
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Applied Category
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Remarks
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {awardSheetList?.map(
                                  (selected: any, index: number) => (
                                    <tr
                                      key={index}
                                      style={{
                                        borderBottom:
                                          "1px solid rgb(212, 212, 212)",
                                      }}
                                    >
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {index + 1}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        <Chip>{selected?.merit}</Chip>
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.user?.candidateId}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.user?.name}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.appliedCategory
                                          ? selected?.appliedCategory
                                          : selected?.application?.category
                                              ?.value}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.remarks || "-"}
                                      </td>
                                    </tr>
                                  ),
                                )}
                                {awardSheetList?.length === 0 && (
                                  <tr
                                    style={{
                                      borderBottom:
                                        "1px solid rgb(212, 212, 212)",
                                    }}
                                  >
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                        textAlign: "center",
                                      }}
                                      colSpan={7}
                                    >
                                      There is no candidates in this list
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <h1
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              marginTop: "20px",
                              marginBottom: 8,
                            }}
                          >
                            Not Qualified List
                          </h1>
                          <div
                            style={{
                              borderRadius: "0.5rem",
                              overflow: "hidden",
                              border: "1px solid rgb(191, 191, 191)",
                              marginBottom: 20,
                            }}
                          >
                            <table
                              style={{
                                width: "100%",
                                borderCollapse: "collapse",
                              }}
                            >
                              <thead>
                                <tr
                                  style={{
                                    backgroundColor: "rgb(20, 114, 255)",
                                    color: "white",
                                    textAlign: "left",
                                  }}
                                >
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    SL.No
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Rank
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Candidate Id.
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Applied Category
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.6rem 1rem",
                                      fontWeight: 600,
                                      fontSize: "12px",
                                    }}
                                  >
                                    Remarks
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {notQualifiedFor?.map(
                                  (selected: any, index: number) => (
                                    <tr
                                      key={index}
                                      style={{
                                        borderBottom:
                                          "1px solid rgb(212, 212, 212)",
                                      }}
                                    >
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {index + 1}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        <Chip>{selected?.merit}</Chip>
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.user?.candidateId}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.user?.name}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.appliedCategory
                                          ? selected?.appliedCategory
                                          : selected?.application?.category
                                              ?.value}
                                      </td>
                                      <td
                                        style={{
                                          padding: "0.5rem 1rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {selected?.remarks || "-"}
                                      </td>
                                    </tr>
                                  ),
                                )}
                                {notQualifiedFor?.length === 0 && (
                                  <tr
                                    style={{
                                      borderBottom:
                                        "1px solid rgb(212, 212, 212)",
                                    }}
                                  >
                                    <td
                                      style={{
                                        padding: "0.5rem 1rem",
                                        fontSize: "12px",
                                        textAlign: "center",
                                      }}
                                      colSpan={7}
                                    >
                                      There is no candidates in this list
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={5}
                          style={{
                            padding: "1rem",
                            fontSize: "14px",
                            textAlign: "left",
                          }}
                        >
                          {data?.advertisement?.formTemplate ===
                          "Faculty_APS" ? (
                            <p>
                              Taking into consideration the performance of
                              candidates and their records, and also the opinion
                              of the Technical Experts, the Committee recommends
                              the following candidates for promotion to the
                              grade of Professor of Physiology under the
                              Assessment Promotion Scheme w.e.f. 01.07.2022 who
                              are found “FIT/UNFIT” only as shown below :{" "}
                            </p>
                          ) : (
                            <p>
                              Note:<strong className="text-dark">1.0 </strong>{" "}
                              Grades are awarded as A+, A, B+, B, and C under
                              the grading scheme, with each grade corresponding
                              to an Internal Numerical Value (INV): A+ is
                              assigned 75, A is 65, B+ is 55, B is 45, and C is
                              35. The Average Numerical Value (ANV) is
                              calculated by averaging the INV of the grades
                              awarded by each member. The qualifying criteria
                              based on ANV are as follows:
                            </p>
                          )}

                          <div className="pl-8 mt-2">
                            <ul className="list-disc">
                              <li>UR/EWS: ANV ≥ 50</li>
                              <li>OBC: ANV ≥ 45</li>
                              <li>SC/ST/PWBD: ANV ≥ 40</li>
                            </ul>
                          </div>

                          <p>
                            {" "}
                            <strong> 2.0</strong> Unless expressly mentioned
                            under remarks column of Over All Merit List of the
                            qualified candidates, candidates of reserve category
                            are eligible for unreserved seats.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
                <div
                  className="footer"
                  style={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    textAlign: "center",
                    fontSize: "12px",
                    color: "#000",
                  }}
                >
                  <span className="page-number"></span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {gradeData?.user?.name}
              </ModalHeader>
              <ModalBody>
                <p className="text-xl pb-4">Marks:- {gradeData?.finalGrade}</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PrintAwardSheet;
