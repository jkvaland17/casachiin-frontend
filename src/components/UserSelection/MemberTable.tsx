"use client";
import React, { useEffect, useState } from "react";
import UserIcon from "@/assets/img/icons/common/noImage.png";
import {
  Button,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  CallAllInterview,
  CallRemoveGroupMember,
  CallSendInterviewCredentialMail,
  CallUpdateMemberAttendance,
} from "@/_ServerActions";

type MemberTableProps = {
  members: any[];
  onDelete: (item: any) => void;
  isLoading: boolean;
  onOpenUser: any;
  showRole?: boolean;
  roleList?: any[];
  validateDisabled?: any;
  validateRole?: any;
  validateRoleId?: any;
  selectedUser?: any;
  setSelectedUser?: any;
  showDepartment?: any;
  mailButtonShow?: any;
  advID?: string;
  type?: string;
  getAllData?: any;
};

const MemberTable: React.FC<MemberTableProps> = ({
  members,
  onDelete,
  isLoading,
  onOpenUser,
  roleList,
  showRole,
  validateDisabled,
  validateRole,
  validateRoleId,
  selectedUser,
  setSelectedUser,
  showDepartment,
  mailButtonShow,
  advID,
  type,
  getAllData,
}) => {
  const { slug } = useParams();
  // State to manage delete confirmation modal
  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [Loader, setLoader] = useState<any>(false);
  const [LoaderAttendance, setLoaderAttendance] = useState<any>(null);
  const [allInterview, setAllInterview] = useState<any>([]);
  const [interview, setInterview] = useState<any>(null);
  const [tempData, setTempData] = useState<any>(null);
  useEffect(() => {
    if (mailButtonShow && advID) {
      getAllList();
    }
  }, [mailButtonShow, advID]);

  useEffect(() => {
    if (isDelete === false) {
      setTempData(null);
    }
  }, [isDelete]);

  // Open delete confirmation modal
  const onOpenDelete = (data: any) => {
    if (type === "interview") {
      setTempData(data);
      setDeleteId(data.memberId);
      setIsDelete(true);
      return;
    }
    setDeleteId(data._id);
    setIsDelete(true);
  };

  // Close delete confirmation modal
  const onCloseDelete = () => {
    setIsDelete(false);
    setDeleteId("");
  };

  const sendMail = async (userIds: any[]) => {
    try {
      if (!interview) {
        toast.error("Interview not selected");
        return;
      }
      setLoader(true);
      const data = {
        interviewId: interview,
        userIds: userIds,
      };
      const response = (await CallSendInterviewCredentialMail(data)) as any;
      if (response?.data) {
        toast.success(response?.data?.message);
      }
      if (response?.error) {
        handleCommonErrors(response?.error);
      }
      setLoader(false);
    } catch (error) {
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setLoader(false);
    }
  };

  const getAllList = async (): Promise<void> => {
    try {
      setLoader(true);
      const { data, error } = (await CallAllInterview(
        `advertisement=${advID}`,
      )) as any;
      if (data) {
        const dataResponse = data as any;
        setAllInterview(dataResponse?.data);
        if (dataResponse?.data?.length > 0) {
          setInterview(dataResponse?.data[0]?._id);
        }
      }
      if (error) {
        console.log(error);
        toast.error(error?.message);
      }
      setLoader(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setLoader(false);
    }
  };

  const deleteMember = async (): Promise<void> => {
    try {
      if (type === "interview" && tempData?.memberId) {
        setLoader(true);
        const dto = {
          groupId: slug[1],
          memberId: tempData?.memberId,
        };
        const { data, error } = (await CallRemoveGroupMember(dto)) as any;
        if (data) {
          toast.success(data?.message);
        }
        if (error) {
          handleCommonErrors(error);
          setLoader(false);
          return;
        }
        const memberToRemove = members.find(
          (member) => member.memberId === deleteId,
        );
        if (memberToRemove) {
          onDelete(memberToRemove);
        }
        setSelectedUser(
          selectedUser?.filter((user: any) => user?.memberId !== deleteId),
        );
        setLoader(false);
      } else {
        const memberToRemove = members.find(
          (member) => member._id === deleteId,
        );
        if (memberToRemove) {
          onDelete(memberToRemove);
        }
        setSelectedUser(
          selectedUser?.filter((user: any) => user?._id !== deleteId),
        );
      }
      onCloseDelete();
    } catch (error) {
      console.log("error::: ", error);
      setLoader(false);
    }
  };

  const changeAttendance = async (status: string, memberId: string) => {
    try {
      const dto = {
        groupId: slug[1],
        memberId,
        status,
      };
      const { data, error } = (await CallUpdateMemberAttendance(dto)) as any;
      if (data) {
        console.log("data::: ", data);
        toast.success(data?.message);
        getAllData(false);
      }
      if (error) {
        console.log(error);
        toast.error(error?.message);
      }
      setLoaderAttendance(null);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setLoaderAttendance(null);
    }
  };

  return (
    <>
      {/* {mailButtonShow && (
        <Select
          isLoading={Loader}
          items={allInterview}
          selectedKeys={[interview]}
          name="orgAdmin"
          label="Interview"
          placeholder="Select Interview"
          labelPlacement="outside"
          className="mb-4"
          classNames={{
            label: "mt-1",
            mainWrapper: "mt-[-100px]",
          }}
          startContent={
            <div className="pr-2">
              <i className="fa-solid fa-users" />
            </div>
          }
        >
          {(option: any) => (
            <SelectItem key={option?._id}>{option?.name}</SelectItem>
          )}
        </Select>
      )} */}
      <Table
        topContent={
          <>
            <div className="flex items-center justify-between">
              <h1>List of Committee</h1>
              <div className="flex gap-x-3">
                {mailButtonShow && (
                  <>
                    <Button
                      onClick={() => {
                        sendMail(members?.map((ele: any) => ele?._id));
                      }}
                      isLoading={Loader}
                      color="primary"
                      variant="solid"
                    >
                      Send Mail
                    </Button>
                  </>
                )}
                <Button
                  onPress={onOpenUser}
                  color="primary"
                  variant="ghost"
                  startContent={<i className="fa-solid fa-plus"></i>}
                >
                  Choose Member
                </Button>
              </div>
            </div>
          </>
        }
      >
        <TableHeader>
          <TableColumn>User</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>{mailButtonShow ? "Status" : ""}</TableColumn>
          <TableColumn>{showRole ? "Role" : ""}</TableColumn>
          <TableColumn>{showDepartment ? "Department" : ""}</TableColumn>
          <TableColumn>
            {slug && slug[0] !== "view" ? "Action" : ""}
          </TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No data found."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {members?.map((item: any, i: number) => (
            <TableRow key={item?._id}>
              <TableCell className="capitalize">
                <User
                  name={item?.name}
                  avatarProps={{
                    src: item?.profileImage?.presignedUrl ?? UserIcon.src,
                  }}
                />
              </TableCell>
              <TableCell>{item?.email || "-"}</TableCell>
              <TableCell>{item?.phone || "-"}</TableCell>
              <TableCell>
                {mailButtonShow &&
                  (item?.status === "Absent" ? (
                    <Chip variant="flat" color="danger" radius="sm">
                      Absent
                    </Chip>
                  ) : (
                    <Chip variant="flat" color="success" radius="sm">
                      Present
                    </Chip>
                  ))}
              </TableCell>
              <TableCell width={200}>
                {showRole ? (
                  <Select
                    isDisabled={validateDisabled(item?._id)}
                    items={roleList}
                    placeholder="Role"
                    labelPlacement="outside"
                    errorMessage={"Select role"}
                    isInvalid={validateRole(item?._id)}
                    selectedKeys={[validateRoleId(item?._id)]}
                    onChange={(e: any) => {
                      const findUser = selectedUser?.find(
                        (user: any) => user?._id === item?._id,
                      );
                      if (e.target.value && findUser) {
                        findUser.roleId = e.target.value;
                        setSelectedUser((prevUsers: any) => {
                          return prevUsers.map((user: any) =>
                            user?._id === findUser._id
                              ? { ...user, ...findUser }
                              : user,
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

              <TableCell>
                {showDepartment
                  ? item?.department || <span className="text-center">-</span>
                  : ""}
              </TableCell>
              <TableCell>
                {slug && slug[0] !== "view" ? (
                  <Dropdown>
                    <DropdownTrigger>
                      <span className="border p-2 rounded-md cursor-pointer">
                        <i className="fa-solid fa-ellipsis"></i>
                      </span>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      {mailButtonShow && (
                        <DropdownItem
                          onClick={() => sendMail([item?._id])}
                          startContent={
                            <span className="material-symbols-outlined">
                              send
                            </span>
                          }
                          key="SendMail"
                        >
                          Send Mail
                        </DropdownItem>
                      )}
                      {item?.status === "Absent" ? (
                        <DropdownItem
                          onClick={() => {
                            changeAttendance("Present", item?.memberId);
                            setLoaderAttendance(i);
                          }}
                          startContent={
                            <i className="fa-solid fa-user-plus"></i>
                          }
                          key="Present"
                        >
                          Present
                        </DropdownItem>
                      ) : (
                        <DropdownItem
                          startContent={
                            <i className="fa-solid fa-user-minus"></i>
                          }
                          key="Absent"
                          onClick={() => {
                            changeAttendance("Absent", item?.memberId);
                            setLoaderAttendance(i);
                          }}
                        >
                          Absent
                        </DropdownItem>
                      )}
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() => onOpenDelete(item)}
                        startContent={
                          <i className="fa-solid fa-trash cursor-pointer"></i>
                        }
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDelete}
        onOpenChange={onCloseDelete}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to remove this member?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onCloseDelete}>
                  Close
                </Button>
                <Button
                  isLoading={Loader}
                  color="primary"
                  onClick={() => {
                    deleteMember();
                  }}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MemberTable;
