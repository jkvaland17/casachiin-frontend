import React from "react";
import { Select, SelectItem } from "@heroui/react";
import { Controller } from "react-hook-form";

interface MyFormSelectProps {
  formMethods: any;
  name: string;
  options: { value: string; title: string }[];
  title: string;
  disabled?: boolean;
  disabledValidation?: boolean;
  grid?: number;
  id?: string;
}

const MyFormSelect: React.FC<MyFormSelectProps> = ({
  formMethods,
  name,
  options,
  title,
  grid,
}) => {
  const { control } = formMethods as { control: any };

  return (
    <div className={`grid grid-cols-${grid ? grid : 6}`}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
        }) => (
          <>
            {title}
            <Select
              size="md"
              className="max-w-xs"
              selectedKeys={[value]}
              isInvalid={invalid}
              onChange={onChange}
              startContent={
                <div className="pr-2">
                  <i className="fa-solid fa-rectangle-list"></i>
                </div>
              }
            >
              {options.map((item) => (
                <SelectItem key={item.value}>{item.title}</SelectItem>
              ))}
            </Select>
            {invalid && <span>{error?.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default MyFormSelect;
