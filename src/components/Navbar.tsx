// import Notification from "@/assets/img/svg/Notification";
// import Setting from "@/assets/img/svg/Setting";
// import { Button } from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

interface NavbarProps {
  title: string;
  name: string;
  onData: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ title, name, onData }) => {
  const [search, setSearch] = useState<boolean>(false);
  const session = useSession();
  const sessionData = session?.data?.user as any;

  const sendDataToParent = () => {
    onData(); // Pass the new state to the parent
  };

  const toggleActive = () => {
    setSearch((prev) => !prev);
  };

  return (
    <nav className="border-gray-200 navBar shadow-lg">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4 navbarWrap">
        <div className="flex">
          <button
            onClick={sendDataToParent}
            className="menu_button text-white flex align-center pe-4 text-md"
          >
            <span className="material-symbols-rounded">menu</span>
          </button>
          <p className="text-white text-2xl hidden md:block">
            {sessionData?.data?.name}
            {sessionData?.data?.position?.value === "HOD" && (
              <span className="text-medium">
                , {sessionData?.data?.position?.value}
              </span>
            )}
          </p>
        </div>
        <div className="flex md:order-2">
          <button
            type="button"
            className="md:hidden text-gray-500 focus:outline-none rounded-lg text-sm p-2.5 me-2"
            onClick={toggleActive}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="flex gap-2 md:gap-4 items-center">
            {/* <div className="relative w-[300px] searchBarWrapper hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                autoComplete="off"
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-gray-900 rounded-full bg-[#f5f7fa] focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <div>
              <Setting />
            </div>
            <div>
              <Notification />
            </div> */}
            {/* <div className="cursor-pointer border p-2 rounded-full h-[40px] w-[40px] flex items-center justify-center bg-[#f0f3f8]">
              {sessionData?.data?.logo ? (
                <img src={sessionData?.data?.logo} alt="Logo" />
              ) : (
                <i className="fa-solid fa-user text-2xl" />
              )}
            </div> */}
            <Link
              href={"/"}
              onClick={() => signOut()}
              className="flex items-center gap-2"
            >
              <div className="cursor-pointer border p-2 rounded-full h-[40px] w-[40px] min-w-10 flex items-center justify-center bg-[#f0f3f8]">
                <i className="fa-solid fa-sign-out text-2xl text-dark" />
              </div>
              <span className="text-lg text-white">Logout</span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`relative w-80 searchBarWrapperOuter mx-auto mb-2 ${search ? "block" : "hidden"}`}
      >
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search icon</span>
        </div>
        <input
          autoComplete="off"
          type="text"
          id="search-navbar"
          className="block w-full p-2 ps-10 text-gray-900 rounded-full bg-[#f5f7fa] focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
      <p className="font-medium text-white text-2xl w-80 mx-auto block md:hidden">
        {title} {name}
      </p>
    </nav>
  );
};

export default Navbar;
