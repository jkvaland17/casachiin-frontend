"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { PrintReciept } from "@/Utils/PrintReciept";
import profile_avatar from "@/assets/img/icons/common/noImage.png";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";
const ApplicaitionCard: React.FC<any> = ({ item }) => {
  const { data: session } = useSession() as any;
  const token = session?.user?.token;
  // const route = useRouter();
  const [loader, setLoader] = useState(false);
  const handleSpecilaty = (data: any) => {
    if (data?.application?.specialityId?.value) {
      return data?.application?.specialityId?.value;
    } else if (data?.application?.specialityName) {
      return data?.application?.specialityName;
    }

    return " -- ";
  };
  const showDetails = (item: any) => {
    if (item?.advertisement_noId?.formTemplate === "Faculty_APS") {
      return (
        <>
          <div className="col-span-1 border-e-1 p-2">
            <h6 className="mb-2 font-medium text-sky-600">Advertisement</h6>
            <p className="text-sm">{item?.advertisement?.value}</p>
          </div>
          <div className="col-span-1 border-e-1 p-2">
            <h6 className="mb-2 font-medium text-sky-600">Department/Centre</h6>
            <p className="text-sm">{item?.department}</p>
          </div>
          <div className="col-span-1 border-e-1 p-2">
            <h6 className="mb-2 font-medium text-sky-600">
              APS to the Grade of
            </h6>
            <p className="text-sm">{item?.aps_grade}</p>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="col-span-1 p-2">
          <h6 className="mb-2 font-medium text-sky-600">Advertisement</h6>
          <p className="text-sm">{item?.advertisement?.value ?? " -- "}</p>
        </div>
        <div className="col-span-1 p-2">
          <h6 className="mb-2 font-medium text-sky-600">Speciality</h6>
          <p className="text-sm">{handleSpecilaty(item)}</p>
        </div>
        <div className="col-span-1 p-2">
          <h6 className="mb-2 font-medium text-sky-600">Post Applied</h6>
          <p className="text-sm">{item?.application?.postApplied ?? " -- "}</p>
        </div>
      </>
    );
  };
  return (
    <div className="student_overview">
      <div className="overview_header">
        <div className="overview_head">
          <div className="flex justify-start items-center gap-4">
            <div className="w-[80px] h-[80px] overflow-hidden rounded-full">
              <img
                className="w-full h-full object-cover"
                src={
                  item?.application?.photo?.presignedUrl ?? profile_avatar?.src
                }
                alt="profile"
              />
            </div>

            <div className="candidate_details">
              <div className="text-sm">
                Registration No:{" "}
                {item?.candidate?.regNo && (
                  <Chip
                    color="primary"
                    variant="flat"
                    radius="sm"
                    size="sm"
                    className="cursor-pointer  font-medium"
                  >
                    {item?.candidate?.regNo}
                  </Chip>
                )}
              </div>
              <p className="text-sm">
                Candidate Name :{" "}
                <span className=" font-medium">{item?.candidate?.name}</span>
              </p>
              <p className="text-sm">
                Candidate ID:
                <span className=" font-medium">
                  {" "}
                  {item?.candidate?.candidateId}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overview_desc">
        <div className="grid grid-cols-2">
          <div
            className="col-span-1"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="grid grid-cols-3 gap-3">{showDetails(item)}</div>
          </div>
          <div className="col-span-1 order-md-2 order-1 gap-4 flex justify-end items-center">
            <Button
              as={Link}
              target="_blank"
              href={item?.interviewFile ?? "#"}
              className="chat_btn me-2 px-8"
              color="primary"
              isLoading={loader}
              // size="sm"
            >
              Presentation
            </Button>
            <Button
              isLoading={loader}
              className="chat_btn me-2 px-8"
              // size="sm"
              color="primary"
              onClick={() =>
                PrintReciept(
                  item?.application?._id,
                  "applicationSummary",
                  token,
                  setLoader,
                  "Summery_slip.pdf",
                  "id",
                )
              }
            >
              Summery slip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApplicaitionCard;
