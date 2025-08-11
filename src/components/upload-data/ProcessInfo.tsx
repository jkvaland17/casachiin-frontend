import { Chip } from "@heroui/react";
import moment from "moment";
import React from "react";

type Props = {
  processDetails: any;
};
type ChipColor =
  | "success"
  | "danger"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | undefined;

function ProcessInfo({ processDetails }: Props) {
  const statusColorMap: { [key: string]: ChipColor } = {
    COMPLETED: "success",
    PROCESSING: "primary",
    PENDING: "warning",
    FAILED: "danger",
    Download: "secondary",
    Upload: "primary",
  };
  const renderValue = (type: string, key: string, customClass?: string) => {
    switch (type) {
      case "text":
        return (
          <span className={`text-sm ${customClass}  px-2 py-1 rounded`}>
            {key}
          </span>
        );
      case "date":
        return (
          <span className="text-sm">
            {moment(key).format("DD MMM, YYYY hh:mm A")}
          </span>
        );
      case "chip":
        return (
          <Chip
            color={statusColorMap[key]}
            variant="flat"
            radius="sm"
            size="sm"
          >
            {key}
          </Chip>
        );
      default:
        return <span className="text-sm">{key}</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {processDetails.map((item: any, index: number) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
          {renderValue(item.type, item.valueKey, item.customClass)}
        </div>
      ))}
    </div>
  );
}

export default ProcessInfo;
