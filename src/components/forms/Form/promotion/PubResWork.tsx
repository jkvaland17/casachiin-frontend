import { Input } from "@heroui/input";
import { Chip } from "@heroui/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

const PubResWork: React.FC<{
  formMethods: any;
  applicationId: string;
}> = ({ formMethods }) => {
  const { control, watch } = formMethods;

  const {
    fields: eqFields,
    // append: eqAppend,
    // remove: eqRemove,
    // update: eqUpdate,
  } = useFieldArray({ name: "pubResearchWork", control });

  const {
    fields: iFields,
    // append: iAppend,
    // remove: iRemove,
    // update: iUpdate,
  } = useFieldArray({ name: "Investigator", control });

  return (
    <>
      <Table
        topContent={
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">
                {" "}
                Other Education Qualification Details
              </h2>
            </div>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Category </TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Publication Status </TableColumn>
          <TableColumn>1st Author/Communicating Author</TableColumn>
          <TableColumn>File</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No data found."}>
          {eqFields?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{item?.category}</TableCell>
              <TableCell>{item?.title}</TableCell>
              <TableCell>{item?.status}</TableCell>
              <TableCell>{item?.author_type}</TableCell>
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

      <hr className="mt-3" />
      <div className="CA_form_current_head mt-3">
        <div className="content_breif">
          <h2 className="main_title">Your Best Paper</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Controller
            name="best_faculty_paper.title"
            control={control}
            render={({ field: { value } }) => (
              <>
                <div className="my-2 label">Title of Best Papers</div>
                <Input
                  isDisabled
                  className="mt-2"
                  disabled
                  type="text"
                  placeholder="Enter name"
                  value={value}
                />
              </>
            )}
          />
        </div>
        <div className="position-relative">
          <div>
            <div className="d-block label my-2"> Upload Documents</div>
            <label
              className="custum-file-upload w-full"
              htmlFor="file"
              style={{ background: "whitesmoke", cursor: "default" }}
            >
              {watch("best_faculty_paper.file") ? (
                <>
                  <a
                    onClick={() =>
                      window.open(watch("best_faculty_paper.file.presignedUrl"))
                    }
                    className="ant-upload-drag-icon border p-4 rounded-lg shadow-lg cursor-pointer"
                  >
                    <i className="fa-regular fa-file-pdf text-2xl" />
                  </a>
                  <p className="text mb-0">Uploaded Document</p>
                </>
              ) : (
                <>
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill=""
                      viewBox="0 0 24 24"
                    >
                      <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        id="SVGRepo_tracerCarrier"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill=""
                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <p className="text mb-0">Upload Document</p>
                  <small className="text">
                    File size should not be more then 5 mb.
                  </small>
                </>
              )}
              <input type="file" id="file" disabled />
            </label>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <Table
        topContent={
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">
                {" "}
                Other Education Qualification Details
              </h2>
            </div>
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Source of Funding</TableColumn>
          <TableColumn>Title of Project</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Year</TableColumn>
          <TableColumn>Total Amount </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No data found."}>
          {iFields?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{item?.source_of_funding}</TableCell>
              <TableCell>{item?.project_title}</TableCell>
              <TableCell>
                <Chip color="success" variant="flat">
                  {item?.role}
                </Chip>
              </TableCell>
              <TableCell>{item?.year}</TableCell>
              <TableCell>{item?.total_amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PubResWork;
