"use client";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import React, { useCallback, useEffect, useState } from "react";
import Passcode from "../Passcode";

type Evaluators = {
  DR_ATUL_GOEL: number;
  DR_KAMESH: number;
};

type AwardSheetTypes = {
  applicationNo: string;
  category: string;
  name: string;
  average: number;
  evaluators: Evaluators;
};

const columns = [
  { name: "Sr No.", uid: "No" },
  { name: "Application Number", uid: "applicationNo" },
  { name: "Category", uid: "category" },
  { name: "Name", uid: "name" },
  { name: "Alloted Category", uid: "allocatedCategory" },
  { name: "Recommendations(selected/Waitlist)", uid: "recommendation" },
  { name: " DR.ATUL GOEL", uid: "DR_ATUL_GOEL" },
  { name: " DR.Kamlesh", uid: "DR_KAMESH" },
];

const awardSheetData = [
  {
    applicationNo: "1871000022",
    category: "OBC(NCL)",
    name: "DR. VIKAS KUMAR VERMA",
    allocatedCategory: "OBC(NCL)", // Updated
    recommendation: "Highly Recommended", // Updated
    average: 0,
    evaluators: {
      DR_ATUL_GOEL: 0,
      DR_KAMESH: 0,
    },
  },
  {
    applicationNo: "1871000143",
    category: "OBC(NCL)",
    name: "DR. RANU SONI",
    allocatedCategory: "OBC(NCL)", // Updated
    recommendation: "Recommended", // Updated
    average: 0,
    evaluators: {
      DR_ATUL_GOEL: 0,
      DR_KAMESH: 0,
    },
  },
  {
    applicationNo: "1871000214",
    category: "OBC(NCL)",
    name: "DR. AMIT SINGH",
    allocatedCategory: "General", // Updated
    recommendation: "Needs Review", // Updated
    average: 0,
    evaluators: {
      DR_ATUL_GOEL: 0,
      DR_KAMESH: 0,
    },
  },
  {
    applicationNo: "1871000337",
    category: "OBC(NCL)",
    name: "DR. ALKA KUMARI",
    allocatedCategory: "OBC(NCL)", // Updated
    recommendation: "Highly Recommended", // Updated
    average: 0,
    evaluators: {
      DR_ATUL_GOEL: 0,
      DR_KAMESH: 0,
    },
  },
  {
    applicationNo: "1871000494",
    category: "OBC(NCL)",
    name: "DR. BISWAJEET SAHOO",
    allocatedCategory: "OBC(NCL)", // Updated
    recommendation: "Recommended", // Updated
    average: 0,
    evaluators: {
      DR_ATUL_GOEL: 0,
      DR_KAMESH: 0,
    },
  },
  {
    applicationNo: "1871000699",
    category: "OBC(NCL)",
    name: "DR. BHAWNA RAO",
    allocatedCategory: "General", // Updated
    recommendation: "Needs Review", // Updated
    average: 0,
    evaluators: {
      DR_ATUL_GOEL: 0,
      DR_KAMESH: 0,
    },
  },
  {
    applicationNo: "1871000897",
    category: "OBC(NCL)",
    name: "DR. ROJALEEN DAS",
    allocatedCategory: "OBC(NCL)", // Updated
    recommendation: "Highly Recommended", // Updated
    average: 0,
    evaluators: {
      DR_ATUL_GOEL: 0,
      DR_KAMESH: 0,
    },
  },
];

function LockInterview() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [otp, setOtp] = useState<any>(new Array(6).fill(""));
  const [page, setPage] = useState(1);

  const {
    isOpen: isOpenOtp,
    onOpen: onOpenOtp,
    onOpenChange: onOpenChangeOtp,
  } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const renderCell = useCallback((user: any, columnKey: any, index: number) => {
    switch (columnKey) {
      case "No":
        return <p className="text-bold text-sm capitalize">{index + 1}</p>;
      case "applicationNo":
        return (
          <p className="text-bold text-sm capitalize">{user?.applicationNo}</p>
        );
      case "category":
        return <p className="text-bold text-sm capitalize">{user?.category}</p>;
      case "name":
        return (
          <p className="text-bold text-sm capitalize min-w-[100px]">
            {user?.name}
          </p>
        );

      case "allocatedCategory":
        return (
          <p className="text-bold text-sm capitalize min-w-[100px]">
            {user?.allocatedCategory}
          </p>
        );
      case "recommendation":
        return (
          <p className="text-bold text-sm capitalize min-w-[100px]">
            {user?.recommendation}
          </p>
        );

      case "DR_ATUL_GOEL":
        return (
          <div className="flex justify-center">
            <Chip radius="sm">{user?.evaluators?.DR_ATUL_GOEL}</Chip>
          </div>
        );
      case "DR_KAMESH":
        return (
          <div className="flex justify-center">
            <Chip radius="sm">{user?.evaluators?.DR_KAMESH}</Chip>
          </div>
        );
      default:
        return user[columnKey as keyof AwardSheetTypes];
    }
  }, []);

  return (
    <>
      <Modal
        classNames={{
          base: "z-[9999]",
        }}
        size="md"
        isOpen={isOpenOtp}
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        onOpenChange={() => {
          setOtp(new Array(6).fill(""));
          onOpenChangeOtp();
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Please Enter OTP send to your registered mobile number
              </ModalHeader>
              <ModalBody>
                <Passcode otp={otp} setotp={setOtp} />
              </ModalBody>
              <ModalFooter>
                <Button
                  //   isLoading={Loading}
                  className="px-6"
                  color="primary"
                  variant="solid"
                  //   onClick={submitData}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="full"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b">
                <div className="flex justify-between">
                  <div className="flex gap-5 items-center">
                    <h2 className="font-semibold text-2xl">Submit Sheet</h2>
                    <Chip variant="flat" color="danger" radius="sm" size="sm">
                      Save & Lock Final Sheet
                    </Chip>
                  </div>
                  <div>
                    <Button
                      className="me-4"
                      size="sm"
                      startContent={
                        <span className="material-symbols-rounded text-lg">
                          refresh
                        </span>
                      }
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div>
                  <p className="uppercase">
                    <span className="font-semibold capitalize">Department</span>{" "}
                    : Laboratory Medicine
                  </p>
                </div>
                <div className="table_wrapper mt-5">
                  <Table
                    removeWrapper
                    isStriped
                    bottomContent={
                      <>
                        <Pagination
                          classNames={{
                            wrapper: "mx-auto",
                          }}
                          isCompact
                          showControls
                          showShadow
                          color="primary"
                          page={page}
                          total={1}
                          onChange={(page) => setPage(page)}
                        />
                        <div className="text-end pb-3">
                          <Button
                            variant="shadow"
                            color="primary"
                            // className="px-12"
                            onClick={() => onOpenOtp()}
                          >
                            Lock
                          </Button>
                        </div>
                      </>
                    }
                  >
                    <TableHeader columns={columns}>
                      {(column) => (
                        <TableColumn
                          key={column.uid}
                          className={`${column.uid != "action" ? "text-start" : "text-center"}`}
                        >
                          {column.name}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody emptyContent={"No data!!!"}>
                      {awardSheetData?.map((item: any, index: number) => (
                        <TableRow key={item}>
                          {(columnKey) => (
                            <TableCell>
                              {renderCell(item, columnKey, index)}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default LockInterview;
