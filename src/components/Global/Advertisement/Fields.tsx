"use client";
import { useSession } from "next-auth/react";
import {
  CallFindAdvertisementByStatus,
  CallFindAllAdvertisement,
} from "@/_ServerActions";
import { useEffect, useState } from "react";
import { handleCommonErrors } from "@/Utils/HandleError";
import { Select, SelectItem } from "@heroui/select";
type FieldProps = {
  value: string | any;
  setValue: any;
  disabled?: boolean;
  type?: any;
  status?: string;
  className?: string;
};

const GlobalAdvertisementFields: React.FC<FieldProps> = ({
  value,
  setValue,
  disabled,
  type,
  status,
  className = "mb-2",
}) => {
  const { data: session } = useSession() as any;
  const [allAdvertisement, setAllAdvertisement] = useState<any>([]);
  const [advloading, setAdvloading] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user?.data?.cellId && allAdvertisement?.length === 0) {
      getAdvertisement();
    }
  }, [session]);

  const getAdvertisement = async () => {
    try {
      setAdvloading(true);

      const { data, error } = type
        ? await CallFindAdvertisementByStatus(type)
        : ((await CallFindAllAdvertisement(
            session?.user?.data?.cellId,
            status,
          )) as any);
      if (data) {
        setAllAdvertisement(data?.data);
        if (data?.data?.length > 0) {
          if (typeof window !== "undefined") {
            const id = sessionStorage.getItem("advertisementId");
            const template = id
              ? data?.data?.find((ele: any) => ele?._id === id)?.formTemplate
              : data?.data[0]?.formTemplate;
            if (id) {
              setValue(id, template);
            } else {
              setValue(data?.data[0]?._id, template);
              sessionStorage.setItem("advertisementId", data?.data[0]?._id);
            }
          }
        }
        setAdvloading(false);
      }
      if (error) {
        console.log("error::: ", error);
        handleCommonErrors(error);
        setAdvloading(false);
      }
    } catch (error) {
      setAdvloading(false);
      // console.log("error::: ", error);
    }
  };

  return (
    <>
      <p className="mb-1">Advertisement</p>
      <Select
        isDisabled={disabled}
        aria-label="Advertisement"
        selectedKeys={[value]}
        items={allAdvertisement}
        className={className}
        startContent={
          <span className="material-symbols-outlined">post_add</span>
        }
        placeholder="Please Select advertisement"
        labelPlacement="outside"
        size="lg"
        isMultiline
        isLoading={advloading}
        onSelectionChange={(e: any) => {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("departmentId", "");
          }
          const id = Array.from(e)[0] as string;
          if (id) {
            const template = allAdvertisement?.find(
              (ele: any) => ele?._id === id,
            )?.formTemplate;
            setValue(id, template);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("advertisementId", id);
            }
          }
        }}
      >
        {(option: any) => (
          <SelectItem key={option?._id}>
            {`${option?.value} (${option?.description})`}
          </SelectItem>
        )}
      </Select>
    </>
  );
};

export default GlobalAdvertisementFields;
