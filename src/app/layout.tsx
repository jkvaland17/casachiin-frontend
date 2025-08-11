import React from "react";
import "material-symbols";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/Utils/Provide";
import NextTopLoader from "nextjs-toploader";

import "../assets/css/style.scss";
import "../assets/css/interviewStyle.scss";
import "../assets/css/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const rubik = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CA Admin Panel",
  description: "CA Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <NextTopLoader showSpinner={false} />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
