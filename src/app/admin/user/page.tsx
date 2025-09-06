"use client";
import {
  CallCreateUser,
  CallGetAllUser,
  CallUpdateUser,
  CallUserDelete,
} from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const User = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalType, setModalType] = useState("add");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [id, setId] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [allData, setAllData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const columns = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Phone", key: "phone" },
    { title: "PAN Card", key: "panCard" },
    { title: "Actions", key: "actions" },
  ];

  const setFormValues = (item?: any) => {
    setValue("name", item?.name || "");
    setValue("email", item?.email || "");
    setValue("phone", item?.phone || "");
    setValue("panCard", item?.panCard || "");
    setId(item?._id || "");
  };

  const renderCell = React.useCallback((item: any, columnKey: React.Key) => {
    const cellValue = item[columnKey as any];
    switch (columnKey) {
      case "name":
        return (
          <Link
            href={`/admin/user/${item?._id}`}
            className="capitalize text-blue-600 hover:underline"
          >
            {item?.name}
          </Link>
        );
      case "actions":
        return (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                radius="full"
                disableRipple
                className="p-0"
              >
                <span className="material-symbols-rounded">more_vert</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="edit"
                onPress={() => {
                  setFormValues(item);
                  setModalType("edit");
                  onOpen();
                }}
              >
                Edit
              </DropdownItem>
              <DropdownItem
                key="delete"
                color="danger"
                className="text-danger"
                onClick={() => {
                  deleteUser(item?._id);
                }}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue;
    }
  }, []);

  const createUser = async (submitData: any) => {
    try {
      const { data, error } = (await CallCreateUser(submitData)) as any;
      console.log("createCenter", { data, error });

      if (data?.message) {
        toast?.success(data?.message);
        getAllUser();
        onClose();
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (submitData: any) => {
    try {
      const query = `id=${id}`;
      const { data, error } = (await CallUpdateUser(query, submitData)) as any;
      console.log("CallUpdateUser", { data, error });
      if (data?.message) {
        toast?.success(data?.message);
        getAllUser();
        onClose();
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUser = async () => {
    setIsLoading(true);
    try {
      const query = `page=${page}&limit=10`;
      const { data, error } = (await CallGetAllUser(query)) as any;
      console.log({ data, error });
      if (data) {
        setAllData(data?.data);
        setTotalPage(data?.pagination?.totalPages);
        setPage(data?.pagination?.page);
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteUser = async (id: string) => {
    try {
      const { data, error } = (await CallUserDelete(id)) as any;
      console.log({ data, error });
      if (data?.statusCode == 200) {
        toast.success(data?.message);
        getAllUser();
      }
      if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, [page]);

  return (
    <div>
      <Table
        isStriped
        color="default"
        aria-label="Example static collection table"
        className="mb-6"
        topContent={
          <div className="flex justify-end mb-4">
            <Button
              color="primary"
              variant="shadow"
              onPress={() => {
                setFormValues();
                setModalType("add");
                onOpen();
              }}
              startContent={
                <span className="material-symbols-rounded">add</span>
              }
            >
              Add New User
            </Button>
          </div>
        }
        bottomContent={
          totalPage > 0 && (
            <div className="flex justify-end">
              <Pagination
                showControls
                total={totalPage}
                page={page}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
              className="text-wrap mob:text-nowrap"
            >
              {column.title}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={allData}
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent="No data"
        >
          {(item: any) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalType === "add" ? "Add User" : "Edit User"}
              </ModalHeader>
              <ModalBody className="gap-4">
                <form
                  className="grid grid-cols-1 gap-5"
                  onSubmit={handleSubmit(
                    modalType === "add" ? createUser : updateUser,
                  )}
                >
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <Input
                        {...field}
                        label="Name"
                        labelPlacement="outside"
                        placeholder="Enter name"
                        isInvalid={invalid}
                        errorMessage={error?.message}
                        isRequired
                        endContent={
                          <span className="material-symbols-rounded">
                            person
                          </span>
                        }
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address",
                      },
                    }}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <Input
                        {...field}
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Enter email"
                        isInvalid={invalid}
                        errorMessage={error?.message}
                        isRequired
                        endContent={
                          <span className="material-symbols-rounded">mail</span>
                        }
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Phone number must be exactly 10 digits",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone number must be exactly 10 digits",
                      },
                    }}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <Input
                        {...field}
                        type="tel"
                        label="Phone"
                        labelPlacement="outside"
                        placeholder="Enter phone number"
                        isInvalid={invalid}
                        errorMessage={error?.message}
                        isRequired
                        startContent={<p className="text-sm">+91</p>}
                        maxLength={10}
                        endContent={
                          <span className="material-symbols-rounded">call</span>
                        }
                      />
                    )}
                  />

                  <Controller
                    name="panCard"
                    control={control}
                    rules={{
                      required: "PAN card is required",
                      pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: "Enter a valid PAN card number",
                      },
                    }}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <Input
                        {...field}
                        label="PAN Card"
                        labelPlacement="outside"
                        placeholder="Enter PAN card number"
                        isInvalid={invalid}
                        errorMessage={error?.message}
                        isRequired
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                        endContent={
                          <span className="material-symbols-rounded">
                            description
                          </span>
                        }
                      />
                    )}
                  />

                  <div className="flex justify-end">
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      color="primary"
                      className="px-12"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default User;
