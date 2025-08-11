import { Card, CardBody, CardFooter, Spinner } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  option: any;
  index: number;
  handleOptionClick: (path: string, type: string) => void;
  loader: boolean;
};

function AllocationTypeCard({
  option,
  index,
  handleOptionClick,
  loader,
}: Props) {
  return (
    <div
      key={index}
      onClick={() => handleOptionClick(option.path, option.type)}
    >
      <Card
        shadow="sm"
        className={`cursor-pointer transition-all ${option?.color} ${option?.borderColor} hover:shadow-md `}
      >
        <CardBody className="p-4">
          <div className="flex items-start space-x-4">
            <div
              className={`mt-0.5 rounded-full ${option?.iconColor} p-2 text-white`}
            >
              {option.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{option.title}</h3>
              <p className="mt-1 text-sm">{option.description}</p>
            </div>
            {loader ? (
              <Spinner color={option?.loaderColor} size="sm" />
            ) : (
              <ArrowRight className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AllocationTypeCard;
