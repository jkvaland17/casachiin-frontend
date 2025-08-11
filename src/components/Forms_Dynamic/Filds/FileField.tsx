import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field } from "@/components/Forms_Dynamic/Type";

type InputFieldProps = {
  field: Field;
};

const FileField: React.FC<InputFieldProps> = ({ field }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={field.value}
      control={control}
      render={({ field: { value } }) => (
        <>
          <div className={`mb-2 col-span-full`}>
            <div className="my-3 text-[15px] text-gray-700 label ">
              {field.title}
            </div>
            <div className="position-relative">
              <label
                className="custum-file-upload w-full"
                htmlFor="file"
                style={{ background: "whitesmoke", cursor: "default" }}
              >
                {value ? (
                  <>
                    {value?.length > 0 ? (
                      <div className="flex gap-2 flex-wrap">
                        {value?.map((ele: any, index: number) => (
                          <a
                            key={index}
                            onClick={() => {
                              window.open(
                                ele?.presignedUrl ? ele?.presignedUrl : ele,
                              );
                            }}
                            className="ant-upload-drag-icon border p-4 rounded-lg shadow-lg cursor-pointer"
                          >
                            <i className="fa-regular fa-file-pdf text-2xl" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        onClick={() => {
                          window.open(
                            value?.presignedUrl ? value?.presignedUrl : "#",
                          );
                        }}
                        className="ant-upload-drag-icon border p-4 rounded-lg shadow-lg cursor-pointer"
                      >
                        <i className="fa-regular fa-file-pdf text-2xl" />
                      </a>
                    )}
                    <p className="text mb-0">Download Document</p>
                  </>
                ) : (
                  "N/A"
                )}
              </label>
            </div>
          </div>
        </>
      )}
    />
  );
};

export default FileField;
