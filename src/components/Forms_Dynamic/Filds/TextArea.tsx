import { Textarea } from "@heroui/input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Field } from "@/components/Forms_Dynamic/Type";

type TextareaFieldProps = {
  field: Field;
};

const TextareaField: React.FC<TextareaFieldProps> = ({ field }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.value}
      control={control}
      render={({ field: { value } }) => (
        <>
          <div className={`mb-3 col-span-full`}>
            <div className="my-3 text-[15px] text-gray-700 label ">
              {field.title}
            </div>
            <Textarea
              classNames={{ input: ["text-[15px]"] }}
              isReadOnly
              type="text"
              labelPlacement="outside"
              className="border-white bg-white rounded-lg text-xl"
              value={value}
              startContent={<i className={field.icon}></i>}
            />
          </div>
        </>
      )}
    />
  );
};

export default TextareaField;
