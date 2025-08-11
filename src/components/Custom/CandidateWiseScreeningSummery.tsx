"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Button,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Chip,
  User as UserIcon,
  Textarea,
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@heroui/react";

import { Table } from "@heroui/react";

import toast from "react-hot-toast";

import {
  CallfinalSubmissionList,
  CallFindAllDepartmentForCellHead,
  CallGetCommitteeByAdvtAndDepartment,
  CallGetCommitteeMembers,
  CallUpdatefinalSubmission,
  CallVerifyFinalSubmissionOtp,
} from "@/_ServerActions";

import NoPhoto from "@/assets/img/icons/common/noImage.png";
import Passcode from "@/components/Passcode";
import { handleCommonErrors } from "@/Utils/HandleError";
import { useRouter } from "next/navigation";
import GlobalDepartmentFields from "../Global/department/Fields";

type FilterData = {
  advertisementId: string;
  specialityId: string | any;
  committeeId: any;
};

type ScreeningSummaryCardProps = {
  specialtyId: string;
  advertisement_Id: string;
  setView?: any;
  setApplicationId?: any;
  setRescreeningType?: any;
  onOpenRescreen?: any;
  hasRedirection: boolean;
  screeningConfigID?: any;
};
const CandidateWiseScreeningSummery = ({
  specialtyId,
  advertisement_Id,
  setView,
  setApplicationId,
  hasRedirection,
  screeningConfigID,
}: ScreeningSummaryCardProps) => {
  console.log("screeningConfigID", screeningConfigID);
  const router = useRouter();
  const { onClose } = useDisclosure();
  const {
    isOpen: isRemarkOpen,
    onOpen: onRemarkOpen,
    onOpenChange: onRemarkOpenChange,
    onClose: onRemarkClose,
  } = useDisclosure();
  const {
    isOpen: isiframOpen,

    onOpenChange: oniframOpenChange,
  } = useDisclosure();
  const [Data, setData] = useState<any[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [otpFirst, setOtpFirst] = useState<any>(new Array(4).fill(""));
  const [otpSecond, setOtpSecond] = useState<any>(new Array(4).fill(""));
  const [otpThird, setOtpThird] = useState<any>(new Array(4).fill(""));
  const [committeeList, setCommitteeList] = useState<any[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<any>({
    allCommittee: false,
  });

  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState({
    userData: {},
    status: "",
    finalRemark: "",
  });

  const [committeeMembers, setCommitteeMembers] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<any>(0);
  const [totalPage, setTotalPage] = useState(0);
  const [filterData, setFilterData] = useState<any>({
    advertisementId: "",
    specialityId: "",
    committeeId: "",
    searchValue: "",
  });

  const [dtoData, setDtoData] = useState<any>([]);

  useEffect(() => {
    setFilterData({
      ...filterData,
      advertisementId: advertisement_Id,
      specialityId: specialtyId,
    });
  }, [specialtyId]);

  useEffect(() => {
    if (filterData?.advertisementId) {
      GetData(true);
    }
    if (filterData?.specialityId && filterData?.advertisementId) {
      getAllLists(filterData.specialityId);
    }
  }, [page, filterData?.advertisementId, filterData?.specialityId]);

  useEffect(() => {
    if (filterData?.advertisementId && screeningConfigID) {
      // console.log("filterData:::--- ", filterData);
      GetData(true);
    }
  }, [
    filterData?.committeeId,
    filterData?.advertisementId,
    filterData?.specialityId,
    screeningConfigID,
  ]);

  useEffect(() => {
    if (filterData?.advertisementId && filterData?.specialityId) {
      GetCommitteeMembers();
    }
  }, [filterData?.specialityId]);

  const GetData = async (isFilter: boolean): Promise<void> => {
    try {
      setLoading(true);
      const filterOff = `page=1&limit=10&advertisementId=${filterData.advertisementId}&departmentId=${filterData?.specialityId}&screeningConfigId=${screeningConfigID}&committeeId=&search=&finalStatus=`;
      const filterOn = `page=${page}&limit=${10}&advertisementId=${filterData.advertisementId}&departmentId=${filterData?.specialityId}&screeningConfigId=${screeningConfigID}&committeeId=${filterData.committeeId}&search=${filterData.searchValue}`;
      // Using Promise.all to run the API calls concurrently
      const { data } = (await CallfinalSubmissionList(
        isFilter ? filterOn : filterOff,
      )) as any;
      if (data?.message === "Success") {
        setData(data?.data || []);
        setDtoData(data?.finalStatusSummary);
        setTotalCount(data?.totalCounts || 0);
        setIsLocked(data?.isLocked);
        setTotalPage(data?.totalPages || 0);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getAllLists = async (id: any) => {
    setIsLoading((prev: any) => ({
      ...prev,
      allCommittee: true,
    }));
    try {
      const dto = `advertisement=${filterData?.advertisementId}&department=${id}&screeningConfigId=${screeningConfigID}`;
      const { data, error } = (await CallGetCommitteeByAdvtAndDepartment(
        dto,
      )) as any;
      if (data) {
        const dataResponse = data as any;
        setCommitteeList(dataResponse?.data?.committees);
      }
      if (error) {
        console.log("error::: ", error);
        handleCommonErrors(error);
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
    } finally {
      setIsLoading((prev: any) => ({
        ...prev,
        allCommittee: false,
      }));
    }
  };

  const GetDataFilter = async (value: any): Promise<void> => {
    try {
      setLoading(true);
      setStatus(value);
      const filterOn = `page=${page}&limit=${100}&advertisementId=${filterData.advertisementId}&departmentId=${filterData?.specialityId}&committeeId=${filterData.committeeId}&finalStatus=${value}&screeningConfigId=${screeningConfigID}`;
      // Using Promise.all to run the API calls concurrently
      const { data } = (await CallfinalSubmissionList(filterOn)) as any;
      if (data?.message === "Success") {
        setData(data?.data);
        setIsLocked(data?.isLocked);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const GetCommitteeMembers = async (): Promise<void> => {
    try {
      const { data } = (await CallGetCommitteeMembers(
        `advertisementId=${filterData.advertisementId}&departmentId=${filterData?.specialityId}&screeningConfigId=${screeningConfigID}`,
      )) as any;

      if (data?.message === "Success") {
        setCommitteeMembers(data?.data);
      }
    } catch (error) {
      // console.log(error);
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
    // console.log("handleRowColor", status);

    if (status === "Rejected") {
      return "bg-danger-100";
    } else if (status === "Eligible") {
      return "bg-success-100";
    } else if (status === "Provisionally Eligible Subject To Condition") {
      return "bg-warning-100";
    }
    return;
  };

  // Tabel Cell
  const renderCell = useCallback(
    (
      dataRows: any,
      columnKey: React.Key,
      setView: any,
      setApplicationId: any,
    ) => {
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

        case "committeeStatus":
          return (
            <Chip
              variant="flat"
              color={"secondary"}
              className="max-w-[100px] truncate"
            >
              {dataRows?.committeeInfo?.committeeName || "--"}
            </Chip>
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

        case "AdminStatus":
          return (
            <div className="text-[600] truncate text-nowrap text-sm capitalize ">
              {dataRows?.adminFinalStatus ? (
                <Chip
                  variant="flat"
                  color={getChipColor(dataRows?.adminFinalStatus)}
                >
                  {dataRows?.adminFinalStatus}
                </Chip>
              ) : (
                " -- "
              )}
            </div>
          );
        case "AdminRemark":
          return dataRows?.adminFinalRemark
            ? dataRows?.adminFinalRemark
            : " -- ";

        case "documentRemark":
          return (
            <p className="text-wrap truncate text-sm capitalize ">
              {dataRows?.documentRemark}
            </p>
          );
        case "action":
          return (
            <div className="flex gap-2 w-full justify-center">
              <Button
                onPress={() => {
                  if (hasRedirection) {
                    router.push(
                      `/admin/screening/department-screening/candidate-screening/${dataRows?.applicationId?._id}`,
                    );
                  } else {
                    setView(true);
                    setApplicationId(dataRows?.applicationId?._id);
                  }
                }}
                size="sm"
                color="primary"
                variant="bordered"
              >
                View
              </Button>
            </div>
          );
      }
    },
    [specialtyId],
  );

  const finalSubmit = async () => {
    try {
      const dto = {
        advertisementId: filterData?.advertisementId,
        departmentId: filterData?.specialityId,
        otpData: [
          { userId: committeeMembers[0]?.id, otp: otpFirst.join("") },
          { userId: committeeMembers[1]?.id, otp: otpSecond.join("") },
          { userId: committeeMembers[2]?.id, otp: otpThird.join("") },
        ],
      };

      setLoading(true);
      const { data, error } = (await CallVerifyFinalSubmissionOtp(dto)) as any;
      if (data?.status === 200) {
        toast.success(data?.message);
        setOtpFirst(new Array(4).fill(""));
        setOtpSecond(new Array(4).fill(""));
        setOtpThird(new Array(4).fill(""));
        setLoading(false);
        GetData(true);
        onClose();
        oniframOpenChange();
      }
      if (error) {
        toast.error(error);
        setLoading(false);
      }
    } catch (error) {}
  };
  const UpdateSingleApplicantStatus = async (item: any, e: any) => {
    try {
      const dto: any = {
        applicationIds: [item?.applicationId?._id],
        finalStatus: e,
        screeningConfigId: screeningConfigID,
      };
      if (remark?.status !== "Eligible") {
        dto["finalRemark"] = remark?.finalRemark;
      }
      setLoading(true);
      const { data, error } = (await CallUpdatefinalSubmission(dto)) as any;
      if (data?.status === 200) {
        toast.success(data?.message);
        setLoading(false);
        GetData(true);
        onRemarkClose();
      }
      if (error) {
        toast.error(error);
        setLoading(false);
        onRemarkClose();
      }
    } catch (error) {
      onRemarkClose();
    }
  };

  const clearFunc = () => {
    setFilterData({
      ...filterData,
      searchValue: "",
      committeeId: "",
      specialityId: "",
    });
    setPage(1);
    GetData(false);
  };

  return (
    <>
      <div>
        <div className="mainCardBody bg-white rounded-md  p-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-4 items-end mb-4 ">
            {filterData.advertisementId && (
              <div>
                <GlobalDepartmentFields
                  value={filterData?.specialityId}
                  setValue={(id: any) => {
                    setFilterData({
                      ...filterData,
                      specialityId: id,
                      committeeId: "",
                    });
                    setPage(1);
                  }}
                  customClass="mb-0"
                  size={"md"}
                  advId={filterData?.advertisementId}
                  api={CallFindAllDepartmentForCellHead}
                />
              </div>
            )}
            {filterData.advertisementId && filterData.specialityId && (
              <div>
                <Select
                  selectedKeys={[filterData.committeeId]}
                  items={committeeList || []}
                  onSelectionChange={(e: any) => {
                    setFilterData({
                      ...filterData,
                      committeeId: Array.from(e)[0],
                    });
                    setPage(1);
                  }}
                  isLoading={isLoading?.allCommittee}
                  placeholder="committee"
                  label="committee"
                  labelPlacement="outside"
                >
                  {(option: any) => (
                    <SelectItem key={option?.committeeId}>
                      {option?.committeeName}
                    </SelectItem>
                  )}
                </Select>
              </div>
            )}
            <Input
              placeholder="Search"
              value={filterData?.searchValue}
              onChange={(e) => {
                setFilterData((prev: any) => ({
                  ...prev,
                  searchValue: e.target.value,
                }));
              }}
              startContent={
                <span className="material-symbols-rounded text-lg text-gray-500">
                  search
                </span>
              }
            />
            <div className="flex gap-2 justify-end">
              <Button
                color="primary"
                onPress={() => {
                  GetData(true);
                }}
                startContent={
                  <span className="material-symbols-rounded">filter_list</span>
                }
              >
                Filter
              </Button>
              <Button
                color="danger"
                variant="bordered"
                onPress={clearFunc}
                startContent={
                  <span
                    className="material-symbols-rounded text-danger"
                    style={{ color: "#f42f73" }}
                  >
                    close
                  </span>
                }
              >
                Clear
              </Button>
            </div>
          </div>
          {filterData?.specialityId && (
            <div className="overview">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex w-full items-center justify-between col-span-1">
                  <div
                    className={`overview_card flex justify-between gap-2 rounded-lg cursor-pointer p-2 w-full ${status === "" ? "bg-[#d1e8ff]" : "bg-[#f4f7fa]"}`}
                    onClick={() => {
                      GetData(true);
                      GetDataFilter("");
                    }}
                  >
                    <p className="text-md font-semibold">Total Candidate</p>
                    <Chip variant="flat" color="secondary" size="sm">
                      {totalCount ?? 0}
                    </Chip>
                  </div>
                </div>
                <div
                  className={`overview_card flex justify-between gap-2 rounded-lg cursor-pointer p-2 w-full ${status === "Pending" ? "bg-[#d1e8ff]" : "bg-[#f4f7fa]"}`}
                  onClick={() => GetDataFilter("Pending")}
                >
                  <p className="text-md font-semibold text-nowrap">Pending</p>
                  <Chip variant="flat" color="primary" size="md">
                    {dtoData.find((item: any) => item._id === "Pending")
                      ?.count || 0}
                  </Chip>
                </div>
                <div
                  className={`overview_card flex justify-between gap-2 rounded-lg cursor-pointer  p-2 w-full ${status === "Eligible" ? "bg-[#d1e8ff]" : "bg-[#f4f7fa]"}`}
                  onClick={() => GetDataFilter("Eligible")}
                >
                  <p className="text-md font-semibold text-nowrap">Eligible</p>
                  <Chip variant="flat" color="success" size="md">
                    {dtoData.find((item: any) => item._id === "Eligible")
                      ?.count || 0}
                  </Chip>
                </div>

                <div
                  className={`overview_card flex justify-between gap-2 rounded-lg cursor-pointer p-2 w-full ${status === "Rejected" ? "bg-[#d1e8ff]" : "bg-[#f4f7fa]"}`}
                  onClick={() => GetDataFilter("Rejected")}
                >
                  <p className="text-md font-semibold text-nowrap">Rejected</p>
                  <Chip variant="flat" color="danger" size="md">
                    {dtoData.find((item: any) => item._id === "Rejected")
                      ?.count || 0}
                  </Chip>
                </div>
                <div
                  className={`overview_card flex justify-between gap-2 rounded-lg cursor-pointer  p-2 w-full ${status === "Need Clarification" ? "bg-[#d1e8ff]" : "bg-[#f4f7fa]"}`}
                  onClick={() => GetDataFilter("Need Clarification")}
                >
                  <p className="text-md font-semibold text-nowrap">
                    Need Clarification
                  </p>
                  <Chip variant="flat" color="warning" size="md">
                    {dtoData.find(
                      (item: any) => item._id === "Need Clarification",
                    )?.count || 0}
                  </Chip>
                </div>
                <div
                  className={`overview_card flex justify-between gap-2 rounded-lg cursor-pointer  p-2 w-full ${status === "Provisionally Eligible Subject To Condition" ? "bg-[#d1e8ff]" : "bg-[#f4f7fa]"}`}
                  onClick={() =>
                    GetDataFilter("Provisionally Eligible Subject To Condition")
                  }
                >
                  <p className="text-md font-semibold">
                    Provisionally Eligible Subject To Condition
                  </p>
                  <Chip variant="flat" color="default" size="md">
                    {dtoData.find(
                      (item: any) =>
                        item._id ===
                        "Provisionally Eligible Subject To Condition",
                    )?.count || 0}
                  </Chip>
                </div>
              </div>
            </div>
          )}
        </div>
        {Loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {Data?.length > 0 ? (
              <div className="document_verification_wrapper">
                <Table
                  shadow="none"
                  className="py-4"
                  isStriped
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
                    <TableColumn key="userId">Candidate</TableColumn>

                    <TableColumn key="committeeStatus">
                      Committee Status
                    </TableColumn>
                    <TableColumn key="documentScreeningStatus">
                      Document Status
                    </TableColumn>
                    <TableColumn key="objectiveScreeningStatus">
                      Objective Status
                    </TableColumn>
                    <TableColumn key="FinalStatus">
                      Committee Status
                    </TableColumn>
                    <TableColumn key="finalRemark">
                      Committee Remarks
                    </TableColumn>
                  </TableHeader>
                  <TableBody
                    items={Data}
                    emptyContent={"No data available!"}
                    loadingContent={<Spinner />}
                    loadingState={Loading ? "loading" : "idle"}
                  >
                    {(item: any) => (
                      <TableRow
                        key={item._id}
                        className={
                          item?.finalStatus
                            ? handleRowColor(item?.finalStatus)
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
                            {renderCell(
                              item,
                              columnKey,
                              setView,
                              setApplicationId,
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="mt-5 p-5">
                {" "}
                <p className="text-center mt-2 font-[400] text-3xl">
                  No data available!
                </p>{" "}
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        size="sm"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        isOpen={isRemarkOpen}
        onOpenChange={onRemarkOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-sm pb-0 mb-0">
                Please specify the reason to change screening status of
                Candidate.
              </ModalHeader>
              <ModalBody>
                <Textarea
                  radius="sm"
                  placeholder="Enter Reason"
                  className="mt-3"
                  onChange={(e) =>
                    setRemark({ ...remark, finalRemark: e.target.value })
                  }
                />
                <Button
                  className="my-3"
                  radius="sm"
                  variant="flat"
                  color="primary"
                  onClick={() => {
                    if (remark?.finalRemark) {
                      UpdateSingleApplicantStatus(
                        remark?.userData,
                        remark?.status,
                      );
                    } else {
                      toast.error("Please select remark");
                    }
                  }}
                >
                  Submit Reason
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        size="sm"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        isOpen={isiframOpen}
        onOpenChange={() => {
          setOtpFirst(new Array(4).fill(""));
          setOtpSecond(new Array(4).fill(""));
          setOtpThird(new Array(4).fill(""));
          oniframOpenChange();
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-md pb-0 mb-0">
                Please input OTP to submit screening result
              </ModalHeader>
              <ModalBody>
                <div className="">
                  <h5>{committeeMembers[0]?.name}</h5>
                  <Passcode otp={otpFirst} setotp={setOtpFirst} />
                </div>
                <div className="">
                  <h5>{committeeMembers[1]?.name}</h5>
                  <Passcode otp={otpSecond} setotp={setOtpSecond} />
                </div>
                <div className="">
                  <h5>{committeeMembers[2]?.name}</h5>
                  <Passcode otp={otpThird} setotp={setOtpThird} />
                </div>
                <div className="my-4 flex justify-end items-center gap-4">
                  <Button
                    color="primary"
                    size="md"
                    isLoading={Loading}
                    onPress={finalSubmit}
                  >
                    Verify & Submit
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CandidateWiseScreeningSummery;
