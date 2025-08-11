"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Switch,
  Textarea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  CallCreateAdmin,
  CallGetAllUserType,
  CallUploadFile,
} from "@/_ServerActions";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { State, City } from "country-state-city";
import { handleCommonErrors } from "@/Utils/HandleError";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  state: string;
  city: string;
  presentAddress: string;
  permanentAddress: string;
  profile: any;
  designation: string;
  parentId: string;
  userType: string;
  orgId: any;
};

const Add = () => {
  const params = useSearchParams();
  const route = useRouter();
  const auth = useSession() as any;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userTypeId, setUserTypeId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profilePreview, setProfilePreview] = useState<any>(null);
  const [profileFile, setProfileFile] = useState<any>(null);
  const [loadingUserType, setLoadingUserType] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (params.get("org")) {
      getAllList();
    } else {
      route.back();
    }
  }, [params]);

  const getAllList = async () => {
    try {
      setLoadingUserType(true);
      const { data } = await CallGetAllUserType();
      if (data) {
        const dataResponse = data as any;
        const useTypeIdGet = dataResponse?.data?.find(
          (item: any) => item?.type === "orgAdmin",
        );
        setUserTypeId(useTypeIdGet?._id);
      }
      setLoadingUserType(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setLoadingUserType(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    data.parentId = auth?.data?.user?.data?._id;
    data.userType = userTypeId;
    data.orgId = params.get("org");
    console.log("data::: ", data);
    try {
      setIsLoading(true);
      const response = await CallCreateAdmin(data);
      if (response?.data) {
        const dataResponse = response as any;
        toast.success(dataResponse?.data?.message);
        route.back();
      }
      if (response?.error) {
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

  const handleProfileChange = async (e: any) => {
    try {
      setProfilePreview(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = (await CallUploadFile(formData)) as any;
      setValue("profile", {
        url: response.data?.data?.url,
        docSha: response.data?.data?.docSha,
      } as any);
      if (response?.error) {
        handleCommonErrors(response?.error);
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
    }
  };

  return (<>
    {loadingUserType ? (
      <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
        <CardHeader className="flex flex-col gap-3">
          {Array.from({ length: 4 })?.map((ele, i) => (
            <div key={i} className="w-full flex items-center gap-3">
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-full rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          ))}
        </CardHeader>
      </Card>
    ) : (
      <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
        <CardHeader className="flex gap-3">
          <div className="flex w-full items-center gap-x-3 mt-3 mb-2 text-2xl justify-between">
            <p>Add Organization admin</p>
          </div>
          <Button onClick={() => route.back()}>
            <span className="material-symbols-outlined">arrow_back</span> Go
            Back
          </Button>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <Input
                isRequired
                {...register("name", { required: true })}
                isInvalid={errors?.name ? true : false}
                label="Organization Admin Name"
                errorMessage="Enter Organization Admin Name"
                type="text"
                placeholder="Enter organization name"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-user" />
                  </div>
                }
              />
              <Input
                isRequired
                {...register("designation", { required: true })}
                isInvalid={errors?.designation ? true : false}
                errorMessage="Enter Organization Admin designation"
                label="Designation"
                type="text"
                placeholder="Enter designation"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-user" />
                  </div>
                }
              />
              <Input
                isRequired
                {...register("email", { required: true })}
                isInvalid={errors?.email ? true : false}
                errorMessage="Enter Organization Admin email"
                label="Email Address"
                type="email"
                placeholder="Enter Email Address"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-envelope" />
                  </div>
                }
              />
              <Input
                isRequired
                {...register("phone", { required: true })}
                isInvalid={errors?.phone ? true : false}
                errorMessage="Enter Organization Admin phone"
                label="Phone Number"
                type="number"
                placeholder="Enter Phone Number"
                labelPlacement="outside"
                radius="sm"
                onKeyPress={(e: any) => {
                  if (!/^[0-9]$/.test(e.key) || e.target.value.length >= 10) {
                    e.preventDefault();
                  }
                }}
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-envelope" />
                  </div>
                }
              />
              <Input
                isRequired
                {...register("password", { required: true })}
                isInvalid={errors?.password ? true : false}
                errorMessage="Enter Organization Admin password"
                label="Password"
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter password"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-lock" />
                  </div>
                }
                endContent={
                  <div
                    className="focus:outline-none cursor-pointer"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <i className="fa-solid fa-eye" />
                    ) : (
                      <i className="fa-solid fa-eye-slash" />
                    )}
                  </div>
                }
              />
              <Input
                isRequired
                {...register("dob", { required: true })}
                isInvalid={errors?.dob ? true : false}
                errorMessage="Enter Organization Admin Date of Birth"
                label="Date Of Birth"
                type="date"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-calendar" />
                  </div>
                }
              />
              <Select
                {...register("state")}
                isInvalid={errors?.state ? true : false}
                errorMessage="Please select a state"
                items={State.getStatesOfCountry("IN")}
                label="State"
                placeholder="Select State"
                labelPlacement="outside"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-flag-usa" />
                  </div>
                }
              >
                {(option) => (
                  <SelectItem key={option?.isoCode}>
                    {option?.name}
                  </SelectItem>
                )}
              </Select>
              <Select
                {...register("city")}
                isInvalid={errors?.city ? true : false}
                errorMessage="Please select a city"
                items={City.getCitiesOfState("IN", watch("state"))}
                label="City"
                placeholder="Select city"
                labelPlacement="outside"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-city" />
                  </div>
                }
              >
                {(option) => (
                  <SelectItem key={option?.name}>{option?.name}</SelectItem>
                )}
              </Select>
              <Textarea
                {...register("presentAddress")}
                label="Present Address"
                labelPlacement="outside"
                placeholder="Enter your address"
              />
              <Textarea
                {...register("permanentAddress")}
                label="Permanent Address"
                labelPlacement="outside"
                placeholder="Enter your address"
              />

              <div className="col-span-2">
                <label>Profile Photo upload</label>
                {profilePreview ? (
                  <div className="relative w-fit">
                    <img
                      className="max-h-36 w-full object-contain rounded-md mt-3"
                      src={profilePreview}
                      alt="Current profile preview"
                    />
                    <div
                      onClick={() => {
                        setValue("profile", null);
                        setProfilePreview(null);
                      }}
                      className="cursor-pointer w-fit absolute top-0 right-0"
                    >
                      <i className="fa-solid fa-circle-xmark text-gray-800" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full mt-3">
                    <label
                      htmlFor="dropzone-file-profile"
                      className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">
                            Click to upload
                          </span>{" "}
                          or drag and drop Profile
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
                      </div>
                      <input
                        {...register("profile")}
                        id="dropzone-file-profile"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="my-3 w-full flex items-center justify-end">
              <Button
                isLoading={isLoading}
                type="submit"
                radius="sm"
                color="primary"
                className="mt-5"
              >
                Save
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    )}
  </>);
};

export default Add;
