import React, { KeyboardEvent } from "react";

import { Controller, Control, FieldValues } from "react-hook-form";
import { Input } from "@heroui/react";

interface MyFormInputProps {
  formMethods: {
    control: Control<FieldValues>;
    getValues: () => FieldValues;
  };
  name: string;
  title: string;
  id: string;
  type?: string;
  disabled?: boolean;
  disabledValidation?: boolean;
  grid?: number;
}

const MyFormInput: React.FC<MyFormInputProps> = ({
  formMethods,
  name,
  title,
  type,
  disabledValidation,
  grid,
}) => {
  const { control } = formMethods;

  const PreventWordInput = (val: KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      const disableKey = [
        "e",
        "E",
        "ArrowUp",
        "ArrowDown",
        ".",
        "+",
        "-",
        "@",
        "#",
        "",
      ];
      if (disableKey.includes(val.key)) {
        val.preventDefault();
      }
    }
  };

  return (
    <div className={`grid grid-cols-${grid ? grid : 6}`}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: disabledValidation ? false : true,
            message: "Please enter value",
          },
        }}
        render={({ fieldState: { invalid }, field: { onChange, value } }) => (
          <>
            <div className="label my-2">{title}</div>
            <>
              <Input
                isDisabled
                startContent={
                  <div className="pr-2">
                    <i className="fa-solid fa-rectangle-list"></i>
                  </div>
                }
                type={type || "text"}
                value={value}
                isInvalid={invalid}
                onChange={onChange}
                onKeyDown={PreventWordInput}
              />
            </>
          </>
        )}
      />
    </div>
  );
};

export default MyFormInput;
