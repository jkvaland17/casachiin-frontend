import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tab,
  Tabs,
} from "@heroui/react";
import { Calendar, Clock, TrendingUp, Users } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import StatsCard from "./StatsCard";
import { candidateStats } from "@/assets/data/screening/HodConfigStatsData";

type Props = {
  item: any;
};

function AdvertisementHODOverview({ item }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
  const advertisementId = item?.advertisementId;

  const handleScreeningRouting = (
    route: string,
    deptId: string,
    deptName: string,
    screeningData: any,
  ) => {
    setIsLoading((prev: any) => ({
      ...prev,
      [deptId]: true,
    }));
    if (typeof window !== "undefined") {
      if (advertisementId && deptId && screeningData) {
        sessionStorage.setItem("advertisementId", advertisementId);
        sessionStorage.setItem("departmentId", deptId);
        sessionStorage.setItem("AdvertisementDescription", item?.description);
        sessionStorage.setItem("AdvertisementValue", item?.value);
        sessionStorage.setItem("DepartmentName", deptName);
        sessionStorage.setItem("formTemplate", item?.formTemplate);
        sessionStorage.setItem(
          "screeningConfigID",
          screeningData?.screeningConfigId,
        );
        sessionStorage.setItem(
          "screeningLevel",
          screeningData?.screeningAttemptNumber,
        );
        router.push(route);
      }
    }
  };

  return (
    <>
      {/* Main Dashboard Card */}
      <Card className="shadow-lg mb-5">
        <CardHeader className="border-b bg-gray-50">
          <div className="space-y-2 px-2">
            <h2 className="text-xl font-bold text-gray-900 text-start">
              {item?.description}
            </h2>
            <Chip>{item?.value}</Chip>
          </div>
        </CardHeader>

        <CardBody className="pt-1 px-6 pb-6">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options" color="primary">
              {item?.screenings?.map((screeningItem: any) => (
                <Tab
                  key={screeningItem?.screeningConfigId}
                  title={`Level ${screeningItem?.screeningAttemptNumber}`}
                >
                  <div>
                    {/* Applications Statistics */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Applications
                      </h3>

                      <div className=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-4">
                        {candidateStats.map((stat, index) => (
                          <StatsCard
                            key={index}
                            count={screeningItem?.[stat.countKey] ?? 0}
                            label={stat.label}
                            bgColor={stat.bgColor}
                            borderColor={stat.borderColor}
                            textColor={stat.textColor}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Schedule Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Schedule
                      </h3>

                      <div className="space-y-4">
                        {screeningItem?.departments.map(
                          (dept: any, index: number) => (
                            <div
                              key={index}
                              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 text-lg mb-2">
                                    {dept.departmentName}
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                      <TrendingUp className="h-4 w-4 text-green-500" />
                                      <span className="font-medium">
                                        Started On:
                                      </span>
                                      <span>
                                        {dept.startDate
                                          ? moment(dept.startDate).format("LL")
                                          : "--/--/--"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  color="primary"
                                  className="ml-4"
                                  isLoading={isLoading?.[dept.departmentId]}
                                  onPress={() => {
                                    handleScreeningRouting(
                                      `/admin/screening/scrutiny-panel`,
                                      dept?.departmentId,
                                      dept?.departmentName,
                                      screeningItem,
                                    );
                                  }}
                                >
                                  Explore
                                </Button>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </Tab>
              ))}
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default AdvertisementHODOverview;
