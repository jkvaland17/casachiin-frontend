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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  // CallCreateAdmin,
  CallGetAllAdmin,
  CallGetSubAdmin,
  CallUpdateAdmin,
} from "@/_ServerActions";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { State, City } from "country-state-city";
import moment from "moment";

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  telephone: string;
  state: string;
  postalCode: string;
  city: string;
  presentAddress: string;
  description: string;
  logo: any;
  banner: any;
};

const ViewOrganization = () => {
  const { view: id } = useParams();
  const route = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [logoPreview, setLogoPreview] = useState<any>(null);
  const [bannerPreview, setBannerPreview] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userTypeId, setUserTypeId] = useState<string>("");
  const [logoFile, setLogoFile] = useState<any>(null);
  const [bannerFile, setBannerFile] = useState<any>(null);
  const [allAdmin, setAllAdmin] = useState<any[]>([]);
  console.log("allAdmin::: ", allAdmin);

  const toggleVisibility = () => setIsVisible(!isVisible);
  // org-662b516e3d18d86d96140197
  useEffect(() => {
    getAllList();
    getAllListAdmin();
  }, []);

  const getAllListAdmin = async () => {
    setIsLoading(true);
    const { data } = await CallGetSubAdmin("org", id);
    if (data) {
      const dataResponse = data as any;
      setAllAdmin(dataResponse?.data as any);
    }
    setIsLoading(false);
  };

  const getAllList = async () => {
    setIsLoading(true);
    const { data } = await CallGetAllAdmin();
    if (data) {
      const dataResponse = data as any;
      const findData = dataResponse?.data?.find(
        (item: any) => item?._id === id,
      );
      setValue("name", findData?.name);
      setValue("email", findData?.email);
      setValue("phone", findData?.phone);
      setValue("telephone", findData?.telephone);
      setValue("state", findData?.state);
      setValue("city", findData?.city);
      setValue("postalCode", findData?.postalCode);
      setValue("presentAddress", findData?.presentAddress);
      setValue("description", findData?.description);
      setLogoPreview(findData?.logo?.presignedUrl);
      setBannerPreview(findData?.banner?.presignedUrl);
      setUserTypeId(findData?.userType?._id);
    }
    setIsLoading(false);
  };

  const getState = State.getStatesOfCountry("IN")?.find(
    (state: any) => state?.isoCode === watch("state"),
  );

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("email", data?.email);
      formData.append("password", data?.password);
      formData.append("phone", data?.phone);
      formData.append("telephone", data?.telephone);
      formData.append("state", data?.state);
      formData.append("postalCode", data?.postalCode);
      formData.append("city", data?.city);
      formData.append("presentAddress", data?.presentAddress);
      formData.append("description", data?.description);
      formData.append("userType", userTypeId);
      if (logoFile) {
        formData.append("logo", logoFile);
      }
      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      const response = await CallUpdateAdmin(formData, id);
      if (response?.data) {
        const dataResponse = response as any;
        toast.success(dataResponse?.data?.message);
        setIsEdit(false);
        getAllList();
        getAllListAdmin();
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
    }
  };

  const handleLogoChange = (e: any) => {
    if (e.target.files.length > 0) {
      setLogoFile(e.target.files[0]);
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setLogoPreview(null);
    }
  };

  const handleBannerChange = (e: any) => {
    if (e.target.files.length > 0) {
      setBannerFile(e.target.files[0]);
      setBannerPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setBannerPreview(null);
    }
  };

  return (
    <>
      {isEdit ? (
        <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
          <CardHeader className="flex gap-3">
            <div className="flex w-full items-center gap-x-3 mt-3 mb-2 text-2xl justify-between">
              <p>Update Organization</p>
              <div className="flex gap-2 items-center">
                <p className="text-lg">Status</p>
                <Switch defaultSelected></Switch>
              </div>
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
                  label="Organization Name"
                  type="text"
                  placeholder="Enter organization name"
                  labelPlacement="outside"
                  radius="sm"
                  startContent={
                    <div className="pr-2">
                      <i className="fa-solid fa-sitemap" />
                    </div>
                  }
                />

                <Input
                  variant="bordered"
                  isRequired
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
                  variant="bordered"
                  isRequired
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

                <Input
                  variant="bordered"
                  {...register("telephone")}
                  label="Telephone number"
                  type="number"
                  placeholder="Enter mobile number"
                  labelPlacement="outside"
                  radius="sm"
                  startContent={
                    <div className="pr-2">
                      <i className="fa-solid fa-tty" />
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
                    <SelectItem key={option?.isoCode}>
                      {option?.name}
                    </SelectItem>
                  )}
                </Select>

                <Input
                  variant="bordered"
                  isRequired
                  {...register("postalCode")}
                  label="Pincode"
                  type="number"
                  placeholder="Enter pincode"
                  labelPlacement="outside"
                  radius="sm"
                  startContent={
                    <div className="pr-2">
                      <i className="fa-solid fa-tty" />
                    </div>
                  }
                />

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

                <div className="col-span-2">
                  <Textarea
                    {...register("presentAddress")}
                    label="Address"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="col-span-2">
                  <Textarea
                    {...register("description")}
                    label="Description"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter your description"
                  />
                </div>

                <div className="relative">
                  <label>Logo upload</label>
                  {logoPreview ? (
                    <>
                      <img
                        className="h-36 object-cover rounded-md mt-3"
                        src={logoPreview}
                        alt="Current logo preview"
                      />
                      <div
                        onClick={() => {
                          setValue("logo", null);
                          setLogoPreview(null);
                        }}
                        className="cursor-pointer w-fit absolute top-0 left-32"
                      >
                        <i className="fa-solid fa-circle-xmark text-gray-800" />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full mt-3">
                      <label
                        htmlFor="dropzone-file-logo"
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
                            or drag and drop Logo
                          </p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
                        </div>
                        <input
                          {...register("logo")}
                          id="dropzone-file-logo"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleLogoChange}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label>Banner upload</label>
                  {bannerPreview ? (
                    <>
                      <img
                        className="h-36 object-cover rounded-md mt-3"
                        src={bannerPreview}
                        alt="Current banner preview"
                      />
                      <div
                        onClick={() => {
                          setValue("banner", null);
                          setBannerPreview(null);
                        }}
                        className="cursor-pointer w-fit absolute top-0 left-32"
                      >
                        <i className="fa-solid fa-circle-xmark text-gray-800" />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full mt-3">
                      <label
                        htmlFor="dropzone-file-banner"
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
                            or drag and drop banner
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG</p>
                        </div>
                        <input
                          {...register("banner")}
                          id="dropzone-file-banner"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleBannerChange}
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
                  Update
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      ) : (
        <>
          <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
            <CardHeader className="flex gap-3">
              <div className="flex w-full items-center gap-x-3 mt-3 text-2xl justify-between">
                <p>Organization Details</p>
                <Button onClick={() => route.back()}>
                  <span className="material-symbols-outlined">arrow_back</span>{" "}
                  Go Back
                </Button>
                {/* <div className="flex gap-2 items-center">
                  <Tooltip content="Edit" color="primary">
                    <Button
                      onClick={() => setIsEdit(true)}
                      variant="light"
                      className="rounded-full"
                    >
                      <i className="fa-solid fa-pen-to-square text-xl" />
                    </Button>
                  </Tooltip>
                </div> */}
              </div>
            </CardHeader>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <CardBody>
              <div className="w-full">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <tbody>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          Organization Name:
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {watch("name") || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          Email address:
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {watch("email") || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          Mobile number:
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {watch("phone") || "-"}
                        </td>
                      </tr>
                      {watch("telephone") && (
                        <tr>
                          <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                            Telephone number:
                          </td>
                          <td className="px-4 py-2 border border-gray-200">
                            {watch("telephone") || "-"}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          State:
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {getState?.name || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          City:
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {watch("city") || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          Pincode:
                        </td>
                        <td className="px-4 py-2 border border-gray-200">
                          {watch("postalCode") || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          Address:
                        </td>
                        <td
                          className="px-4 py-2 border border-gray-200"
                          colSpan={2}
                        >
                          {watch("presentAddress") || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          Description:
                        </td>
                        <td
                          className="px-4 py-2 border border-gray-200"
                          colSpan={2}
                        >
                          {watch("description") || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          Logo:
                        </td>
                        <td
                          className="px-4 py-2 border border-gray-200"
                          colSpan={2}
                        >
                          <div className="h-24 w-24 rounded-lg">
                            <img
                              src={logoPreview}
                              alt="No-Logo"
                              className="w-full"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold px-4 py-2 border border-gray-200 w-52">
                          Banner:
                        </td>
                        <td
                          className="px-4 py-2 border border-gray-200"
                          colSpan={2}
                        >
                          <div className="h-24 w-24 rounded-lg">
                            <img
                              src={bannerPreview}
                              alt="NO-Banner"
                              className="w-full"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      )}
      <br />

      <Table
        topContent={<h1 className="text-lg">Organization Admin/Cell List</h1>}
      >
        <TableHeader>
          <TableColumn>Sr. No</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Designation</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Date</TableColumn>
        </TableHeader>
        <TableBody
          emptyContent={"No data found."}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {allAdmin?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {item?.name}
                <span className="text-gray-500 text-sm">
                  {" "}
                  {item?.isMainAdmin && "(main admin)"}
                </span>
              </TableCell>
              <TableCell>{item?.designation}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.phone}</TableCell>
              <TableCell>
                {moment(item?.created_at).format("DD-MM-YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <br />
    </>
  );
};

export default ViewOrganization;
