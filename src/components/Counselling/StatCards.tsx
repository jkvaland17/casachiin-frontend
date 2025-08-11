import { Chip, CircularProgress } from "@heroui/react";
import React from "react";

type Props = {
  item: any;
};

function StatCards({ item }: Props) {
  return (
    <div className="overview_card flex justify-between p-3 bg-[#f4f7f9] rounded-lg">
      <div className="card_content ">
        <p className="text-lg font-semibold">{item?.title}</p>
        <div className="chip_wrapper flex gap-7 mt-3">
          <Chip variant="flat" color={item?.chipColor} size="md">
            {item?.chipLabel}
          </Chip>
        </div>
      </div>
      {item?.value && (
        <div className="progress_bar">
          <CircularProgress
            classNames={{
              svg: "h-16 w-16",
              value: "text-sm",
            }}
            aria-label="Loading..."
            size="lg"
            value={item?.value}
            color={item?.chipColor}
            showValueLabel={true}
          />
        </div>
      )}
    </div>
  );
}

export default StatCards;
