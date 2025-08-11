"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, []);
  return (
    <>
      <p className="text-center text-2xl">Dashboard</p>
    </>
  );
};
export default Dashboard;
