"use client";

import { handleCommonErrors } from "@/Utils/HandleError";
import {
  CallCategoryByCode,
  CallGetAllSpecialtiesId,
  CallGetCategoriesId,
  CallUpdateMasterData,
  CallUploadFile,
} from "@/_ServerActions";
import MyUpload from "@/components/Custom/MyUpload";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
  Switch,
  Textarea,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  value: string;
  description: string;
  startDate: string;
  endDate: string;
  prospectusLink: string;
  advertisementLink: string;
  parentMasterId: string;
  id: string;
  status: boolean;
};

const EditAdvertis = (slugData: any) => {
  const slug = slugData?.slugData;
  const Auth: any = useSession();
  const route = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [uploadST, setUploadST] = useState(null);
  const [uploadPR, setUploadPR] = useState(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
  const [loading, setLoading] = useState({
    advertisementLink: false,
    prospectusLink: false,
  });
  const [allCourse, setAllCourse] = useState<any>([]);

  useEffect(() => {
    getCourseData();
  }, [Auth]);

  const getAllAdvertisement = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data, error } = (await CallGetCategoriesId(slug[1])) as any;
      if (data?.data) {
        const dto = data?.data;
        console.log("data::: ", dto);

        setValue("value", dto?.value);
        setValue("description", dto?.description);
        setValue("startDate", dto?.startDate);
        setValue("endDate", dto?.endDate);
        setValue("advertisementLink", dto?.advertisementLink);
        setValue("prospectusLink", dto?.prospectusLink);
        setValue("parentMasterId", dto?.parentMasterId?._id);
        setValue("status", dto?.status);
        setValue("id", dto?._id);
        setUploadST(dto?.advertisementLink);
        setUploadPR(dto?.prospectusLink);
      }
      if (error) {
        handleCommonErrors(error);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getCourseData = async () => {
    try {
      setIsLoading(true);
      if (!slug[0]) return;
      const { data, error } = (await CallCategoryByCode(slug[0])) as any;
      if (data) {
        const dataResponse = data as any;
        getAllList(dataResponse?.data?._id);
      }
      if (error) {
        handleCommonErrors(error);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };

  const getAllList = async (id: string) => {
    try {
      const { data, error } = await CallGetAllSpecialtiesId(id);
      if (data) {
        const dataResponse = data as any;
        setAllCourse(dataResponse?.data as any);
        getAllAdvertisement();
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      data.startDate = watch("startDate");
      data.endDate = watch("endDate");
      data.advertisementLink = watch("advertisementLink");
      data.prospectusLink = watch("prospectusLink");
      data.status = watch("status");
      setIsLoadingBtn(true);
      const response = await CallUpdateMasterData(data);

      if (response?.data) {
        const dataResponse = response as any;
        toast.success(dataResponse?.data?.message);
        route.back();
      }
      if (response?.error) {
        handleCommonErrors(response?.error);
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoadingBtn(false);
    }
  };

  const uploadFile = async (file: File, name: any) => {
    try {
      setLoading({ ...loading, [name]: true });
      const formData = new FormData();
      formData.append("file", file);
      const response = (await CallUploadFile(formData)) as any;
      setValue(name, response.data?.data?.url as any);
      setLoading({ ...loading, [name]: false });
      if (response?.error) {
        handleCommonErrors(response?.error);
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setLoading({ ...loading, [name]: false });
    }
  };

  const handleChangeST = (e: any) => {
    if (e.target.files.length > 0) {
      setUploadST(e.target.files[0]);
      uploadFile(e.target.files[0], "advertisementLink");
    } else {
      setUploadST(null);
    }
  };

  const handleChangePR = (e: any) => {
    if (e.target.files.length > 0) {
      setUploadPR(e.target.files[0]);
      uploadFile(e.target.files[0], "prospectusLink");
    } else {
      setUploadPR(null);
    }
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    try {
      const [year, month, day] = dateString
        .split("-")
        .map((num) => num.padStart(2, "0"));
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.log("Date format error:", error);
      return "";
    }
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "startDate" | "endDate",
  ) => {
    const value = e.target.value;
    setValue(field, value);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
          <CardHeader className="flex gap-3">
            <div className="flex w-full items-center gap-x-3 mt-3 mb-2 text-xl justify-between">
              <p>Advertisement</p>
              <div className="flex gap-2 items-center">
                <p className="text-sm">Status</p>
                <Switch
                  size="sm"
                  onValueChange={(e) => setValue("status", e)}
                  isSelected={watch("status")}
                ></Switch>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  isRequired
                  variant="bordered"
                  {...register("value", { required: true })}
                  isInvalid={errors?.value ? true : false}
                  label="Advertisement Name"
                  type="text"
                  placeholder="Enter Advertisement name"
                  labelPlacement="outside"
                  startContent={
                    <div className="pr-2">
                      <i className="fa-solid fa-notes-medical"></i>
                    </div>
                  }
                />

                <Select
                  variant="bordered"
                  label="Course"
                  placeholder="Select Data"
                  labelPlacement="outside"
                  {...register("parentMasterId")}
                  selectedKeys={[watch("parentMasterId")]}
                  startContent={
                    <div className="pr-2">
                      <i className="fa-solid fa-database" />
                    </div>
                  }
                >
                  {allCourse?.map((item: any) => (
                    <SelectItem key={item?._id}>{item?.value}</SelectItem>
                  ))}
                </Select>
                <div className="col-span-1 md:col-span-2">
                  <Textarea
                    {...register("description")}
                    label="Description"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    startContent={
                      <div className="pr-2">
                        <i className="fa-solid fa-notes-medical"></i>
                      </div>
                    }
                  />
                </div>
                <Input
                  label="Start Date"
                  variant="bordered"
                  labelPlacement="outside"
                  type="date"
                  {...register("startDate")}
                  value={formatDateForInput(watch("startDate"))}
                  onChange={(e) => handleDateChange(e, "startDate")}
                  startContent={
                    <div className="pr-2">
                      <i className="fa-regular fa-calendar-days"></i>{" "}
                    </div>
                  }
                />
                <Input
                  label="End Date"
                  variant="bordered"
                  labelPlacement="outside"
                  type="date"
                  {...register("endDate")}
                  value={formatDateForInput(watch("endDate"))}
                  onChange={(e) => handleDateChange(e, "endDate")}
                  startContent={
                    <div className="pr-2">
                      <i className="fa-regular fa-calendar-days"></i>{" "}
                    </div>
                  }
                />
                <div className="col-span-1 md:col-span-2">
                  {loading.advertisementLink ? (
                    <div className="flex flex-col items-center justify-center w-full min-h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                      <Spinner />
                    </div>
                  ) : (
                    <MyUpload
                      title="Advertisement"
                      preview={uploadST}
                      setPreview={setUploadST}
                      handleChange={handleChangeST}
                      setValue={setValue}
                      name="myUpload"
                      placeholder="Upload PDF File"
                    />
                  )}
                </div>
                <div className="col-span-1 md:col-span-2">
                  {loading.prospectusLink ? (
                    <div className="flex flex-col items-center justify-center w-full min-h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                      <Spinner />
                    </div>
                  ) : (
                    <MyUpload
                      title="Prospectus"
                      preview={uploadPR}
                      setPreview={setUploadPR}
                      handleChange={handleChangePR}
                      setValue={setValue}
                      name="myUpload"
                      placeholder="Upload PDF File"
                    />
                  )}
                </div>
              </div>
              <div className="my-3 w-full flex items-center gap-3 justify-end">
                <Button
                  variant="flat"
                  type="button"
                  color="danger"
                  radius="sm"
                  className="px-7 mt-5"
                  onClick={() => route.back()}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoadingBtn}
                  type="submit"
                  radius="sm"
                  color="primary"
                  className="mt-5"
                >
                  Update
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default EditAdvertis;
