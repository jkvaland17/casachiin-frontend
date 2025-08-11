"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Advertisement from "@/components/Advertisement/advertisement";
import { useDisclosure } from "@heroui/modal";
import LockInterview from "@/components/LockInterview";
import { usePathname } from "next/navigation";

// import { io } from 'socket.io-client';
// const socket = io('http://localhost:4000');

const Main: React.FC = (props: any) => {
  const location = usePathname();
  const [menuState, setMenuState] = useState<boolean>(true);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [renderHome, setRenderHome] = useState<boolean>(false);
  const [sessionFinalRole, setSessionFinalRole] = useState<string>("");
  const handleChildData = () => {
    setMenuState(!menuState);
  };
  const [showLock, setShowLock] = useState(false);

  useEffect(() => {
    if (
      (location === "/admin/interview/all-interview" ||
        location === "/admin/scrutiny/screening") &&
      !renderHome
    ) {
      setRenderHome(true);
    }
  }, [location]);

  const handleSidebarToggle = (isOpen: boolean) => {
    setMenuState(isOpen);
  };

  const session = useSession() as any;
  const sessionData = session?.data?.user as any;

  let position = "Cell Head";
  if (sessionData?.data?.position?.value === "HOD") {
    position = "Head of Department";
  } else if (sessionData?.data?.position?.value === "SubAdmin") {
    position = "Admin";
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // const memberList: any = sessionStorage.getItem("member");
      // const member = JSON.parse(memberList);
      const membership: any = sessionStorage.getItem("membership");
      const membershipList = JSON.parse(membership);
      const finalRole: any = sessionStorage.getItem("finalRole");
      const finalRoleList = JSON.parse(finalRole);
      if (
        (sessionData?.data?.position?.value === "SubAdmin" ||
          sessionData?.data?.position?.value === "HOD") &&
        !finalRoleList
      ) {
        if (
          membershipList?.indexOf("screening") !== -1 ||
          membershipList?.indexOf("interview") !== -1 ||
          membershipList?.indexOf("institute") !== -1
        ) {
          onOpen();
          setIsShow(true);
        }
      }
    }
  }, [sessionData?.data?.position?.value]);

  return (
    <>
      {showLock && <LockInterview />}
      <Sidebar
        show={menuState}
        onSidebarToggle={handleSidebarToggle}
        renderHome={renderHome}
        sessionFinalRole={sessionFinalRole}
      />
      <div className={`content ${menuState ? "show" : "hide"}`}>
        <Navbar title="" name={position} onData={handleChildData} />
        <div className="px-4 pt-[30px] contentSub !mb-0 min-h-[calc(100vh-72px)] ">
          {props.children}
        </div>
        <br />
        <br />
      </div>
    </>
  );
};
export default Main;
