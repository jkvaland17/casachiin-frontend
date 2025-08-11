"use client";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues } from "@/components/Forms_Dynamic/DefaultValues";
import StepComponent from "@/components/Forms_Dynamic/StepComponent";
import { Step } from "@/components/Forms_Dynamic/Type";
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import { app as seniorResident } from "@/components/Forms_Dynamic/Mock/senior-resident";
import { app as groupRecruitement } from "@/components/Forms_Dynamic/Mock/group-recruitement";
import { app as promotion } from "@/components/Forms_Dynamic/Mock/promotion";
import { app as facultyCell } from "@/components/Forms_Dynamic/Mock/faculty-cell";
import { app as cre } from "@/components/Forms_Dynamic/Mock/cre";
import { app as norcet } from "@/components/Forms_Dynamic/Mock/norcet";
import { app as faculty_v2 } from "@/components/Forms_Dynamic/Mock/faculty_v2";
import { app as jr } from "@/components/Forms_Dynamic/Mock/js";
import { useSession } from "next-auth/react";
import { CallGetApplicationById, CallUpdateTempPass } from "@/_ServerActions";
import { PrintReciept } from "@/Utils/PrintReciept";
import profile_avatar from "@/assets/img/icons/common/noImage.png";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PasswordIcon from "@/assets/img/svg/Password";
import { EyeSlashFilledIcon } from "@/assets/img/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/img/svg/EyeFilledIcon";
import { handleCommonErrors } from "@/Utils/HandleError";
import VERIFIED from "@/assets/img/icons/common/verified.png";

type AppConfigurations = {
  [key: string]: Step[];
};

