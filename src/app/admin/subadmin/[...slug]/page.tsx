"use client";
import {
  CallAllTransition,
  CallCreatePermission,
  CallGetPermissionByUserId,
  CallUpdatePermission,
} from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Checkbox,
  Radio,
  RadioGroup,
  Skeleton,
} from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserConfigurationId = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [Loading, setLoading] = useState<boolean>(true);
  const [LoadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [dataList, setDataList] = useState<any>([
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: "monitoring",
      show: false,
      layout: "/admin",
    },
     {
      path: "/MarriageForm",
      name: "Marriage Certificate",
      icon: "monitoring",
      show: false,
      layout: "/admin",
    },
      {
      path: "/marriageRegistration",
      name: "Marriage Registration",
      icon: "monitoring",
      show: false,
      layout: "/admin",
    },
  ]);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [selected, setSelected] = useState("no");

  useEffect(() => {
    getData();
  }, []);

  // Example Usage

  const getData = async () => {
    try {
      setLoading(true);
      const { data, error } = (await CallGetPermissionByUserId(slug[0])) as any;
      console.log("data::: ", data);
      if (data?.data) {
        setIsCreated(data?.data?.length > 0);
        if (data?.data?.length > 0) {
          setSelected(data?.is2FARequired ? "yes" : "no");
          const final = dataList.map((item: any) => {
            const updatedItem = data?.data?.find(
              (newItem: any) => newItem.path === item.path,
            );
            if (updatedItem) {
              return { ...item, ...updatedItem };
            }
            return item;
          });
          setDataList(final);
        }
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (
    isSelected: boolean,
    index: number,
    subIndex?: number,
  ) => {
    setDataList((prevData: any) => {
      const updatedData = [...prevData];
      if (subIndex === undefined) {
        updatedData[index].show = isSelected;
        if (updatedData[index].views) {
          updatedData[index].views = updatedData[index].views.map(
            (view: any) => ({
              ...view,
              show: isSelected,
            }),
          );
        }
      } else {
        updatedData[index].views[subIndex].show = isSelected;
        const isAnySubSelected = updatedData[index].views.some(
          (view: any) => view.show,
        );
        updatedData[index].show = isAnySubSelected;
      }
      return updatedData;
    });
  };

  const saveCreatePermission = async () => {
    try {
      setLoadingBtn(true);
      const dto = {
        userId: slug[0],
        routes: dataList,
        // is2FARequired: selected === "yes",
      };
      const { data: response, error } = isCreated
        ? ((await CallUpdatePermission(dto)) as any)
        : ((await CallCreatePermission(dto)) as any);
      console.log("response", response);
      if (response?.data) {
        toast.success(response?.message);
        router.back();
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoadingBtn(false);
    } catch (error) {
      console.log("error::: ", error);
      setLoadingBtn(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <Button onClick={() => router.back()}>
          <span className="material-symbols-outlined">arrow_back</span> Go Back
        </Button>
      </div>
      {Loading ? (
        <>
          <Card>
            <CardBody>
              {Array.from({ length: 4 })?.map((ele, i) => (
                <div key={i} className="w-full flex items-center gap-3">
                  <div className="w-full flex flex-col gap-2 my-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </>
      ) : (
        <>
          <div>
            {/* <Card className="my-3">
              <CardBody>
                <div className="flex gap-x-2">
                  <p>Is 2FA required for this member?</p>
                  <RadioGroup
                    value={selected}
                    onValueChange={setSelected}
                    orientation="horizontal"
                  >
                    <Radio value={"yes"}>Yes</Radio>
                    <Radio value="no">No</Radio>
                  </RadioGroup>
                </div>
              </CardBody>
            </Card> */}
            <h1 className="text-xl">Features</h1>
            {dataList?.map((item: any, index: number) => (
              <Card key={index} className="my-3">
                <CardBody>
                  <div>
                    <div
                      className={`${item?.views?.length > 0 && "border-b pb-2 mb-2"} flex items-center`}
                    >
                      <Checkbox
                        isSelected={item.show}
                        onValueChange={(isSelected) =>
                          handleCheckboxChange(isSelected, index)
                        }
                      />
                      <span className="ml-2">{item.name}</span>
                    </div>
                    {item.views && (
                      <div className="ml-5">
                        {item.views.map((subItem: any, subIndex: number) => (
                          <div
                            key={subIndex}
                            className="flex items-center mb-2"
                          >
                            <Checkbox
                              isSelected={subItem.show}
                              onValueChange={(isSelected) =>
                                handleCheckboxChange(
                                  isSelected,
                                  index,
                                  subIndex,
                                )
                              }
                            />
                            <span className="ml-2">{subItem.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="flex justify-end w-full gap-2 mb-3">
            <Button
              isLoading={LoadingBtn}
              color="primary"
              variant="solid"
              size="lg"
              radius="sm"
              className="mt-3"
              onPress={saveCreatePermission}
            >
              {isCreated ? "Update" : "Create"}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default UserConfigurationId;
