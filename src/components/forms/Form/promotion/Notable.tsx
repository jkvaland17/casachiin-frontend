import { Textarea } from "@heroui/input";
import React from "react";
import { Controller } from "react-hook-form";

const Notable: React.FC<{
  formMethods: any;
  applicationId: string;
}> = ({ formMethods }) => {
  const { control } = formMethods;

  return (
    <>
      <div className="CA_form_current_head mt-3">
        <div className="content_breif">
          <h2 className="main_title">
            Describe your most Notable Contribution to Education, Research and
            Healthcare (1000 Characters)
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Controller
            name="notable_contribution_description"
            control={control}
            render={({ field: { value } }) => (
              <Textarea
                isReadOnly
                placeholder="Enter your description"
                className="w-full"
                value={value}
              />
            )}
          />
        </div>
      </div>
      <hr className="my-3" />
      <div className="CA_form_current_head mt-3">
        <div className="content_breif">
          <h2 className="main_title">
            {
              "In your understanding, What are the top 5 current priorities of the Institute within it's mandate? (3000 Characters)"
            }
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Controller
            name="institute_priorities"
            control={control}
            render={({ field: { value } }) => (
              <Textarea
                isReadOnly
                placeholder="Enter your description"
                className="w-full"
                value={value}
              />
            )}
          />
        </div>
      </div>
      <hr className="my-3" />
      <div className="CA_form_current_head mt-3">
        <div className="content_breif">
          <h2 className="main_title">
            What will be your medium to Long Term Research Focus and Strategy,
            if selected (1000 Characters){" "}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Controller
            name="research_focus"
            control={control}
            render={({ field: { value } }) => (
              <Textarea
                isReadOnly
                placeholder="Enter your description"
                className="w-full"
                value={value}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Notable;
