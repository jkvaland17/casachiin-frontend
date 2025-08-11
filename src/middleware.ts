import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import {
//   adminRoutes,
// superAdminRoutes,
// cellAdminRoutes,
//   orgAdmin,
//   adminRoutesHOD,
// } from "@/routes";
import { getToken } from "next-auth/jwt";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./AuthOption";

// const isLogin: boolean = false;

export async function middleware(request: NextRequest) {
  const data = (await getToken({ req: request })) as any;
  const userType = data?.data?.userType?.type;
  // const position = data?.data?.position?.value;
  const { pathname } = request.nextUrl;

  if (!data) {
    const routes = ["/"];
    if (!routes.includes(pathname) && pathname !== "/interview-result") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // if (userType === "superAdmin") {
  //   const allowSuperAdmin = superAdminRoutes.map(
  //     (item) => `${item.layout}${item.path}`,
  //   );
  //   const allowPathname = `${pathname?.split("/")[0]}/${pathname?.split("/")[1]}/${pathname?.split("/")[2]}`;
  //   if (!allowSuperAdmin.includes(allowPathname)) {
  //     return NextResponse.redirect(
  //       new URL("/superadmin/organization", request.url),
  //     );
  //   }
  // }

  // if (userType === "admin" && position === "CellAdmin") {
  //   const allowCellAdminRoutes = cellAdminRoutes.map(
  //     (item) => `${item.layout}${item.path}`,
  //   );
  //   const allowPathname = `${pathname?.split("/")[0]}/${pathname?.split("/")[1]}/${pathname?.split("/")[2]}`;
  //   if (!allowCellAdminRoutes?.some((path) => path.startsWith(allowPathname))) {
  //     return NextResponse.redirect(new URL("/admin/application", request.url));
  //   }
  // }

  // if (userType === "orgAdmin") {
  //   const allowOrgAdmin = orgAdmin.map((item) => `${item.layout}${item.path}`);
  //   if (!allowOrgAdmin.includes(pathname)) {
  //     return NextResponse.redirect(new URL("/orgadmin", request.url));
  //   }
  // }

  // if (userType === "admin" && position === "HOD") {
  //   const allowAdminRoutesHOD = adminRoutesHOD.map(
  //     (item) => `${item.layout}${item.path}`,
  //   );
  //   if (!allowAdminRoutesHOD.includes(pathname)) {
  //     return NextResponse.redirect(new URL("/admin", request.url));
  //   }
  // }

  // if (userType === "admin" && position === "Head") {
  //   const allowAdminRoutes = adminRoutes.map(
  //     (item) => `${item.layout}${item.path}`,
  //   );

  //   // if (
  //   //   pathname.match("/admin/queries/") ||
  //   //   pathname.match("/admin/user-profile/")
  //   // ) {
  //   //   return NextResponse.next();
  //   // }
  //   console.log("allowAdminRoutes::: ", allowAdminRoutes);
  //   console.log("----::: ", adminRoutes);

  //   if (!allowAdminRoutes.includes(pathname)) {
  //     return NextResponse.redirect(new URL("/admin", request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
