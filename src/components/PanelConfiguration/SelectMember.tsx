"use client";

import { CallFindAllSubAdmin } from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import { Button, Checkbox, Pagination, Spinner, User } from "@heroui/react";
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
import FilterSection from "./FilterSection";
import toast from "react-hot-toast";
import AddNewMember from "./AddNewMember";

type FilterData = {
  name: string;
  email: string;
  phone: string;
};

type UserData = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: {
    presignedUrl?: string;
  };
};

type PanelData = {
  committeeName: string;
  selectedMember: UserData[];
  committeeType: string;
  description: string;
};

type SelectMemberProps = {
  panelData: PanelData;
  setPanelData: React.Dispatch<React.SetStateAction<PanelData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const SelectMember: React.FC<SelectMemberProps> = ({
  panelData,
  setPanelData,
  setCurrentStep,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [allUser, setAllUser] = useState<UserData[]>([]);
  const [filterData, setFilterData] = useState<FilterData>({
    email: "",
    phone: "",
    name: "",
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getAllData(true);
  }, [page]);

  const rowsPerPage = 10;
  const pages = Math.ceil(totalCount / rowsPerPage);

  const getAllData = async (isFilter: boolean): Promise<void> => {
    try {
      setLoading(true);
      const filterOn = `page=${page}&limit=${rowsPerPage}&name=${filterData?.name}&email=${filterData?.email}&phone=${filterData?.phone}`;
      const filterOff = `page=${page}&limit=${rowsPerPage}`;
      const { data, error } = (await CallFindAllSubAdmin(
        isFilter ? filterOn : filterOff,
      )) as any;

      if (data?.message) {
        setTotalCount(data?.totalCounts);
        setAllUser(data?.list);
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (isChecked: boolean, user: UserData) => {
    setPanelData((prev) => {
      const selectedMembers = prev.selectedMember;
      if (isChecked) {
        return { ...prev, selectedMember: [...selectedMembers, user] };
      } else {
        return {
          ...prev,
          selectedMember: selectedMembers.filter((u) => u._id !== user._id),
        };
      }
    });
  };

  const handleNextStep = () => {
    if (panelData.selectedMember.length === 0) {
      toast.error("Please select a member");
      setError("Please select a member");
      return;
    }
    setError("");
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      <AddNewMember getAllData={getAllData} />

      <Table
        isHeaderSticky
        classNames={{
          th: "bg-[#E8E8E8] text-black",
          td: "bg-[#F4F4F4] text-black first:rounded-l-lg last:rounded-r-lg py-1",
          table: "border-spacing-y-1 border-separate",
          base: "max-h-[calc(100vh-375px)]",
        }}
        topContent={
          <>
            <FilterSection
              filterData={filterData}
              setFilterData={setFilterData}
              getAllData={getAllData}
              loading={loading}
              setPage={setPage}
            />
          </>
        }
      >
        <TableHeader>
          <TableColumn> </TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
        </TableHeader>
        <TableBody isLoading={loading} loadingContent={<Spinner />}>
          {allUser?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Checkbox
                  isSelected={panelData?.selectedMember?.some(
                    (selected) => selected?._id === user?._id,
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
                    src: user.profileImage?.presignedUrl || UserIcon?.src,
                    size: "sm",
                  }}
                />
              </TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="flex w-full justify-between mt-3">
        <Button
          type="button"
          color="default"
          variant="solid"
          radius="sm"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
        >
          <span className="material-symbols-outlined">fast_rewind</span> Back
        </Button>
        {pages > 0 && (
          <Pagination
            showControls
            showShadow
            radius="sm"
            color="primary"
            page={page}
            total={pages}
            onChange={(cPage) => setPage(cPage)}
          />
        )}
        <Button
          color="primary"
          variant="solid"
          radius="sm"
          isDisabled={loading}
          onPress={handleNextStep}
        >
          Next <span className="material-symbols-outlined">fast_forward</span>
        </Button>
      </div>
    </>
  );
};

export default SelectMember;
