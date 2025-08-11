import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Input,
  Button,
  Tooltip,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  Card,
  CardBody,
} from "@heroui/react";
import Link from "next/link";
// images and icons
import pdficon from "@/assets/img/icons/common/pdf-icon.png";
import pdfrejected from "@/assets/img/icons/common/rejected-file.png";
import { CallUpdateObjectiveScreening } from "@/_ServerActions";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { handleCommonErrors } from "@/Utils/HandleError";

const ScreeningTable = ({
  subitems,
  updateDocs,
  setTempData,
  GetDataDocument,
  tempData,
  onOpen,
  onOpenChange,
  handleReuploadDocs,
  GetDocumentScreeningConditionsData,
  degreeType,
  isLocked,
  historyTable,
  id,
  ScreenAllData,
  screeningConfigId,
}: any) => {
  const param = useParams() as string | any;

  const output =
    subitems?.key === "fundedProject"
      ? subitems?.fundedProjectDetails
          ?.flat()
          ?.flatMap((item: any) => item.docs)
      : subitems?.key === "pubmedIndexed"
        ? subitems?.pubmed_indexed_publication
            ?.flat()
            ?.flatMap((item: any) => item.docs)
        : [];

  const itemsWithIndex =
    subitems?.docs?.length === 0 && output?.length > 0
      ? output?.map((item: any, index: any) => ({
          ...item,
          index,
        }))
      : subitems?.docs.map((item: any, index: any) => ({
          ...item,
          index,
        }));
  const tableColumnDoc =
    ScreenAllData?.role === "HOD" && ScreenAllData?.data?.isMultiStage
      ? [
          { name: "Sr No.", uid: "no" },
          { name: "Status", uid: "status" },
          { name: "Status 1", uid: "status1" },
          { name: "Status 2", uid: "status2" },
          { name: "Document", uid: "document" },
          { name: "Remark", uid: "remarks" },
          { name: "Remark 1", uid: "remarks1" },
          { name: "Remark 2", uid: "remarks2" },
          { name: "Action", uid: "actions" },
          { name: "History", uid: "historyData" },
        ]
      : [
          { name: "Sr No.", uid: "no" },
          { name: "Status", uid: "status" },
          { name: "Document", uid: "document" },
          { name: "Remark", uid: "remarks" },
          { name: "Action", uid: "actions" },
          { name: "History", uid: "historyData" },
        ];

  const {
    isOpen: isMarksOpen,
    onOpen: onMarksOpen,
    onOpenChange: onMarksChange,
    onClose: onMarksClose,
  } = useDisclosure();
  const [marks, setMarks] = useState<any>(undefined);

  const [remark, setRemark] = useState<any>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMarks(subitems?.scoreByAdmin);
  }, [subitems?.scoreByAdmin]);

  function getChipColor(status: string) {
    if (status === "Invalid") {
      return "danger";
    } else if (status === "Valid") {
      return "success";
    } else if (status === "Pending") {
      return "primary";
    }
    return "warning";
  }
  const renderCellObj = useCallback(
    (dataRow: any, columnKey: any, item: any, index: any, lock: boolean) => {
      switch (columnKey) {
        case "no":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {index + 1}
            </p>
          );
        case "age":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.age}
            </p>
          );
        case "fellowshipFrom":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.fellowshipFrom}
            </p>
          );
        case "screeningType":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.screeningType}
            </p>
          );
        case "publicationName":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.publicationName}
            </p>
          );
        case "publicationNames":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.pubmed_indexed_publication[index]?.Indexed_type}
            </p>
          );
        case "status1":
          return (
            <div className="flex justify-center">
              {dataRow?.statusStage1 ? (
                <Chip
                  variant="flat"
                  color={getChipColor(dataRow?.statusStage1)}
                >
                  {dataRow?.statusStage1}
                </Chip>
              ) : (
                "-"
              )}
            </div>
          );
        case "status2":
          return (
            <div className="flex justify-center">
              {dataRow?.statusStage2 ? (
                <Chip
                  variant="flat"
                  color={getChipColor(dataRow?.statusStage2)}
                >
                  {dataRow?.statusStage2}
                </Chip>
              ) : (
                "-"
              )}
            </div>
          );

        case "remarks1":
          return (
            <Popover placement="top">
              <PopoverTrigger>
                <p className="truncate w-[200px] hover:cursor-pointer">
                  {dataRow?.remarksStage1 || "-"}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <p className="w-[250px] p-2">
                  {dataRow?.remarksStage1 || " -- "}
                </p>
              </PopoverContent>
            </Popover>
          );
        case "remarks2":
          return (
            <Popover placement="top">
              <PopoverTrigger>
                <p className="truncate w-[200px] hover:cursor-pointer">
                  {dataRow?.remarksStage2 || "-"}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <p className="w-[250px] p-2">
                  {dataRow?.remarksStage2 || " -- "}
                </p>
              </PopoverContent>
            </Popover>
          );

        case "numberOfPublications":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.pubmed_indexed_publication[index]?.numberOfPublications}
            </p>
          );
        case "numberOfPublication":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.numberOfPublications}
            </p>
          );
        case "duration":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.courseInResearchMethodologyDuration}
            </p>
          );
        case "presentationLectureLocation":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.presentationLectureLocation}
            </p>
          );
        case "numberOfPresentationLecture":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.numberOfPresentationLecture}
            </p>
          );
        case "googleScholarH_indexnumber":
          return (
            <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
              {item?.googleScholarH_indexnumber}
            </p>
          );

        case "document":
          return (
            <>
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
                  </div>
                </Tooltip>
              ) : (
                <p className="text-medfont-medium truncate text-nowrap text-sm capitalize text-center">
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
                            <Chip
                              variant="flat"
                              color={getChipColor(item?.status)}
                            >
                              {item?.status}
                            </Chip>
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
            </>
          );
        case "status":
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
        case "remarks":
          return (
            <div className="flex justify-center">
              <Popover placement="top">
                <PopoverTrigger>
                  <p className="truncate w-[200px] hover:cursor-pointer">
                    {dataRow?.remark || "-"}
                  </p>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="w-[250px] p-2">{dataRow?.remark || " -- "}</p>
                </PopoverContent>
              </Popover>
            </div>
          );
        case "actions":
          return (
            <>
              {!lock && (
                <div className="flex justify-center gap-3">
                  <Button
                    size="sm"
                    variant="flat"
                    color="success"
                    onClick={() => {
                      updateDocs(
                        {
                          ...dataRow,
                          key: item?.key,
                          screeningType: item?.key,
                          screeningTypeValue: item?.title,
                        },
                        "Valid",
                        "screen",
                      );
                    }}
                  >
                    Valid
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    onClick={() => {
                      setTempData({
                        ...dataRow,
                        key: item?.key,
                        screeningType: item?.key,
                        screeningTypeValue: item?.title,
                        status: "Invalid",
                        type: "screen",
                      });
                      onOpen();
                    }}
                  >
                    Invalid
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="warning"
                    onClick={() => {
                      setTempData({
                        ...dataRow,
                        key: item?.key,
                        screeningType: item?.key,
                        screeningTypeValue: item?.title,
                        status: "Need Clarification",
                        type: "screen",
                        score: item?.score,
                      });
                      onOpen();
                    }}
                  >
                    Need Clarification
                  </Button>
                  {dataRow?.status === "Need Clarification" && (
                    <Button
                      size="sm"
                      color="primary"
                      onClick={() => {
                        handleReuploadDocs(dataRow, item?.key, "screen");
                      }}
                    >
                      {dataRow?.reuploadAllowed
                        ? "Disable Reupload"
                        : "Allow candidate to reupload"}
                    </Button>
                  )}
                </div>
              )}
            </>
          );
        case "historyData":
          return (
            <Button
              onClick={() => historyTable(id, dataRow?._id, item, false)}
              startContent={
                <span className="material-symbols-outlined">history</span>
              }
              radius="sm"
              variant="flat"
              color="secondary"
            >
              View History
            </Button>
          );
        default:
          return columnKey;
      }
    },
    [],
  );

  const handleAdminMarks = async (screeningType: any) => {
    try {
      setLoading(true);
      const formData = {
        applicationId: param?.id,
        screeningType,
        scoreByAdmin: marks,
        remarkForLowerScore: remark ?? "",
        screeningConfigId: screeningConfigId,
      };

      const { data, error } = (await CallUpdateObjectiveScreening(
        formData,
      )) as any;
      if (data?.message === "Updated successfully") {
        GetDataDocument(false);
        GetDocumentScreeningConditionsData();
        onMarksClose();
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

  const handleRowColor = (status: string, key: string) => {
    if (key !== "Hide") {
      if (status === "Invalid") {
        return "bg-danger-100";
      } else if (status === "Valid") {
        return "bg-success-100";
      }
      return "bg-warning-100";
    }
  };

  const validateInput = (input: any) => {
    const number = parseInt(input, 10);
    return input.length === 1 && number >= 0 && number <= 8;
  };

  const handleChange = (e: any) => {
    const value = e;
    if (validateInput(value) || value === "") {
      setMarks(value);
    }
  };

  return (
    <>
      <div className="mb-2">
        {subitems?.header !== "Hide" && (
          <>
            <h2 className="font-medium text-start mb-3">{subitems?.title}</h2>
            <div className="bg-[#9696961a] border border-[#64646433] text-[12px] py-1 px-2 rounded">
              {degreeType === "non-medical" && subitems?.nonLabel
                ? subitems.nonLabel
                : subitems?.label}
            </div>
          </>
        )}
      </div>
      {subitems?.fields?.length > 0 && (
        <div className="my-2">
          <Card>
            <CardBody>
              {subitems?.fields?.map((ele: any, i: number) => (
                <div className="flex" key={i}>
                  <p className="px-2 py-1 border border-gray-200 w-1/2">
                    {ele?.name || ele?.Indexed_type || ele?.fundedFrom}
                  </p>
                  <p className="px-2 py-1 border border-gray-200 w-1/2">
                    {ele?.value ||
                      ele?.numberOfPublications ||
                      ele?.fundedProjectAsPost}
                  </p>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      )}
      {subitems?.fields?.length > 1 && (
        <div className="my-2">
          <Card>
            <CardBody>
              <b className="flex text-black">
                * Please note that this evaluation requires marks to be awarded
                as it involved the screening of multiple documents
              </b>
            </CardBody>
          </Card>
        </div>
      )}
      <Table
        key={subitems._id}
        isStriped
        bottomContent={
          <div className="flex gap-5 justify-between items-center">
            {subitems?.footer !== "Hide" && (
              <>
                {" "}
                <div className="flex justify-center text-nowrap">
                  Automated Score :
                  {subitems?.score || subitems?.score === 0 ? (
                    <Chip
                      variant="flat"
                      className="ms-2"
                      classNames={{
                        content: ["font-medium"],
                      }}
                      color="primary"
                    >
                      {subitems?.score}
                    </Chip>
                  ) : (
                    "-"
                  )}
                </div>
                <div>
                  {ScreenAllData?.role === "HOD" &&
                    ScreenAllData?.data?.isMultiStage && (
                      <div className="flex">
                        <div className=" justify-center text-nowrap">
                          Stage1 Score :
                          {subitems?.scoreByAdminStage1 ||
                          subitems?.scoreByAdminStage1 === 0 ? (
                            <Chip
                              variant="flat"
                              className="ms-2"
                              classNames={{
                                content: ["font-medium"],
                              }}
                              color="primary"
                            >
                              {subitems?.score}
                            </Chip>
                          ) : (
                            "-"
                          )}
                        </div>

                        <div className=" justify-center text-nowrap ms-3">
                          Stage2 Score :
                          {subitems?.scoreByAdminStage2 ||
                          subitems?.scoreByAdminStage2 === 0 ? (
                            <Chip
                              variant="flat"
                              className="ms-2"
                              classNames={{
                                content: ["font-medium"],
                              }}
                              color="primary"
                            >
                              {subitems?.score}
                            </Chip>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                    )}
                </div>
                <div className="marks-container flex gap-3 justify-center items-center">
                  <p className="text-nowrap mb-0">Grant Score :</p>
                  <Input
                    isDisabled={isLocked}
                    required
                    size="sm"
                    type="number"
                    variant="bordered"
                    placeholder="Marks"
                    onKeyDown={PreventWordInput}
                    classNames={{
                      base: "max-w-[80px]",
                    }}
                    value={marks}
                    onValueChange={handleChange}
                  />

                  <Button
                    onClick={() => {
                      subitems?.score > marks
                        ? onMarksOpen()
                        : handleAdminMarks(subitems?.key);
                    }}
                    variant="flat"
                    isLoading={loading}
                    color="primary"
                    size="sm"
                    className="px-4"
                  >
                    Save Granted Score
                  </Button>
                  <Button
                    onClick={() => historyTable(id, "", subitems, true)}
                    startContent={
                      <span className="material-symbols-outlined">history</span>
                    }
                    radius="sm"
                    variant="flat"
                    color="secondary"
                    size="sm"
                  >
                    View History
                  </Button>
                </div>
              </>
            )}
          </div>
        }
        className="mb-5"
      >
        <TableHeader>
          {tableColumnDoc?.map((column: any) => (
            <TableColumn className="text-center" key={column.uid}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody items={itemsWithIndex} emptyContent={"No Record Found."}>
          {(item: any) => (
            <TableRow
              key={item._id}
              className={
                item?.status
                  ? handleRowColor(item?.status, subitems?.footer)
                  : ""
              }
            >
              {(columnKey) => (
                <TableCell>
                  {renderCellObj(
                    item,
                    columnKey,
                    subitems,
                    item.index,
                    isLocked,
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal size="sm" isOpen={isMarksOpen} onOpenChange={onMarksChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="mb- pb-0">Add Remarks</ModalHeader>
              <ModalBody>
                <Textarea
                  radius="sm"
                  placeholder="Please specify reason of providing less marks"
                  className="mt-3"
                  onChange={(e) => setRemark(e.target.value)}
                />
                <Button
                  className="my-3"
                  radius="sm"
                  variant="flat"
                  color="primary"
                  isLoading={loading}
                  onClick={() => handleAdminMarks(subitems?.key)}
                >
                  Submit Remark
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScreeningTable;
