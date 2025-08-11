import React from "react";
import Link from "next/link";

//images
import Image from "next/image";
import advertisementIcon from "@/assets/img/svg/documentIcon.svg";
import screeningIcon from "@/assets/img/svg/screeningIcon.svg";
import interviewIcon from "@/assets/img/svg/interviewMgmt.svg";
import counsellingIcon from "@/assets/img/svg/cpinsellingMgmt.svg";
import Roster from "@/assets/img/svg/Roster.svg";
import Reports from "@/assets/img/svg/reports.svg";

//component
import InterviewerHeader from "@/components/Custom/InterviewerHeader";

export default function Dashboard() {
  const quickAccessCards = [
    {
      id: 1,
      icon: Roster, // icon for Advertisement Management
      title: "Roster and Vacancy Management",
      description: "Check details of all Roster",
      link: "/admin/roster/committee",
    },
    {
      id: 2,
      icon: advertisementIcon, // icon for Advertisement Management
      title: "Advertisement Management",
      description: "Check details of all advertisement",
      link: "/admin/advertisment-overview",
    },
    {
      id: 3,
      icon: screeningIcon, // icon for Screening Management
      title: "Screening Management",
      description: "Check details of all Management",
      link: "/admin/screening/department-screening/candidate-screening",
    },
    {
      id: 4,
      icon: interviewIcon, // icon for Interview Management
      title: "Interview Management",
      description: "Check details of all Interview",
      link: "/admin/interview/manage-interview",
    },
    {
      id: 5,
      icon: counsellingIcon, // icon for Counselling Management
      title: "Counselling Management",
      description: "Check details of all Counselling",
      link: "/admin/counselling",
    },
    {
      id: 6,
      icon: Reports,
      title: "Reports and Logs",
      description: "Check details of all Reports",
      link: "#",
    },
  ];

  return (
    <div className="mt-5 admin_dashboard mb-5">
      <InterviewerHeader
        heading={"HELLO, FACULITY CELL HEAD! "}
        subHeading="WELCOME TO DASHBOARD"
      />

      <div className="mt-5 grid  gap-3">
        <div className="p-5 bg-white rounded-2xl shadow-sm">
          <h3 className="font-medium text-xl">Your quick access</h3>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {quickAccessCards.map((item, index) => (
              <div
                key={index}
                className="access-card p-5 bg-[#f7f9fc] rounded-md hover:bg-[#ecf2fb]"
              >
                <Link href={item.link} className="text-black  font-medium">
                  <div className="border-l-3 border-l-blue-600">
                    <div className="icon_di ms-[5px]">
                      <div className="h-[50px] w-[50px]">
                        <Image
                          src={item.icon}
                          alt="icon"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">{item.title}</div>
                  <p className="text-small text-gray-500 leading-5">
                    {item.description}
                  </p>
                  {/* <div className="text-end">
                    <span className="material-symbols-rounded text-lg text-yellow-500">
                      arrow_forward
                    </span>
                  </div> */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="mt-4">
        <div className="p-5">
          <div className="flex justify-between">
            <h3 className="font-medium  text-3xl">Notifications/Events</h3>
            <Button color="primary">+ Add Event</Button>
          </div>
          <div className="mt-5">
            {advertisements.map((item, index) => (
              <div
                key={index}
                className="p-4 mb-4 bg-white rounded-2xl shadow-sm "
              >
                <div className="ms-3 py-1 flex justify-between">
                  <div>
                    <Link
                      href={"/admin/advertisment-overview"}
                      className="text-md font-medium"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-blue-600 mt-1">
                      {item.date} | {item.time}
                    </p>
                  </div>
                  <div className="text-end">
                 
                    <Button
                      href={item?.link}
                      as={Link}
                      variant="ghost"
                      color="success"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}
