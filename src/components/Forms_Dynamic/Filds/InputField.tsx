import { Input } from "@heroui/input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field } from "@/components/Forms_Dynamic/Type";
import moment from "moment";

type InputFieldProps = {
  field: Field;
};

const InputField: React.FC<InputFieldProps> = ({ field }) => {
  const { control, watch } = useFormContext();

  const calculateDays = (endDate: any, startDate: any) => {
    return (
      moment(endDate, "YYYY-MM-DD").diff(
        moment(startDate, "YYYY-MM-DD"),
        "days",
      ) + 1 || 0
    );
  };

  function formatValue(value: any, fieldType: any) {
    if (value || value === 0) {
      if (fieldType === "date") {
        return moment(value).format("DD/MM/YYYY");
      }
      return value;
    } else if (fieldType === "totaldays") {
      let endDate = watch(`${field?.endDate}`);
      let startDate = watch(`${field?.startDate}`);
      return calculateDays(endDate, startDate) || "N/A";
    }
    return "N/A";
  }
  return (
    <Controller
      name={field.value}
      control={control}
      render={({ field: { value } }) => (
        <>
          <div className={`mb-2 col-span-1 md:col-span-${field.col}`}>
            <div className="my-3 text-[15px] text-gray-700 label ">
              {field.title}
            </div>
            <Input
              classNames={{ innerWrapper: ["py-3"], input: ["text-[15px]"] }}
              isReadOnly
              type="text"
              labelPlacement="outside"
              className="border-white bg-white rounded-lg text-xl"
              value={formatValue(value, field.type)}
              startContent={<i className={field.icon}></i>}
            />
          </div>
        </>
      )}
    />
  );
};

export default InputField;
