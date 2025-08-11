"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Pagination,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
} from "@heroui/react";
import Link from "next/link";
import moment from "moment";
import toast from "react-hot-toast";
import { CallGetAllCommittee } from "@/_ServerActions";
import UserIcon from "@/assets/img/icons/common/noImage.png";
import { handleCommonErrors } from "@/Utils/HandleError";

type DepartmentData = {
  value: string;
};

type Member = {
  user: {
    profileImage?: {
      presignedUrl?: string;
    };
  };
};

type InterviewPanel = {
  _id: string;
  committeeName: string;
  members: Member[];
  created_at: string;
  groupType: string;
  committeeType: string;
  department?: DepartmentData;
};

type ListPanelProps = {
  isClone: boolean;
  setSelectedPanelData: React.Dispatch<React.SetStateAction<InterviewPanel>>;
  group?: string[];
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListPanel: React.FC<ListPanelProps> = ({
  isClone,
  setSelectedPanelData,
  group = [],
  isEdit,
  setIsEdit,
}) => {
  const [allList, setAllList] = useState<InterviewPanel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    getAllList();
  }, [page]);

  useEffect(() => {
    if (!isEdit && group?.length > 0) {
      const selectedList = allList?.find((ele) => ele?._id === group[0]);
      if (selectedList) {
        setSelectedPanelData(selectedList);
        setIsEdit(true);
      }
    }
  }, [group, allList, isEdit]);

  const getAllList = async () => {
    try {
      setIsLoading(true);
      const { data, error } = (await CallGetAllCommittee(
        `page=${page}&limit=${rowsPerPage}`,
      )) as any;

      console.log("data::: ", data);
      if (error) {
        handleCommonErrors(error);
        return;
      }

      setAllList(data?.data || []);
      setTotalCount(data?.totalRecords || 0);
    } catch (error: any) {
      toast.error(error?.message || "Error fetching committees.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between flex-col md:flex-row w-full gap-4 mb-5">
        {!isClone ? (
          <p className="text-xl font-medium">Interview Panel/Committee List</p>
        ) : (
          <div />
        )}
        <Button
          radius="sm"
          href="/admin/panel-configuration/add"
          as={Link}
          type="button"
          color="primary"
        >
          <i className="fa-solid fa-plus" />
          Create Panel/Committee
        </Button>
      </div>

      <Table
        radius="sm"
        classNames={{
          th: "bg-[#E8E8E8] text-black",
          td: "bg-[#F4F4F4] text-black first:rounded-l-lg last:rounded-r-lg",
          table: "border-spacing-y-1 border-separate",
        }}
        bottomContent={
          totalCount > 0 && (
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                showShadow
                radius="sm"
                color="primary"
                page={page}
                total={Math.ceil(totalCount / rowsPerPage)}
                onChange={setPage}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn>Sr No.</TableColumn>
          <TableColumn>Panel/Committee Name</TableColumn>
          {/* <TableColumn>Members</TableColumn> */}
          <TableColumn>Type</TableColumn>
          <TableColumn>Created Date/Time</TableColumn>
          <TableColumn className="text-center">Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No data found." isLoading={isLoading}>
          {allList.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{item?.committeeName}</TableCell>
              {/* <TableCell>
                {item?.members?.length > 0 ? (
                  <AvatarGroup
                    isBordered
                    max={3}
                    total={item?.members?.length - 3}
                  >
                    {item.members.map((ele, i) => (
                      <Avatar
                        size="sm"
                        key={i}
                        src={
                          ele?.user?.profileImage?.presignedUrl || UserIcon?.src
                        }
                      />
                    ))}
                  </AvatarGroup>
                ) : (
                  "-"
                )}
              </TableCell> */}
              <TableCell className="capitalize">
                {item?.committeeType ?? "-"}
                {/* <Chip color="secondary" size="lg" radius="sm">
                </Chip> */}
              </TableCell>
              <TableCell>
                {moment(item?.created_at).format("DD/MM/YYYY hh:mm A")}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-x-1">
                  {isClone ? (
                    <Button
                      onPress={() => {
                        setSelectedPanelData(item);
                        setIsEdit(false);
                      }}
                      radius="full"
                      color="primary"
                      variant="flat"
                    >
                      Use Panel
                    </Button>
                  ) : (
                    <>
                      <Tooltip content="View">
                        <Button
                          radius="sm"
                          color="primary"
                          as={Link}
                          href={`/admin/panel-configuration/view/${item?._id}`}
                          className="min-w-fit"
                        >
                          <span className="material-symbols-outlined text-[21px]">
                            table_eye
                          </span>
                        </Button>
                      </Tooltip>
                      <Button
                        radius="full"
                        color="primary"
                        variant="bordered"
                        as={Link}
                        href={`/admin/panel-configuration/edit/${item?._id}`}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ListPanel;
