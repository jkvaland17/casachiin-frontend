import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useEffect, useState } from "react";

const CustomTable = ({ data }: any) => {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  console.log({ rows, columns });

  useEffect(() => {
    const updateData = () => {
      if (data?.length > 0) {
        const allSeatKeys = Array.from(
          new Set(data.flatMap((item: any) => Object.keys(item.seats || {}))),
        );
        const dynamicColumns = [
          { key: "departmentName", label: "Department Name" },
          ...allSeatKeys.map((key: any) => ({ key, label: key.toUpperCase() })),
        ];
        const transformedRows = data.map((item: any, index: number) => ({
          key: index.toString(),
          departmentName: item.departmentName,
          ...item.seats,
        }));

        setColumns(dynamicColumns);
        setRows(transformedRows);
      }
    };
    updateData();
  }, [data]);
  // Only render the table when rows and columns are available
  if (columns.length === 0 || rows.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Table aria-label="Dynamic Table">
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column?.key}>{column?.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item: any) => (
            <TableRow key={item?.key}>
              {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CustomTable;
