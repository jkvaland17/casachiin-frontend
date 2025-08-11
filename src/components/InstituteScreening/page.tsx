"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import React, { useCallback, useEffect, useState } from "react";

// images and icons
import pdficon from "@/assets/img/icons/common/pdf-icon.png";
import pdfrejected from "@/assets/img/icons/common/rejected-file.png";

import {
  CallGetDocumentsByInstituteAllotmentId,
  CallGetScreeningTrailByAppId,
  CallUpdateAllInstituteDocsStatus,
  CallUpdateInstituteDocStatus,
  CallUpdateInstituteScreeningStatus,
} from "@/_ServerActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleCommonErrors } from "@/Utils/HandleError";
import NoData from "@/assets/img/no-data.jpg";
import moment from "moment";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface InstituteScreeningProps {
  instituteAllotmentId: string;
}
const InstituteScreening: React.FC<InstituteScreeningProps> = ({
  instituteAllotmentId,
}) => {
  const { data: session } = useSession() as any;
  const adminType = session?.user?.data?.position as any;
  const roles = session?.user?.roles as any;

  const router = useRouter() as any;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { isOpen: isTableOpen, onOpenChange: onTableChange } = useDisclosure();
  const {
    isOpen: isHistoryTableOpen,
    onOpen: onHistoryTableOpen,
    onOpenChange: onHistoryTableChange,
  } = useDisclosure();
  const {
    isOpen: isConfOpen,
    onOpen: onConfOpen,
    onClose: onConfClose,
    onOpenChange: onConfChange,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [docsLoading, setDocsLoading] = useState(false);
  const [finalStatusLoading, setFinalStatusLoading] = useState<any>(null);
  const [finalRemark, setFinalRemark] = useState<any>(null);
  const [DocData, setDocData] = useState<any>(null);
  const [applicationStatus, setApplicationStatus] = useState<string>("");

  const [userData, setUserData] = useState<any>(null);
  const [documentsWithRemarks, setDocumentsWithRemarks] = useState<any>([]);
  const [tempData, setTempData] = useState<any>(null);
  const [remark, setRemark] = useState<any>({
    remarkData: "",
    remarkOtherData: "",
  });

  const [userApplicationId, setUserApplicationId] = useState<any>("");
  const [statusShow, setStatusShow] = useState<any>(null);
  const [advertisementLink, setAdvertisementLink] = useState<string>("");
  const [summarySlipLink, setSummarySlipLink] = useState<string>("");
  const [historyTableData, setHistoryTableData] = useState<any>(null);
  const [loginRole, setLoginRole] = useState<any>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      let finalRole: any = sessionStorage.getItem("InstituteRole");
      if (finalRole) {
        setLoginRole(finalRole);
      }
    }
  }, []);
  useEffect(() => {
    if (instituteAllotmentId) {
      GetData();
    }
  }, [instituteAllotmentId]);

  useEffect(() => {
    if (isConfOpen === false) {
      setStatusShow(null);
    }
  }, [isConfOpen]);

  useEffect(() => {
    if (isOpen === false) {
      setRemark({
        remarkData: "",
        remarkOtherData: "",
      });
      setTempData(null);
    }
  }, [isOpen]);

  const historyTable = async (
    advertisementId: string,
    id: string,
    item: any,
    isShow: boolean,
  ) => {
    try {
      setLoading(true);
      const dto = `applicationId=${advertisementId}&docId=${id}&ScreeningType=${isShow ? item?.key : ""}`;

      const { data, error } = (await CallGetScreeningTrailByAppId(dto)) as any;
      if (data?.status === 200) {
        setHistoryTableData({
          isShow,
          title: item?.title || item?.name,
          data: data?.data?.map((ele: any, i: number) => ({
            no: i + 1,
            ...ele,
          })),
        });
        onHistoryTableOpen();
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (DocData?.length > 0) {
      handleAllDocRemarks();
    }
  }, [DocData]);

  const GetData = async () => {
    try {
      setDocsLoading(true);
      const { data } = (await CallGetDocumentsByInstituteAllotmentId(
        instituteAllotmentId,
      )) as any;
      if (data?.message === "Candidate documents retrieved successfully") {
        setAdvertisementLink(data?.data?.advertisementId?.advertisementLink);
        setSummarySlipLink(data?.data?.summarySlipUrl);
        setApplicationStatus(data?.data?.status);
        setUserApplicationId(data?.data?.applicationId);
        const updatedData = {
          ...data.data,
          screeningStep: data.data.documents.map((step: any) => ({
            ...step,
            document: step.document.map((doc: any, index: number) => ({
              ...doc,
              id: index + 1,
            })),
          })),
        };
        setDocData(data.data.documents);
        setUserData(updatedData?.userId);
      }
      setDocsLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      setDocsLoading(false);
    }
  };
  const handleTableColumn = (
    adminType: any,
    roles: any,
    columnType: "single" | "multi",
  ): any[] => {
    if (!adminType?.value) return [];

    const selectedColumns: Record<string, any[]> = {
      CellAdmin: [
        { name: "Sr No.", uid: "no" },
        { name: "Level 1", uid: "status1" },
        { name: "Level 2", uid: "status2" },
        { name: "Supervisior", uid: "status" },
        { name: "Document", uid: "document" },
        { name: "Level 1 Remarks", uid: "remarks1" },
        { name: "Level 2 Remarks", uid: "remarks2" },
        { name: "Supervisior Remark", uid: "remarks" },
      ],
      Level1: [
        { name: "Sr No.", uid: "no" },
        { name: "Status", uid: "status" },
        { name: "Document", uid: "document" },
        { name: "Remark", uid: "remarks" },
        { name: "Action", uid: "actions" },
      ],
      Level2: [
        { name: "Sr No.", uid: "no" },
        { name: "Level 1", uid: "status1" },
        { name: "Status", uid: "status" },
        { name: "Document", uid: "document" },
        { name: "Level 1 Remarks", uid: "remarks1" },
        { name: "Remark", uid: "remarks" },
        { name: "Action", uid: "actions" },
      ],
      Supervisior: [
        { name: "Sr No.", uid: "no" },
        { name: "Level 1", uid: "status1" },
        { name: "Level 2", uid: "status2" },
        { name: "Status", uid: "status" },
        { name: "Document", uid: "document" },
        { name: "Level 1 Remarks", uid: "remarks1" },
        { name: "Level 2 Remarks", uid: "remarks2" },
        { name: "Remark", uid: "remarks" },
        { name: "Action", uid: "actions" },
      ],
    };

    if (adminType?.value === "CellAdmin" || adminType?.value === "Head") {
      return selectedColumns.CellAdmin;
    }

    if (adminType?.value === "SubAdmin") {
      if (loginRole === "InstituteAdmin") {
        return selectedColumns.CellAdmin;
      }

      for (const role of ["Level 1", "Level 2", "Supervisior"]) {
        if (roles.includes(role)) {
          if (columnType === "multi") {
            if (role.replace(" ", "") === "Level1") {
              selectedColumns[role.replace(" ", "")]?.splice(2, 0, {
                name: "Title",
                uid: "title",
              });
            }
            if (role.replace(" ", "") === "Level2") {
              selectedColumns[role.replace(" ", "")]?.splice(3, 0, {
                name: "Title",
                uid: "title",
              });
            }
            if (role.replace(" ", "") === "Supervisior") {
              selectedColumns[role.replace(" ", "")]?.splice(4, 0, {
                name: "Title",
                uid: "title",
              });
            }
          }
          return selectedColumns[role.replace(" ", "")];
        }
      }
    }

    return [];
  };

  const renderCellDoc = useCallback(
    (
      dataRow: any,
      columnKey: keyof any,
      step: any,
      index: any,
      applicationId: string,
    ) => {
      switch (columnKey) {
        case "no":
          return (
            <p className="text-mefont-medium truncate text-nowrap text-sm capitalize text-center">
              {index + 1}
            </p>
          );
        case "title":
          return (
            <p className="text-mefont-medium truncate text-nowrap text-sm">
              {dataRow?.title}
            </p>
          );
        case "document":
          return (
            <div className="flex items-center justify-center gap-3">
              {dataRow?.presignedUrl ? (
                <Tooltip content="View Document">
                  <div className="cursor-pointer text-lg text-default-400 active:opacity-50 flex justify-center flex-col items-center">
                    <div className="w-[40px] h-[40px] mb-3">
                      <Link href={dataRow?.presignedUrl} target="_blank">
                        <Image
                          src={pdficon.src}
                          className="h-full w-full object-contain"
                          alt="No-Pdf"
                        />
                      </Link>
                    </div>

                    <p className="text-sm max-w-[100px] text-wrap text-center">
                      {dataRow?.reuploadedDocs &&
                      dataRow?.reuploadedDocs?.length > 0
                        ? "New"
                        : ""}
                    </p>
                  </div>
                </Tooltip>
              ) : (
                <p className="text-mefont-medium truncate text-nowrap text-sm capitalize text-center">
                  No Docs
                </p>
              )}
              {dataRow?.reuploadedDocs && dataRow?.reuploadedDocs?.length > 0
                ? dataRow?.reuploadedDocs?.map((item: any, idx: number) => (
                    <Tooltip
                      key={idx}
                      content={
                        <div>
                          <p>
                            Status :{" "}
                            {item?.status ? (
                              <Chip
                                variant="flat"
                                color={getChipColor(item?.status)}
                              >
                                {item?.status}
                              </Chip>
                            ) : (
                              ""
                            )}
                          </p>
                          <p>Remark : {item?.remarks}</p>
                        </div>
                      }
                    >
                      <div className="cursor-pointer text-lg text-default-400 active:opacity-50 flex justify-center flex-col items-center">
                        <div className="w-[40px] h-[40px] mb-3">
                          <Link href={item?.url ?? ""} target="_blank">
                            <Image
                              src={pdfrejected?.src}
                              className="h-full w-full object-contain"
                              alt="No-Pdf"
                            />
                          </Link>
                        </div>
                        <p className="text-sm max-w-[100px] text-wrap text-center">
                          Old
                        </p>
                      </div>
                    </Tooltip>
                  ))
                : ""}
            </div>
          );
        case "status":
          return dataRow?.status ? (
            <Chip variant="flat" color={getChipColor(dataRow?.status)}>
              {dataRow?.status}
            </Chip>
          ) : (
            "-"
          );
        case "remarks":
          return <p className="text-center p-2">{dataRow?.remark || " -- "}</p>;

        case "HODstatus":
          return (
            <div className="flex justify-center">
              {dataRow?.status ? (
                <Chip variant="flat" color={getChipColor(dataRow?.status)}>
                  {dataRow?.status}
                </Chip>
              ) : (
                "-"
              )}
            </div>
          );

        case "HODremarks":
          return (
            <Popover placement="top">
              <PopoverTrigger>
                <p className="truncate w-[200px] hover:cursor-pointer">
                  {dataRow?.remarks || "-"}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <p className="w-[250px] p-2">{dataRow?.remarks || " -- "}</p>
              </PopoverContent>
            </Popover>
          );

        case "remarks1":
          return (
            <Popover placement="top">
              <PopoverTrigger>
                <p className="truncate w-[200px] hover:cursor-pointer">
                  {dataRow?.level1Remark || "-"}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <p className="w-[250px] p-2">
                  {dataRow?.level1Remark || " -- "}
                </p>
              </PopoverContent>
            </Popover>
          );
        case "remarks2":
          return (
            <Popover placement="top">
              <PopoverTrigger>
                <p className="truncate w-[200px] hover:cursor-pointer">
                  {dataRow?.level2Remark || "-"}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <p className="w-[250px] p-2">
                  {dataRow?.level2Remark || " -- "}
                </p>
              </PopoverContent>
            </Popover>
          );
        case "status1":
          return (
            <div className="flex justify-center">
              {dataRow?.level1Status ? (
                <Chip
                  variant="flat"
                  color={getChipColor(dataRow?.level1Status)}
                >
                  {dataRow?.level1Status}
                </Chip>
              ) : (
                "-"
              )}
            </div>
          );
        case "status2":
          return (
            <div className="flex justify-center">
              {dataRow?.level2Status ? (
                <Chip
                  variant="flat"
                  color={getChipColor(dataRow?.level2Status)}
                >
                  {dataRow?.level2Status}
                </Chip>
              ) : (
                "-"
              )}
            </div>
          );

        case "actions":
          return (
            <div className="flex justify-center gap-3">
              <Button
                size="sm"
                variant="flat"
                color="success"
                onPress={() => {
                  setTempData({
                    ...dataRow,
                    stepId: step?._id,
                    status: "Valid",
                    type: "docs",
                  });
                  onOpen();
                }}
              >
                Valid
              </Button>
              <Button
                size="sm"
                variant="flat"
                color="warning"
                onPress={() => {
                  setTempData({
                    ...dataRow,
                    stepId: step?._id,
                    status: "Partial Valid",
                    type: "docs",
                  });
                  onOpen();
                }}
              >
                Partial Valid
              </Button>
              <Button
                size="sm"
                variant="flat"
                color="danger"
                onPress={() => {
                  setTempData({
                    ...dataRow,
                    stepId: step?._id,
                    status: "Invalid",
                    type: "docs",
                  });
                  onOpen();
                }}
              >
                Invalid
              </Button>
            </div>
          );

        case "history":
          return (
            <div className="flex justify-center gap-3">
              <Button
                onPress={() =>
                  historyTable(instituteAllotmentId, dataRow?._id, step, false)
                }
                startContent={
                  <span className="material-symbols-outlined">history</span>
                }
                radius="sm"
                variant="flat"
                color="secondary"
              >
                View History
              </Button>
            </div>
          );
      }
    },
    [],
  );
  function getChipColor(status: string) {
    if (status === "Not eligible" || status === "Invalid") {
      return "danger";
    } else if (
      status === "Eligible" ||
      status === "Completed" ||
      status === "Valid"
    ) {
      return "success";
    } else if (status === "Pending") {
      return "primary";
    }
    return "warning";
  }

  const updateDocs = async (
    item: any,
    status: string,
    applicationId: string,
  ) => {
    try {
      setLoading(true);
      const dto = {
        applicationId,
        docId: item?._id,
        status,
        remark: remark?.remarkData,
        stepId: item?.stepId,
      };
      const { data, error } = (await CallUpdateInstituteDocStatus(dto)) as any;
      if (data?.data) {
        GetData();
        toast.success(data?.message);
        if (tempData) {
          onOpenChange();
        }
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      setLoading(false);
    }
  };

  const handleFinalStatus = async (status: string) => {
    try {
      setFinalStatusLoading(status);
      const formData = {
        applicationId: userApplicationId,
        status,
        remark: finalRemark,
      };
      let data;
      if (["Valid", "Invalid", "Partial Valid"].includes(status)) {
        data = (await CallUpdateAllInstituteDocsStatus(formData)) as any;
      } else {
        data = (await CallUpdateInstituteScreeningStatus(formData)) as any;
      }
      console.log(data);

      if (data?.data) {
        setFinalRemark("");
        onConfClose();
        GetData();
        toast.success(data?.data?.message);
      }
      if (data?.error) {
        toast.error(data?.error);
      }

      setFinalStatusLoading(null);
    } catch (error) {
      console.log("error::: ", error);
      setFinalStatusLoading(null);
    }
  };

  const handleAllDocRemarks = () => {
    const newDocumentsWithRemarks = DocData.flatMap((item: any) =>
      item.document
        .filter((doc: any) => doc.remark)
        .map((doc: any) => ({
          _id: doc._id,
          title: item.name,
          status: doc.status || "",
          remark: doc.remark || "",
        })),
    );
    setDocumentsWithRemarks(newDocumentsWithRemarks);
  };
  const handleRowColor = (status: string) => {
    if (status === "Invalid") {
      return "bg-danger-100";
    } else if (status === "Valid") {
      return "bg-success-100";
    } else if (status === "Partial Valid") {
      return "bg-warning-100";
    }
    return "";
  };

  const NewTableColumn = (item: { fieldName: string }) => {
    if (
      item.fieldName === "educationalQualification" ||
      item.fieldName === "workExperience"
    ) {
      return handleTableColumn(adminType, roles, "multi")?.map((data: any) => (
        <TableColumn className={`bg-war text-center`} key={data.uid}>
          {data.name}
        </TableColumn>
      ));
    }
    return handleTableColumn(adminType, roles, "single")?.map((data: any) => (
      <TableColumn className={`bg-war text-center`} key={data.uid}>
        {data.name}
      </TableColumn>
    ));
  };

  const statusColorMap = (status: string) => {
    if (status === "Eligible") {
      return "success";
    }
    if (status === "Provisionally Eligible Subject To Condition") {
      return "warning";
    }
    if (status === "Not eligible") {
      return "danger";
    }
    if (status === "Need Clarification") {
      return "warning";
    }
    if (status === "Pending") {
      return "primary";
    }
  };
  return (
    <div className="p-5 bg-white rounded-lg document_verification_wrapper relative">
      {(loading || docsLoading) && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#ffffff2a] z-50">
          <div className="h-[90vh] flex items-center justify-center ml-52">
            <Spinner />
          </div>
        </div>
      )}
      <div className="flex justify-between gap-3 items-center">
        <h2 className="text-start text-xl font-medium border-b">
          Candidate Document
        </h2>
        <Button onPress={() => router.back()}>
          <span className="material-symbols-outlined">arrow_back</span> Go Back
        </Button>
      </div>
      {/* user details */}
      {DocData?.length ? (
        <>
          <div className="flex items-center justify-between gap-3 mt-3">
            <div className=" ">
              <div className="font-semibold">
                Name :- <span className="font-normal">{userData?.name}</span>
              </div>
              <div className="font-semibold">
                Application Status :-{" "}
                <span className="font-normal">
                  {applicationStatus ? (
                    <Chip
                      size="md"
                      variant="flat"
                      className="text-bold text-md capitalize"
                      color={statusColorMap(applicationStatus)}
                    >
                      {applicationStatus}
                    </Chip>
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
            {["Level 1", "Level 2", "Supervisior"].includes(loginRole) && (
              <div className="btn-container flex justify-end items-center gap-x-3">
                <Button
                  isLoading={finalStatusLoading === "Valid"}
                  isDisabled={finalStatusLoading}
                  className="text-white"
                  onPress={() => {
                    onConfOpen();
                    setStatusShow("Valid");
                  }}
                  color="success"
                >
                  Valid all documents
                </Button>
                <Button
                  isLoading={finalStatusLoading === "Partial Valid"}
                  isDisabled={finalStatusLoading}
                  onPress={() => {
                    onConfOpen();
                    setStatusShow("Partial Valid");
                  }}
                  color="warning"
                >
                  Partial Valid all documents
                </Button>
                <Button
                  isLoading={finalStatusLoading === "Invalid"}
                  isDisabled={finalStatusLoading}
                  onPress={() => {
                    onConfOpen();
                    setStatusShow("Invalid");
                  }}
                  color="danger"
                >
                  Invalid all documents
                </Button>
              </div>
            )}
          </div>
          <div className="table_wrapper mt-5 mb-9">
            <div>
              {DocData?.length === 0 && (
                <Card>
                  <CardBody>
                    <div className="flex items-center justify-center">
                      <Image src={NoData.src} alt="No-Data" className="h-56" />
                    </div>
                  </CardBody>
                </Card>
              )}
              {DocData?.map((items: any, index: number) => (
                <div key={index}>
                  {items?.document?.length &&
                  items?.document[0]?.presignedUrl ? (
                    <>
                      <div className="mb-4">
                        <div>
                          <div className="flex gap-5 items-center">
                            <h2 className="font-medium text-start">
                              {items?.name}
                            </h2>
                          </div>
                          <div className="bg-[#9696961a] mt-4 border border-[#64646433] text-[12px] py-1 px-2 rounded font-medium">
                            Rules:-{" "}
                            <a
                              href={advertisementLink}
                              target="_blank"
                              className="text-blue-500 underline"
                            >
                              Kindly see the advertisement for details.
                            </a>
                          </div>
                        </div>

                        <div className="bg-[#9696961a] mt-4 border border-[#64646433] text-[12px] py-1 px-2 rounded font-medium">
                          Candidate Details:-{" "}
                          <Link
                            href={summarySlipLink}
                            target="_blank"
                            className="text-blue-500 underline cursor-pointer"
                          >
                            Candidate Profile Summary
                          </Link>
                        </div>
                      </div>
                      <div className="mb-4">
                        <Table
                          aria-label="Example table with client side pagination"
                          isStriped
                          shadow="none"
                          className="mb-5 border rounded-lg"
                        >
                          <TableHeader>{NewTableColumn(items)}</TableHeader>
                          <TableBody
                            items={
                              items?.document?.length
                                ? items?.document?.map(
                                    (item: any, index: any) => ({
                                      ...item,
                                      index,
                                    }),
                                  )
                                : []
                            }
                            emptyContent={"No Record Found."}
                          >
                            {(item: any) => (
                              <TableRow
                                key={item?.index}
                                className={
                                  item?.status
                                    ? handleRowColor(item?.status)
                                    : ""
                                }
                              >
                                {(columnKey) => (
                                  <TableCell className="text-center">
                                    {renderCellDoc(
                                      item,
                                      columnKey,
                                      items,
                                      item?.index,
                                      userApplicationId,
                                    )}
                                  </TableCell>
                                )}
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>

            {DocData?.length > 0 && (
              <>
                {!(
                  adminType?.value === "CellAdmin" ||
                  adminType?.value === "Head"
                ) ? (
                  <Table
                    aria-label="Example table with client side pagination"
                    isStriped
                    topContent={
                      <h2 className="font-medium">
                        {`List where certificate is invalid or need clarification for
                  Candidate's Document`}
                      </h2>
                    }
                    className="my-8"
                  >
                    <TableHeader>
                      <TableColumn className=" w-[200px]">Name</TableColumn>
                      <TableColumn>Status</TableColumn>
                      <TableColumn className="w-full">Remark</TableColumn>
                    </TableHeader>
                    <TableBody
                      items={documentsWithRemarks}
                      emptyContent={"No Record Found."}
                    >
                      {(item: any) => (
                        <TableRow key={item?._id}>
                          <TableCell>
                            <Popover placement="top">
                              <PopoverTrigger>
                                <p className="truncate w-[200px] hover:cursor-pointer">
                                  {item?.title || "-"}
                                </p>
                              </PopoverTrigger>
                              <PopoverContent>
                                <p className="w-[250px] p-2">
                                  {item?.title || " -- "}
                                </p>
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            {item?.status ? (
                              <Chip
                                variant="flat"
                                color={getChipColor(item?.status)}
                              >
                                {item?.status}
                              </Chip>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>
                            <Popover placement="top">
                              <PopoverTrigger>
                                <p className="truncate w-full hover:cursor-pointer">
                                  {item?.remark || "-"}
                                </p>
                              </PopoverTrigger>
                              <PopoverContent>
                                <p className="w-[250px] p-2">
                                  {item?.remark || " -- "}
                                </p>
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  ""
                )}
                {adminType?.value === "SubAdmin" &&
                  loginRole === "Supervisior" && (
                    <>
                      <h1 className="text-2xl text-end">
                        Final Verification Status
                      </h1>
                      <div className="btn-container flex justify-end items-center gap-x-3 mt-5 mb-14 ">
                        <Button
                          isLoading={finalStatusLoading === "Eligible"}
                          isDisabled={finalStatusLoading}
                          onPress={() => {
                            onConfOpen();
                            setStatusShow("Eligible");
                          }}
                          color="success"
                        >
                          Eligible
                        </Button>

                        <Button
                          isLoading={
                            finalStatusLoading ===
                            "Provisionally Eligible Subject To Condition"
                          }
                          isDisabled={finalStatusLoading}
                          onPress={() => {
                            onConfOpen();
                            setStatusShow(
                              "Provisionally Eligible Subject To Condition",
                            );
                          }}
                          color="primary"
                        >
                          Provisionally Eligible Subject To Condition
                        </Button>
                        <Button
                          isLoading={finalStatusLoading === "Not eligible"}
                          isDisabled={finalStatusLoading}
                          onPress={() => {
                            onConfOpen();
                            setStatusShow("Not eligible");
                          }}
                          color="danger"
                        >
                          Not eligible
                        </Button>
                        {/* {roles?.includes("Supervisior") && (
                      <Button
                        isLoading={finalStatusLoading}
                        onPress={() => {
                          onConfOpen();
                          setStatusShow("Need Clarification");
                        }}
                        color="warning"
                      >
                        Need Clarification
                      </Button>
                    )} */}
                      </div>
                    </>
                  )}
              </>
            )}
            <div className="flex items-center justify-end mb-4">
              <Button onPress={() => router.back()}>
                <span className="material-symbols-outlined">arrow_back</span> Go
                Back
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center flex-col justify-center mt-5">
          <Image src={NoData.src} alt="No-Data" className="h-56" />
          <h3 className="font-semibold">Document Not Found!</h3>
        </div>
      )}
      <Modal
        isDismissable={false}
        hideCloseButton
        isKeyboardDismissDisabled={false}
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 mb-0 pb-0 font-medium text-md">
                {tempData?.status === "Valid"
                  ? "Document Remark (Optional)"
                  : `Please specify reason to mark document ${tempData?.status}`}
              </ModalHeader>
              <ModalBody>
                <Textarea
                  radius="sm"
                  placeholder="Enter Reason"
                  className="mt-3"
                  required={tempData?.status === "Valid" ? false : true}
                  value={remark?.remaremarkData}
                  onChange={(e) =>
                    setRemark({ ...remark, remarkData: e.target.value })
                  }
                />
                <div className="flex items-center gap-4 justify-end">
                  <Button
                    className="my-3"
                    radius="sm"
                    variant="flat"
                    color="primary"
                    isDisabled={loading}
                    onPress={() => {
                      setRemark({ ...remark, remarkData: "" });
                      onOpenChange();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="my-3"
                    radius="sm"
                    color="primary"
                    isLoading={loading}
                    onPress={() => {
                      if (
                        tempData?.status === "Valid" ? true : remark?.remarkData
                      ) {
                        updateDocs(
                          tempData,
                          tempData?.status,
                          userApplicationId,
                        );
                      } else {
                        toast.error("Please enter reason");
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal size="3xl" isOpen={isTableOpen} onOpenChange={onTableChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="">Documents Remarks</ModalHeader>
              <ModalBody className="">
                <Table
                  aria-label="Example table with client side pagination"
                  isStriped
                  topContent={<h2 className="font-medium">All Remarks</h2>}
                  className="my-8"
                >
                  <TableHeader>
                    <TableColumn className=" w-[200px]">Name</TableColumn>
                    <TableColumn className="w-full">Remark</TableColumn>
                  </TableHeader>
                  <TableBody
                    items={documentsWithRemarks}
                    emptyContent={"No Record Found."}
                  >
                    {(item: any) => (
                      <TableRow key={item?._id}>
                        <TableCell>
                          <Popover placement="top">
                            <PopoverTrigger>
                              <p className="truncate w-[200px] hover:cursor-pointer">
                                {item?.title || "-"}
                              </p>
                            </PopoverTrigger>
                            <PopoverContent>
                              <p className="w-[250px] p-2">
                                {item?.title || " -- "}
                              </p>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                        <TableCell>
                          <Popover placement="top">
                            <PopoverTrigger>
                              <p className="truncate w-full hover:cursor-pointer">
                                {item?.remark || "-"}
                              </p>
                            </PopoverTrigger>
                            <PopoverContent>
                              <p className="w-[250px] p-2">
                                {item?.remark || " -- "}
                              </p>
                            </PopoverContent>
                          </Popover>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* <Modal
        isDismissable={false}
        hideCloseButton
        isKeyboardDismissDisabled={false}
        size="lg"
        isOpen={isConfOpen}
        onOpenChange={onConfChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mb-0 pb-0">{statusShow}</ModalHeader>
              <ModalBody className="mb-3">
                <p className="text-sm mb-2">
                  Are your sure to mark this candidate {statusShow} according to
                  Age / Educational / Experience Criteria?
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    onConfClose();

                    handleFinalStatus(statusShow);
                    onConfClose();
                  }}
                >
                  <Textarea
                    radius="sm"
                    value={finalRemark}
                    required={statusShow === "Eligible" ? false : true}
                    placeholder="Enter Reason"
                    className="mb-3"
                    onChange={(e) => setFinalRemark(e.target.value)}
                  />

                  <div className="flex justify-end  gap-3 items-center">
                    <Button
                      isDisabled={finalStatusLoading}
                      color="danger"
                      variant="flat"
                      onPress={() => {
                        onClose();
                        setFinalRemark("");
                      }}
                    >
                      No
                    </Button>
                    <Button
                      isLoading={finalStatusLoading}
                      variant="flat"
                      color="primary"
                      type="submit"
                    >
                      Yes
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}

      <Modal
        isDismissable={false}
        hideCloseButton
        isKeyboardDismissDisabled={false}
        size="lg"
        isOpen={isConfOpen}
        onOpenChange={onConfChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mb-0 pb-0">
                {statusShow === "Valid"
                  ? "Valid All Documents"
                  : statusShow === "Invalid"
                    ? "Invalid All Documents"
                    : statusShow}
              </ModalHeader>
              <ModalBody className="mb-3">
                <p className="text-sm mb-2">
                  Are your sure to mark this{" "}
                  {["Valid", "Invalid", "Partial Valid"].includes(statusShow)
                    ? "candidate's all document as"
                    : "candidate"}{" "}
                  {statusShow} according to Age / Educational / Experience
                  Criteria?
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleFinalStatus(statusShow);
                  }}
                >
                  <Textarea
                    radius="sm"
                    value={finalRemark}
                    required={
                      ["Eligible", "Valid"].includes(statusShow) ? false : true
                    }
                    placeholder="Enter Reason"
                    className="mb-3"
                    onChange={(e) => setFinalRemark(e.target.value)}
                  />

                  <div className="flex justify-end  gap-3 items-center">
                    <Button
                      isDisabled={finalStatusLoading}
                      color="danger"
                      variant="flat"
                      onPress={() => {
                        onClose();
                        setFinalRemark("");
                      }}
                    >
                      No
                    </Button>
                    <Button
                      isLoading={finalStatusLoading}
                      isDisabled={finalStatusLoading}
                      variant="flat"
                      color="primary"
                      type="submit"
                    >
                      Yes
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        size="5xl"
        isOpen={isHistoryTableOpen}
        onOpenChange={onHistoryTableChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="">
                Document History:- {historyTableData?.title}
              </ModalHeader>
              <ModalBody className="pb-5">
                <Table isStriped className="">
                  <TableHeader>
                    <TableColumn>Sr. No.</TableColumn>
                    <TableColumn>Action</TableColumn>
                    <TableColumn>
                      {historyTableData?.isShow ? "" : "Status"}
                    </TableColumn>
                    <TableColumn>
                      {historyTableData?.isShow ? "" : "Remark"}
                    </TableColumn>
                    <TableColumn>
                      {historyTableData?.isShow ? "Marks" : ""}
                    </TableColumn>
                    <TableColumn>Changed By</TableColumn>
                    <TableColumn>Date</TableColumn>
                  </TableHeader>
                  <TableBody
                    items={historyTableData?.data}
                    emptyContent={"No History Found."}
                  >
                    {(item: any) => (
                      <TableRow key={item?._id}>
                        <TableCell>{item?.no}</TableCell>
                        <TableCell>{item?.action || "-"}</TableCell>
                        <TableCell>
                          {historyTableData?.isShow ? (
                            ""
                          ) : (
                            <>
                              {item?.fieldValue === "Valid" && (
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="success"
                                >
                                  Valid
                                </Button>
                              )}
                              {item?.fieldValue === "Invalid" && (
                                <Button size="sm" variant="flat" color="danger">
                                  Invalid
                                </Button>
                              )}
                              {item?.fieldValue === "Need Clarification" && (
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="warning"
                                >
                                  Need Clarification
                                </Button>
                              )}
                              {item?.fieldValue === "Allowed" && (
                                <Button
                                  size="sm"
                                  variant="flat"
                                  color="success"
                                >
                                  Allowed
                                </Button>
                              )}
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          {historyTableData?.isShow ? "" : item?.remark || "-"}
                        </TableCell>
                        <TableCell>
                          {historyTableData?.isShow
                            ? item?.fieldValue || "-"
                            : ""}
                        </TableCell>
                        <TableCell>{item?.changedBy?.name || "-"}</TableCell>
                        <TableCell>
                          <p>
                            {moment(item?.created_at).format("DD/MM/YYYY") ===
                            "Invalid date"
                              ? " - "
                              : moment(item?.created_at).format("DD/MM/YYYY")}
                          </p>
                          <p>
                            {moment(item?.created_at).format("hh:mm A") ===
                            "Invalid date"
                              ? " - "
                              : moment(item?.created_at).format("hh:mm A")}
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default InstituteScreening;
