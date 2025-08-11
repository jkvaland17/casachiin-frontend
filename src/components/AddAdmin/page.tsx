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
} from "@heroui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  CallCreateSubAdminCellHead,
  CallFindAllInstitutesForNORCET,
  CallGetAdminById,
  CallUploadFile,
} from "@/_ServerActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleCommonErrors } from "@/Utils/HandleError";
import { useSession } from "next-auth/react";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  instituteId?: string;
  designation: string;
  gender: string;
  dob: string;
  profile: any;
  profileImage: any;
  cellId: string;
  adminType?: string;
};
interface AddAdminProps {
  title: string;
  adminType: string;
}

const AddAdmin: React.FC<AddAdminProps> = ({ title, adminType }) => {
  const route = useRouter();
  const auth = useSession() as any;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profilePreview, setProfilePreview] = useState<any>(null);
  const [instituteList, setInstituteList] = useState<any>([]);
  const [loaderFile, setLoaderFile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cellName = auth?.data?.user?.cellName;
    if (adminType === "instituteAdmin" && cellName) {
      getAllInstitutesList(cellName);
    }
  }, [auth]);

  const getAllInstitutesList = async (cellName: string) => {
    setIsLoading(true);
    let params: any;

    if (cellName?.toLowerCase().includes("cre")) {
      params = `formTemplate=CRE&cellId=${auth?.data?.user?.data?.cellId}`;
    } else if (cellName?.toLowerCase().includes("norcet")) {
      params = `formTemplate=NORCET&cellId=${auth?.data?.user?.data?.cellId}`;
    }

    const { data, error } = (await CallFindAllInstitutesForNORCET(
      params,
    )) as any;
    console.log("data: ", data);

    if (data?.message === "Success") {
      setInstituteList(data?.data);
    }
    if (error) {
      handleCommonErrors(error);
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    try {
      data.cellId = auth?.data?.user?.data?.cellId;
      if (adminType === "instituteAdmin") {
        data["adminType"] = "institute";
      }
      const responseData = await CallCreateSubAdminCellHead(data);
      if (responseData?.data) {
        const dataResponse = responseData as any;
        toast.success(dataResponse?.data?.message);
        route.back();
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

  const handleLogoChange = async (e: any) => {
    try {
      setLoaderFile(true);
      if (e.target.files.length > 0) {
        setProfilePreview(URL.createObjectURL(e.target.files[0]));

        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const response = (await CallUploadFile(formData)) as any;
        setValue("profileImage", response.data?.data as any);
      } else {
        setProfilePreview(null);
      }
      setLoaderFile(false);
    } catch (error) {}
  };

  return (
    <>
      <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
        <CardHeader className="flex gap-3">
          <div className="flex w-full items-between w-100 gap-x-3 mt-3 text-2xl justify-between">
            <p>{title}</p>
            <Button onClick={() => route.back()}>
              <span className="material-symbols-outlined">arrow_back</span> Go
              Back
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              <Input
                isRequired
                {...register("name", { required: true })}
                isInvalid={errors?.name ? true : false}
                label="Name"
                type="text"
                placeholder="Enter name"
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
                label="Phone Number"
                type="number"
                placeholder="Enter Phone Number"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-envelope" />
                  </div>
                }
              />

              {adminType === "instituteAdmin" ? (
                <Select
                  isRequired
                  {...register("instituteId", { required: true })}
                  isInvalid={errors?.instituteId ? true : false}
                  label="Institute"
                  placeholder="Select Institute"
                  labelPlacement="outside"
                  items={instituteList}
                >
                  {(option: any) => (
                    <SelectItem title={option?.institute} key={option?._id}>
                      {option?.institute}
                    </SelectItem>
                  )}
                </Select>
              ) : (
                ""
              )}
              <Input
                {...register("password")}
                isInvalid={errors?.password ? true : false}
                autoComplete="new-password"
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
                    onClick={() => setIsVisible(!isVisible)}
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
                // isRequired
                {...register("designation")}
                // isInvalid={errors?.dob ? true : false}
                label="Designation"
                type="text"
                placeholder="Enter designation"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-calendar-week"></i>
                  </div>
                }
              />
              <Input
                // isRequired
                {...register("dob")}
                // isInvalid={errors?.dob ? true : false}
                label="Date of Birth"
                type="date"
                placeholder="Enter Date of Birth"
                labelPlacement="outside"
                radius="sm"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-calendar-week"></i>
                  </div>
                }
              />
              <Select
                // isRequired
                {...register("gender")}
                // isInvalid={errors?.gender ? true : false}
                label="Gender"
                placeholder="Gender"
                labelPlacement="outside"
                items={[
                  {
                    value: "male",
                    name: "Male",
                  },
                  {
                    value: "female",
                    name: "Female",
                  },
                ]}
              >
                {(option: any) => (
                  <SelectItem key={option?.value}>{option?.name}</SelectItem>
                )}
              </Select>
            </div>
            <div className="mt-3">
              {loaderFile ? (
                <div className="flex items-center justify-center h-96">
                  <Spinner />
                </div>
              ) : (
                <>
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
                          onChange={handleLogoChange}
                        />
                      </label>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="my-3 w-full flex items-center justify-center">
              <Button
                isLoading={isLoading}
                type="submit"
                radius="sm"
                color="primary"
                className="w-[200px]"
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

export default AddAdmin;
