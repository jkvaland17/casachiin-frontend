import React, { useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Chip,
} from "@heroui/react";
const DynamicTable = ({ bodyData, findCandidate, tableLoader }: any) => {
  const data = bodyData?.map((ele: any, i: number) => ({
    ...ele,
    serialNo: i + 1,
  }));

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce(
      (value, key) =>
        value?.[key] === undefined ? (
          obj?.candidateStatus === "Absent" ||
          obj?.applicationInterviewStatus === "Not Eligible" ? (
            <>
              <Chip color="danger">
                {obj?.applicationInterviewStatus === "Not Eligible"
                  ? obj?.applicationInterviewStatus
                  : obj?.candidateStatus}
              </Chip>
            </>
          ) : (
            "--"
          )
        ) : (
          value?.[key]
        ),
      obj,
    );
  };

  const renderCellSheet = useCallback((user: any, columnKey: any) => {
    switch (columnKey) {
      default:
        return getNestedValue(user, columnKey);
    }
  }, []);

  const columns = [
    { key: "serialNo", label: "Sr. No" },
    { key: "application.registration", label: "Application No." },
    { key: "candidate.name", label: "Name" },
    {
      key: "stats.workExperienceMarks",
      label: "Work Experience and Skill (50 Marks)",
    },
    {
      key: "stats.personalityAttributeMarks",
      label: "Personality Attribute (50 Marks)",
    },
    { key: "stats.marks", label: "Marks" },
  ];
  return (
    <>
      <Table
        topContent={
          <>
            <h1 className="font-semibold">Work Experience</h1>
          </>
        }
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column?.key}>{column?.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={tableLoader}
          items={data}
          loadingContent={<Spinner />}
        >
          {(item: any) => (
            <TableRow
              className={
                item?.candidateStatus === "Absent" ||
                item?.applicationInterviewStatus === "Not Eligible"
                  ? "bg-danger-100 border-b"
                  : "bg-success-100 border-b"
              }
              key={item?._id}
            >
              {(columnKey: any) => (
                <TableCell>{renderCellSheet(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DynamicTable;
