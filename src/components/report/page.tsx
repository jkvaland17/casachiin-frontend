"use client";
import {
  CallFindAllGroupWiseCount,
  CallFindAllStateCountPreferencesWise,
} from "@/_ServerActions";
import {
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  Spinner,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@heroui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { handleCommonErrors } from "@/Utils/HandleError";
import {
  DownloadExcelScreening,
  DownloadExcelUsingPostMethod,
} from "@/Utils/DownloadExcel";
import GlobalAdvertisementFields from "@/components/Global/Advertisement/Fields";
import { useRouter } from "next/navigation";

type FilterData = {
  candidateId: string;
  candidate_name: string;
  advertisement_noId: string | any;
  group: string | any;
  applicationStatus: string | any;
  paymentStatus: string[] | any;
};

const Reports: React.FC<any> = () => {
  const { data: session } = useSession() as any;
  const router = useRouter() as any;
  const token = session?.user?.token;
  const [loading, setloading] = useState<boolean>(false);
  const [cityStateLoader, setCityStateLoader] = useState<any>(false);
  const [groupwiseCountData, setGroupwiseCountData] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<any>("Groupwise Count");
  const [filterData, setFilterData] = useState<FilterData>({
    candidateId: "",
    candidate_name: "",
    advertisement_noId: "",
    group: "",
    paymentStatus: ["all"],
    applicationStatus: "",
  });
  const [dataStateList, setDataStateList] = useState<any[]>([]);
  const [template, setTemplate] = useState<string>("");

  useEffect(() => {
    if (filterData?.advertisement_noId) {
      getAllApplicationPreference(
        filterData.advertisement_noId,
        filterData.applicationStatus,
        filterData.paymentStatus,
      );
    } else {
      setDataStateList([]);
      setGroupwiseCountData([]);
    }
  }, [
    selectedTab,
    filterData.applicationStatus,
    filterData.advertisement_noId,
  ]);

  const getAllApplicationPreference = async (
    advertisementId: any,
    applicationStatus: string,
    paymentStatus: string[],
  ) => {
    setloading(true);
    try {
      let params: any;
      if (selectedTab === "State Wise Preference Count") {
        params = { advertisement_noId: advertisementId };
        if (applicationStatus) {
          params["applicationStatus"] = applicationStatus;
        }
        if (paymentStatus && !paymentStatus.includes("all")) {
          params["paymentStatus"] = paymentStatus;
        }
      } else if (selectedTab === "Groupwise Count") {
        params = `advertisement_noId=${advertisementId}`;
      }

      const fetchFunction =
        selectedTab === "State Wise Preference Count"
          ? CallFindAllStateCountPreferencesWise
          : CallFindAllGroupWiseCount;

      const responseData = (await fetchFunction(params)) as any;
      const { data, error } = responseData;
      if (data?.data) {
        if (selectedTab === "State Wise Preference Count") {
          setDataStateList(data.data);
        } else if (selectedTab === "Groupwise Count") {
          setGroupwiseCountData(data.data);
        }
      }

      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.error("Error fetching preferences: ", error);
    } finally {
      setloading(false);
    }
  };
  const handleTabChange = (tabName: string | number) => {
    setSelectedTab(tabName);
    setFilterData({
      ...filterData,
      paymentStatus: ["all"],
      applicationStatus: "",
    });
  };
  const renderCell = useCallback(
    (row: any, columnKey: any, groupwiseData: any) => {
      const cellValue = row[columnKey];

      switch (columnKey) {
        case "index":
          return groupwiseData?.length === row?.index ? "Total" : cellValue;
        case "groupId":
          return cellValue?.value || "";
        case "groupCode":
          return cellValue || "";
        default:
          return cellValue;
      }
    },
    [],
  );
  const handlePaymentFilter = (e: any) => {
    const selectedValues = Array.from(e);

    const updatedPaymentStatus: any =
      selectedValues[selectedValues.length - 1] === "all"
        ? ["all"]
        : selectedValues.filter((item: any) => item !== "all" || item === "");

    setFilterData((prevData) => ({
      ...prevData,
      paymentStatus: updatedPaymentStatus,
    }));
    getAllApplicationPreference(
      filterData.advertisement_noId,
      filterData.applicationStatus,
      updatedPaymentStatus,
    );
  };
  const downloadStateWiseExcel = () => {
    let params: any = { _id: filterData?.advertisement_noId };
    if (filterData.applicationStatus) {
      params["applicationStatus"] = filterData.applicationStatus;
    }
    if (filterData.paymentStatus && !filterData.paymentStatus.includes("all")) {
      params["paymentStatus"] = filterData.paymentStatus;
    }
    DownloadExcelUsingPostMethod(
      params,
      setCityStateLoader,
      token,
      "getApplicationCityStatePreference",
      "State Wise Preference Count List",
    );
  };
  const columnCRE = [
    {
      label: "Sr. No.",
      key: "index",
    },
    {
      label: "State",
      key: "state",
    },
    {
      label: "Preference 1",
      key: "preference1",
    },
    {
      label: "Preference 2",
      key: "preference2",
    },
    {
      label: "Preference 3",
      key: "preference3",
    },
    {
      label: "Preference 4",
      key: "preference4",
    },
  ];

  const columnNORCET = [
    {
      label: "Sr. No.",
      key: "index",
    },
    {
      label: "State",
      key: "state",
    },
    {
      label: "City",
      key: "city",
    },
    {
      label: "Preference 1",
      key: "choice1Count",
    },
    {
      label: "Preference 2",
      key: "choice2Count",
    },
    {
      label: "Preference 3",
      key: "choice3Count",
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="">
          <p className="text-2xl font-medium text-start md:mb-0">
            Detailed Application Count Data
          </p>
        </div>
        <div className="">
          <Button onClick={() => router.back()}>
            <span className="material-symbols-outlined">arrow_back</span> Go
            Back
          </Button>
        </div>{" "}
      </div>
      <Card>
        <CardBody className="mainCardBody p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 items-center mb-4 ">
            <div className="col-span-3">
              <GlobalAdvertisementFields
                value={filterData?.advertisement_noId}
                setValue={(id: any, temp: string) => {
                  setTemplate(temp);
                  setFilterData({
                    ...filterData,
                    advertisement_noId: id,
                  });
                }}
              />
            </div>
            {selectedTab === "State Wise Preference Count" ? (
              <>
                <div className="col-span-1">
                  <Select
                    labelPlacement="outside"
                    classNames={{ label: "text-md" }}
                    label="Application Status"
                    items={[
                      { label: "All", value: "" },
                      {
                        label: "Pending",
                        value: "pending",
                      },
                      {
                        label: "Submitted",
                        value: "submitted",
                      },
                    ]}
                    selectedKeys={[filterData.applicationStatus]}
                    onSelectionChange={(e: any) => {
                      const selectedValue = Array.from(e)[0];
                      setFilterData({
                        ...filterData,
                        applicationStatus: selectedValue ?? "",
                      });
                    }}
                    placeholder="-- Select --"
                    startContent={
                      <span className="material-symbols-outlined">
                        post_add
                      </span>
                    }
                  >
                    {(option: any) => (
                      <SelectItem key={option?.value}>
                        {option?.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
                <div className="col-span-1">
                  <Select
                    labelPlacement="outside"
                    classNames={{ label: "text-md" }}
                    label="Payment Status"
                    selectionMode="multiple"
                    items={[
                      { label: "All", value: "all" },
                      { label: "Paid", value: "Completed" },
                      { label: "Exempted", value: "Exempted" },
                      {
                        label: "Partial",
                        value: "Partial",
                      },
                      {
                        label: "Pending",
                        value: "Pending",
                      },
                    ]}
                    selectedKeys={[...filterData.paymentStatus]}
                    onSelectionChange={handlePaymentFilter}
                    placeholder="-- Select --"
                    startContent={
                      <span className="material-symbols-outlined">
                        post_add
                      </span>
                    }
                  >
                    {(option: any) => (
                      <SelectItem key={option?.value}>
                        {option?.label}
                      </SelectItem>
                    )}
                  </Select>
                </div>
                {dataStateList?.length > 0 ? (
                  <div className="col-span-1 flex items-center justify-end">
                    <Button
                      isDisabled={cityStateLoader}
                      type="submit"
                      color="primary"
                      radius="sm"
                      isLoading={cityStateLoader}
                      onClick={downloadStateWiseExcel}
                    >
                      Download State Wise Data
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              <div className="col-span-3 flex items-center justify-end">
                <Button
                  isDisabled={cityStateLoader}
                  type="submit"
                  color="primary"
                  radius="sm"
                  isLoading={cityStateLoader}
                  onClick={() => {
                    DownloadExcelScreening(
                      `advertisement_noId=${filterData?.advertisement_noId}`,
                      setCityStateLoader,
                      token,
                      "getAllGroupWiseExcel",
                      "Group Wise Count Data",
                    );
                  }}
                >
                  Download Group Wise Count Data
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      <Card className="flex w-full flex-col my-5">
        <Tabs
          variant="underlined"
          color="primary"
          aria-label="Options"
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
          classNames={{
            panel: "p-0",
            tabList: "pt-2 ps-2",
            tabContent: "text-[17px]",
          }}
        >
          <Tab
            key="State Wise Preference Count"
            title="State Wise Preference Count"
            className="p-3"
          >
            {loading ? (
              <div className="flex my-5 justify-center items-center w-full h-full">
                <Spinner />
              </div>
            ) : dataStateList?.length > 0 ? (
              <Table
                shadow="none"
                isHeaderSticky
                isStriped
                border={0}
                className={`my-3 col-span-full`}
                classNames={{
                  base: "max-h-[720px]",
                  table: "min-h-[420px] overflow-y-scroll",
                  thead: "top-[-16px]",
                }}
              >
                <TableHeader
                  columns={template === "CRE" ? columnCRE : columnNORCET}
                  className="top-[-10px]"
                >
                  {(column) => (
                    <TableColumn
                      className={
                        column.key === "state" || column.key === "city"
                          ? ""
                          : "text-center"
                      }
                      key={column.key}
                    >
                      {column.label}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody>
                  {dataStateList.map((item, index) =>
                    template === "CRE" ? (
                      item.state && (
                        <TableRow
                          key={index}
                          className={`border-b-1 ${item.state === "Total" ? "bg-blue-500 text-white font-medium text-lg" : ""}`}
                        >
                          <TableCell
                            className={
                              item.state === "Total"
                                ? "font-medium text-lg text-center"
                                : "text-center"
                            }
                          >
                            {item.state === "Total" ? "" : index + 1}
                          </TableCell>
                          <TableCell
                            className={
                              item.state === "Total"
                                ? "font-medium text-lg"
                                : ""
                            }
                          >
                            {item.state || "-"}
                          </TableCell>
                          {item.preferences.map((pref: any, idx: number) => (
                            <TableCell
                              className={
                                item.state === "Total"
                                  ? "font-medium text-lg text-center "
                                  : "text-center"
                              }
                              key={idx}
                            >
                              {pref.count}
                            </TableCell>
                          ))}
                        </TableRow>
                      )
                    ) : (
                      <TableRow
                        key={index}
                        className={`border-b-1 ${item.state === "Total" ? "bg-blue-500 text-white font-medium text-lg" : ""}`}
                      >
                        <TableCell
                          className={
                            item.state === "Total"
                              ? "font-medium text-lg text-center"
                              : "text-center"
                          }
                        >
                          {item.state === "Total" ? "" : index + 1}
                        </TableCell>
                        <TableCell
                          className={
                            item.state === "Total" ? "font-medium text-lg" : ""
                          }
                        >
                          {item.state || "-"}
                        </TableCell>
                        <TableCell
                          className={
                            item.state === "Total" ? "font-medium text-lg " : ""
                          }
                        >
                          {item.city || "-"}
                        </TableCell>
                        <TableCell
                          className={
                            item.state === "Total"
                              ? "font-medium text-lg text-center"
                              : "text-center"
                          }
                        >
                          {item.choice1Count}
                        </TableCell>
                        <TableCell
                          className={
                            item.state === "Total"
                              ? "font-medium text-lg text-center"
                              : "text-center"
                          }
                        >
                          {item.choice2Count}
                        </TableCell>
                        <TableCell
                          className={
                            item.state === "Total"
                              ? "font-medium text-lg text-center"
                              : "text-center"
                          }
                        >
                          {item.choice3Count}
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            ) : (
              <div className="my-5 py-5">
                {" "}
                <p className="text-center mt-2 font-[400] text-3xl">
                  No data available!
                </p>{" "}
              </div>
            )}
          </Tab>
          {template === "CRE" && (
            <Tab key="Groupwise Count" title="Groupwise Count">
              {loading ? (
                <div className="flex my-5 justify-center items-center w-full h-full">
                  <Spinner />
                </div>
              ) : groupwiseCountData?.length > 0 ? (
                <Table
                  shadow="none"
                  isHeaderSticky
                  isStriped
                  border={0}
                  className={`my-3 col-span-full`}
                  classNames={{
                    base: "max-h-[720px]",
                    table: "min-h-[420px] overflow-y-scroll",
                    thead: "top-[-16px]",
                  }}
                >
                  <TableHeader
                    columns={[
                      {
                        label: "Sr. No.",
                        key: "index",
                      },
                      {
                        label: "Group Code",
                        key: "groupCode",
                      },
                      {
                        label: "Group Name",
                        key: "groupId",
                      },
                      {
                        label: "Pending (Payment Status)",
                        key: "PendingCount",
                      },
                      {
                        label: "Partial (Payment Status)",
                        key: "PartialCount",
                      },
                      {
                        label: "Paid (Payment Status)",
                        key: "CompletedCount",
                      },
                      {
                        label: "Exempted (Payment Status)",
                        key: "ExemptedCount",
                      },
                      {
                        label: "Paid + Exempted (Payment Status)",
                        key: "PaidPlusExemptedCount",
                      },
                      {
                        label: "Pending (Application Status)",
                        key: "ApplicationPendingCount",
                      },
                      {
                        label: "Submitted (Application Status)",
                        key: "ApplicationCompletedCount",
                      },
                      {
                        label: "Total Applications",
                        key: "totalCount",
                      },
                    ]}
                  >
                    {(column) => (
                      <TableColumn className="text-center" key={column.key}>
                        {column.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={groupwiseCountData.map(
                      (item: any, index: number) => ({
                        ...item,
                        index: index + 1,
                      }),
                    )}
                  >
                    {(item) => (
                      <TableRow key={item.index}>
                        {(columnKey) => (
                          <TableCell
                            className={`text-wrap ${columnKey !== "groupId" && "text-center"} ${groupwiseCountData?.length === item?.index ? "bg-blue-500 text-white font-medium text-lg" : ""}`}
                          >
                            {renderCell(item, columnKey, groupwiseCountData)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              ) : (
                <div className="my-5 py-5">
                  {" "}
                  <p className="text-center mt-2 font-[400] text-3xl">
                    No data available!
                  </p>{" "}
                </div>
              )}
            </Tab>
          )}
        </Tabs>
      </Card>
    </div>
  );
};

export default Reports;
