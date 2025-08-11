"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { CallFindAllAdvertisement } from "@/_ServerActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ScreenLoader from "@/components/ScreenLoader";
import { handleCommonErrors } from "@/Utils/HandleError";
import * as XLSX from "xlsx";
import DynamicTable from "./DynamicTable";
import UploadFile from "./UploadFile";
import GlobalAdvertisementFields from "./Global/Advertisement/Fields";

type FormData = {
  advertisement: string;
  labelId: string;
  minMarks: string;
  maxMarks: string;
  passingMarks: string;
};

const MapUpload: React.FC<any> = ({ title, api, isShow, setIsUpload }) => {
  const route = useRouter();
  const {
    register,
    handleSubmit,
    // watch,
    // setValue,
    formState: { errors },
  } = useForm<FormData>();

  const Auth: any = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [advertisement, setAllAdvertisement] = useState<any[]>([]);
  const [selectAdvertisement, setSelectAdvertisement] = useState<any>("");
  const [data, setData] = useState([]);

  const getAllAdvertisement = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data } = (await CallFindAllAdvertisement(
        Auth?.data?.user?.data?.cellId,
      )) as any;
      if (data?.message) {
        setAllAdvertisement(data?.data);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (advertisement?.length === 0) {
      getAllAdvertisement();
    }
  }, [Auth]);

  const onSubmit = async (data: FormData) => {
    console.log("data::: ", data);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("advertisement", selectAdvertisement);
      formData.append("file", file);
      if (isShow) {
        formData.append("minMarks", data?.maxMarks);
        formData.append("maxMarks", data?.maxMarks);
        formData.append("passingMarks", data?.passingMarks);
      }
      const responseData = (await api(formData)) as any;
      if (responseData?.data) {
        toast.success("Upload successfully");
        if (isShow) {
          setIsUpload(false);
        } else {
          route.back();
        }
      }
      if (responseData?.error) {
        handleCommonErrors(responseData?.error);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };

  const handleLogoChange = (e: any) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setLoading(true);
      setFile(file);
      setPreview(file);

      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(sheet) as any;
          setData(sheetData);
        } catch (error) {
          console.error("Error processing file: ", error);
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = (error) => {
        console.error("File reading error: ", error);
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setPreview(null);
      setData([]);
      setLoading(false);
    }
  };

  return (
    <div className="relative text-medium">
      {loading && <ScreenLoader />}
      <Card className="max-w-full px-4 mb-4 rounded-lg bg-[#fdfdfd] pb-6">
        <CardHeader className="flex gap-3 px-1 md:px-2">
          <div className="mt-3 text-xl font-medium">
            <p>{title}</p>
          </div>
        </CardHeader>
        <CardBody className="px-1 md:px-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <GlobalAdvertisementFields
              value={selectAdvertisement}
              setValue={setSelectAdvertisement}
            />

            {isShow && (
              <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-4 gap-3 gap-md-4">
                <Input
                  {...register("minMarks", { required: true })}
                  label="Min Marks"
                  errorMessage="Please enter"
                  type="number"
                  placeholder="Enter Mark"
                  labelPlacement="outside"
                  radius="sm"
                  isInvalid={errors?.minMarks ? true : false}
                />
                <Input
                  {...register("maxMarks", { required: true })}
                  label="Max Marks"
                  errorMessage="Please enter"
                  type="number"
                  placeholder="Enter Mark"
                  labelPlacement="outside"
                  radius="sm"
                  isInvalid={errors?.maxMarks ? true : false}
                />
                <Input
                  {...register("passingMarks", { required: true })}
                  label="Passing Marks"
                  errorMessage="Please enter"
                  type="number"
                  placeholder="Enter Mark"
                  labelPlacement="outside"
                  radius="sm"
                  isInvalid={errors?.passingMarks ? true : false}
                />
              </div>
            )}

            <div className="mt-3">
              <UploadFile
                preview={preview}
                setPreview={setPreview}
                setData={setData}
                handleLogoChange={handleLogoChange}
              />
            </div>

            {data?.length > 0 && <DynamicTable data={data} />}

            <div className="flex items-center gap-x-3 justify-end">
              <Button
                isLoading={isLoading}
                isDisabled={data?.length === 0 ? true : false}
                type="submit"
                radius="sm"
                color="primary"
                className="w-fit px-6 mt-5"
              >
                Save
              </Button>
              {isShow && (
                <Button
                  onClick={() => setIsUpload(false)}
                  radius="sm"
                  color="danger"
                  variant="bordered"
                  className="w-fit px-6 mt-5"
                >
                  Back
                </Button>
              )}
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default MapUpload;