const ApplicationForm: React.FC = () => {
  const { slug } = useParams() as any;

  const route = useRouter();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const appConfigurations: AppConfigurations = {
    groupRecruitement,
    seniorResident,
    promotion,
    facultyCell,
    norcet,
    cre,
    faculty_v2,
    jr,
  };

  useEffect(() => {
    if (slug.length > 1) {
      setId(slug[1]);
    } else {
      // route.push("/admin/application");
    }
  }, [slug]);

  const convertToCamelCase = (str: string) =>
    str.includes("-")
      ? str.replace(/-./g, (match) => match.charAt(1).toUpperCase())
      : str;

  const methods = useForm({ defaultValues }) as any;
  const { reset, watch } = methods;
  const { data: session } = useSession() as any;
  const token = session?.user?.token;
  const [applicationData, setApplicationData] = useState<any>([]);
  const [selected, setSelected] = useState("BasicDetails");
  const [currentUser, setCurrentUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loaderSlip, setLoaderSlip] = useState<boolean>(false);
  const [loaderPass, setLoaderPass] = useState<boolean>(false);
  const [skeleton, setSkeleton] = useState<boolean>(false);
  const [allSteps, setAllSteps] = useState<any[]>([]);
  const [id, setId] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (id) {
      GetApplicationById();
    }
  }, [id]);

  useEffect(() => {
    if (slug.length > 1 && applicationData?.advertisement_noId?.value) {
      const applicationJSON = appConfigurations[convertToCamelCase(slug[0])];
      if (
        applicationJSON[0]?.allFields[0]?.fields &&
        (slug[0] === "group-recruitement" ||
          slug[0] === "norcet" ||
          slug[0] === "cre")
      ) {
        const allFields = applicationJSON[0].allFields[0];
        allFields.fields = allFields.fields.map((item) => {
          if (
            item.value === "pwbd_notice" &&
            applicationData?.advertisement_noId?.value &&
            !item.title.includes(applicationData?.advertisement_noId?.value)
          ) {
            return {
              ...item,
              title: `${item.title} ${applicationData.advertisement_noId.value}`,
            };
          }
          return item;
        });
      }
      setAllSteps(applicationJSON);
    } else {
      // route.push("/admin/application");
    }
  }, [applicationData?.advertisement_noId?.value]);

  const GetApplicationById = async () => {
    try {
      setSkeleton(true);
      const { data, error } = (await CallGetApplicationById(id)) as any;
      console.log("applicatoin data", data, error);
      if (error) {
        handleCommonErrors(error);
        setSkeleton(false);
        return;
      }
      const DATA = data?.data;
      setApplicationData(DATA);
      reset(DATA);
      setSkeleton(false);
    } catch (error: any) {
      console.log("Registration failed:", error);
      toast.error(error?.message);
      setSkeleton(false);
    }
  };

  useEffect(() => {
    if (currentUser) printDownload(currentUser);
  }, [currentUser]);

  const printDownload = (id: string) => {
    PrintReciept(
      id,
      "transactionReceipt",
      session?.user?.token,
      setLoading,
      "transaction.pdf",
      "application",
    );
    setCurrentUser("");
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  const setTempPassword = async () => {
    try {
      if (password) {
        setLoaderPass(true);
        const dto = {
          userId: applicationData?.user?._id,
          password,
        };
        const { data, error } = (await CallUpdateTempPass(dto)) as any;
        if (error) {
          handleCommonErrors(error);
          setLoaderPass(false);
          return;
        }
        if (data) {
          toast.success(data?.message);
          onClose();
          window.open(
            `https://rrp.CAexams.ac.in/auth/login?advId=${applicationData?.advertisement_noId?._id}`,
            "_blank",
          );
        }
        setLoaderPass(false);
      } else {
        toast.error("Password field is required");
        setLoaderPass(false);
        return;
      }
    } catch (error: any) {
      console.log("Registration failed:", error);
      toast.error(error?.message);
      setLoaderPass(false);
    }
  };

  const getChipColor = (paymentStatus: string) => {
    if (paymentStatus === "Completed" || paymentStatus === "Exempted") {
      return "success";
    } else if (paymentStatus === "Failure") {
      return "danger";
    } else if (paymentStatus === "Initiated") {
      return "warning";
    }
    return "primary";
  };

  return (
    <>
      <div className="wrapper_card wrapper_width md:mt-4">
        <div className="candidate_div flex-col lg:flex-row gap-5">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="candidate_profile">
              <img
                src={
                  applicationData?.photo?.presignedUrl ?? profile_avatar?.src
                }
                alt="profile"
              />
            </div>
            <table className="candidate_details text-sm">
              <tbody>
                <tr>
                  <td>Registration No</td>
                  <td className="font-bold">
                    : {applicationData?.user?.regNo}
                  </td>
                </tr>
                <tr>
                  <td>Candidate Name</td>
                  <td className="font-bold">
                    <div className="flex gap-1">
                      : {applicationData?.user?.name}
                      {applicationData?.user?.isAadhaarVerified &&
                      applicationData?.user?.kyc ? (
                        <img
                          src={VERIFIED?.src ?? ""}
                          alt="verified"
                          width={20}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Candidate ID</td>
                  <td className="font-bold">
                    : {applicationData?.user?.candidateId}
                  </td>
                </tr>
                <tr>
                  <td>Advertisement</td>
                  <td className="font-bold">
                    <div className="text-wrap">
                      : {applicationData?.advertisement_noId?.value}{" "}
                      <span>
                        ({applicationData?.advertisement_noId?.description})
                      </span>
                    </div>
                  </td>
                </tr>
                {applicationData?.postApplied && (
                  <tr>
                    <td>Post Applied</td>
                    <td className="font-bold">
                      : {applicationData?.postApplied}
                    </td>
                  </tr>
                )}
                {(applicationData?.specialityId?.value ||
                  applicationData?.specialityName) && (
                  <tr>
                    <td>Specialty</td>
                    <td className="font-bold">
                      :{" "}
                      {applicationData?.specialityId?.value ??
                        applicationData?.specialityName}
                    </td>
                  </tr>
                )}
                {applicationData?.paymentStatus && (
                  <tr>
                    <td>Payment Status</td>
                    <td className="font-bold">
                      :{" "}
                      <Chip
                        classNames={{
                          content: [
                            "w-[75px]",
                            "text-center",
                            "text-[13px]",
                            `text-${getChipColor(applicationData?.paymentStatus)}`,
                          ],
                        }}
                        color={getChipColor(applicationData?.paymentStatus)}
                        variant="flat"
                        radius="sm"
                        size="sm"
                      >
                        {applicationData?.paymentStatus}
                      </Chip>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="button_group w-fit">
            <div className=" flex gap-2">
              <Button
                color="default"
                variant="bordered"
                onClick={() => route.back()}
              >
                Back
              </Button>
              <Button
                isLoading={loaderSlip}
                className="download_btn"
                onClick={() =>
                  PrintReciept(
                    id,
                    "applicationSummary",
                    token,
                    setLoaderSlip,
                    "Summery_slip.pdf",
                    "id",
                  )
                }
              >
                Summery slip
              </Button>
              {applicationData?.paymentStatus === "Completed" && (
                <Button
                  isLoading={loading}
                  className="download_btn"
                  onClick={() => setCurrentUser(id)}
                >
                  Transaction Slip
                </Button>
              )}
              <Button color="primary" onPress={onOpen}>
                Go to dashboard
              </Button>
            </div>
          </div>
        </div>

        {skeleton ? (
          <div className="w-full p-6 gap-6 flex flex-col">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="candidate_tabs mt-5 w-full overflow-auto">
              <FormProvider {...methods}>
                <form>
                  <div>
                    <Tabs
                      variant={"underlined"}
                      selectedKey={selected}
                      onSelectionChange={(e: any) => {
                        setSelected(e);
                      }}
                    >
                      {allSteps?.map(
                        (step: any) =>
                          watch("step.validator") !== "Faculty_Professor" && (
                            <Tab
                              key={step.name}
                              id={step.name}
                              title={step.name}
                            >
                              <StepComponent step={step} />
                            </Tab>
                          ),
                      )}
                    </Tabs>
                  </div>
                </form>
              </FormProvider>
            </div>
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a temporary password
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  name="password"
                  label="Enter Password"
                  labelPlacement="outside"
                  variant="faded"
                  placeholder="Enter password"
                  startContent={<PasswordIcon />}
                  size="lg"
                  autoComplete="new-password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="sm"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  isLoading={loaderPass}
                  radius="sm"
                  color="primary"
                  onClick={setTempPassword}
                >
                  Create a password
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ApplicationForm;
