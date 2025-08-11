import { Select, SelectItem } from "@heroui/select";
import React from "react";
import { useFieldArray } from "react-hook-form";

const CityChoice: React.FC<{
  formMethods: any;
}> = ({ formMethods }) => {
  const { control } = formMethods;
  const { fields: stateCityList } = useFieldArray({
    name: "cityChoice",
    control,
  });

  const stateList = [
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Delhi (NCR)", label: "Delhi (NCR)" },
    { value: "West Bengal", label: "West Bengal" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Any where in India", label: "Any where in India" },
  ];

  const cityList = [
    { value: "Chennai", label: "Chennai" },
    { value: "Delhi (NCR)", label: "Delhi (NCR)" },
    { value: "Kolkata", label: "Kolkata" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Any where in India", label: "Any where in India" },
  ];

  return (
    <>
      <div className="CA_form_current_head">
        <div className="content_breif">
          <h2 className="main_title">City Choice</h2>
        </div>
      </div>
      {stateCityList?.length === 0 && (
        <div className="h-44 flex items-center justify-center">
          <h1 className="text-gray-500">No data found</h1>
        </div>
      )}
      {stateCityList?.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <h1>{index + 1}. Preferred city</h1>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="my-2 label">State</div>
              <div>
                <Select
                  isDisabled
                  size="md"
                  items={stateList}
                  selectedKeys={[item?.state]}
                >
                  {(option: any) => (
                    <SelectItem key={option?.value}>{option?.label}</SelectItem>
                  )}
                </Select>
              </div>
            </div>
            <div>
              <div className="my-2 label">City</div>
              <div>
                <Select
                  isDisabled
                  size="md"
                  items={cityList}
                  selectedKeys={[item?.city]}
                >
                  {(option: any) => (
                    <SelectItem key={option?.value}>{option?.label}</SelectItem>
                  )}
                </Select>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default CityChoice;
