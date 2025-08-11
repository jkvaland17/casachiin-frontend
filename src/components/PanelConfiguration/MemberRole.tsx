"use client";

import { CallGetRoles } from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import { Button, Select, SelectItem, Spinner, User } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React, { useEffect, useState } from "react";
import UserIcon from "@/assets/img/icons/common/noImage.png";

const MemberRole: React.FC<any> = ({
  panelData,
  setPanelData,
  isDeleteButtonShow,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [roleList, setRoleList] = useState<any[]>([]);

  useEffect(() => {
    getAllRole();
  }, []);

  const getAllRole = async (): Promise<any> => {
    try {
      setLoading(true);
      const { data, error } = (await CallGetRoles("committeeRole")) as any;
      if (data?.message) {
        setRoleList(data?.data);
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleRoleChange = (userId: string, roleId: string) => {
    setPanelData((prevData: any) => ({
      ...prevData,
      selectedMember: prevData?.selectedMember.map((user: any) =>
        user?._id === userId ? { ...user, roleId } : user,
      ),
    }));
  };

  const handleDeleteMember = (userId: string) => {
    setPanelData((prevData: any) => ({
      ...prevData,
      selectedMember: prevData?.selectedMember?.filter(
        (user: any) => user?._id !== userId,
      ),
    }));
  };

  return (
    <>
      <Table
        isHeaderSticky
        classNames={{
          th: "bg-[#E8E8E8] text-black",
          td: " text-black first:rounded-l-lg last:rounded-r-lg py-1",
          table: "border-spacing-y-1 border-separate",
          base: "max-h-[calc(100vh-375px)]",
        }}
      >
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No Member Found."}
          isLoading={loading}
          loadingContent={<Spinner />}
        >
          {panelData?.selectedMember?.map((user: any) => (
            <TableRow
              key={user?._id}
              className={user?.roleId ? "bg-blue-600/20" : "bg-[#F4F4F4]"}
            >
              <TableCell>
                <User
                  name={user?.name}
                  avatarProps={{
                    src: user?.profileImage?.presignedUrl || UserIcon?.src,
                    size: "sm",
                  }}
                />
              </TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.phone}</TableCell>
              <TableCell className="flex gap-2 items-start w-fit">
                <div className="min-w-44 w-56">
                  <Select
                    radius="sm"
                    items={roleList}
                    errorMessage="Please select role"
                    isInvalid={!user?.roleId}
                    variant="bordered"
                    placeholder="Role"
                    labelPlacement="outside"
                    selectedKeys={[user?.roleId || ""]}
                    onSelectionChange={(keys: any) =>
                      handleRoleChange(user?._id, [...keys][0])
                    }
                    classNames={{
                      trigger: "bg-white",
                    }}
                  >
                    {(option: any) => (
                      <SelectItem key={option?._id}>{option?.value}</SelectItem>
                    )}
                  </Select>
                </div>
                {isDeleteButtonShow && (
                  <>
                    <Button
                      color="danger"
                      size="sm"
                      radius="full"
                      onPress={() => handleDeleteMember(user?._id)}
                      className="mt-1"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MemberRole;
