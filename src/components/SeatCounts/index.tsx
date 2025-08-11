import { Chip } from "@heroui/react";
import React from "react";
type SeatCountProps = {
  data: {
    [key: string]: string;
  };
};
const SeatCount: React.FC<SeatCountProps> = ({ data }) => {
  return (
    <div className="flex gap-4 mb-3">
      {data && (
        <>
          {Object.entries(data).map(([category, seats]) => (
            <Chip
              color="primary"
              variant="flat"
              key={category}
            >{`${category} : ${seats}`}</Chip>
          ))}
        </>
      )}
    </div>
  );
};
export default SeatCount;
