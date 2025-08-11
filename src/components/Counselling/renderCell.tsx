import React, { useCallback } from "react";
import moment from "moment";
import { Tooltip, Button, Chip } from "@heroui/react";
import Link from "next/link";
import { EyeIcon } from "@/assets/img/svg/EyeIcon";
import { EditIcon } from "@/assets/img/svg/EditIcon";
import { DeleteIcon } from "@/assets/img/svg/DeleteIcon";

// Types
type mapData = {
  page?: any;
  rowsPerPage?: any;
  onOpenChangeEdit?: any;
  getCounsellingData?: any;
  setSelectedCounselling?: any;
  onOpenDel?: any;
  statusColorMap?: any;
  tableData?: any;
  href?: string;
};

export const CreateRenderCell = ({
  page,
  rowsPerPage,
  onOpenChangeEdit,
  getCounsellingData,
  setSelectedCounselling,
  onOpenDel,
  href,
  statusColorMap,
  tableData,
}: mapData) => {
  function getStatus(startDate: string, endDate: string) {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > currentDate) {
      return "Not Yet Started";
    } else if (end < currentDate) {
      return "Completed";
    }
    return "Active";
  }
  return useCallback(
    (user: any, columnKey: any, index: number) => {
      const actualIndex = Math.abs(page - 1) * rowsPerPage + (index + 1);
      switch (columnKey) {
        case "No":
          return <p className="text-bold text-sm capitalize">{actualIndex}</p>;
        case "counsellingName":
          return <p className="text-bold text-sm capitalize">{user?.name}</p>;
        case "sDate":
          return (
            <p className="text-bold text-sm capitalize">
              {moment(user?.startDate).format("DD-MM-YYYY")}
            </p>
          );
        case "eDate":
          return (
            <p className="text-bold text-sm capitalize">
              {moment(user?.endDate).format("DD-MM-YYYY")}
            </p>
          );
        case "instCount":
          return (
            <p className="text-bold text-sm capitalize">
              {user?.instituteCount}
            </p>
          );
        case "candidateCount":
          return (
            <p className="text-bold text-sm capitalize">
              {user.candidateCount}
            </p>
          );
        case "status": {
          const statusColor = getStatus(user.startDate, user.endDate);
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[statusColor]}
              size="sm"
              variant="flat"
            >
              {getStatus(user.startDate, user.endDate)}
            </Chip>
          );
        }
        case "action":
          return (
            <div className="flex justify-center gap-2 items-center">
              <Tooltip content="view">
                <Button
                  as={Link}
                  href={`${href}/${user._id}`}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent"
                  size="sm"
                  isIconOnly
                >
                  <EyeIcon />
                </Button>
              </Tooltip>
              {onOpenChangeEdit && (
                <Tooltip content="Edit">
                  <Button
                    onClick={() => {
                      onOpenChangeEdit();
                      getCounsellingData(user._id);
                      setSelectedCounselling(user._id);
                    }}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-transparent"
                    size="sm"
                    isIconOnly
                  >
                    <EditIcon />
                  </Button>
                </Tooltip>
              )}

              {onOpenDel && user.instituteCount <= 0 && (
                <Tooltip color="danger" content="Delete">
                  <Button
                    onClick={() => {
                      setSelectedCounselling(user._id);
                      onOpenDel();
                    }}
                    size="sm"
                    className="text-lg text-danger cursor-pointer active:opacity-50 bg-transparent"
                    isIconOnly
                  >
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              )}
            </div>
          );
        default:
          return user[columnKey as keyof typeof user];
      }
    },
    [
      page,
      rowsPerPage,
      onOpenChangeEdit,
      getCounsellingData,
      setSelectedCounselling,
      onOpenDel,
      tableData,
    ],
  );
};
