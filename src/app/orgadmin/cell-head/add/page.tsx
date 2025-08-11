"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  CallAllPositions,
  CallCellMasterData,
  CallCreateAdmin,
  CallGetAllUserType,
} from "@/_ServerActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { State, City } from "country-state-city";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  state: string;
  city: string;
  title: string;
  presentAddress: string;
  permanentAddress: string;
  profile: any;
  position: string;
  parentId: string;
};

const Add = () => {
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
  const [allLabel, setAllLabel] = useState<any>([]);
  const [position, setPosition] = useState("");
  const [userType, setUserType] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    getAllListType();
    getPositionList();
  }, []);

  useEffect(() => {
    getAllList();
  }, [userTypeId]);

  const getAllListType = async () => {
    try {
      setIsLoading(true);
      const { data } = await CallGetAllUserType();
      if (data) {
        const dataResponse = data as any;
        const useTypeIdGet = dataResponse?.data?.find(
          (item: any) => item?.type === "admin",
        );
        const useTypeId = dataResponse?.data?.find(
          (item: any) => item?.type === "label",
        );
        setUserTypeId(useTypeIdGet?._id);
        setUserType(useTypeId?._id);
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
          (item: any) => item?.value === "Head",
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

  const getAllList = async () => {
    setIsLoading(true);
    const { data } = await CallCellMasterData(
      userType,
      auth?.data?.user?.data?.parentId,
      "Cell",
    );

    if (data) {
      const dataResponse = data as any;
      setAllLabel(dataResponse?.data as any);
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const formData = new FormData() as any;
      formData.append("name", data?.name);
      formData.append("email", data?.email);
      formData.append("password", data?.password);
      formData.append("phone", data?.phone);
      formData.append("dob", data?.dob);
      formData.append("state", data?.state);
      formData.append("city", data?.city);
      formData.append("title", data?.title);
      formData.append("presentAddress", data?.presentAddress);
      formData.append("permanentAddress", data?.permanentAddress);
      formData.append("profileImage", profileFile);

      formData.append("parentId", data?.parentId);
      formData.append("userType", userTypeId);
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

  const handleLogoChange = (e: any) => {
    if (e.target.files.length > 0) {
      setProfileFile(e.target.files[0]);
      setProfilePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setProfilePreview(null);
    }
  };

  return (
    <>
      <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
        <CardHeader className="flex gap-3">
          <div className="flex w-full items-center gap-x-3 mt-3 mb-2 text-2xl justify-between">
            <p>Add Cell Head</p>
            <div className="flex gap-2 items-center">
              <p className="text-lg">Status</p>
              <Switch defaultSelected></Switch>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
              <Select
                variant="bordered"
                isRequired
                {...register("parentId")}
                items={allLabel}
                label="Cell"
                placeholder="Select label"
                labelPlacement="outside"
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-flag-usa" />
                  </div>
                }
              >
                {(option: any) => (
                  <SelectItem key={option?._id}>{option?.name}</SelectItem>
                )}
              </Select>
              <Input
                isRequired
                variant="bordered"
                {...register("name")}
                className={`${errors?.name && "border border-red-600"}`}
                label="Admin Name"
                type="text"
                placeholder="Enter admin name"
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
                variant="bordered"
                {...register("email")}
                className={`${errors?.email && "border border-red-600"}`}
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
                variant="bordered"
                {...register("phone")}
                className={`${errors?.phone && "border border-red-600"}`}
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
              <Input
                variant="bordered"
                isRequired
                {...register("password")}
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
                variant="bordered"
                {...register("dob")}
                className={`${errors?.dob && "border border-red-600"}`}
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
                variant="bordered"
                isRequired
                {...register("state")}
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
                  <SelectItem key={option?.isoCode}>{option?.name}</SelectItem>
                )}
              </Select>
              <Select
                variant="bordered"
                isRequired
                {...register("city")}
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
                variant="bordered"
                labelPlacement="outside"
                placeholder="Enter your address"
              />
              <Textarea
                {...register("permanentAddress")}
                label="Permanent Address"
                variant="bordered"
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
                          <span className="font-semibold">Click to upload</span>{" "}
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
              </div>
            </div>

            <div className="my-3 w-full flex items-center justify-center">
              <Button
                isLoading={isLoading}
                type="submit"
                radius="sm"
                color="primary"
                className="w-[300px] rounded-sm mt-5"
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
