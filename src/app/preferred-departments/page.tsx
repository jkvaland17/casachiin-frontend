"use client";
import PrefferedSelectRoles from "@/components/PrefferedSelectRoles/Roles";
import { useState } from "react";
import { Button, Card } from "@heroui/react";
import GlobalAdvertisementFields from "@/components/Global/Advertisement/Fields";
const PrefferedDeparments: React.FC = () => {
  const [advertisementId, setadvertisementId] = useState("");

  const ProceedToSelectRole = () => {};
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
        {/* <PrefferedSelectRoles /> */}
        <Card className="max-w-4xl w-full p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Please Select Advertisement to Proceed
          </h2>
          <GlobalAdvertisementFields
            value={advertisementId}
            setValue={setadvertisementId}
          />
          <Button
            size="lg"
            className="w-full"
            color="primary"
            onClick={ProceedToSelectRole}
          >
            Continue to proceed
          </Button>
        </Card>
      </div>
    </>
  );
};

export default PrefferedDeparments;
