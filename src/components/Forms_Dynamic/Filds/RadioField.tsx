import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, useRadio, cn } from "@heroui/react"; // Adjust the import based on your UI library structure
import { Field, Option } from "../Type";

type RadioFieldProps = {
  field: Field;
};

export const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    getBaseProps,
    getLabelProps,
    getLabelWrapperProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group flex items-center justify-center hover:opacity-70 active:opacity-50 tap-highlight-transparent",
        "w-16 h-16 cursor-pointer border-2 border-default rounded-lg",
        "data-[selected=true]:border-primary",
      )}
    >
      <div {...getLabelWrapperProps()} className="m-0">
        {children && <span {...getLabelProps()}>{children}</span>}
      </div>
    </Component>
  );
};

const RadioField: React.FC<RadioFieldProps> = ({ field }) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        name={field.value}
        control={control}
        render={({ field: { value } }) => (
          <div
            className={`form-group mb-0 col-span-1 md:col-span-${field.col}`}
          >
            <div className="my-3 text-[15px] text-gray-700 label ">
              {field.title}
            </div>
            <div className="custom_radio mb-0">
              <RadioGroup orientation="horizontal" value={value}>
                {field?.option?.map((option: Option, index: number) => (
                  <CustomRadio key={index} value={option.value}>
                    <i className={`text-2xl text-center ${option.icon}`} />
                  </CustomRadio>
                )) || []}
              </RadioGroup>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default RadioField;
