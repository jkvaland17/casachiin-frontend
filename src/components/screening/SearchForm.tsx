"use client";

import React from "react";
import { Input, Button } from "@heroui/react";
import { Search, X } from "lucide-react";

type FieldConfig = {
  key: string;
  label: string;
  type: string;
  placeholder: string;
};

type SearchFormProps = {
  fieldConfig: FieldConfig[];
  searchForm: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSearch: () => void;
  onClear: () => void;
};

const SearchForm: React.FC<SearchFormProps> = ({
  fieldConfig,
  searchForm,
  onChange,
  onSearch,
  onClear,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 items-stretch sm:items-end w-full mb-5">
      {fieldConfig.map(({ key, label, type, placeholder }) => (
        <Input
          key={key}
          label={label}
          type={type}
          placeholder={placeholder}
          radius="sm"
          variant="bordered"
          value={searchForm[key] || ""}
          onChange={(e) => onChange(key, e.target.value)}
          classNames={{ inputWrapper: "border-small" }}
          labelPlacement="outside"
          className="w-full sm:w-auto flex-1"
        />
      ))}
      <div className="flex gap-2 sm:gap-3">
        <Button isIconOnly radius="sm" color="primary" onPress={onSearch}>
          <Search size={18} />
        </Button>
        <Button isIconOnly radius="sm" color="danger" onPress={onClear}>
          <X size={18} />
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
