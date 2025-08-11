"use client";

import {
  CallAssignCandidates,
  CallGetAllCandidatesByDepartment,
} from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  Checkbox,
  Chip,
  ChipProps,
  Pagination,
  Spinner,
  useDisclosure,
  User,
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
import UserIcon from "@/assets/img/icons/common/noImage.png";
import toast from "react-hot-toast";
import MapCandidatesModal from "./HOD/MapCandidatesModal";
import FilterDataAddCandidate from "./HOD/FilterDataAddCandidate";

type FilterData = {
  name: string;
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

type SelectMemberProps = {
  panelData: any;
  setPanelData: any;
  isAssigned: boolean;
  committeeList: any;
  functionCall: any;
};

const AddCandidate: React.FC<SelectMemberProps> = ({
  isAssigned = true,
  committeeList,
  functionCall,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [panelData, setPanelData] = useState<any>({ members: [] });
  console.log("panelData::: ", panelData);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [allUser, setAllUser] = useState<any[]>([]);
  const [sessionData, setSessionData] = useState<any>({
    advertisement_noId: "",
    specialityId: "",
    committeeId: "",
    screeningConfingId: "",
  });
  const [filterData, setFilterData] = useState<FilterData>({
    name: "",
  });
  const [error, setError] = useState<string>("");
  const [assignLoading, setAssignLoading] = useState<boolean>(false);

  useEffect(() => {
    setSessionData({
      ...sessionData,
      advertisement_noId: sessionStorage.getItem("advertisementId"),
      specialityId: sessionStorage.getItem("departmentId"),
      committeeId: sessionStorage.getItem("committeeId"),
      screeningConfingId: sessionStorage.getItem("screeningConfigID"),
    });
  }, []);

  useEffect(() => {
    if (
      sessionData?.advertisement_noId &&
      sessionData?.specialityId &&
      sessionData?.screeningConfingId
    ) {
      getAllData(true);
    }
  }, [page, sessionData]);

  const rowsPerPage = 10;
  const pages = Math.ceil(totalCount / rowsPerPage);

  const getAllData = async (filter: boolean): Promise<void> => {
    setLoading(true);
    try {
      const FilterOn = `advertisementId=${sessionData?.advertisement_noId}&departmentId=${sessionData?.specialityId}&showPendingCandidates=${isAssigned}&page=${page}&limit=${rowsPerPage}&candidate_name=${filterData?.name}&screeningConfigId=${sessionData?.screeningConfingId}`;
      const FilterOFF = `advertisementId=${sessionData?.advertisement_noId}&departmentId=${sessionData?.specialityId}&showPendingCandidates=${isAssigned}&page=${page}&limit=${rowsPerPage}&screeningConfigId=${sessionData?.screeningConfingId}&candidate_name=`;
      const { data, error } = (await CallGetAllCandidatesByDepartment(
        filter ? FilterOn : FilterOFF,
      )) as any;

      if (data?.message) {
        setTotalCount(data?.pagination?.total);
        setAllUser(data?.data);
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
    setPanelData((prev: any) => {
      const members = prev?.members || [];
      if (isChecked) {
        const alreadyExists = members.some((u: any) => u?._id === user?._id);
        return {
          ...prev,
          members: alreadyExists ? members : [...members, user],
        };
      } else {
        return {
          ...prev,
          members: members.filter((u: any) => u?._id !== user?._id),
        };
      }
    });
  };

  const handleNextStep = async () => {
    if (panelData?.members?.length === 0) {
      toast.error("Please select a member");
      setError("Please select a member");
      return;
    }
    setError("");
    try {
      setAssignLoading(true);
      const dto = {
        advertisementId: sessionData?.advertisement_noId,
        departmentId: sessionData?.specialityId,
        committeeId: sessionData?.committeeId,
        screeningConfigId: sessionData?.screeningConfingId,
        applications: panelData?.members?.map(
          (ele: any) => ele?.applicationId?._id,
        ),
      };
      const { data, error } = (await CallAssignCandidates(dto)) as any;

      if (data?.message) {
        toast.success(data?.message);
        getAllData(false);
        functionCall();
        onClose();
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.log("error::: ", error);
    } finally {
      setAssignLoading(false);
    }
  };

  return (
    <>
      <Table
        isHeaderSticky
        classNames={{
          th: "bg-[#E8E8E8] text-black",
          td: "bg-[#F4F4F4] text-black first:rounded-l-lg last:rounded-r-lg py-1",
          table: "border-spacing-y-1 border-separate",
        }}
        topContent={
          <FilterDataAddCandidate
            filterData={filterData}
            setFilterData={setFilterData}
            getAllData={getAllData}
            loading={loading}
            setPage={setPage}
          />
        }
        bottomContent={
          <div className="flex w-full justify-between mt-3">
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
            {isAssigned && (
              <MapCandidatesModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                panelData={panelData}
                committeeList={committeeList}
                sessionData={sessionData}
                setSessionData={setSessionData}
                getAllData={getAllData}
                onOpen={onOpen}
                onClose={onClose}
                handleNextStep={handleNextStep}
                assignLoading={assignLoading}
              />
            )}
          </div>
        }
      >
        <TableHeader>
          <TableColumn> </TableColumn>
          <TableColumn>Candidate Id</TableColumn>
          <TableColumn>User</TableColumn>
          {!isAssigned ? (
            <TableColumn>Assigned Committee</TableColumn>
          ) : (
            <TableColumn> </TableColumn>
          )}
        </TableHeader>
        <TableBody isLoading={loading} loadingContent={<Spinner />}>
          {allUser?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {isAssigned ? (
                  <Checkbox
                    isSelected={panelData?.members?.some(
                      (u: any) => u?._id === user?._id,
                    )}
                    onValueChange={(isChecked) =>
                      handleCheckboxChange(isChecked, user)
                    }
                  />
                ) : (
                  " "
                )}
              </TableCell>
              <TableCell>
                <p>{user?.userId?.candidateId}</p>
              </TableCell>
              <TableCell>
                <User
                  name={user?.userId?.name}
                  avatarProps={{
                    src:
                      user?.userId?.profileImage?.presignedUrl || UserIcon?.src,
                    size: "sm",
                  }}
                />
              </TableCell>
              {!isAssigned ? (
                <TableCell>
                  <Chip className="capitalize" color={"primary"} variant="flat">
                    {user?.committeeData?.committeeName}
                  </Chip>
                </TableCell>
              ) : (
                <TableCell>
                  <></>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
};

export default AddCandidate;
