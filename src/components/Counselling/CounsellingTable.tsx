import { Input } from "@heroui/input";
import { Pagination } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React from "react";

type tableProps = {
  InputPlaceHolder?: string;
  setSearchValue?: any;
  setPage: any;
  page: any;
  totalPages: any;
  columns: any;
  tableData: any;
  renderCell: any;
};

function CounsellingTable({
  InputPlaceHolder,
  setSearchValue,
  setPage,
  page,
  totalPages,
  columns,
  tableData,
  renderCell,
}: tableProps) {
  return (
    <Table
      isStriped
      aria-label="Example table with custom cells"
      topContent={
        InputPlaceHolder && (
          <Input
            isRequired
            placeholder={InputPlaceHolder}
            labelPlacement="outside"
            className="max-w-[400px] ms-auto"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            startContent={
              <span className="material-symbols-rounded text-lg text-gray-500">
                search
              </span>
            }
          />
        )
      }
      bottomContent={
        <Pagination
          classNames={{
            wrapper: "mx-auto",
          }}
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={(page) => setPage(page)}
        />
      }
    >
      <TableHeader columns={columns}>
        {(column: any) => (
          <TableColumn
            key={column.uid}
            className={`${column.uid !== "action" ? "text-start" : "text-center"}`}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No data!!!"}>
        {tableData?.map((item: any, index: number) => (
          <TableRow key={item}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey, index)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CounsellingTable;
