"use client";
import React, { Suspense } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { HeroUIProvider } from "@heroui/react";
import CheckAuthentication from "./CheckAuthentication";
function Provider({ children }) {
  return (
    <SessionProvider>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />{" "}
      <HeroUIProvider locale="en-GB">
        <CheckAuthentication />
        <Suspense>{children}</Suspense>
      </HeroUIProvider>
    </SessionProvider>
  );
}
export default Provider;
