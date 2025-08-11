"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
} from "@heroui/react";
import React, { useState } from "react";

interface DynamicTableProps {
  data: any[];
  rowsPerPage?: number;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  rowsPerPage = 10,
}) => {
  const headers = Object.keys(
    data.reduce((acc: any, obj: any) => {
      return { ...acc, ...obj };
    }, {}),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-3">
      <Table
        topContent={
          <div className="flex items-center">
            <h3 className="text-xl">
              Total:- <strong>{data?.length}</strong>
            </h3>
          </div>
        }
        bottomContent={
          <div className="flex items-center justify-center">
            <Pagination
              total={totalPages}
              initialPage={currentPage}
              onChange={handlePageChange}
              aria-label="Table Pagination"
            />
          </div>
        }
        aria-label="Example table with dynamic content"
      >
        <TableHeader>
          {headers?.map((column) => (
            <TableColumn key={column}>{column}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {currentData?.map((item: any, index: number) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header}>{item[header] ?? "-"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;
