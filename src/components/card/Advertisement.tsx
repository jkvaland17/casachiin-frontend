import { Card, CardBody, CardFooter, Spinner, Button } from "@heroui/react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type AdvertisementCardProps = {
  item: {
    _id: string;
    description: string;
    value: string;
    startDate: string;
    endDate: string;
  };
  bottomContent?: any;
  index?: number;
  routeActive?: boolean;
  route?: string;
};

const AdvertisementCard = ({
  item,
  index,
  bottomContent,
  routeActive,
  route,
}: AdvertisementCardProps) => {
  const router = useRouter();
  const session = useSession();
  const [activeAdv, setActiveAdv] = useState<any>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const advId = sessionStorage.getItem("advertisementId");
      setActiveAdv(advId);
    }
  }, [session]);

  return (
    <>
      <div
        onClick={() => {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("advertisementId", item?._id);
            if (routeActive) {
              if (route) {
                router.push(route);
              } else {
                router.push("/admin/dashboard");
              }
            }
          }
        }}
      >
        <Card
          className={`mb-4 ${activeAdv === item?._id ? "bg-orange-100 border border-orange-300" : "bg-blue-100"} cursor-pointer`}
          key={item?._id}
        >
          <CardBody>
            <p className="mb-1 font-medium">{item?.description}</p>
            <p className="text-sm text-blue-600">{item?.value}</p>
          </CardBody>
          <CardFooter className="flex-col items-start pt-0">
            <div className="advertisement_info flex gap-3">
              <div className="advIcon">
                <span className="material-symbols-outlined text-primary">
                  calendar_month
                </span>
              </div>
              <div>
                <span>
                  Start date:-{" "}
                  {moment(item?.startDate).format("DD-MM-YYYY ") || "-"}{" "}
                </span>{" "}
                To{" "}
                <span>
                  {" "}
                  End date:-{" "}
                  {moment(item?.endDate).format("DD-MM-YYYY ") || "-"}
                </span>
              </div>
            </div>
            {bottomContent ? bottomContent : ""}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdvertisementCard;
