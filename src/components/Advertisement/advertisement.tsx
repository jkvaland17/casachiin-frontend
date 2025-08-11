"use client";

import { handleCommonErrors } from "@/Utils/HandleError";
import {
  CallFindAdvertisementForHOD,
  CallFindAllDepartmentForHOD,
  CallFindGroupsByAdv,
  // CallGetRolesByAdvertisement,
  CallfindAllCommittee,
} from "@/_ServerActions";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button, Select, SelectItem, Skeleton } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Advertisement: React.FC<any> = ({
  isOpen,
  onClose,
  setSessionFinalRole,
}) => {
  const { data: session } = useSession() as any;
  const route = useRouter() as any;

  const [Loading, setLoading] = useState<boolean>(false);
  const [allAdvertisement, setAllAdvertisement] = useState<any>([]);
  const [advertisement, setAdvertisement] = useState<any>(null);
  const [allGroup, setAllGroup] = useState<any>([]);
  const [group, setGroup] = useState<any>(null);
  const [LoadingGroup, setLoadingGroup] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<any[]>([]);
  const [instituteRolesList, setInstituteRolesList] = useState<any[]>([]);
  const [instituteRoles, setInstituteRoles] = useState<string>("");
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    if (
      session?.user?.membership?.length < 2 &&
      session?.user?.membership?.length !== 0
    ) {
      setMember(session?.user?.membership[0]);
    } else {
      setMemberList(
        session?.user?.membership?.map((ele: any) => ({
          value: ele,
          label: ele,
        })),
      );
    }
  }, [session]);

  useEffect(() => {
    function capitalizeFirstLetter(string: string) {
      if (!string) return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    if (member) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("member", member);
        if (member === "institute") {
          const instituteRoles = session?.user?.instituteRoles;

          if (session?.user?.instituteRoles?.length > 1) {
            setInstituteRolesList(
              instituteRoles?.map((ele: any) => ({
                value: ele,
                label: capitalizeFirstLetter(ele),
              })),
            );
            setInstituteRoles(instituteRoles[0]);
          } else {
            const finalRole: any = instituteRoles;
            const membership: any = [member];
            sessionStorage.setItem("finalRole", JSON.stringify(finalRole));
            sessionStorage.setItem("membership", JSON.stringify(membership));
            setSessionFinalRole(instituteRoles[0]);
            if (instituteRoles[0] === "InstituteAdmin") {
              route.push("/admin/institute/alloted-candidates");
            } else if (instituteRoles[0] === "member") {
              route.push("/admin/institute/screening-details");
            }
            onClose();
          }
        } else {
          getAdvertisement();
        }
      }
      // let sessionData = session?.user;
      // sessionData.member = member;
      // update(sessionData);
    }
  }, [member]);

  const getAdvertisement = async () => {
    try {
      setLoading(true);
      const { data, error } = (await CallFindAdvertisementForHOD(
        member,
      )) as any;
      if (data) {
        setAllAdvertisement(data?.data);
        if (data?.data?.length > 0) {
          if (typeof window !== "undefined") {
            localStorage.setItem("intAdv", data?.data[0]?._id);
            setAdvertisement(data?.data[0]?._id);
          }
          getGroup(data?.data[0]?._id);
        } else {
          toast.error("No advertisement found.");
          setLoading(false);
          return;
        }
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoading(false);
    } catch (error) {
      console.log("error::: ", error);
    }
  };

  const getGroup = async (id: any) => {
    try {
      if (!id) {
        setGroup(null);
        setAdvertisement(null);
        setAllGroup([]);
        return;
      }
      setAdvertisement(id);
      setLoadingGroup(true);
      const dto = `advId=${id}`;
      const { data, error } = (await CallFindGroupsByAdv(dto)) as any;
      if (data?.data) {
        setAllGroup(data?.data);
        if (data?.data?.length > 0) {
          setGroup(data?.data[0]?._id);
        } else {
          // toast.error("No role found.");
          setGroup(null);
        }
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoadingGroup(false);
    } catch (error) {
      console.log("error::: ", error);
    }
  };
  const submitAdvertisement = async () => {
    try {
      if (!advertisement && member !== "institute") {
        toast.error("Please select advertisement.");
        return;
      }
      const isHOD = session?.user?.data?.position?.value === "HOD";
      if (member === "screening" && isHOD) {
        if (typeof window !== "undefined") {
          const finalRole: any = [session?.user?.data?.position?.value];
          const membership: any = [member];
          sessionStorage.setItem("finalRole", JSON.stringify(finalRole));
          sessionStorage.setItem("membership", JSON.stringify(membership));
        }
        route.push("/admin/scrutiny/screening");
        onClose();
        return;
      } else if (member === "institute") {
        if (typeof window !== "undefined") {
          const finalRole: any = [instituteRoles];
          const membership: any = [member];
          sessionStorage.setItem("finalRole", JSON.stringify(finalRole));
          sessionStorage.setItem("membership", JSON.stringify(membership));
        }
        setSessionFinalRole(instituteRoles);
        if (instituteRoles === "InstituteAdmin") {
          route.push("/admin/institute/alloted-candidates");
        } else {
          route.push("/admin/institute/screening-details");
        }
        onClose();
        return;
      }
      // if (!group) {
      //   toast.error("Please select role.");
      //   return;
      // }
      const getFinalRole = allGroup?.find((role: any) => role?._id === group);
      if (!getFinalRole) {
        toast.error("Failed to get final role.");
        return;
      }
      if (member === "interview") {
        route.push("/admin/interview/all-interview");
      } else if (member === "screening") {
        route.push("/admin/scrutiny/screening");
      }
      if (typeof window !== "undefined") {
        const finalRole: any = [getFinalRole?.role?.value];
        const membership: any = [getFinalRole?.group?.groupType];
        sessionStorage.setItem("finalRole", JSON.stringify(finalRole));
        sessionStorage.setItem("membership", JSON.stringify(membership));
      }
      // let sessionData = session?.user;
      // sessionData.finalRole = [getFinalRole?.role?.value];
      // sessionData.membership = [getFinalRole?.group?.groupType];
      // update(sessionData);
      onClose();
    } catch (error) {
      console.log("error::: ", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("error::: ", error);
    }
  };

  return (
    <>
      <Modal
        isDismissable={false}
        backdrop="blur"
        size={"xl"}
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Configure your Portal
              </ModalHeader>
              <ModalBody>
                {memberList?.length !== 0 && (
                  <Select
                    label="Role"
                    selectedKeys={[member]}
                    items={memberList}
                    onSelectionChange={(e: any) => {
                      const id = Array.from(e)[0];
                      setMember(id);
                    }}
                    placeholder="Please select your role"
                    labelPlacement="outside"
                  >
                    {(option: any) => (
                      <SelectItem key={option?.value}>
                        {option?.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
                {Loading ? (
                  <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                  </div>
                ) : (
                  <>
                    {member !== "institute" && (
                      <Select
                        label="Advertisement"
                        selectedKeys={[advertisement]}
                        items={allAdvertisement}
                        onSelectionChange={(e: any) => {
                          if (typeof window !== "undefined") {
                            const id: any = Array.from(e)[0];
                            localStorage.setItem("intAdv", id);
                            getGroup(id);
                          }
                        }}
                        placeholder="Please select advertisement"
                        labelPlacement="outside"
                      >
                        {(option: any) => (
                          <SelectItem key={option?._id}>
                            {`${option?.value} (${option?.description})`}
                          </SelectItem>
                        )}
                      </Select>
                    )}
                    {member === "institute" &&
                      instituteRolesList?.length > 0 && (
                        <Select
                          label="Institute Roles"
                          selectedKeys={[instituteRoles]}
                          items={instituteRolesList}
                          onSelectionChange={(e) => {
                            const id = Array.from(e)[0] as any;
                            setInstituteRoles(id);
                          }}
                          placeholder="Please select institute role"
                          labelPlacement="outside"
                        >
                          {(option: any) => (
                            <SelectItem key={option?.value}>
                              {option?.label}
                            </SelectItem>
                          )}
                        </Select>
                      )}
                    {LoadingGroup ? (
                      <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-4 w-full rounded-lg" />
                        <Skeleton className="h-4 w-full rounded-lg" />
                      </div>
                    ) : (
                      <>
                        {allGroup?.length > 0 && (
                          <Select
                            label="Committee"
                            selectedKeys={[group]}
                            items={allGroup}
                            onSelectionChange={(e: any) => {
                              const id = Array.from(e)[0];
                              setGroup(id);
                            }}
                            placeholder="Please select commite"
                            labelPlacement="outside"
                          >
                            {(option: any) => (
                              <SelectItem key={option?._id}>
                                {option?.group?.groupName}
                              </SelectItem>
                            )}
                          </Select>
                        )}
                      </>
                    )}
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  as={Link}
                  href="/"
                  color="danger"
                  variant="bordered"
                  onClick={() => {
                    logOut();
                    sessionStorage.clear();
                  }}
                >
                  Logout
                </Button>
                <Button
                  // isDisabled={allGroup?.length === 0 || !group}
                  color="primary"
                  onClick={submitAdvertisement}
                >
                  Proceed to continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Advertisement;
