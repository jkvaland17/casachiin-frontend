// "use client";
// import React from "react";
// import Link from "next/link";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@heroui/table";
// import LOGO from "@/assets/img/brand/logo.png";
// import Image from "next/image";
// import { Button, Tooltip } from "@heroui/react";
// import moment from "moment/moment";

// type ApplicationItem = {
//   _id: string;
//   name: string;
//   photo?: string;
//   user?: {
//     name: string;
//     regNo: string;
//   };
//   speciality?: string;
//   specialityId?: {
//     superSpeciality?: {
//       masterValue: string;
//     };
//   };
//   post_applied_forId?: string;
//   post_applied_for?: {
//     postName: string;
//     postCode: string;
//   };
//   created_at: string;
//   user_status: string;
//   step: number;
// };

// type Props = {
//   rowSelection: any; // Adjust type accordingly
//   Data: ApplicationItem[];
//   Loading: boolean;
//   pageData: {
//     pageNo: number;
//     limit: number;
//   };
//   totalCounts: number;
//   setPageData: (data: { pageNo: number; limit: number }) => void;
//   AdvertisementName?: boolean;
// };

// const ApplicationList: React.FC<Props> = ({
//   rowSelection,
//   Data,
//   Loading,
//   pageData,
//   totalCounts,
//   setPageData,
//   AdvertisementName,
// }) => {
//   // const columns = [
//   //   {
//   //     title: "Name",
//   //     key: "name",
//   //     dataIndex: "name",
//   //     render: (id: string, item: ApplicationItem, idx: number) => {
//   //       return (
//   //         <Link href={`/admin/user-profile`}>
//   //           <div className="d-flex">
//   //             <Avatar
//   //               style={{ height: "40px", width: "40px" }}
//   //               size={40}
//   //               src={item?.photo}
//   //               icon={!item?.photo && <UserOutlined height={40} width={40} />}
//   //             />
//   //             <div className="ml-3 text-sm">
//   //               <h4 className="m-0">{item?.user?.name}</h4>
//   //               <h5 className="m-0">{item?.user?.regNo}</h5>
//   //             </div>
//   //           </div>
//   //         </Link>
//   //       );
//   //     },
//   //   },
//   //   {
//   //     title: "Speciality/Super Speciality",
//   //     dataIndex: "speciality",
//   //     key: "speciality",
//   //     render: (id: string, item: ApplicationItem) =>
//   //       item?.specialityId?.superSpeciality?.masterValue,
//   //   },
//   //   {
//   //     title: "Post Applied For",
//   //     key: "post_applied_forId",
//   //     dataIndex: "post_applied_forId",
//   //     render: (id: string, item: ApplicationItem) =>
//   //       item?.post_applied_for?.postName,
//   //   },
//   //   {
//   //     title: "Post Id",
//   //     key: "postCode",
//   //     dataIndex: "postCode",
//   //     render: (id: string, item: ApplicationItem) => {
//   //       return (
//   //         <div style={{ width: "50px" }}>
//   //           {item?.post_applied_for?.postCode}
//   //         </div>
//   //       );
//   //     },
//   //   },
//   //   {
//   //     title: "Date",
//   //     key: "date",
//   //     dataIndex: "date",
//   //     render: (id: string, item: ApplicationItem) => {
//   //       return (
//   //         <div style={{ width: "90px" }}>
//   //           {moment(item?.created_at).format("DD MMM, YYYY")}
//   //         </div>
//   //       );
//   //     },
//   //   },
//   //   {
//   //     title: "Status",
//   //     dataIndex: "user_status",
//   //     key: "user_status",
//   //     render: (id: string, item: ApplicationItem) => {
//   //       if (item?.user_status === "pending") {
//   //         return <Badge color="primary">{item?.user_status}</Badge>;
//   //       } else {
//   //         return <Badge color="success">{item?.user_status}</Badge>;
//   //       }
//   //     },
//   //   },
//   //   {
//   //     title: "Steps",
//   //     key: "steps",
//   //     dataIndex: "steps",
//   //     render: (id: string, item: ApplicationItem) => {
//   //       return (
//   //         <>
//   //           <div className="d-flex align-items-center stepsLine">
//   //             <div className="d-flex align-items-center">
//   //               <div
//   //                 className="dot"
//   //                 style={{
//   //                   background: `${item?.step > 0 ? "#017bff" : "#bbd9f9"}`,
//   //                 }}
//   //               ></div>
//   //             </div>
//   //             {Array.from({ length: 8 }).map((_, idx) => (
//   //               <div className="d-flex align-items-center">
//   //                 <div
//   //                   className="line"
//   //                   style={{
//   //                     background: `${idx <= item?.step ? "#017bff" : "#bbd9f9"
//   //                       }`,
//   //                   }}
//   //                 ></div>
//   //                 <div
//   //                   className="dot"
//   //                   style={{
//   //                     background: `${idx <= item?.step ? "#017bff" : "#bbd9f9"
//   //                       }`,
//   //                     animation: `${idx === item?.step && idx !== 7 && "pulse 1s infinite"
//   //                       }`,
//   //                   }}
//   //                 ></div>
//   //               </div>
//   //             ))}
//   //           </div>
//   //         </>
//   //       );
//   //     },
//   //   },
//   //   {
//   //     title: "Action",
//   //     key: "action",
//   //     dataIndex: "_id",
//   //     render: (id: string, item: ApplicationItem) => {
//   //       return (
//   //         <div className="table-icons d-flex gap-3 justify-content-center">
//   //           <Tooltip title="View">
//   //             <Link href={`/superadmin/user-profile/${item._id}`}>
//   //               <span className="material-symbols-outlined">visibility</span>
//   //             </Link>
//   //           </Tooltip>
//   //         </div>
//   //       );
//   //     },
//   //   },
//   // ];

