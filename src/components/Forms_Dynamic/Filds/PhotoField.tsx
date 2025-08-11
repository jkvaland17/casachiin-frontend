import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "@/components/Forms_Dynamic/Type";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@heroui/modal";

type TableFieldProps = {
  field: Field;
};

const TableField: React.FC<TableFieldProps> = ({ field }) => {
  const { watch } = useFormContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const imageSrc = watch(field.value);

  return (
    <>
      <div className={`mb-2 col-span-1 md:col-span-${field.col}`}>
        <div className="my-3 text-[15px] text-gray-700 label ">
          {field.title}
        </div>
        <div
          className="border flex items-center cursor-pointer"
          style={{ height: "100px", width: "100px" }}
          onClick={() => onOpen()}
        >
          <img
            src={imageSrc}
            className="p-2 w-full h-full object-contain"
            alt={field.title || "Preview"}
          />
        </div>
      </div>

      {/* Modal for Preview */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <ModalBody>
              <img
                src={imageSrc}
                className="w-full h-auto object-contain"
                alt={field.title || "Full Preview"}
              />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableField;
