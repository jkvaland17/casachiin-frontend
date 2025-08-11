import React from "react";
import FieldComponent from "./Filds";
import { Step, FieldGroup, Field } from "./Type";
import { Accordion, AccordionItem } from "@heroui/react";
import { useFormContext } from "react-hook-form";

type StepProps = {
  step: Step;
};

const StepComponent: React.FC<StepProps> = ({ step }) => {
  const { watch } = useFormContext();
  return (
    <Accordion variant="splitted" defaultExpandedKeys={[step.key]}>
      {step.allFields.map((fieldGroup: FieldGroup) => (
        <AccordionItem
          key={fieldGroup.title}
          aria-label={fieldGroup.title}
          title={fieldGroup.title}
        >
          <div className="field-group">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${fieldGroup.defaultCol} gap-x-4`}
            >
              {fieldGroup.fields.map((field: Field, j: number) => {
                const isShow = watch(field.isShow as any);
                const findValidate = field.validator?.find(
                  (item: any) => item === isShow,
                );
                if (field.isShow && findValidate) {
                  return (
                    <React.Fragment key={j}>
                      <FieldComponent field={field} />
                    </React.Fragment>
                  );
                } else if (!field.isShow) {
                  return (
                    <React.Fragment key={j}>
                      <FieldComponent field={field} />
                    </React.Fragment>
                  );
                }
              })}
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default StepComponent;
