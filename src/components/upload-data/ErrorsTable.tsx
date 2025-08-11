import { Pagination } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React, { useState } from "react";

type Props = {
  tableData: any;
};

const columns = [
  { title: "Sr No.", key: "srNo" },
  { title: "Error", key: "message" },
  { title: "Column", key: "field" },
  { title: "Row", key: "row" },
];

function ErrorsTable({ tableData }: Props) {
  console.log("tableData", tableData);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const renderCell = React.useCallback(
    (item: any, columnKey: React.Key, index: number) => {
      const cellValue = item[columnKey as any];
      switch (columnKey) {
        case "srNo":
          return <p className="text-bold text-sm capitalize">{index + 1}</p>;

        default:
          return <p className="text-nowrap">{cellValue}</p>;
      }
    },
    [],
  );
  return (
    <Table
      isStriped
      color="default"
      className="mb-6 "
      aria-label="Example static collection table"
      bottomContent={
        totalPages > 0 ? (
          <div className="flex w-full justify-end">
            <Pagination
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page: any) => setPage(page)}
            />
          </div>
        ) : null
      }
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
        {tableData?.data?.map((item: any, index: number) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey, index)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ErrorsTable;
