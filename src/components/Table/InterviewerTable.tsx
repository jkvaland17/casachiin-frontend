import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";
const DynamicTable = ({
  tableContent,
  headerData,
  bodyData,
  findCandidate,
  tableLoader,
}: any) => {
  const renderCellSheet = useCallback((user: any, columnKey: any) => {
    switch (columnKey) {
      case "No":
        return <p className="text-bold text-sm capitalize">{1}</p>;
      default:
        return user[columnKey as keyof any];
    }
  }, []);
  return (
    <>
      <Table
        isHeaderSticky
        className="max-h-[400px]"
        classNames={{ thead: "top-[-15px]" }}
        topContent={tableContent}
        isStriped
      >
        <TableHeader columns={headerData}>
          {(column: any) => (
            <TableColumn key={column?.key}>{column?.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={tableLoader}
          items={bodyData}
          loadingContent={<Spinner />}
        >
          {(item: any) => (
            <TableRow
              className={
                item?.marks === "Fit"
                  ? "bg-success-100"
                  : item?.marks === "Unfit"
                    ? "bg-danger-100"
                    : ""
              }
              // onClick={() => {
              //   findCandidate(item);
              // }}
              key={item?._id}
            >
              {(columnKey: any) => (
                <TableCell>{renderCellSheet(item, columnKey) || "-"}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DynamicTable;
