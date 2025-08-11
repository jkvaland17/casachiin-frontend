"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  CallCategoryByCode,
  CallCreateCategoriesData,
  CallFindAllAdvertisement,
} from "@/_ServerActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { handleCommonErrors } from "@/Utils/HandleError";

type FormData = {
  title: string;
  value: string;
  parentMasterId: string;
  masterCategoryId: string;
};

const AddFaq = (slugData: any) => {
  const slug = slugData?.slugData;
  const router = useRouter();
  const Auth: any = useSession();
  const route = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<any>(false);
  const [advertisement, setAllAdvertisement] = useState<any>(null);
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false);

  const getAllAdvertisement = async (): Promise<void> => {
    try {
      setLoading(true);
      const { data: Advertisement, error } = (await CallFindAllAdvertisement(
        Auth?.data?.user?.data?.cellId,
      )) as any;
      if (error) {
        handleCommonErrors(error);
      }
      const { data: CategoryId, error: errorCode } = (await CallCategoryByCode(
        "faqs",
      )) as any;
      if (Advertisement?.message) {
        setAllAdvertisement(Advertisement?.data);
        setValue("masterCategoryId", CategoryId?.data?._id);
      }
      if (errorCode) {
        handleCommonErrors(errorCode);
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAdvertisement();
  }, [Auth]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoadingBtn(true); // Set loading state to true when submitting
      const { data: response, error } = (await CallCreateCategoriesData(
        data,
      )) as any;

      if (response?.data) {
        toast.success(response?.message);
        route.back();
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
    } finally {
      setIsLoadingBtn(false); // Reset loading state whether success or error
      setLoading(false);
    }
  };

  return (
    <>
      <CardBody className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-3">
            <Select
              isRequired
              variant="bordered"
              label="Advertisement"
              placeholder="Select Data"
              labelPlacement="outside"
              {...register("parentMasterId", { required: true })}
              startContent={
                <div className="pr-2">
                  <i className="fa-solid fa-database" />
                </div>
              }
            >
              {advertisement?.map((item: any) => (
                <SelectItem key={item?._id}>{item?.value}</SelectItem>
              ))}
            </Select>
            <Input
              isRequired
              {...register("title", { required: true })}
              label="Question"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Enter your Question"
              errorMessage={"Question is required."}
              isInvalid={errors?.title ? true : false}
              startContent={
                <div className="pr-2">
                  <i className="fa-solid fa-title" />
                </div>
              }
            />
            <Textarea
              isRequired
              {...register("value", { required: true })}
              label="Answer"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Enter your Answer"
              errorMessage={"Answer is required."}
              isInvalid={errors?.value ? true : false}
              startContent={
                <div className="pr-2">
                  <i className="fa-regular fa-comment" />
                </div>
              }
            />
          </div>
          <div className="mt-3 w-full flex gap-3 items-center justify-end">
            <Button
              variant="flat"
              type="button"
              color="danger"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoadingBtn}
              type="submit"
              radius="sm"
              color="primary"
              className="w-full md:w-fit"
            >
              Create FAQ
            </Button>
          </div>
        </form>
      </CardBody>
    </>
  );
};

export default AddFaq;
