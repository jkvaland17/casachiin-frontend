import { Button } from "@heroui/react";

import STARIMG from "@/assets/img/star.png";
import React from "react";
import Image from "next/image";

type Props = {
  icon?: any;
  heading?: string;
  subHeading?: string;
  view?: boolean;
};

function InterviewerHeader({ heading, subHeading, view, icon }: Props) {
  return (
    <div className="p-3 bg-[#3F8CFF] rounded-xl shadow-sm flex justify-between interviewer_header">
      <div>
        <h2 className="text-start text-2xl font-medium text-white">
          {heading}
        </h2>
        <h6 className={`text-base text-gray-100 ${!view && "mb-16"} `}>
          {subHeading}
        </h6>
        {view && (
          <Button
            variant="solid"
            size="sm"
            radius="full"
            className="bg-black text-white mt-10"
          >
            View
          </Button>
        )}
      </div>
      {icon ? (
        <div>
          <span className="material-symbols-rounded text-9xl text-white">
            {icon}
          </span>
        </div>
      ) : (
        <div className="w-[170px] relative">
          <Image className="w-full absolute" src={STARIMG} alt="mail" />
        </div>
      )}
    </div>
  );
}

export default InterviewerHeader;
