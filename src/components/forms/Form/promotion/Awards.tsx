import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React from "react";
import { useFieldArray } from "react-hook-form";

const Awards: React.FC<{
  formMethods: any;
  applicationId: string;
}> = ({ formMethods }) => {
  const { control } = formMethods;
  const {
    fields: newFieldsAward,
    // append: newAppendAward,
    // remove: newRemoveAward,
  } = useFieldArray({ name: "awards", control });
  const {
    fields: newFieldsMembership,
    // append: newAppendMembership,
    // remove: newRemoveMembership,
  } = useFieldArray({ name: "membership", control });
  const {
    fields: newFieldsService,
    // append: newAppendService,
    // remove: newRemoveService,
  } = useFieldArray({ name: "service", control });
  const {
    fields: newFieldsContribution,
    // append: newAppendContribution,
    // remove: newRemoveContribution,
  } = useFieldArray({ name: "contribution", control });
  return (
    <>
      <Table
        topContent={
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title text-left">
                Awards, Fellowships and Membership of Professional Bodies
                Details
              </h2>
            </div>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Title of Award </TableColumn>
          <TableColumn>Award Category</TableColumn>
          <TableColumn>Year</TableColumn>
          <TableColumn>Description (300 Characters)</TableColumn>
          <TableColumn>File</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No data found."}>
          {newFieldsAward?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{item?.award_title}</TableCell>
              <TableCell>{item?.award_category}</TableCell>
              <TableCell>{item?.award_year}</TableCell>
              <TableCell>{item?.award_description}</TableCell>
              <TableCell>
                <span style={{ textWrap: "nowrap", cursor: "pointer" }}>
                  <a
                    onClick={() => window.open(item?.presignedUrl ?? "")}
                    className="ant-upload-drag-icon"
                  >
                    <i className="fa-regular fa-file-pdf text-2xl" />
                  </a>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr className="my-3" />
      <Table
        topContent={
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title text-left">
                Membership of Editorial Boards of Indexed International
                Journal/Review Committees at National Bodies and Institution
                Details
              </h2>
            </div>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Year</TableColumn>
          <TableColumn>Description (300 Characters)</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No data found."}>
          {newFieldsMembership?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{item?.editorial_year}</TableCell>
              <TableCell>{item?.editorial_description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr className="my-3" />
      <Table
        topContent={
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title text-left">
                Service Details (Contribution made towards the development of
                new Unit/ Speciality/ Laboratory/ Facility/ Programs/
                Therapeutic or Diagnostic Procedures developed or Patents
                taken(enclosed evidence))
              </h2>
            </div>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Year</TableColumn>
          <TableColumn>Description (300 Characters)</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No data found."}>
          {newFieldsService?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{item?.service_year}</TableCell>
              <TableCell>{item?.service_description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr className="my-3" />
      <Table
        topContent={
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title text-left">
                Contribution Details in Community and National Programmes
              </h2>
            </div>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Year</TableColumn>
          <TableColumn>Description (300 Characters)</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No data found."}>
          {newFieldsContribution?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>
                {item?.contribution_year ? item?.contribution_year : "-"}
              </TableCell>
              <TableCell>{item?.contribution_description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Awards;
