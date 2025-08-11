"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Checkbox,
  Spinner,
  Pagination,
  User,
  Select,
  SelectItem,
} from "@heroui/react";
import Image from "next/image";
import UserIcon from "@/assets/img/icons/common/noImage.png";
import toast from "react-hot-toast";

type FilterData = {
  name: string;
  email: string;
  phone: string;
};

type UserSelectionFilterProps = {
  filterData: FilterData;
  setFilterData: (data: FilterData) => void;
  allUser: any[];
  selectedUser: any[];
  setSelectedUser: any;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  validate?: number;
  isLoading: boolean;
  getAllData: (isFilter: boolean, call?: boolean) => Promise<void>;
  clearFilter: () => void;
  deleteFilter: (user: any) => void;
  showRole?: boolean;
  roleList?: any[];
  validateDisabled?: any;
  validateRole?: any;
  validateRoleId?: any;
};

const UserSelectionFilter: React.FC<UserSelectionFilterProps> = ({
  filterData,
  setFilterData,
  allUser,
  selectedUser,
  setSelectedUser,
  page,
  setPage,
  totalPages,
  isLoading,
  getAllData,
  clearFilter,
  roleList,
  validate,
  showRole,
  validateDisabled,
  validateRole,
  validateRoleId,
}) => {
  const handleCheckboxChange = (isChecked: boolean, item: any) => {
    if (isChecked) {
      if (validate && selectedUser.length >= validate) {
        toast.error(`You can select a maximum of ${validate} members`);
        return;
      }
      setSelectedUser([...selectedUser, item]);
    } else {
      setSelectedUser(
        selectedUser.filter((selected: any) => selected._id !== item._id),
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center mb-4">
        <Input
          placeholder="Name"
          value={filterData.name}
          type="search"
          onChange={(e) =>
            setFilterData({ ...filterData, name: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          value={filterData.email}
          type="search"
          onChange={(e) =>
            setFilterData({ ...filterData, email: e.target.value })
          }
        />
        <Input
          placeholder="Phone"
          value={filterData.phone}
          type="search"
          onChange={(e) =>
            setFilterData({ ...filterData, phone: e.target.value })
          }
        />
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setPage(1);
              getAllData(true, false);
            }}
            className="me-2"
          >
            <i className="fas fa-search" />
          </Button>
          <Button
            variant="bordered"
            size="sm"
            color="danger"
            onClick={clearFilter}
            className="me-2"
          >
            <i className="fas fa-times" />
          </Button>
        </div>
      </div>

      <Table classNames={{ base: "max-h-[calc(100vh-350px)]" }}>
        <TableHeader>
          <TableColumn> </TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>{showRole ? "Role" : ""}</TableColumn>
        </TableHeader>
        <TableBody isLoading={isLoading} loadingContent={<Spinner />}>
          {allUser.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Checkbox
                  isDisabled={
                    validate
                      ? selectedUser.length >= validate &&
                        !selectedUser.some(
                          (selected: any) => selected._id === user?._id,
                        )
                      : false
                  }
                  isSelected={selectedUser.some(
                    (selected: any) => selected._id === user?._id,
                  )}
                  onValueChange={(isChecked) =>
                    handleCheckboxChange(isChecked, user)
                  }
                />
              </TableCell>
              <TableCell>
                <User
                  name={user.name}
                  avatarProps={{
                    src: user.profileImage?.presignedUrl || UserIcon.src,
                  }}
                />
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell width={showRole ? 200 : 0}>
                {showRole ? (
                  <Select
                    isDisabled={validateDisabled(user?._id)}
                    items={roleList}
                    placeholder="Role"
                    labelPlacement="outside"
                    errorMessage={"Select role"}
                    isInvalid={validateRole(user?._id)}
                    selectedKeys={[validateRoleId(user?._id)]}
                    onChange={(e: any) => {
                      const findUser = selectedUser?.find(
                        (item: any) => item?._id === user?._id,
                      );
                      if (e.target.value && findUser) {
                        findUser.roleId = e.target.value;
                        setSelectedUser((prevUsers: any) => {
                          return prevUsers.map((item: any) =>
                            item?._id === findUser._id
                              ? { ...item, ...findUser }
                              : item,
                          );
                        });
                      } else if (findUser) {
                        delete findUser.roleId;
                        setSelectedUser((prevUsers: any) => {
                          return prevUsers.map((user: any) =>
                            user._id === findUser._id
                              ? { ...user, ...findUser }
                              : user,
                          );
                        });
                      }
                    }}
                  >
                    {(option: any) => (
                      <SelectItem key={option?._id}>{option?.value}</SelectItem>
                    )}
                  </Select>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 0 && (
        <div className="flex w-full justify-end mt-3">
          <Pagination
            showControls
            color="primary"
            page={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default UserSelectionFilter;
