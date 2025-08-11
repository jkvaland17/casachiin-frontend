import { Button, Chip, Divider, Spinner } from "@heroui/react";
import { AlertCircle, ClipboardList, Send, UserPlus } from "lucide-react";
import React, { useState } from "react";
import InfoPopover from "./InfoPopover";
import { useRouter } from "next/navigation";

type Props = {
  committee: any;
};

function CommitteeCardHOD({ committee }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<any>({
    screening: false,
    virtualMeet: false,
    finalSubmission: false,
    addCandidates: false,
  });

  const chairperson = committee?.members?.filter(
    (member: any) => member?.role === "Chairperson",
  );
  const member = committee?.members?.filter(
    (member: any) => member?.role === "Member",
  );

  const coOptedChairperson = committee?.members?.filter(
    (member: any) => member?.role === "Co-opted Chairperson",
  );

  const handleScreening = (route: string, loader: string) => {
    setIsLoading((prev: any) => ({
      ...prev,
      [loader]: true,
    }));
    if (typeof window !== "undefined") {
      const committeeId = committee?.committeeId;
      if (committeeId) {
        sessionStorage.setItem("committeeId", committeeId);
        sessionStorage.setItem("committeeName", committee?.committeeName);
        router.push(route);
      }
    }
  };

  return (
    <div
      key={committee?.committeeId}
      className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 mb-5"
    >
      {/* Committee Header */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 ">
          {committee?.committeeName}
        </h3>
      </div>
      <Divider className=" my-3" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Committee Members Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-1">
            Committee Details
          </h4>

          {/* Chairperson */}
          <div
            className={`p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4 w-fit`}
          >
            {chairperson[0] && (
              <div className="flex items-center ">
                <p className="text-base font-medium text-gray-600 ">
                  Chairperson:{" "}
                  <span className="font-semibold text-gray-900">
                    {chairperson[0]?.name}
                  </span>
                </p>
                <InfoPopover data={chairperson[0]} />
              </div>
            )}

            {coOptedChairperson[0] && (
              <div className="flex items-center ">
                <p className="text-base font-medium text-gray-600 ">
                  Co-opted Chairperson:{" "}
                  <span className="font-semibold text-gray-900">
                    {coOptedChairperson[0]?.name}
                  </span>
                </p>
                <InfoPopover data={coOptedChairperson[0]} />
              </div>
            )}

            <div className="flex gap-2">
              <p className="text-base font-medium text-gray-600 mt-1">
                Members:
              </p>
              <div className="flex flex-wrap gap-2">
                {member?.map((member: any, index: number) => (
                  <ul key={index}>
                    <li>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-900">
                          {member?.name}
                        </span>
                        <InfoPopover data={member} />
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Applications Stats */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-1">
            Applications Status
          </h4>
          <div className="flex flex-col gap-3 ">
            <div className="flex justify-between gap-3 items-center p-2 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">
                Total Applications
              </span>
              <Chip color="primary">{committee?.counts?.total}</Chip>
            </div>
            <div className="flex justify-between gap-3 items-center p-2 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">Screened</span>
              <Chip color="success" className="text-white">
                {committee?.counts?.screened}
              </Chip>
            </div>
            <div className="flex justify-between gap-3 items-center p-2 bg-orange-50 rounded-lg">
              <span className="text-gray-700 font-medium">Pending Review</span>
              <Chip color="warning" className="text-white">
                {committee?.counts?.pending}
              </Chip>
            </div>
          </div>
        </div>
      </div>

      <Divider className="my-4" />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-between">
        <Button
          size="sm"
          startContent={
            isLoading?.addCandidates ? (
              <Spinner size="sm" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )
          }
          onPress={() =>
            handleScreening(
              `/admin/panel-configuration/edit/${committee?.committeeId}`,
              "addCandidates",
            )
          }
        >
          Add Members
        </Button>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="solid"
            color="primary"
            startContent={
              isLoading?.screening ? (
                <Spinner size="sm" color="white" />
              ) : (
                <ClipboardList className="h-4 w-4" />
              )
            }
            isDisabled={!committee?.showProceedForScreening}
            onPress={() =>
              handleScreening("/admin/screening/screening", "screening")
            }
          >
            Proceed To Screening
          </Button>
          <Button
            className="text-white"
            size="sm"
            color="warning"
            startContent={
              isLoading?.virtualMeet ? (
                <Spinner size="sm" color="white" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )
            }
            isDisabled={!committee?.isNeedClarificationStatusExist}
            onPress={() =>
              handleScreening("/admin/screening/meeting", "virtualMeet")
            }
          >
            Need Clarification
          </Button>
          <Button
            size="sm"
            color="success"
            startContent={
              isLoading?.finalSubmission ? (
                <Spinner size="sm" color="white" />
              ) : (
                <Send className="h-4 w-4" />
              )
            }
            className="text-white"
            isDisabled={!committee?.showFinalSubmission}
            onPress={() =>
              handleScreening(
                "/admin/screening/final-submission",
                "finalSubmission",
              )
            }
          >
            Final Submission
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CommitteeCardHOD;
