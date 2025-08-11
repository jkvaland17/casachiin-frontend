import { ModalBody, ModalHeader } from "@heroui/modal";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback } from "react";

const ConcurrenceModal = ({
  loader,
  CalculateInterviewResult,
  department,
  filterdAwardedList,
  panelMembers,
  specialityId,
  advertisementId,
  positionId,
  slugData,
  positionName,
}: any) => {
  const { slug } = useParams() as any;
  const data = filterdAwardedList?.map((ele: any, i: number) => ({
    ...ele,
    serialNo: i + 1,
  }));
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((value, key) => value?.[key], obj);
  };

  const renderCellSheet = useCallback((user: any, columnKey: any) => {
    const dto = user?.applicationInterview?.stats?.find(
      (ele: any) => ele?.admin === columnKey,
    );
    switch (columnKey) {
      case dto?.admin:
        return (
          <>
            <p>{dto?.marks}</p>
          </>
        );
      case "marks":
        return (
          <>
            <p>{user?.marks}</p>
          </>
        );
      default:
        return getNestedValue(user, columnKey);
    }
  }, []);
  const dto = panelMembers
    ?.filter((item: any) => item?.role?.value !== "Observer")
    ?.map((ele: any) => ({
      key: ele?.user?._id,
      label: ele?.user?.name,
    }));

  const columns = [
    { key: "serialNo", label: "Sr. No" },
    { key: "application.registration", label: "Application No." },
    { key: "user.name", label: "Name" },
    ...dto,
    { key: "marks", label: "Total Marks" },
    { key: "average_marks", label: "Average Marks" },
  ];
  return (
    <>
      <div>
        <ModalHeader className="flex flex-col gap-1 border-b">
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <h2 className="font-semibold text-2xl">Overall Merit List</h2>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase">
                <span className="font-semibold capitalize">Department</span> :{" "}
                {department}
              </p>
              <p className="uppercase">
                <span className="font-semibold capitalize">Post</span> :{" "}
                {positionName}
              </p>
            </div>
            <div>
              {filterdAwardedList?.length === 0 &&
                (decodeURIComponent(slug[0]) === "Chairperson" ||
                  decodeURIComponent(slug[0]) === "Member Secretary") && (
                  <>
                    <Button
                      onClick={CalculateInterviewResult}
                      isLoading={loader.awardSheet}
                      color="primary"
                      variant="shadow"
                      className="me-2"
                    >
                      Generate Selection List
                    </Button>
                  </>
                )}
              {filterdAwardedList?.length > 0 &&
                (decodeURIComponent(slug[0]) === "Chairperson" ||
                  decodeURIComponent(slug[0]) === "Member Secretary") && (
                  <Button
                    as={Link}
                    href={`/admin/interview/all-interview/print/${specialityId}/${advertisementId}/${positionId}/${slugData}/${slug[1]}`}
                    color="primary"
                  >
                    View Final Award Sheet List
                  </Button>
                )}
            </div>
          </div>
          {data?.length > 0 && (
            <div>
              <Table isStriped>
                <TableHeader columns={columns}>
                  {(column: any) => (
                    <TableColumn key={column?.key}>{column?.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody
                  // isLoading={tableLoader}
                  items={data}
                  loadingContent={<Spinner />}
                >
                  {(item: any) => (
                    <TableRow key={item?._id}>
                      {(columnKey: any) => (
                        <TableCell>
                          {renderCellSheet(item, columnKey) || "-"}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </ModalBody>
      </div>
    </>
  );
};

export default ConcurrenceModal;
