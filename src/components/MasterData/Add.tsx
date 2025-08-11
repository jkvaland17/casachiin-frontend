"use client";

import { Button, Card, CardBody, CardHeader, Switch } from "@heroui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {
  CallCategoryByCode,
  CallCreateCategoriesData,
  CallGetAllSpecialtiesId,
  CallUploadFile,
} from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import ScreenLoader from "../ScreenLoader";
import {
  CombinedProps,
  formData,
  LoadingState,
} from "@/components/MasterData/types";
import AddFaq from "./AddSection/AddFaq";
import DefaultAdd from "./AddSection/DefaultAdd";
import AddAdvertis from "./AddSection/AddAdvertis";
import AddNoticeResult from "./AddSection/AddNoticeResult";

const CombinedForm: React.FC<CombinedProps> = ({ title, apiCode, route }) => {
  const router = useRouter();
  const [pdfFile, setPdfFile] = useState<any>(null);
  const [loaderFile, setLoaderFile] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      status: false,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);
  const [uploadST, setUploadST] = useState<File | null>(null);
  const [uploadPR, setUploadPR] = useState<File | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    advertisementLink: false,
    prospectusLink: false,
  });
  const [allCourse, setAllCourse] = useState<any[]>([]);
  const { slug } = useParams() as { slug: string[] };

  useEffect(() => {
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data, error } = (await CallCategoryByCode(slug[0])) as any;
      if (data) {
        setValue("masterCategoryId", data?.data?._id);
        setValue("status", false);
        if (slug[0] === "advertisement") {
          await getCourseData();
        }
      }
      if (error) {
        handleCommonErrors(error);
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log("error::: ", error);
      toast.error(error?.message);
      setIsLoading(false);
    }
  };

  const getCourseData: () => Promise<void> = async () => {
    try {
      if (!slug[0]) return;
      const { data, error } = (await CallCategoryByCode(slug[0])) as any;
      if (data) {
        await getAllList(data?.data?._id);
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error: any) {
      console.log("error::: ", error);
      toast.error(error?.message);
    }
  };

  const getAllList = async (id: string): Promise<void> => {
    try {
      const { data, error } = (await CallGetAllSpecialtiesId(id)) as any;
      if (data) {
        setAllCourse(data?.data || []);
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error: any) {
      console.log("error::: ", error);
    }
  };

  const uploadFile = async (
    file: File,
    name: keyof LoadingState,
  ): Promise<void> => {
    try {
      setLoading((prev) => ({ ...prev, [name]: true }));
      const formData = new FormData();
      formData.append("file", file);
      const response: any = await CallUploadFile(formData);
      setValue(name as keyof formData, response.data?.data?.url);
      setLoading((prev) => ({ ...prev, [name]: false }));
      if (response?.error) {
        handleCommonErrors(response?.error);
      }
    } catch (error: any) {
      console.log("error::: ", error);
      toast.error(error?.message);
      setLoading((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleChangeST = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadST(e.target.files[0]);
      uploadFile(e.target.files[0], "advertisementLink");
    } else {
      setUploadST(null);
    }
  };

  const handleChangePR = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadPR(e.target.files[0]);
      uploadFile(e.target.files[0], "prospectusLink");
    } else {
      setUploadPR(null);
    }
  };

  const onSubmit = async (data: formData): Promise<void> => {
    try {
      setIsLoadingBtn(true);
      if (slug[0] === "advertisement") {
        data.startDate = watch("startDate");
        data.endDate = watch("endDate");
        data.advertisementLink = watch("advertisementLink");
        data.prospectusLink = watch("prospectusLink");
        data.formTemplate = "CA_JAMMU";
      }
      data.status = watch("status");
      data.masterCategoryId = watch("masterCategoryId");

      const response: any = await CallCreateCategoriesData(data);
      if (response?.data) {
        toast.success(response?.data?.message);
        router.back();
      }
      if (response?.error) {
        handleCommonErrors(response?.error);
      }
    } catch (error: any) {
      console.log("error::: ", error);
      toast.error(error?.message);
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const handleChange = (e: any) => {
    if (e.target.files.length > 0) {
      setPdfFile(e.target.files[0]);
      uploadFile(e.target.files[0], "prospectusLink");
    } else {
      setPdfFile(null);
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
    <div className="relative">
      {isLoading && <ScreenLoader />}
      <Card className="max-w-full p-3">
        <CardHeader className="flex gap-3">
          <div className="flex w-full items-center gap-x-3 mt-3 mb-2 text-2xl justify-between">
            <p className="font-medium text-xl">
              {slug[0] === "advertisement" ? "advertisement" : `Add ${title}`}
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-sm">Status</p>
              <Switch
                size="sm"
                onValueChange={(e: boolean) => setValue("status", e)}
                isSelected={watch("status")}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {slug[0] === "advertisement" ? (
            <>
              <AddAdvertis
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                slug={slug}
                router={router}
                route={route}
                title={title}
                isLoadingBtn={isLoadingBtn}
                allCourse={allCourse}
                watch={watch}
                handleDateChange={handleDateChange}
                loading={loading}
                uploadST={uploadST}
                setUploadST={setUploadST}
                handleChangeST={handleChangeST}
                setValue={setValue}
                uploadPR={uploadPR}
                setUploadPR={setUploadPR}
                handleChangePR={handleChangePR}
              />
            </>
          ) : slug[0] === "faqs" ? (
            <>
              <AddFaq slugData={slug} />
            </>
          ) : slug[0] === "result" ||
            slug[0] === "notice" ||
            slug[0] === "notification" ? (
            <>
              <AddNoticeResult slug={slug} />
            </>
          ) : (
            <>
              <DefaultAdd
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                slug={slug}
                router={router}
                route={route}
                title={title}
                isLoadingBtn={isLoadingBtn}
              />
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CombinedForm;
