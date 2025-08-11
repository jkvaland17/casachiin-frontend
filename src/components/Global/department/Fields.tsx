"use client";
import { CallFindSpecialityByAdvertisementId } from "@/_ServerActions";
import { useEffect, useState } from "react";
import { handleCommonErrors } from "@/Utils/HandleError";
import { Select, SelectItem } from "@heroui/select";
type FieldProps = {
  value: string | any;
  advId: string | any;
  setValue: any;
  api?: any;
  size?: any;
  removeAllOption?: boolean; // for removing all option from dropdown
  customClass?: string;
};

const GlobalDepartmentFields: React.FC<FieldProps> = ({
  value,
  setValue,
  advId,
  api,
  size,
  removeAllOption,
  customClass = "mb-2",
}) => {
  const [specialtyList, setSpecialtyList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (advId) {
      findSpecialtyByAdvertisementId();
    }
  }, [advId, removeAllOption]);

  const findSpecialtyByAdvertisementId = async () => {
    try {
      setLoading(true);
      const { data, error } = api
        ? await api(advId)
        : ((await CallFindSpecialityByAdvertisementId(advId)) as any);
      console.log("deptData", data, error);
      if (data) {
        if (data?.data?.length > 0) {
          const allDepartment = removeAllOption
            ? data?.data
            : [{ _id: "", value: "All" }, ...data?.data];
          setSpecialtyList(allDepartment);
          if (typeof window !== "undefined") {
            const id = sessionStorage.getItem("departmentId");
            if (id) {
              setValue(id);
            } else {
              setValue(allDepartment[0]?._id);
              sessionStorage.setItem("departmentId", allDepartment[0]?._id);
            }
          }
        }
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error::: ", error);
    }
  };

  return (
    <>
      <p className="mb-1">Department</p>
      <Select
        value={value}
        aria-label="Department"
        selectedKeys={[value]}
        items={specialtyList}
        className={customClass}
        startContent={
          <span className="material-symbols-outlined">post_add</span>
        }
        placeholder="Please Select department"
        labelPlacement="outside"
        size={size ? size : "lg"}
        isMultiline
        isLoading={loading}
        onSelectionChange={(e: any) => {
          const id = Array.from(e)[0] as string;

          setValue(id || "");
          if (typeof window !== "undefined") {
            sessionStorage.setItem("departmentId", id || "");
          }
        }}
      >
        {(option: any) => (
          <SelectItem key={option?._id}>{option?.value}</SelectItem>
        )}
      </Select>
    </>
  );
};

export default GlobalDepartmentFields;
