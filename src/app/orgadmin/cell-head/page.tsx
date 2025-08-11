"use client";
import React, { useEffect, useState } from "react";
import {
  CallCellMasterData,
  // CallGetAllAdmin,
  CallGetAllUserType,
} from "@/_ServerActions";
import {
  Button,
  // Input,
  Select,
  SelectItem,
  Spinner,
  // Switch,
  // Tooltip,
} from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
// import SearchIcon from "@/assets/img/svg/Search";
import Link from "next/link";
import moment from "moment";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

// type Item = {
//   email: string;
// };

const AdminList: React.FC = () => {
  const auth = useSession() as any;

  const [allAdmin, setAllAdmin] = useState<any[]>([]);
  const [allCell, setAllCell] = useState<any[]>([]);
  const [Cell, setCell] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [searchQuery, setSearchQuery] = useState<string>("");
  const [userTypeId, setUserTypeId] = useState<string>("");
  const [userTypeAdmin, setUserTypeAdmin] = useState<string>("");

  useEffect(() => {
    getAllListType();
  }, []);

  useEffect(() => {
    getAllList();
  }, [userTypeId]);

  useEffect(() => {
    getAllCellAdminList();
  }, [Cell]);

  const getAllListType = async () => {
    try {
      setIsLoading(true);
      const { data } = await CallGetAllUserType();
      if (data) {
        const dataResponse = data as any;
        const useTypeIdGet = dataResponse?.data?.find(
          (item: any) => item?.type === "label",
        );
        const useTypeIdAdmin = dataResponse?.data?.find(
          (item: any) => item?.type === "admin",
        );
        setUserTypeId(useTypeIdGet?._id);
        setUserTypeAdmin(useTypeIdAdmin?._id);
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
      setAllCell(dataResponse?.data as any);
      if (dataResponse?.data?.length > 0) {
        setCell(dataResponse?.data[0]._id);
      }
    }
    setIsLoading(false);
  };

  const getAllCellAdminList = async () => {
    try {
      setIsLoading(true);
      const { data } = await CallCellMasterData(userTypeAdmin, Cell, "");

      if (data) {
        const dataResponse = data as any;
        setAllAdmin(dataResponse?.data as any);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };

  // const allAdmin: Item[] | undefined = allAdmin?.filter((item: Item) =>
  //   item?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  // );

  return (
    <>
      <div className="flex items-center justify-between w-full mb-5">
        <p className="text-xl">All Cell Heads</p>
        <div className="flex gap-x-4">
          <Select
            items={allCell}
            placeholder="Select Cell"
            labelPlacement="outside"
            className="w-96"
            selectedKeys={allCell?.length !== 0 ? [Cell] : [""]}
            onChange={(e) => setCell(e.target.value)}
            startContent={
              <div className="pr-2">
                <i className="fa-solid fa-layer-group" />
              </div>
            }
          >
            {(option: any) => (
              <SelectItem key={option?._id}>{option?.name}</SelectItem>
            )}
          </Select>
          <Button
            href={"/orgadmin/cell-head/add"}
            as={Link}
            type="button"
            className="rounded-xl"
            color="primary"
          >
            <i className="fa-solid fa-plus" />
            Add Cell Head
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
          {allAdmin?.map((item: any, idx: number) => (
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
