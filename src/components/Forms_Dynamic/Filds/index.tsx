import React from "react";
import InputField from "./InputField";
import RadioField from "./RadioField";
import { Field } from "../Type";
import TextareaField from "./TextArea";
import TableField from "./TableField";
import PhotoField from "./PhotoField";
import FileField from "./FileField";

type FieldProps = {
  field: Field;
};

const FieldComponent: React.FC<FieldProps> = ({ field }) => {
  switch (field.name) {
    case "input":
      return <InputField field={field} />;
    case "radio":
      return <RadioField field={field} />;
    case "textarea":
      return <TextareaField field={field} />;
    case "table":
      return <TableField field={field} />;
    case "image":
      return <PhotoField field={field} />;
    case "file":
      return <FileField field={field} />;
    default:
      return null;
  }
};

export default FieldComponent;
