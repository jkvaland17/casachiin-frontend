import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Tab,
  Tabs,
} from "@heroui/react";
import { Users, FileText } from "lucide-react";
import {
  ScreeningSummeryDepartmentStatsData,
  ScreeningSummeryApplicationStatsData,
} from "@/assets/data/screening/ScreeningData";
import StatsCard from "./HOD/StatsCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

type props = {
  data: any;
  showExploreBtn?: boolean;
};

export default function ScreeningSummaryStatCard({
  data,
  showExploreBtn = true,
}: props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<any>({});
  const [screeningConfigID, setScreeningConfigID] = useState<any>("");

  const handleScreeningRouting = (route: string, advertisementId: string) => {
    setIsLoading((prev: any) => ({
      ...prev,
      [advertisementId]: true,
    }));
    if (typeof window !== "undefined") {
      if (advertisementId) {
        sessionStorage.setItem("advertisementId", advertisementId);
        sessionStorage.setItem("screeningConfigID", screeningConfigID);
        router.push(route);
      }
    }
  };
  return (
    <div className="w-full">
      {data?.screenings?.length > 0 && (
        <Card className="shadow-md border border-slate-200 bg-white">
          <CardHeader className="border-b bg-gray-50">
            <div className="py-1 w-full">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800 leading-tight line-clamp-2">
                    {data?.description}
                  </h3>
                  <Chip size="sm" className="mt-1 text-xs">
                    {data?.value}
                  </Chip>
                </div>
                {showExploreBtn && (
                  <Button
                    size="sm"
                    color="primary"
                    isLoading={isLoading?.[data?._id]}
                    onPress={() => {
                      handleScreeningRouting(
                        `/admin/screening/screening-summery/details/${data?._id}`,
                        data?._id,
                      );
                    }}
                  >
                    Explore
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-4 pb-4 space-y-3">
            <div className="flex w-full flex-col">
              <Tabs
                aria-label="Options"
                color="primary"
                onSelectionChange={(selectedKey) => {
                  const selectedScreening = data?.screenings?.find(
                    (item: any) => item.screeningConfigId === selectedKey,
                  );
                  setScreeningConfigID(selectedScreening?.screeningConfigId);
                }}
              >
                {data?.screenings?.map((screeningItem: any) => (
                  <Tab
                    key={screeningItem?.screeningConfigId}
                    title={`Level ${screeningItem?.screeningAttemptNumber}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-semibold text-slate-700">
                            Department ({screeningItem?.departmentStats?.total}{" "}
                            Total)
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {ScreeningSummeryDepartmentStatsData?.map(
                            (stat: any, index: number) => (
                              <StatsCard
                                key={index}
                                count={
                                  screeningItem?.departmentStats?.[
                                    stat.countKey
                                  ]
                                }
                                label={stat.label}
                                bgColor={stat.bgColor}
                                borderColor={stat.borderColor}
                                textColor={stat.textColor}
                                icon={stat.icon}
                                forHOD={false}
                              />
                            ),
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 ">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-semibold text-slate-700">
                            Applications (
                            {screeningItem?.applicationsStats?.total} Total)
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="grid grid-cols-3  gap-2">
                            {ScreeningSummeryApplicationStatsData?.map(
                              (stat: any, index: number) => (
                                <StatsCard
                                  key={index}
                                  count={
                                    screeningItem?.applicationsStats?.[
                                      stat.countKey
                                    ]
                                  }
                                  label={stat.label}
                                  bgColor={stat.bgColor}
                                  borderColor={stat.borderColor}
                                  textColor={stat.textColor}
                                  forHOD={false}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
