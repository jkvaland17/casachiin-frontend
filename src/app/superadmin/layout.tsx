"use client";

import React, { Suspense, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

const Main: React.FC = (props: any) => {
  // const session = useSession();
  // const sessionData = session?.data?.user as any;
  const [menuState, setMenuState] = useState<boolean>(true);
  const session = useSession();
  const sessionData = session?.data?.user as any;
  const handleChildData = () => {
    setMenuState(!menuState);
  };

  const handleSidebarToggle = (isOpen: boolean) => {
    setMenuState(isOpen);
  };
  let position = "Cell Head";
  if (sessionData?.data?.position?.value === "HOD") {
    position = "Head of Department";
  } else if (sessionData?.data?.position?.value === "SubAdmin") {
    position = "Admin";
  }
  const renderHome = true;
  return (
    <>
      <Sidebar
        show={menuState}
        onSidebarToggle={handleSidebarToggle}
        renderHome={renderHome}
      />
      <div className="content">
        <Navbar title="" name={position} onData={handleChildData} />
        <div className="px-4 pt-[30px] contentSub  min-h-[calc(100vh-72px)]">
          <Suspense>{props.children}</Suspense>
        </div>
      </div>
    </>
  );
};
export default Main;
