"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CallFindAllSubAdmin, CallUpdateMemberDetails } from "@/_ServerActions";
import {
  Button,
  Input,
  Pagination,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Card,
  CardBody,
} from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import SearchIcon from "@/assets/img/svg/Search";
import Link from "next/link";
import { handleCommonErrors } from "@/Utils/HandleError";
import EmailIcon from "@/assets/img/svg/Email";
import PhoneIcon from "@/assets/img/svg/Phone";
import toast from "react-hot-toast";
import PasswordIcon from "@/assets/img/svg/Password";
import { useSession } from "next-auth/react";

type Item = {
  email: string;
  name: string;
};
type UserType = {
  email: string;
  name: string;
  phone: string;
  userId: string;
  password?: string;
};
type FilterData = {
  name: string;
  email: string;
  phone: string;
};
const AdminList: React.FC = () => {
  const { data: session } = useSession() as any;
  const isHead =
    session?.user?.data?.position?.value === "Head" &&
    session?.user?.data?.userType?.type === "admin";
  const { isOpen, onOpen, onClose: modalClose, onOpenChange } = useDisclosure();
  const [allAdmin, setAllAdmin] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateUserLoader, setUpdateUserLoader] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalCount, setTotalCount] = useState<any>(0);
  const [page, setPage] = useState(1);
  const initialUserState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    userId: "",
  };

  const [filterData, setFilterData] = useState<FilterData>({
    email: "",
    phone: "",
    name: "",
  });
  const [user, setUser] = useState<UserType>(initialUserState);
  const [originalUser, setOriginalUser] = useState<UserType>(initialUserState);
  useEffect(() => {
    getAllList(true);
  }, [page]);

  // Pagination
  const rowsPerPage = 10;
  const pages = Math.ceil(totalCount / rowsPerPage);

  const getAllList = async (filter: boolean) => {
    setIsLoading(true);
    const filterOn = `page=${page}&limit=${rowsPerPage}&name=${filterData?.name}&email=${filterData?.email}&phone=${filterData?.phone}`;
    const filterOff = `page=${page}&limit=${rowsPerPage}`;
    const { data, error } = await CallFindAllSubAdmin(
      filter ? filterOn : filterOff,
    );
    console.log("data from admin", data);

    if (data) {
      const dataResponse = data as any;
      setAllAdmin(dataResponse?.list as any);
      setTotalCount(dataResponse?.totalCounts as any);
    }
    if (error) {
      handleCommonErrors(error);
    }
    setIsLoading(false);
  };

  const filteredList: Item[] | undefined = allAdmin?.filter(
    (item: Item) =>
      item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  );
  const UpdateMember = async () => {
    try {
      setUpdateUserLoader(true);
      const changedFields = getChangedFields();
      console.log(changedFields);
      const hasChanges = Object.keys(changedFields).some(
        (key) => key !== "userId",
      );
      if (!hasChanges) {
        console.log("No changes to submit.");
        setUpdateUserLoader(false);
        return;
      }
      const { data, error } = await CallUpdateMemberDetails(changedFields);
      if (data) {
        toast.success("User Update Successfully");
        setUpdateUserLoader(false);
        ModalClose();
      }
      if (error) {
        handleCommonErrors(error);
        setUpdateUserLoader(false);
      }
    } catch (error) {
      setUpdateUserLoader(false);
    }
  };
  const ModalClose = () => {
    modalClose();
    setUpdateUserLoader(false);
    getAllList(true);
    setUser(initialUserState);
    setOriginalUser(initialUserState);
  };
  const clearFilter = () => {
    setFilterData({
      ...filterData,
      email: "",
      phone: "",
      name: "",
    });
    getAllList(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const getChangedFields = (): Partial<UserType> => {
    const changes: Partial<UserType> = {};
    Object.keys(user).forEach((key) => {
      const keyTyped = key as keyof UserType;
      if (
        (keyTyped !== "password" &&
          user[keyTyped] !== originalUser[keyTyped]) ||
        (keyTyped === "password" &&
          user.password &&
          user.password !== originalUser.password)
      ) {
        changes[keyTyped] = user[keyTyped];
      }
    });
    changes.userId = user.userId;
    return changes;
  };
  return (
    <>
      <div className="w-full mb-5">
        <div className="flex justify-between items-center mb-5">
          <p className="text-xl text-nowrap">All Member List</p>
          <Button
            as={Link}
            color="primary"
            className="me-2"
            href="/admin/subadmin/add"
            startContent={<i className="fa-solid fa-plus" />}
          >
            Add Member
          </Button>
        </div>
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center">
              <Input
                label="Name"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Enter Name"
                value={filterData.name}
                type="search"
                onChange={(e) =>
                  setFilterData({ ...filterData, name: e.target.value })
                }
              />
              <Input
                label="Email"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Enter Email"
                value={filterData.email}
                type="search"
                onChange={(e) =>
                  setFilterData({ ...filterData, email: e.target.value })
                }
              />
              <Input
                label="Mobile No"
                labelPlacement="outside"
                variant="bordered"
                placeholder="Enter Phone No."
                value={filterData.phone}
                type="search"
                onChange={(e) =>
                  setFilterData({ ...filterData, phone: e.target.value })
                }
              />
              <div className="flex justify-end">
                <Button
                  color="primary"
                  onClick={() => {
                    setPage(1);
                    getAllList(true);
                  }}
                  className="me-2"
                  startContent={<i className="fas fa-search" />}
                >
                  Search
                </Button>
                <Button
                  variant="ghost"
                  color="danger"
                  onClick={clearFilter}
                  className="me-2 !text-red-600 hover:!text-white"
                  startContent={<i className="fas fa-times" />}
                >
                  Clear Filter
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Table
        classNames={{
          wrapper: ["border-none", "shadow-none", "text-xl"],
          th: ["p-3", "text-[15px]", "text-black"],
          tr: ["rounded-xl"],
          td: ["text-[14px]", "p-3"],
        }}
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-end">
              <Pagination
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page: any) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Designation</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No data found."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {filteredList?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.phone}</TableCell>
              <TableCell>{item?.designation}</TableCell>
              <TableCell>
                <div>
                  <Button
                    startContent={
                      <i className="fa-solid fa-pencil text-md text-white cursor-pointer"></i>
                    }
                    onClick={() => {
                      onOpen();
                      const Data = {
                        name: item?.name,
                        email: item?.email,
                        phone: item?.phone,
                        userId: item?._id,
                      };
                      setOriginalUser(Data);
                      setUser(Data);
                    }}
                    size="sm"
                    color="primary"
                  >
                    Edit
                  </Button>
                  {isHead && (
                    <Button
                      as={Link}
                      href={`/admin/subadmin/${item?._id}`}
                      startContent={
                        <i className="fa-solid fa-cog text-md text-white cursor-pointer"></i>
                      }
                      size="sm"
                      color="secondary"
                      className="ml-2"
                    >
                      Config
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update {originalUser.name}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <span className="material-symbols-outlined text-default-400">
                      person
                    </span>
                  }
                  label="Name"
                  placeholder="Enter name"
                  variant="bordered"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
                <Input
                  autoFocus
                  endContent={<EmailIcon />}
                  label="Email"
                  placeholder="Enter email"
                  variant="bordered"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />

                <Input
                  endContent={<PhoneIcon />}
                  label="Phone Number"
                  placeholder="Enter phone number"
                  type="tel"
                  variant="bordered"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
                <Input
                  endContent={<PasswordIcon />}
                  label="Password"
                  placeholder="Enter new Password"
                  type="tel"
                  variant="bordered"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={ModalClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={updateUserLoader}
                  onPress={UpdateMember}
                >
                  Update User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminList;
