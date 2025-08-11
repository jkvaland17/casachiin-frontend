import { Button, Card, CardBody } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

const NoMasterData = () => {
  const routes = useRouter();
  return (
    <div>
      <Card>
        <CardBody>
          <div className="h-72 flex items-center flex-col justify-center gap-5">
            <h1>No Master Data fount.</h1>
            <div className="flex items-center justify-center gap-3">
              <Button variant="solid" color="primary">
                Create Master Data
              </Button>
              <Button onClick={() => routes.back()}>
                <span className="material-symbols-outlined">arrow_back</span> Go
                Back
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NoMasterData;
