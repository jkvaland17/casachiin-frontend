// import { handleCommonErrors } from "@/Utils/HandleError";
import { CallGetUserMeetingByUserId } from "@/_ServerActions";
import { Button, Card, CardBody, CardHeader, Snippet } from "@heroui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SkeletonCard from "./card/SkeletonCard";

const WebexCredentials = ({ meetLink }: { meetLink: string }) => {
  const [cred, setCred] = useState<any>(null);
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    if (!meetLink) getCredentials();
  }, []);

  const getCredentials = async () => {
    try {
      setLoader(true);
      const { data, error } = (await CallGetUserMeetingByUserId()) as any;
      if (data?.data) {
        console.log("Cred:::", data?.data);

        setCred(data?.data);
      }
      if (error) {
        console.log("error::: ", error);
        // handleCommonErrors(error);
      }
      setLoader(false);
    } catch (error) {
      console.log("error::: ", error);
      setLoader(false);
    }
  };
  return (
    <div>
      <Card className="w-[500px] m-auto mb-4 p-3">
        <CardHeader className="text-xl font-semibold text-center">
          Your Virtual Meeting Link
        </CardHeader>
        <CardBody>
          {loader ? (
            <SkeletonCard />
          ) : (
            <div className="flex flex-col gap-3 text-large">
              {!meetLink && (
                <>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-semibold">User Id:</p>
                      <p className="text-gray-400">{cred?.webexID || " - "}</p>
                    </div>
                    <Snippet
                      symbol=""
                      codeString={cred?.webexID || " - "}
                      variant="bordered"
                    >
                      Copy
                    </Snippet>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-semibold">Password:</p>
                      <p className="text-gray-400">
                        {cred?.webexPass || " - "}
                      </p>
                    </div>
                    <Snippet
                      symbol=""
                      codeString={cred?.webexPass || " - "}
                      variant="bordered"
                    >
                      Copy
                    </Snippet>
                  </div>
                </>
              )}
              <div>
                {!meetLink && (
                  <p className="my-3 text-sm text-gray-400">
                    {"Note: please don't change your password"}
                  </p>
                )}
                <Button
                  as={Link}
                  // href="https://CAexams.my.webex.com/webappng/sites/CAexams.my/meeting/home"
                  href={meetLink}
                  target="_blank"
                  color="primary"
                  size="lg"
                  className="w-full"
                >
                  Go to Virtual Meeting
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default WebexCredentials;
