"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input, Textarea } from "@heroui/input";
import { Button, Select, SelectItem } from "@heroui/react";

type UserData = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

type PanelData = {
  committeeName: string;
  selectedMember: UserData[];
  committeeType: string;
  description: string;
};

type PanelConfigurationProps = {
  panelData: PanelData;
  setPanelData: React.Dispatch<React.SetStateAction<PanelData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isButtonShow: boolean;
};

const PanelConfiguration: React.FC<PanelConfigurationProps> = ({
  panelData,
  setPanelData,
  setCurrentStep,
  isButtonShow,
}) => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PanelData>({
    defaultValues: panelData,
  });

  const onSubmit = (data: PanelData) => {
    setPanelData({
      ...panelData,
      committeeName: data?.committeeName,
      committeeType: data?.committeeType,
      description: data?.description,
    });
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-2">
        <Input
          isRequired
          label="Name of panel/committee"
          type="text"
          placeholder="Enter Panel/Committee name"
          labelPlacement="outside"
          radius="sm"
          {...register("committeeName", { required: "Panel name is required" })}
          classNames={{ label: "" }}
          startContent={
            <span className="material-symbols-outlined">id_card</span>
          }
        />
        {errors?.committeeName && (
          <p className="text-red-500">{errors?.committeeName?.message}</p>
        )}
      </div>

      <div className="my-2">
        <Select
          labelPlacement="outside"
          label="Committee Type"
          items={[
            { value: "Internal", name: "Internal" },
            { value: "External", name: "External" },
          ]}
          selectedKeys={
            panelData?.committeeType ? [panelData?.committeeType] : []
          }
          onSelectionChange={(keys: any) => {
            const selected = Array.from(keys)[0] as string;
            setValue("committeeType", selected);
            setPanelData({ ...panelData, committeeType: selected });
          }}
          placeholder="Select Committee Type"
          startContent={
            <span className="material-symbols-outlined">filter_list</span>
          }
        >
          {(option: any) => (
            <SelectItem key={option?.value}>{option?.name}</SelectItem>
          )}
        </Select>
        {errors?.committeeName && (
          <p className="text-red-500">{errors?.committeeName?.message}</p>
        )}
      </div>

      <div className="my-2">
        <Textarea
          label="Description"
          type="text"
          placeholder="Enter Description"
          labelPlacement="outside"
          radius="sm"
          {...register("description")}
          classNames={{ label: "" }}
          startContent={
            <span className="material-symbols-outlined">subtitles</span>
          }
        />
        {errors?.description && (
          <p className="text-red-500">{errors?.description?.message}</p>
        )}
      </div>

      {isButtonShow && (
        <div className="flex justify-between items-center mt-6">
          <div />
          <Button color="primary" variant="solid" radius="sm" type="submit">
            Next <span className="material-symbols-outlined">fast_forward</span>
          </Button>
        </div>
      )}
    </form>
  );
};

export default PanelConfiguration;
