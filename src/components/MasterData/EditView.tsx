"use client";
import { handleCommonErrors } from "@/Utils/HandleError";
import { CallGetCategoriesId, CallUpdateMasterData } from "@/_ServerActions";
import { Card, CardBody, CardHeader, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ScreenLoader from "../ScreenLoader";
import EditAdvertis from "./EditSection/EditAdvertis";
import DefaultEdit from "./EditSection/DefaultEdit";
import EditNoticeResult from "./EditSection/EditNoticeResult";

type FormData = {
  value: string;
  description: string;
  id: string;
  status: boolean;
};

type ListProps = {
  title: string;
  route: string;
  slug: any;
};

const ViewEdit: React.FC<ListProps> = ({ title, route, slug }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [Data, setData] = useState<any>(null);

  useEffect(() => {
    if (slug.length === 3) {
      setType(slug[2]);
      setId(slug[1]);
    } else {
      router.back();
    }
  }, [slug]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (id) {
      getAllList();
    }
  }, [id]);

  const getAllList = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await CallGetCategoriesId(id);
      if (data) {
        const dataResponse = data as any;
        setData({
          ...Data,
          id: dataResponse.data._id,
          ...dataResponse?.data,
        });
      }
      if (error) {
        handleCommonErrors(error);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await CallUpdateMasterData(Data);
      if (response?.data) {
        const dataResponse = response as any;
        toast.success(dataResponse?.data?.message);
        router.push(`/admin/master/master-data/${route}`);
      }
      if (response?.error) {
        console.log("error::: ", response?.error);
        toast.error(response?.error);
        setIsLoading(false);
      }
      if (response?.error) {
        handleCommonErrors(response?.error);
      }
    } catch (error) {
      console.log("error::: ", error);
      const dataResponse = error as any;
      toast.error(dataResponse?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {type === "view" && (
        <Card className="max-w-full px-4 rounded-lg bg-[#fdfdfd]">
          <CardHeader className="flex gap-3 px-0 md:px-2">
            <div className="flex w-full items-center gap-x-3 mt-3 text-xl">
              <div className="flex gap-2 items-center">
                <Tooltip content="Back" color="primary">
                  <button
                    onClick={() =>
                      router.push(`/admin/master/master-data/${route}`)
                    }
                    className="me-2"
                  >
                    <i className="fa-solid fa-arrow-left text-xl" />
                  </button>
                </Tooltip>
              </div>
              <p className="text-xl font-medium">{title} Details</p>
            </div>
          </CardHeader>
          <CardBody className="px-0 md:px-2">
            <div className="w-full">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <tbody>
                    <tr>
                      <td className="font-semibold px-4 py-2 border border-gray-200 w-80">
                        Name:
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {Data?.value || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold px-4 py-2 border border-gray-200">
                        Description:
                      </td>
                      <td className="px-4 py-2 border border-gray-200">
                        {Data?.description || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {type === "edit" && slug[0] === "advertisement" ? (
        <EditAdvertis slugData={slug} />
      ) : type === "edit" &&
        (slug[0] === "result" ||
          slug[0] === "notice" ||
          slug[0] === "notification") ? (
        <EditNoticeResult slug={slug} />
      ) : (
        <>
          {isLoading && <ScreenLoader />}
          {type === "edit" && (
            <DefaultEdit
              setData={setData}
              Data={Data}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              title={title}
              register={register}
              errors={errors}
              router={router}
              route={route}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ViewEdit;
