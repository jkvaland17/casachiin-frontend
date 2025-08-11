import React from "react";
import { Controller } from "react-hook-form";
import { RadioGroup } from "@heroui/react";

import { useRadio, cn } from "@heroui/react";

interface MyFormRadioProps {
  colSize?: string | number;
  title?: string;
  radioId?: any;
  radioValue: string;
  formMethods: any;
  apiVar: string; // Replace any with actual type
  type?: string;
  getValue?: string;
}

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
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary",
      )}
    >
      <div {...getLabelWrapperProps()} className="m-0">
        {children && <span {...getLabelProps()}>{children}</span>}
      </div>
    </Component>
  );
};

const MyFormRadio: React.FC<MyFormRadioProps> = ({
  colSize,
  title,
  radioId,
  radioValue,
  formMethods,
  apiVar,
}) => {
  const { control, watch } = formMethods;
  // const [comment, setComment] = useState<Record<string, any>>({});
  // const [isModel, setIsModel] = useState<boolean>(false);

  // const showModal = (data: any) => {
  //   setIsModel(true);
  //   setComment(data);
  // };

  return (
    <>
      <div className={`grid-col-${colSize ?? "12"}`}>
        <Controller
          name={radioValue}
          control={control}
          rules={{
            required: {
              value:
                watch(radioValue) === "" || watch(radioValue) === undefined
                  ? true
                  : false,
              message: "This field is required",
            },
          }}
          render={({ fieldState: { invalid }, field: { onChange } }) => (
            <>
              {title && <label className="label my-2">{title}</label>}
              <div
                className={
                  invalid
                    ? "is-invalid custom_radio my-2"
                    : "custom_radio  my-2"
                }
              >
                <RadioGroup
                  orientation="horizontal"
                  isDisabled
                  id={radioId}
                  value={watch(radioValue)?.toString()}
                  isInvalid={invalid}
                  onChange={(e: any) => {
                    onChange(e);
                    if (e.target.value === false) {
                      // showModal({
                      //   title: "Object Criteria for Screening",
                      //   var: apiVar,
                      // });
                    }
                  }}
                >
                  <CustomRadio value={"true"}>
                    <i className="fa-solid fa-check"></i>
                  </CustomRadio>
                  {apiVar?.length ? (
                    <CustomRadio value={"false"}>
                      <i className="fa-solid fa-xmark"></i>
                    </CustomRadio>
                  ) : (
                    <CustomRadio value={"false"}>
                      <i className="fa-solid fa-xmark"></i>
                    </CustomRadio>
                  )}
                </RadioGroup>
              </div>
            </>
          )}
        />
      </div>
    </>
  );
};

export default MyFormRadio;
