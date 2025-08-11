"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
  User as UserIcon,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import DataService from "@/services/requestApi";
import { Table } from "@heroui/react";
import toast from "react-hot-toast";
import { CallfinalSubmissionList } from "@/_ServerActions";
import { useSession } from "next-auth/react";
import NoPhoto from "@/assets/img/icons/common/noImage.png";
import Link from "next/link";
import Passcode from "../Passcode";

const CandidateList: React.FC<any> = ({ advertisementId, user }) => {
  console.log("user::: ", user);
  const {
    isOpen: isOpenOtp,
    onOpen: onOpenOtp,
    onOpenChange: onOpenChangeOtp,
  } = useDisclosure();

  const { data: session } = useSession() as any;
  const [Data, setData] = useState<any[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [otp, setOtp] = useState<any>(new Array(4).fill(""));

  useEffect(() => {
    if (advertisementId) {
      GetData();
    }
  }, [page, advertisementId]);

  const GetData = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = (await CallfinalSubmissionList(
        `page=${page}&limit=${10}&advertisementId=${advertisementId}`,
      )) as any;
      console.log("data::----: ", data);
      if (data?.message === "Success") {
        setData(data?.data);
        setTotalPage(Math.ceil(data?.totalCounts / 10));
      }

      setLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      setLoading(false);
    }
  };

  function getChipColor(status: string) {
    if (status === "Not eligible" || status === "Rejected") {
      return "danger";
    } else if (
      status === "Eligible" ||
      status === "Completed" ||
      status === "Eligible"
    ) {
      return "success";
    } else if (
      status === "Pending" ||
      status === "Provisionally Eligible Subject To Condition"
    ) {
      return "primary";
    }
    return "warning";
  }

  const handleRowColor = (status: string) => {
    if (status === "Rejected") {
      return "bg-danger-100";
    } else if (status === "Eligible") {
      return "bg-success-100";
    } else if (status === "Provisionally Eligible Subject To Condition") {
      return "bg-warning-100";
    }
    return "bg-blue-100";

    return;
  };

  // Tabel Cell
  const renderCell = useCallback(
    (dataRows: any, columnKey: React.Key, sr: number) => {
      switch (columnKey) {
        case "userId":
          return (
            <UserIcon
              avatarProps={{
                radius: "lg",
                src: dataRows?.applicationId?.photo ?? NoPhoto.src,
              }}
              description={dataRows?.userId?.candidateId}
              name={dataRows?.userId?.name}
            >
              {dataRows?.userId?.candidateId}
            </UserIcon>
          );

        case "documentScreeningStatus":
          return (
            <div className="text-[600] truncate text-nowrap text-sm capitalize ">
              {dataRows?.documentScreeningStatus ? (
                <Chip
                  variant="flat"
                  color={getChipColor(dataRows?.documentScreeningStatus)}
                >
                  {dataRows?.documentScreeningStatus}
                </Chip>
              ) : (
                " -- "
              )}
            </div>
          );
        case "docRemark":
          return "docRemark";
        case "objectiveScreeningStatus":
          return (
            <div className="text-[600] truncate text-nowrap text-sm capitalize ">
              {dataRows?.objectiveScreeningStatus ? (
                <Chip
                  variant="flat"
                  color={getChipColor(dataRows?.objectiveScreeningStatus)}
                >
                  {dataRows?.objectiveScreeningStatus}
                </Chip>
              ) : (
                " -- "
              )}
            </div>
          );
        case "objRemark":
          return "objRemark";
        case "FinalStatus":
          return (
            <div className="text-[600] truncate text-nowrap text-sm capitalize ">
              {dataRows?.finalStatus ? (
                <Chip
                  variant="flat"
                  color={getChipColor(dataRows?.finalStatus)}
                >
                  {dataRows?.finalStatus}
                </Chip>
              ) : (
                " -- "
              )}
            </div>
          );
        case "finalRemark":
          return dataRows?.finalRemark ? dataRows?.finalRemark : " -- ";
        case "department":
          return dataRows?.departmentData?.value
            ? dataRows?.departmentData?.value
            : " -- ";
        case "sr":
          return sr + 1 || " -- ";
        case "documentRemark":
          return (
            <p className="text-wrap truncate text-sm capitalize ">
              {dataRows?.documentRemark}
            </p>
          );
        case "action":
          return (
            <div className="">
              <Button
                as={Link}
                size="sm"
                color="primary"
                href={`/admin/scrutiny/candidate-screening/${dataRows?.applicationId?._id}`}
              >
                View
              </Button>
            </div>
          );
      }
    },
    [],
  );

  const downloadScreeningReport = async () => {
    try {
      if (user === "cellHead") {
        onOpenOtp();
        return;
      }
      if (user === "cellAdmin") {
        const dto = `advertisementId=${advertisementId}`;
        console.log("dto::: ", dto);
        setLoading(true);
        const { data } = await DataService.getExcelFinalSubmissionList(
          dto,
          session?.user?.token,
        );
        console.log("data::: ", data);
        if (data) {
          const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "TotalScreeningCandidate");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          setLoading(false);

          toast.success("Excel downloaded successfully");
        }
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setLoading(false);
    }
  };

  const submitData = async () => {
    console.log("otp::: ", otp);
    setOtp(new Array(4).fill(""));
    // try {
    //   setloading(true);
    //   const dto = `advId=${filterData?.advertisement_noId}&departmentId=${filterData?.specialityId ? filterData?.specialityId : ""}` as any;
    //   const { data } = (await CallCreateCommittee(dto)) as any;
    //   console.log("data:::--- ", data);
    //   if (data?.message === "Success") {
    //     setOtp(null);
    //     setOpenOtp(false);
    //     GetData();
    //   }
    //   setloading(false);
    // } catch (error) {
    //   // console.log("error::: ", error);
    //   setloading(false);
    // }
  };

  return (
    <>
      <Modal
        classNames={{
          base: "z-[9999]",
        }}
        size="xs"
        isOpen={isOpenOtp}
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        onOpenChange={() => {
          setOtp(new Array(4).fill(""));
          onOpenChangeOtp();
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Please Enter OTP send to your registered mobile number
              </ModalHeader>
              <ModalBody>
                <Passcode otp={otp} setotp={setOtp} />
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={Loading}
                  className="px-6"
                  color="primary"
                  variant="solid"
                  onClick={submitData}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="container mt-4 document_verification_wrapper">
        <Table
          className="py-4"
          isStriped
          topContent={
            <div className="flex justify-end">
              <Button
                isLoading={Loading}
                color="primary"
                onClick={downloadScreeningReport}
                startContent={
                  user === "cellHead" && <i className="fa-solid fa-lock"></i>
                }
              >
                {user === "cellHead"
                  ? "Lock Candidate"
                  : "Download Screening Candidate Report"}
              </Button>
            </div>
          }
          bottomContent={
            totalPage > 0 ? (
              <div className="flex w-full justify-end">
                <Pagination
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={totalPage}
                  onChange={(page: any) => setPage(page)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn key="sr">Sr No.</TableColumn>
            <TableColumn key="userId">Candidate</TableColumn>
            <TableColumn key="department">Department</TableColumn>
            <TableColumn key="documentScreeningStatus">
              Document Status
            </TableColumn>
            <TableColumn key="objectiveScreeningStatus">
              Objective Status
            </TableColumn>
            <TableColumn key="FinalStatus">Final Status</TableColumn>
            <TableColumn key="finalRemark">Final Remarks</TableColumn>
            {/* <TableColumn key="documentRemark">Document Remark</TableColumn> */}
            <TableColumn key="action">Action</TableColumn>
          </TableHeader>
          <TableBody
            items={Data.map((item: any, index: number) => ({ item, index }))}
            emptyContent={
              <p className="text-center mt-2 font-[400] text-3xl text-black">
                No data available!
              </p>
            }
            loadingContent={<Spinner />}
            loadingState={Loading ? "loading" : "idle"}
          >
            {(row: { item: any; index: number }) => (
              <TableRow
                key={row.index}
                className={
                  row?.item?.finalStatus
                    ? handleRowColor(row.item?.finalStatus)
                    : ""
                }
              >
                {(columnKey: any) => (
                  <TableCell
                    style={
                      columnKey === "documentRemark" ||
                      columnKey === "objectiveRemark" ||
                      columnKey === "finalRemark"
                        ? {
                            wordBreak: "break-word",
                          }
                        : {
                            wordBreak: "initial",
                          }
                    }
                  >
                    {renderCell(row.item, columnKey, row.index)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CandidateList;
