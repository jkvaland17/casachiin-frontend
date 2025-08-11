import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import React, { Children, useEffect, useState } from "react";
import BackButton from "../BackButton";
import {
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  UsersRound,
} from "lucide-react";

type Props = {
  children?: any;
  departmentTitle?: any;
  committeeTitle?: any;
};

function AdvtDeptInfo({ children, departmentTitle, committeeTitle }: Props) {
  const [filterData, setFilterData] = useState<any>({
    AdvertisementDescription: "",
    AdvertisementValue: "",
    DepartmentName: "",
    ScreeningLevel: "",
  });
  useEffect(() => {
    setFilterData({
      ...filterData,
      AdvertisementDescription: sessionStorage.getItem(
        "AdvertisementDescription",
      ),
      AdvertisementValue: sessionStorage.getItem("AdvertisementValue"),
      DepartmentName: sessionStorage.getItem("DepartmentName"),
      ScreeningLevel: sessionStorage.getItem("screeningLevel"),
    });
  }, []);
  return (
    <Card className="mb-2">
      <CardHeader className="border-b bg-gray-50">
        <div className="space-y-2 px-2">
          <h2 className="text-xl font-bold text-gray-900 text-start">
            {filterData?.AdvertisementDescription}
          </h2>
          <Chip>{filterData?.AdvertisementValue}</Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex justify-between items-center w-full gap-3 mb-1">
          <h3 className="text-base flex items-center gap-2 font-semibold">
            <ChartNoAxesColumnIncreasing className="h-3 w-3 text-gray-700" />
            <span className="text-gray-700">Screening Level :</span>{" "}
            {filterData?.ScreeningLevel}
          </h3>
        </div>
        <div className="flex justify-between items-center w-full gap-3 mb-1">
          <h3 className="text-base flex items-center gap-2 font-semibold">
            <ClipboardList className="h-3 w-3 text-gray-700" />
            <span className="text-gray-700">Department :</span>{" "}
            {departmentTitle ? departmentTitle : filterData?.DepartmentName}
          </h3>
          <BackButton />
        </div>
        {committeeTitle && (
          <h3 className="text-base flex items-center gap-2 font-semibold">
            <UsersRound className="h-3 w-3 text-gray-700" />
            <span className="text-gray-700">Committee :</span> {committeeTitle}
          </h3>
        )}

        {children}
      </CardBody>
    </Card>
  );
}

export default AdvtDeptInfo;
