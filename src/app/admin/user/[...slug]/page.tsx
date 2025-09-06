"use client";
import { Button } from "@heroui/react";
import { LayoutGrid, Mars,IdCard  } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();
  const allList = [
    {
      _id: "1",
      code: "marriageCertificate",
      name: "Marriage Certificate",
      description: "Marriage Certificate Description",
      link: "/admin/MarriageForm",
    },
    {
      _id: "2",
      code: "marriageRegistration",
      name: "Marriage Registration",
      description: "Marriage Registration Description",
      link: "/admin/MarriageRegistration",
    },
    {
      _id: "3",
      code: "pancard",
      name: "Pancard",
      description: "Pancard Description",
      link: "/admin/Pancard",
    },
  ];
  const getIconForCategory = (code: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      marriageCertificate: <Mars />,
      marriageRegistration: <Mars />,
      pancard: <IdCard />,
      default: <LayoutGrid />,
    };
    return iconMap[code] || iconMap?.default;
  };
  return (
    <>
      <div className="flex items-center justify-end">
        <Button
          radius="md"
          className="mb-4 font-medium"
          onPress={() => {
            router.back();
          }}
          startContent={
            <span className="material-symbols-rounded">arrow_back</span>
          }
        >
          Go Back
        </Button>
      </div>
      <div className="flex flex-wrap justify-start gap-4 bg-gray-100 p-5">
        {allList?.map((item: any) => (
          <Link href={item.link} key={item._id}>
            <div className="group w-[19rem] rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col items-center">
                <div className="mb-3 rounded-lg bg-blue-50 p-3 transition-colors duration-200 group-hover:bg-blue-500">
                  <div className="h-6 w-6 text-blue-500 transition-colors duration-200 group-hover:text-white">
                    {getIconForCategory(item.code)}
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-medium text-gray-800">
                  {item.name}
                </h3>
                <p className="w-full truncate text-center text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Services;
