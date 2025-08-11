"use client";
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Table,
} from "@heroui/react";
import moment from "moment";
import React from "react";

const Experience: React.FC<{
  formMethods: any;
}> = ({ formMethods }) => {
  const { watch } = formMethods;

  return (
    <>
      <Table
        topContent={
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">Experience Details</h2>
            </div>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Institute/Hospital Name</TableColumn>
          <TableColumn>Position Held</TableColumn>
          <TableColumn>Start Date</TableColumn>
          <TableColumn>End Date</TableColumn>
          <TableColumn>Nature Of Duties</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No data found."}>
          {watch("post_held")?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{item?.postName}</TableCell>
              <TableCell>{item?.positionHeld}</TableCell>
              <TableCell>
                {" "}
                {moment(item?.date_of_joining).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell>
                {moment(item?.date_of_leaving).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell>{item?.nature_of_work}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Experience;
