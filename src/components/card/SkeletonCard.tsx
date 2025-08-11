import React from "react";
import { Skeleton } from "@heroui/react";

interface SkeletonProp {
  cardStyling?: boolean;
}

export default function SkeletonCard({ cardStyling }: SkeletonProp) {
  return (
    <div className={cardStyling ? "bg-white border rounded-md p-4" : ""}>
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 mt-2">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </div>
  );
}
