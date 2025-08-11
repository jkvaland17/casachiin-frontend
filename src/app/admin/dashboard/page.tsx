"use client";
import React, { useEffect, useState } from "react";
import InterviewerHeader from "@/components/Custom/InterviewerHeader";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const session = useSession() as any;

  return (
    <main className="mt-5 admin_dashboard mb-5">
      <InterviewerHeader
        icon={false}
        view={false}
        heading={`HELLO, ${session?.data?.user?.data?.name}! `}
        subHeading="WELCOME TO DASHBOARD"
      />
    </main>
  );
}

