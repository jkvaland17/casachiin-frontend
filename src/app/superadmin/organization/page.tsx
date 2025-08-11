"use client";
import React, { useEffect, useState } from "react";
import { CallGetAllAdmin } from "@/_ServerActions";
import { Button, Input, Spinner, User } from "@heroui/react";
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
import moment from "moment";
import NoPhoto from "@/assets/img/icons/common/noImage.png";
import { handleCommonErrors } from "@/Utils/HandleError";

type Item = {
  email: string;
};

const AdminList: React.FC = () => {
  const [allAdmin, setAllAdmin] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    setIsLoading(true);
    const { data, error } = await CallGetAllAdmin();

    if (data) {
      const dataResponse = data as any;
      setAllAdmin(dataResponse?.data as any);
    }
    if (error) {
      handleCommonErrors(error);
    }
    setIsLoading(false);
  };

  const filteredList: Item[] | undefined = allAdmin?.filter((item: Item) =>
    item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  );

  return (
    <>
      <div className="flex items-center justify-between w-full mb-5">
        <p className="text-xl">Organization List</p>
        <div className="flex gap-x-4">
          <Input
            type="text"
            placeholder="email"
            labelPlacement="outside"
            startContent={<SearchIcon />}
            className="w-96"
            classNames={{
              inputWrapper: ["bg-white"],
              innerWrapper: ["bg-white"],
              base: ["hover:bg-transparent"],
              input: ["hover:bg-transparent"],
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            href={"/superadmin/organization/add"}
            as={Link}
            type="button"
            className="rounded-xl"
            color="primary"
          >
            <i className="fa-solid fa-plus" />
            Add Organization
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableColumn>Logo</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No data found."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {filteredList?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>
                <img
                  src={item?.logo ? item?.logo?.presignedUrl : NoPhoto?.src}
                  alt="no-img"
                  className="h-10 w-10 rounded-full"
                />
              </TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.phone}</TableCell>
              <TableCell>
                {moment(item?.created_at).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell width={80}>
                <div className="flex items-center gap-x-2">
                  <Button
                    as={Link}
                    href={`/superadmin/organization/${item?._id}`}
                    color="primary"
                    variant="bordered"
                    radius="sm"
                    startContent={
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    }
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    href={`/superadmin/organization/org-admin/add?org=${item?._id}`}
                    color="primary"
                    variant="solid"
                    radius="sm"
                    startContent={
                      <span className="material-symbols-outlined">
                        person_add
                      </span>
                    }
                  >
                    Add Admin
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminList;