//   // if (AdvertisementName) {
//   //   columns.splice(1, 0, {
//   //     title: "Advertisement Name",
//   //     key: "advertisement_noId",
//   //     dataIndex: "advertisement_noId",
//   //     render: (id: string, item: ApplicationItem) =>
//   //       item?.advertisement_noId?.advertisementName,
//   //   });
//   // }

//   return (
//     <>
//       <div id="userListTable" className="table-wrapper my-5">
//         {/* <Table
//           rowSelection={rowSelection}
//           dataSource={Data}
//           columns={columns}
//           loading={Loading}
//           style={{ overflow: "auto" }}
//           pagination={{
//             current: pageData.pageNo,
//             pageSize: pageData.limit,
//             showSizeChanger: true,
//             showQuickJumper: true,
//             total: totalCounts,
//             onChange: (page, pageSize) => {
//               setPageData({
//                 ...pageData,
//                 pageNo: page,
//                 limit: pageSize,
//               });
//             },
//           }}
//         /> */}
//         <Table
//           selectionMode="multiple"
//           style={{
//             height: "auto",
//             minWidth: "100%",
//           }}
//         >
//           <TableHeader>
//             <TableColumn> Name </TableColumn>
//             <TableColumn>Speciality/Super Speciality</TableColumn>
//             <TableColumn>Post Applied For </TableColumn>
//             <TableColumn>Post Id </TableColumn>
//             <TableColumn>Date </TableColumn>
//             <TableColumn>Status</TableColumn>
//             <TableColumn>Steps</TableColumn>
//             <TableColumn>Action</TableColumn>
//           </TableHeader>
//           <TableBody>
//             {/* <TableRow key="1">
//               <TableCell>
//                 <Image src={LOGO} alt="" className="img-fluid" height={40} width={40} />
//               </TableCell>
//               <TableCell>-</TableCell>
//               <TableCell>-</TableCell>
//               <TableCell>-</TableCell>
//               <TableCell>02 Mar, 2024</TableCell>
//               <TableCell><span className="text-[#F9FAFB] text-xs font-medium me-2 px-2.5 py-1 rounded bg-[#5e72e4]">Padding</span>
//               </TableCell>
//               <TableCell> <div className="flex items-center stepsLine">
//                 <div className="flex items-center">
//                   <div
//                     className="dot"
//                     style={{
//                       background: `#017bff`,
//                     }}
//                   ></div>
//                 </div>
//                 {Array.from({ length: 8 }).map((_, idx) => (
//                   <div className="flex items-center">
//                     <div
//                       className="line"
//                       style={{
//                         background: `${idx <= 3 ? "#017bff" : "#bbd9f9"
//                           }`,
//                       }}
//                     ></div>
//                     <div
//                       className="dot"
//                       style={{
//                         background: `${idx <= 3 ? "#017bff" : "#bbd9f9"
//                           }`,
//                         animation: `${idx == 3 && idx != 7 && "pulse 1s infinite"
//                           }`,
//                       }}
//                     ></div>
//                   </div>
//                 ))}
//               </div></TableCell>
//               <TableCell>
//                 <Tooltip content="View" color="primary">
//                   <div className="w-10 h-10 bg-[#D0FFEB] rounded-full flex items-center justify-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2DCE89" className="bi bi-eye" viewBox="0 0 16 16">
//                       <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
//                       <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
//                     </svg>
//                   </div>
//                 </Tooltip>
//               </TableCell>
//             </TableRow> */}
//             {console.log("Data:: ", Data)}
//             {Data?.map((item: any, i) => (
//               <TableRow key={i}>
//                 <TableCell>
//                   <img
//                     src={item?.photo}
//                     alt=""
//                     className="img-fluid"
//                     height={40}
//                     width={40}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   {item?.specialityId?.superSpeciality?.masterValue || "-"}
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center stepsLine">
//                     <div className="flex items-center">
//                       <div
//                         className="dot"
//                         style={{
//                           background: `#017bff`,
//                         }}
//                       ></div>
//                     </div>
//                     {Array.from({ length: 8 }).map((_, idx) => (
//                       <div key={idx} className="flex items-center">
//                         <div
//                           className="line"
//                           style={{
//                             background: `${
//                               idx <= item?.step ? "#017bff" : "#bbd9f9"
//                             }`,
//                           }}
//                         ></div>
//                         <div
//                           className="dot"
//                           style={{
//                             background: `${
//                               idx <= item?.step ? "#017bff" : "#bbd9f9"
//                             }`,
//                             animation: `${
//                               idx == item?.step &&
//                               idx != 7 &&
//                               "pulse 1s infinite"
//                             }`,
//                           }}
//                         ></div>
//                       </div>
//                     ))}
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Tooltip content="View" color="primary">
//                     <Link
//                       className="w-10 h-10 bg-[#D0FFEB] rounded-full flex items-center justify-center"
//                       href={"/superadmin/user-profile/65e2d8a1b4ae9d4254541692"}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="16"
//                         height="16"
//                         fill="#2DCE89"
//                         className="bi bi-eye"
//                         viewBox="0 0 16 16"
//                       >
//                         <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
//                         <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
//                       </svg>
//                     </Link>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// };

// export default ApplicationList;
