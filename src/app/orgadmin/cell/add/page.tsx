"use client";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  CallAllPositions,
  CallCreateAdmin,
  CallGetAllUserType,
} from "@/_ServerActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const Add = () => {
  const route = useRouter();
  const auth = useSession() as any;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userTypeId, setUserTypeId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState("");

  useEffect(() => {
    getAllList();
    getPositionList();
  }, []);

  const getAllList = async () => {
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

  const getPositionList = async () => {
    try {
      setIsLoading(true);
      const { data } = await CallAllPositions();
      if (data) {
        const dataResponse = data as any;
        const useTypeIdGet = dataResponse?.data?.find(
          (item: any) => item?.value === "Cell",
        );
        setPosition(useTypeIdGet?._id);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("email", data?.email);
      formData.append("phone", data?.phone);

      formData.append("userType", userTypeId);
      formData.append("parentId", auth?.data?.user?.data?.parentId);
      formData.append("orgId", auth?.data?.user?.data?.orgId);
      formData.append("position", position);

      const response = await CallCreateAdmin(formData);
      if (response?.data) {
        const dataResponse = response as any;
        toast.success(dataResponse?.data?.message);
        route.back();
      } else {
        toast.error(response?.error);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
        <CardHeader className="flex gap-3">
          <div className="flex w-full items-center gap-x-3 mt-3 mb-2 text-2xl justify-between">
            <p>Add Cell</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <Input
                isRequired
                variant="bordered"
                {...register("name")}
                className={`${errors?.name && "border border-red-600"}`}
                label="Name"
                type="text"
                placeholder="Enter name"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-file-signature" />
                  </div>
                }
              />
              <Input
                variant="bordered"
                {...register("email")}
                label="Email address"
                type="email"
                placeholder="Enter email address"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-envelope" />
                  </div>
                }
              />
              <Input
                variant="bordered"
                {...register("phone")}
                label="Mobile number"
                type="number"
                placeholder="Enter mobile number"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-phone" />
                  </div>
                }
              />
            </div>
            <div className="my-3 w-full flex items-center justify-end">
              <Button
                isLoading={isLoading}
                type="submit"
                radius="sm"
                color="primary"
                className="mt-5 px-8"
              >
                Save
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Add;
