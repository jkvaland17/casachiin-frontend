"use client";

import React, { useEffect, useState } from "react";
import Stepper from "@/components/Stepper/Stepper";
import PanelConfiguration from "@/components/PanelConfiguration/PanelConfiguration";
import SelectMember from "@/components/PanelConfiguration/SelectMember";
import MemberRole from "@/components/PanelConfiguration/MemberRole";
import { Button, Card, CardBody, Spinner } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { handleCommonErrors } from "@/Utils/HandleError";
import { CallAddCommittee, CallUpdateCommittee } from "@/_ServerActions";
import toast from "react-hot-toast";
import AdvtDeptInfo from "../screening/HOD/AdvtDeptInfo";

type UserData = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  departmentId?: string;
  roleId?: string;
};

type PanelData = {
  committeeName: string;
  selectedMember: UserData[];
  committeeType: string;
  description: string;
};

type CreateCommitteeResponse = {
  data?: any;
  error?: any;
};

type PanelConfigurationPageProps = {
  panelData: PanelData;
  setPanelData: React.Dispatch<React.SetStateAction<PanelData>>;
};

const PanelConfigurationPage: React.FC<PanelConfigurationPageProps> = ({
  panelData,
  setPanelData,
}) => {
  const router = useRouter();
  const { slug } = useParams();
  const steps = ["Panel Configuration", "Select Member", "Select Member Role"];
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<any>({
    advertisementId: "",
    departmentId: "",
    screeningID: "",
    committeeName: "",
    screeningLoginType: "",
  });

  useEffect(() => {
    setFilterData({
      ...filterData,
      advertisementId: sessionStorage.getItem("advertisementId"),
      departmentId:
        sessionStorage.getItem("department") ||
        sessionStorage.getItem("departmentId"),
      screeningID: sessionStorage.getItem("screeningConfigID"),
      committeeId: sessionStorage.getItem("committeeId"),
      committeeName: sessionStorage.getItem("committeeName"),
      screeningLoginType: sessionStorage.getItem("screeningLoginType"),
    });
  }, []);

  useEffect(() => {
    if (
      slug?.length === 2 &&
      Array.isArray(slug) &&
      ["view"].includes(slug[0])
    ) {
      setCurrentStep(3);
    }
  }, [slug]);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PanelConfiguration
            panelData={panelData}
            setPanelData={setPanelData}
            setCurrentStep={setCurrentStep}
            isButtonShow={true}
          />
        );
      case 1:
        return (
          <SelectMember
            panelData={panelData}
            setPanelData={setPanelData}
            setCurrentStep={setCurrentStep}
          />
        );
      case 2:
        return (
          <MemberRole
            panelData={panelData}
            setPanelData={setPanelData}
            currentStep={currentStep}
            isDeleteButtonShow={true}
          />
        );
      case 3:
        return (
          <div className="pointer-events-none">
            <PanelConfiguration
              panelData={panelData}
              setPanelData={setPanelData}
              setCurrentStep={setCurrentStep}
              isButtonShow={false}
            />
            <h1 className="my-3">Selected Member</h1>
            <MemberRole
              panelData={panelData}
              setPanelData={setPanelData}
              currentStep={currentStep}
              isDeleteButtonShow={false}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const saveData = async () => {
    try {
      if (panelData.selectedMember.some((user) => !user.roleId)) {
        toast.error("Please select a role for each member.");
        return;
      }

      setLoading(true);
      let dto: any = {
        advertisement: filterData?.advertisementId,
        department: filterData?.departmentId,
        screeningConfigId: filterData?.screeningID,
        committeeId: filterData?.committeeId,
        committeeName: panelData?.committeeName,
        committeeType: panelData?.committeeType,
        description: panelData?.description,
        members: panelData?.selectedMember.map((ele) => ({
          user: ele._id,
          role: ele.roleId,
        })),
      };

      if (slug && slug[0] === "edit") {
        dto._id = slug[1];
      }

      const { data, error }: CreateCommitteeResponse =
        slug && slug[0] === "edit"
          ? await CallUpdateCommittee(dto)
          : await CallAddCommittee(dto);
      console.log("data::: ", data);

      if (data) {
        toast.success(data?.message);
        router.back();
      }

      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.error("Save Data Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {filterData?.committeeId && filterData?.screeningLoginType !== "chief" ? (
        <AdvtDeptInfo committeeTitle={filterData?.committeeName} />
      ) : (
        <div className="flex items-center justify-between w-full gap-x-2">
          <p className="font-bold text-2xl">Panel</p>
          <Button onClick={() => router.back()}>
            <span className="material-symbols-outlined">arrow_back</span> Go
            Back
          </Button>
        </div>
      )}

      <Card className="max-w-full p-3 mt-3">
        <CardBody>
          {currentStep < 3 && (
            <div className="mb-6">
              <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={(id) => {
                  if (slug && slug[0]) {
                    setCurrentStep(id);
                  }
                }}
              />
            </div>
          )}
          <div>{renderStepComponent()}</div>
          {currentStep === steps.length - 1 && (
            <div className="flex justify-between items-center mt-2">
              <Button
                type="button"
                color="default"
                variant="solid"
                radius="sm"
                isDisabled={currentStep === 0}
                onPress={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              >
                <span className="material-symbols-outlined">fast_rewind</span>{" "}
                Back
              </Button>

              <Button
                color="primary"
                variant="solid"
                radius="sm"
                onPress={saveData}
                startContent={
                  loading ? (
                    <Spinner color="white" size="sm" />
                  ) : (
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  )
                }
              >
                {slug && slug[0] === "edit" ? "Update" : "Submit"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default PanelConfigurationPage;
