"use client";
import React, { useEffect, useState } from "react";
import {
  CallCellMasterData,
  // CallGetAllAdmin,
  CallGetAllUserType,
} from "@/_ServerActions";
import { Button, Input, Spinner } from "@heroui/react";
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
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type Item = {
  email: string;
};

const AdminList: React.FC = () => {
  const auth = useSession() as any;

  const [allAdmin, setAllAdmin] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userTypeId, setUserTypeId] = useState<string>("");

  useEffect(() => {
    getAllListType();
  }, []);

  useEffect(() => {
    getAllList();
  }, [userTypeId]);

  const getAllListType = async () => {
    try {
      setIsLoading(true);
      const { data } = await CallGetAllUserType();
      if (data) {
        const dataResponse = data as any;
        const useTypeIdGet = dataResponse?.data?.find(
          (item: any) => item?.type === "label",
        );
        setUserTypeId(useTypeIdGet?._id);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };

  const getAllList = async () => {
    setIsLoading(true);
    const { data } = await CallCellMasterData(
      userTypeId,
      auth?.data?.user?.data?.parentId,
      "Cell",
    );

    if (data) {
      const dataResponse = data as any;
      setAllAdmin(dataResponse?.data as any);
    }
    setIsLoading(false);
  };

  const filteredList: Item[] | undefined = allAdmin?.filter((item: Item) =>
    item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  );

  return (
    <>
      <div className="flex items-center justify-between w-full mb-5">
        <p className="text-xl">All Cells</p>
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
            href={"/orgadmin/cell/add"}
            as={Link}
            type="button"
            className="rounded-xl"
            color="primary"
          >
            <i className="fa-solid fa-plus" />
            Add Cell
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableColumn>Sr. No</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No data found."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {filteredList?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {item?.name}
                <span className="text-gray-500 text-sm">
                  {" "}
                  {item?.isMainAdmin && "(main admin)"}
                </span>
              </TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.phone}</TableCell>
              <TableCell>
                {/* <Switch defaultSelected={item?.status} /> */}
                {moment(item?.created_at).format("DD-MM-YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminList;
