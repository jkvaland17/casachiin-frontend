import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/components/Forms_Dynamic/Type";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Interweave } from "interweave";

type TableFieldProps = {
  field: Field;
};

const TableField: React.FC<TableFieldProps> = ({ field }) => {
  const { watch } = useFormContext();
  const tableData = watch(field.value);
  return (
    <>
      {field?.title ? (
        <div className=" text-[15px] text-gray-700 label  col-span-full w-full">
          {field.title}
        </div>
      ) : (
        ""
      )}
      <Table className={`my-3 col-span-full`}>
        <TableHeader>
          <TableColumn style={{ width: "100px" }}>Sr. No.</TableColumn>
          {field.thead &&
            (field.thead.map((header: any, i: number) => (
              <TableColumn
                key={i}
                className={header.type === "interweave" ? "max-w-[300px]" : ""}
              >
                {header.title}
              </TableColumn>
            )) as any)}
        </TableHeader>
        <TableBody emptyContent={"No data found."}>
          {tableData?.map((item: any, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              {field.thead &&
                (field.thead.map((header: any, i: number) => (
                  <TableCell key={i}>
                    {(() => {
                      if (header.type === "date") {
                        return item[header.keyname]
                          ? moment(item[header.keyname]).format("DD/MM/YYYY")
                          : "N/A";
                      }
                      if (header.type === "interweave") {
                        if (header.subkeyname) {
                          console.log(
                            "header",
                            item,
                            header,
                            header.subkeyname,
                            item[header.keyname],
                          );
                          return;
                        }

                        return (
                          <Interweave
                            content={
                              header.subkeyname
                                ? (item[header.keyname]?.[header.subkeyname] ??
                                  "")
                                : (item?.[header.keyname] ?? "")
                            }
                            tagName="span"
                            className=" text-wrap"
                          />
                        );
                      }

                      if (header.type === "file") {
                        if (item[header.keyname]?.length > 0) {
                          return (
                            <div className="flex gap-2">
                              {item[header.keyname]?.map(
                                (ele: any, index: number) => (
                                  <span
                                    key={index}
                                    style={{
                                      textWrap: "nowrap",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <a
                                      onClick={() => {
                                        window.open(ele?.presignedUrl ?? "");
                                      }}
                                      className="ant-upload-drag-icon"
                                    >
                                      <i className="fa-regular fa-file-pdf text-2xl" />
                                    </a>
                                  </span>
                                ),
                              )}
                            </div>
                          );
                        } else {
                          return (
                            <span
                              style={{ textWrap: "nowrap", cursor: "pointer" }}
                            >
                              <a
                                onClick={() => {
                                  window.open(
                                    item[header.keyname]?.presignedUrl ?? "",
                                  );
                                }}
                                className="ant-upload-drag-icon"
                              >
                                <i className="fa-regular fa-file-pdf text-2xl" />
                              </a>
                            </span>
                          );
                        }
                      }

                      return item[header.keyname];
                    })()}
                  </TableCell>
                )) as any)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TableField;
