import MyUpload from "@/components/Custom/MyUpload";
import { Input, Textarea } from "@heroui/input";
import { Button, Spinner } from "@heroui/react";
import { Select, SelectItem } from "@heroui/select";
import React from "react";

const AddAdvertis = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  allCourse,
  watch,
  handleDateChange,
  loading,
  uploadST,
  setUploadST,
  handleChangeST,
  setValue,
  uploadPR,
  setUploadPR,
  handleChangePR,
  router,
  route,
  isLoadingBtn,
  slug,
  title,
}: any) => {
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            isRequired
            variant="bordered"
            {...register("value", { required: true })}
            isInvalid={!!errors.value}
            label="Advertisement Name"
            type="text"
            placeholder="Enter Advertisement name"
            labelPlacement="outside"
            startContent={<i className="fa-solid fa-notes-medical pr-2" />}
          />
          <Select
            variant="bordered"
            label="Course"
            placeholder="Select Data"
            labelPlacement="outside"
            {...register("parentMasterId", { required: true })}
            isInvalid={errors?.parentMasterId ? true : false}
            startContent={
              <div className="pr-2">
                <i className="fa-solid fa-database" />
              </div>
            }
          >
            {allCourse?.map((item: any) => (
              <SelectItem key={item?._id}>{item?.value}</SelectItem>
            ))}
          </Select>
          <Select
            variant="bordered"
            label="Form Template"
            placeholder="Select form template"
            labelPlacement="outside"
            {...register("formTemplate", { required: true })}
            isInvalid={errors?.formTemplate ? true : false}
            startContent={
              <div className="pr-2">
                <i className="fa-solid fa-database" />
              </div>
            }
          >
            {allCourse?.map((item: any) => (
              <SelectItem key={item?._id}>{item?.value}</SelectItem>
            ))}
          </Select>
          <Textarea
            {...register("description")}
            label="Description"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="col-span-3"
            startContent={<i className="fa-solid fa-notes-medical pr-2" />}
          />
          <Input
            label="Start Date"
            variant="bordered"
            labelPlacement="outside"
            type="date"
            {...register("startDate")}
            value={watch("startDate")}
            onChange={(e) => handleDateChange(e, "startDate")}
            startContent={
              <div className="pr-2">
                <i className="fa-regular fa-calendar-days"></i>{" "}
              </div>
            }
          />
          <Input
            label="End Date"
            variant="bordered"
            labelPlacement="outside"
            type="date"
            {...register("endDate")}
            value={watch("endDate")}
            onChange={(e) => handleDateChange(e, "endDate")}
            startContent={
              <div className="pr-2">
                <i className="fa-regular fa-calendar-days"></i>{" "}
              </div>
            }
          />
          <div className="col-span-3">
            {loading.advertisementLink ? (
              <div className="flex flex-col items-center justify-center w-full min-h-48 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                <Spinner />
              </div>
            ) : (
              <MyUpload
                title="Advertisement"
                preview={uploadST}
                setPreview={setUploadST}
                handleChange={handleChangeST}
                setValue={setValue}
                name="myUpload"
                placeholder="Upload PDF File"
              />
            )}
          </div>
          <div className="col-span-3">
            {loading.prospectusLink ? (
              <div className="flex flex-col items-center justify-center w-full min-h-48 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                <Spinner />
              </div>
            ) : (
              <MyUpload
                title="Prospectus"
                preview={uploadPR}
                setPreview={setUploadPR}
                handleChange={handleChangePR}
                setValue={setValue}
                name="myUpload"
                placeholder="Upload PDF File"
              />
            )}
          </div>
        </div>
        <div className="mt-3 w-full flex gap-3 items-center justify-end">
          <Button
            variant="flat"
            type="button"
            color="danger"
            onClick={() => router.push(route)}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoadingBtn}
            type="submit"
            radius="sm"
            color="primary"
            className="w-full md:w-fit"
          >
            {slug[0] === "advertisement" ? "Add" : `Create ${title} Data`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvertis;
