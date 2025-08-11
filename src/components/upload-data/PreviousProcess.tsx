import { CallJobList } from "@/_ServerActions";
import { excelDownload } from "@/Utils/DownloadExcel";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  Alert,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React, { useEffect, useState } from "react";
import TableSkeleton from "../Custom/TableSkeleton";
import moment from "moment";
import { Download } from "lucide-react";

type Props = {
  status?: string;
  jobType?: string;
  entity?: string;
  instituteID?: string;
};

type ChipColor =
  | "success"
  | "danger"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | undefined;

const columns = [
  { title: "Sr No.", key: "srNo" },
  { title: "Job Name", key: "type" },
  { title: "Start Date", key: "created_at" },
  { title: "Complete Date", key: "completedAt" },
  { title: "Type", key: "jobType" },
  { title: "Status", key: "status" },
  { title: "Action", key: "action" },
];

function PreviousProcess({
  status = "",
  jobType = "",
  entity = "",
  instituteID,
}: Props) {
  const [isLoading, setIsLoading] = useState<any>({
    page: false,
    downloadBtn: false,
  });
  const [allData, setAllData] = useState<any>([]);
  const pendingCount = allData?.filter(
    (item: any) => item?.status === "PENDING",
  );
  const fetchData = async () => {
    const query = `status=${status}&jobType=${jobType}&entity=${entity}&intituteID=${instituteID}&limit=2`;
    setIsLoading((prev: any) => ({
      ...prev,
      page: true,
    }));
    const { data, error } = (await CallJobList(query)) as any;
    if (data) {
      setAllData(data?.data);
    }
    if (error) {
      handleCommonErrors(error);
    }
    setIsLoading((prev: any) => ({
      ...prev,
      page: false,
    }));
  };

  const statusColorMap: { [key: string]: ChipColor } = {
    COMPLETED: "success",
    PROCESSING: "primary",
    PENDING: "warning",
    FAILED: "danger",
    Download: "secondary",
    Upload: "primary",
  };

  const renderCell = React.useCallback(
    (item: any, columnKey: React.Key, index: number) => {
      const cellValue = item[columnKey as any];
      switch (columnKey) {
        case "srNo":
          return <p className="text-bold text-sm capitalize">{index + 1}</p>;
        case "type":
          return <p>{cellValue}</p>;
        case "created_at":
        case "completedAt":
          return (
            <p className="text-bold text-sm capitalize">
              {moment(cellValue).format("DD MMM, YYYY hh:mm A")}
            </p>
          );
        case "status":
        case "jobType":
          return (
            <Chip
              color={statusColorMap[cellValue]}
              variant="flat"
              radius="full"
              size="md"
            >
              {cellValue || `-`}
            </Chip>
          );

        case "action":
          return (
            item?.fileUrl &&
            item?.jobType === "Download" && (
              <Button
                onPress={() => {
                  excelDownload(item?.fileUrl, setIsLoading);
                }}
                color="primary"
                startContent={
                  isLoading.downloadBtn ? (
                    <Spinner size="sm" color="white" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )
                }
              >
                Download
              </Button>
            )

            // <Dropdown placement="bottom-end" isDisabled={!item?.fileUrl}>
            //   <DropdownTrigger className="cursor-pointer">
            //     <span className="material-symbols-rounded">more_vert</span>
            //   </DropdownTrigger>
            //   <DropdownMenu aria-label="Static Actions">
            //     {/* <DropdownItem
            //       key="view"
            //       onPress={() => {
            //         setSelectedItem(item);
            //         onOpen();
            //       }}
            //     >
            //       View
            //     </DropdownItem> */}

            //     {item?.fileUrl && item?.jobType === "Download" && (
            //       <DropdownItem
            //         key="view"
            //         onPress={() => {
            //           excelDownload(item?.fileUrl, setIsLoading);
            //         }}
            //       >
            //         Download
            //       </DropdownItem>
            //     )}
            //   </DropdownMenu>
            // </Dropdown>
          );

        default:
          return <p className="text-nowrap">{cellValue}</p>;
      }
    },
    [],
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading.page ? (
        <TableSkeleton columnsCount={columns.length} />
      ) : (
        <>
          <Table
            removeWrapper
            isStriped
            color="default"
            className="mb-6 "
            aria-label="Example static collection table"
          >
            <TableHeader columns={columns}>
              {(column: any) => (
                <TableColumn
                  key={column.key}
                  align={column.key === "actions" ? "center" : "start"}
                  className="text-nowrap"
                >
                  {column.title}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent="No data">
              {allData?.map((item: any, index: number) => (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey, index)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {pendingCount?.length > 0 && (
            <Alert color="warning" variant="faded">
              There are {allData?.length} previous processes. Would you like to
              continue?
            </Alert>
          )}
        </>
      )}
    </div>
  );
}

export default PreviousProcess;
