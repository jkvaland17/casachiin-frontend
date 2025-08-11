import React from "react";
import { Button, Input } from "@heroui/react";

type FilterData = {
  name: string;
};

type FilterDataAddCandidateProps = {
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
  getAllData: (isFilter: boolean) => void;
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const FilterDataAddCandidate: React.FC<FilterDataAddCandidateProps> = ({
  filterData,
  setFilterData,
  getAllData,
  loading,
  setPage,
}) => {
  return (
    <div className="grid grid-cols-4 gap-3">
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
      <div className="flex  items-end gap-2">
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
            setFilterData({ name: "" });
          }}
        >
          <span className="material-symbols-outlined">cancel</span>
        </Button>
      </div>
    </div>
  );
};

export default FilterDataAddCandidate;
