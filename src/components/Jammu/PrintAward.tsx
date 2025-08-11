import moment from "moment";
import LogoJammu from "@/assets/img/LogoJammu.png";
import React from "react";
import Image from "next/image";

const PrintAward = ({
  sessionData,
  data,
  selectedList,
  awardPanelMembers,
  columns,
  dto,
  advData,
}: any) => {
  function getMarksByAdminId(applicationData: any, adminId: any) {
    const stats = applicationData.applicationInterview?.stats || [];
    const matchedStat = stats.find((stat: any) => stat.admin === adminId);
    return matchedStat ? matchedStat.marks : null; // Returns marks if matched, otherwise null
  }
  return (
    <>
      <div className="relative">
        <div className="overflow-hidden absolute top-0 left-0 w-full h-full grid grid-cols-4 gap-5 opacity-10 pointer-events-none">
          {Array(100)
            .fill(null)
            .map((_, index) => (
              <p key={index} className="watermark-text rotate-[-30deg]">
                {sessionData?.data?.name}
              </p>
            ))}
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <td
                style={{
                  position: "relative",
                  textAlign: "center",
                }}
              >
                <div style={{ width: "60px", margin: "25px auto 0" }}>
                  <Image
                    height={100}
                    width={100}
                    src={LogoJammu}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    alt="CA_JAMMU_LOGO"
                  />
                  {/* <img
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    src="https://www.CAjammu.edu.in/wp-content/uploads/2022/01/logo.png"
                    alt="CA Logo"
                  /> */}
                </div>
                <div
                  style={{
                    width: "fit-content",
                    background: "red",
                    color: "white",
                    fontWeight: 700,
                    padding: "8px",
                    fontSize: "12px",
                    borderRadius: "10px",
                    textAlign: "center",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  Confidential
                </div>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "0.5rem",
                  borderBottom: "1px solid black",
                }}
              >
                <p
                  className="english_title"
                  style={{
                    fontWeight: 700,
                    textAlign: "center",
                    color: "black",
                    margin: "2px",
                    fontFamily: "'Noto Sans', Arial, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  {advData?.awardsheetTitle}
                </p>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center", padding: "0.5rem" }}>
                <p
                  style={{
                    margin: "5px 0px",
                    color: "rgb(32, 115, 223)",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Combined Merit cum Mark sheet of the candidates interviewed
                  for the Post of {data?.position?.value} in the Department of{" "}
                  {data?.department?.value} on{" "}
                  {moment(
                    new Date(data?.applicationInterview?.interview?.startDate),
                  ).format("DD-MM-YYYY")}
                  .
                </p>
              </td>
            </tr>
          </thead>
          {/* <div style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}>
            Advertisement Notice No: {data?.advertisement?.value}
          </div> */}
          <div style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}>
            Department: {data?.department?.value}
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}>
            Post: {data?.position?.value}
          </div>
          {data?.advertisement?.formTemplate === "Faculty_APS" && (
            <div
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "0 18px",
              }}
            >
              Promotion To the Grade Of : {data?.position?.value}
            </div>
          )}
          <div style={{ fontSize: 14, fontWeight: 500, padding: "0 18px" }}>
            Date Of Interview:{" "}
            {moment(
              new Date(data?.applicationInterview?.interview?.startDate),
            ).format("DD-MM-YYYY")}
          </div>
          <tbody>
            <tr>
              <td
                colSpan={5}
                style={{
                  padding: "1rem",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {/* <h1
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: 8,
                  }}
                >
                  Recommendation List
                </h1> */}
                <div
                  style={{
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    border: "1px solid rgb(191, 191, 191)",
                    marginBottom: "1.5rem",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "rgb(20, 114, 255)",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {columns?.map((column: any, i: any) => (
                          <th
                            key={i}
                            style={{
                              backgroundColor: "rgb(20, 114, 255)",
                              color: "white",
                              textAlign: "center",
                              padding: "5px",
                            }}
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedList?.map((selected: any, index: number) => (
                        <tr
                          key={index}
                          style={{
                            borderBottom: "1px solid rgb(212, 212, 212)",
                          }}
                        >
                          <td
                            style={{
                              padding: "0.5rem 1rem",
                              fontSize: "12px",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{
                              padding: "0.5rem 1rem",
                              fontSize: "12px",
                            }}
                          >
                            {selected?.application?.registration}
                          </td>
                          <td
                            style={{
                              padding: "0.5rem 1rem",
                              fontSize: "12px",
                            }}
                          >
                            {selected?.user?.name}
                          </td>
                          {dto?.map((column: any, i: number) => {
                            const stat =
                              selected?.applicationInterview?.stats?.find(
                                (ele: any) => ele?.admin === column?.key,
                              );
                            return (
                              <td
                                key={i}
                                style={{
                                  padding: "0.5rem 1rem",
                                  fontSize: "12px",
                                }}
                              >
                                {stat
                                  ? getMarksByAdminId(selected, stat?.admin)
                                  : "-"}
                              </td>
                            );
                          })}
                          <td
                            style={{
                              padding: "0.5rem 1rem",
                              fontSize: "12px",
                            }}
                          >
                            {selected?.marks}
                          </td>
                          <td
                            style={{
                              padding: "0.5rem 1rem",
                              fontSize: "12px",
                            }}
                          >
                            {selected?.average_marks}
                          </td>
                        </tr>
                      ))}
                      {selectedList?.length === 0 && (
                        <tr
                          style={{
                            borderBottom: "1px solid rgb(212, 212, 212)",
                          }}
                        >
                          <td
                            style={{
                              padding: "0.5rem 1rem",
                              fontSize: "12px",
                              textAlign: "center",
                            }}
                            colSpan={5 + dto?.length}
                          >
                            There is no candidates in this list
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                flexWrap: "wrap",
                textAlign: "start",
                padding: "10px",
              }}
            >
              {awardPanelMembers?.map(
                (item: {
                  _id: string;
                  role: any;
                  user: any;
                  lockedDate: string;
                  lockedTime: string;
                }) => (
                  <div
                    key={item._id}
                    style={{
                      width: "25%",
                      marginTop: "50px",
                    }}
                  >
                    <div className="border border-black p-1 w-fit mb-2">
                      <div className="flex items-start">
                        <div className="font-semibold text-md text-gray-600">
                          Digitally Concurred by
                        </div>
                      </div>
                      <table className="text-sm">
                        <tbody>
                          <tr>
                            <td className="font-semibold">Name:</td>
                            <td>{item?.user?.name}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold">Role:</td>
                            <td>{item?.role?.value}</td>
                          </tr>
                          {item?.role?.value !== "Observer" && (
                            <tr>
                              <td className="font-semibold">On Date:</td>
                              <td>
                                {item?.lockedDate ? item?.lockedDate : "--"}
                              </td>
                            </tr>
                          )}
                          {item?.role?.value !== "Observer" && (
                            <tr>
                              <td className="font-semibold">Time:</td>
                              <td>
                                {item?.lockedTime ? item?.lockedTime : "--"}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ),
              )}
            </div>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PrintAward;
