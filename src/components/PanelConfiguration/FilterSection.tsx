import React from "react";
import { Button, Input } from "@heroui/react";

type FilterData = {
  name: string;
  email: string;
  phone: string;
};

type FilterSectionProps = {
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
  getAllData: (isFilter: boolean) => void;
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const FilterSection: React.FC<FilterSectionProps> = ({
  filterData,
  setFilterData,
  getAllData,
  loading,
  setPage,
}) => {
  return (
    <div className="flex w-full justify-between items-end gap-3">
      <Input
        label="Name"
        type="text"
        placeholder="Enter a name"
        labelPlacement="outside"
        value={filterData?.name}
        radius="sm"
        variant="bordered"
        onChange={(e) => setFilterData({ ...filterData, name: e.target.value })}
        startContent={<span className="material-symbols-outlined">badge</span>}
      />
      <Input
        label="Email"
        type="text"
        placeholder="Enter an email"
        labelPlacement="outside"
        value={filterData?.email}
        radius="sm"
        variant="bordered"
        onChange={(e) =>
          setFilterData({ ...filterData, email: e.target.value })
        }
        startContent={<span className="material-symbols-outlined">mail</span>}
      />
      <Input
        label="Phone"
        type="text"
        placeholder="Enter a phone"
        labelPlacement="outside"
        value={filterData.phone}
        radius="sm"
        variant="bordered"
        onChange={(e) =>
          setFilterData({ ...filterData, phone: e.target.value })
        }
        startContent={
          <span className="material-symbols-outlined">phone_in_talk</span>
        }
      />
      <div className="flex justify-between items-end gap-2">
        <Button
          radius="sm"
          variant="flat"
          color="primary"
          isDisabled={loading}
          onPress={() => {
            setPage(1);
            getAllData(true);
          }}
        >
          <span className="material-symbols-outlined">person_search</span>
        </Button>
        <Button
          radius="sm"
          variant="flat"
          color="danger"
          isDisabled={loading}
          onPress={() => {
            setPage(1);
            getAllData(false);
            setFilterData({ email: "", phone: "", name: "" });
          }}
        >
          <span className="material-symbols-outlined">cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
