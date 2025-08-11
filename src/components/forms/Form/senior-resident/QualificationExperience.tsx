import React, { useEffect, useState } from "react";

import { Input, SelectItem, Select, Spinner } from "@heroui/react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  CallFindRequiredEducation,
  CallGetAllState,
  // CallGetAllPostApplied,
} from "@/_ServerActions";
import moment from "moment";
// import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// import { format } from "date-fns";
// import MyPop from "@/components/forms/CommanForm/MyPop";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useRadio, VisuallyHidden, cn } from "@heroui/react";

// import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

// type EducationData = {
//   name: string;
//   discipline: string;
//   institute_name: string;
//   place_of_institute: string;
//   passingDate: string;
//   attempts: string;
// };

type OtherItem = {
  degree: string;
  discipline: string;
};

type EducationDataItem = {
  degree: string;
  discipline: string;
  other: OtherItem[];
};

// type RequiredEducationData = EducationDataItem[];

export const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "max-w-[300px] cursor-pointer border-2 border-default rounded--4 p-4",
        "data-[selected=true]:border-primary",
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
      </div>
    </Component>
  );
};

const QualificationExperience: React.FC<{
  formMethods: any;
  applicationId: string;
}> = ({ formMethods }) => {
  const { control, watch } = formMethods;
  const [
    essential_education_qualification_1,
    essential_education_qualification_2,
    reg_type,
    // postHeldData,
    // no_objection_certificate,
    ug_education_qualification,
    // specialityId,
  ] = watch([
    "essential_education_qualification_1",
    "essential_education_qualification_2",
    "reg_type",
    "postHeldData",
    "no_objection_certificate",
    "ug_education_qualification",
    "specialityId",
  ]);
  const { data: session } = useSession() as any;
  const [showPhdQualification, setShowPhdQualification] = useState(false);
  // const [blockedDates, setBlockedDates] = useState([]);
  const [otherRequiredDegreelist, setOtherRequiredDegreelist] = useState([]);
  const [requiredDegreelist, setRequiredDegreelist] = useState([]);
  const [requiredEducationData, setRequiredEducationData] = useState([]);
  // const [editOtherQualification, setEditOtherQualification] = useState(false);
  // const [editOtherQualificationIndex, setEditOtherQualificationIndex] =
  //   useState("");
  // const [editEmplomentDetailsIndex, setEditEmplomentDetailsIndex] =
  //   useState("");
  const [requiredDisciplineslist, setRequiredDisciplineslist] = useState([]);
  const [otherDeg, setOtherDeg] = useState([]);
  const [universalLoader, setUniversalLoader] = useState<any>(false);
  const [stateList, setStateList] = useState<any>([]);

  useEffect(() => {
    getData();
    getState();
  }, [session]);
  useEffect(() => {
    if (essential_education_qualification_1.name) {
      getDisciplinesByDegree(essential_education_qualification_1.name);
    }
    if (
      essential_education_qualification_1.name &&
      essential_education_qualification_1.discipline
    ) {
      getOtherData(
        essential_education_qualification_1.name,
        essential_education_qualification_1.discipline,
      );
    }
  }, [
    essential_education_qualification_1.name,
    essential_education_qualification_1.discipline,
    requiredEducationData,
  ]);
  // const {
  //   fields: phFields,
  //   append: phAppend,
  //   remove: phRemove,
  //   update: phUpdate,
  // } = useFieldArray({ name: "post_held", control });
  const {
    fields: eqFields,
    // append: eqAppend,
    // remove: eqRemove,
    // update: eqUpdate,
  } = useFieldArray({ name: "other_education_qualification", control });
  // const [eduData, setEduData] = useState({
  //   name: "",
  //   discipline: "",
  //   institute_name: "",
  //   university_name: "",
  //   passingDate: "",
  //   status: "",
  // });
  // const handleEducationData = (e: any) => {
  //   e.preventDefault();
  //   setEduData({ ...eduData, [e.target.name]: e.target.value });
  // };
  // const handlePostHeldData = (e: any, onChange: any) => {
  //   e.preventDefault();
  //   if (e.target.value === "Yes") {
  //     onChange(e);
  //     setValue("postHeldData.date_of_leaving", "");
  //   } else {
  //     onChange(e);
  //   }
  // };

  // const eqEdit = (item: any, idx: any) => {
  //   setEditOtherQualificationIndex(idx);
  //   setEduData(item);
  //   setEditOtherQualification(true);
  // };
  // const handleCancel = () => {};
  // const EducationFieldColumn = [
  //   {
  //     title: "Examination",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (name) => <Tag color={"green"}>{name}</Tag>,
  //   },
  //   {
  //     title: "Subject",
  //     dataIndex: "discipline",
  //     key: "Subject",
  //   },
  //   {
  //     title: "Institute / College Name",
  //     dataIndex: "institute_name",
  //     key: "University",
  //   },
  //   {
  //     title: "University Name",
  //     dataIndex: "university_name",
  //     key: "PlaceofUniversity",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //   },
  //   {
  //     title: "Passing Date",
  //     dataIndex: "passingDate",
  //     key: "passingDate",
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "_id",
  //     key: "attempts",
  //     render: (id, data, idx) => {
  //       return (
  //         <>
  //           <Button variant="ghost" size="sm" onClick={() => eqEdit(data, idx)}>
  //             <span className="material-symbols-outlined text-success">
  //               edit
  //             </span>
  //           </Button>
  //           <MyPop
  //             handleSubmit={() => eqRemove(idx)}
  //             handleCancel={handleCancel}
  //             discription="Are you sure you want to delete this ?"
  //           >
  //             <Button variant="ghost" size="sm">
  //               <span className="material-symbols-outlined text-danger">
  //                 delete
  //               </span>
  //             </Button>
  //           </MyPop>
  //         </>
  //       );
  //     },
  //   },
  // ];
  useEffect(() => {
    if (
      essential_education_qualification_2.name ||
      essential_education_qualification_1.name
    ) {
      handleMinExperienceRequired();
    }
  }, [
    essential_education_qualification_1.name,
    essential_education_qualification_2.name,
    essential_education_qualification_1?.beds_greater_than_500_for_DNB_degree,
  ]);
  const getData = async () => {
    try {
      setUniversalLoader(true);
      const { data } = (await CallFindRequiredEducation(
        watch("advertisement_noId._id"),
        watch("specialityId._id"),
      )) as any;
      if (data?.message === "Success") {
        setRequiredEducationData(data?.data);

        const degreeSet = new Set<any>(
          data?.data.map((item: any) => item.degree),
        );
        const newData = Array.from(degreeSet) as any;

        setRequiredDegreelist(newData);
      }
      setUniversalLoader(false);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const handleMinExperienceRequired = () => {
    // let minExperienceYear;
    const degree = essential_education_qualification_1?.name;
    const beds_greater_than_500_for_DNB_degree =
      essential_education_qualification_1?.beds_greater_than_500_for_DNB_degree
        ? essential_education_qualification_1.beds_greater_than_500_for_DNB_degree
        : null;
    if (
      degree &&
      (degree === "MD" ||
        degree === "MS" ||
        degree === "MDS" ||
        degree === "MD/MS")
    ) {
      // minExperienceYear = 3;
    } else if (
      degree &&
      (degree === "DM/MCh(02 Years)" ||
        degree === "DM(02 Years)" ||
        degree === "MCh(02 Years)" ||
        degree === "DM/MCh(03 Years)" ||
        degree === "DM(03 Years)" ||
        degree === "MCh(03 Years)" ||
        degree === "DM/MCh(05 Years)" ||
        degree === "DM(05 Years)" ||
        degree === "MCh(05 Years)")
    ) {
      // minExperienceYear = 1;
    } else if (
      degree &&
      (degree === "Master's Degree" ||
        degree === "Diploma(02 Years)" ||
        degree === "M.Sc.)" ||
        degree === "Doctorate Degree")
    ) {
      // minExperienceYear = 3;
    } else if (
      degree &&
      degree === "DNB(Speciality)" &&
      beds_greater_than_500_for_DNB_degree === "yes"
    ) {
      // minExperienceYear = 4;
    } else if (
      degree &&
      degree === "DNB(Super-Speciality)" &&
      beds_greater_than_500_for_DNB_degree === "yes"
    ) {
      // minExperienceYear = 1;
    } else if (
      degree &&
      degree === "DNB(Speciality)" &&
      beds_greater_than_500_for_DNB_degree === "no"
    ) {
      // minExperienceYear = 3;
    } else {
      // minExperienceYear = 0;
    }
  };

  const getDisciplinesByDegree = (selectedDegree: string): void => {
    const newDisciplinesArray = Array.from(
      new Set(
        requiredEducationData.flatMap((item: EducationDataItem) => [
          ...(item.degree === selectedDegree ? [item.discipline] : []),
          ...item.other
            .filter(
              (otherItem: OtherItem) => otherItem.degree === selectedDegree,
            )
            .map((otherItem: OtherItem) => otherItem.discipline),
        ]),
      ),
    ) as any;
    setRequiredDisciplineslist(newDisciplinesArray);
  };

  const getOtherData = (
    selectedDegree: string,
    selectedDiscipline: string,
  ): void => {
    const newData: OtherItem[] = requiredEducationData
      .filter(
        (item: EducationDataItem) =>
          item.degree === selectedDegree &&
          item.discipline === selectedDiscipline,
      )
      .flatMap((item: EducationDataItem) => item.other);

    const uniqueDegrees: string[] = Array.from(
      new Set(newData.map((item: OtherItem) => item.degree)),
    );

    setOtherDeg(uniqueDegrees as any);

    if (newData.length > 0) {
      setShowPhdQualification(true);
    }
  };

  useEffect(() => {
    const newData = requiredEducationData
      .filter(
        (item: any) =>
          item.degree === watch("essential_education_qualification_1.name") &&
          item.discipline ===
            watch("essential_education_qualification_1.discipline"),
      )
      .map((item: any) => item.other)
      .flat();

    const disciplines = newData
      ?.filter(
        (item) =>
          item.degree === watch("essential_education_qualification_2.name"),
      )
      .map((item) => item.discipline);

    setOtherRequiredDegreelist(disciplines as any);
  }, [watch("essential_education_qualification_2.name")]);

  const getState = async () => {
    const { data } = (await CallGetAllState()) as any;
    setStateList(data?.data);
  };
  return (
    <>
      {universalLoader ? (
        <Spinner />
      ) : (
        <>
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">Undergraduate Degree Details</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div>
              <Controller
                name="ug_education_qualification.name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Name of the Degree </div>
                    <div>
                      <Select
                        isDisabled
                        size="md"
                        items={[
                          {
                            label: "MBBS",
                            value: "MBBS",
                          },
                          {
                            label: "BDS",
                            value: "BDS",
                          },
                          {
                            label: "B.Sc.",
                            value: "B.Sc.",
                          },
                          {
                            label: "other",
                            value: "other",
                          },
                        ]}
                        selectedKeys={[value]}
                        isInvalid={invalid}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.value}>
                            {option?.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </>
                )}
              />
            </div>
            {ug_education_qualification?.name === "B.Sc." && (
              <div>
                <Controller
                  name="ug_education_qualification.discipline"
                  control={control}
                  render={({ fieldState: { invalid }, field: { value } }) => (
                    <>
                      <div className="my-2 label">Subject / Discipline</div>
                      <div>
                        <Input
                          isDisabled
                          className="mt-2"
                          disabled
                          type="text"
                          isInvalid={invalid}
                          value={value}
                        />
                      </div>
                    </>
                  )}
                />
              </div>
            )}
            <div>
              <Controller
                name="ug_education_qualification.passingDate"
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Date of Passing</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="date"
                        isInvalid={invalid}
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="ug_education_qualification.institute_name"
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Institute / College Name</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        isInvalid={invalid}
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="ug_education_qualification.university_name"
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">University Name</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        isInvalid={invalid}
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
          <hr className="my-2" />
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">Qualification Exam Details</h2>
            </div>
          </div>
          <h4>1. Education Qualification</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Controller
                name={`essential_education_qualification_1.name`}
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Qualifying Examination</div>
                    <div>
                      <Select
                        isDisabled
                        size="md"
                        items={requiredDegreelist?.map((degree: any) => ({
                          label: degree,
                          value: degree,
                        }))}
                        defaultSelectedKeys={[value]}
                        selectedKeys={[value]}
                        isInvalid={invalid}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.value}>
                            {option?.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name={`essential_education_qualification_1.discipline`}
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Subject / Discipline</div>
                    <div>
                      <Select
                        isDisabled
                        size="md"
                        items={requiredDisciplineslist?.map((degree: any) => ({
                          label: degree,
                          value: degree,
                        }))}
                        selectedKeys={[value]}
                        isInvalid={invalid}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.value}>
                            {option?.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name={`essential_education_qualification_1.institute_name`}
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Institute / College Name</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        isInvalid={invalid}
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name={`essential_education_qualification_1.university_name`}
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">University Name:</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        isInvalid={invalid}
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name={`essential_education_qualification_1.status`}
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Exam Status</div>
                    <div>
                      <Select
                        isDisabled
                        size="md"
                        items={[
                          {
                            label: "Passed",
                            value: "Passed",
                          },
                          {
                            label: "Appeared / Appearing",
                            value: "Appeared / Appearing",
                          },
                        ]}
                        selectedKeys={[value]}
                        isInvalid={invalid}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.value}>
                            {option?.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </>
                )}
              />
            </div>
            {essential_education_qualification_1?.status === "Passed" && (
              <div>
                <Controller
                  name={`essential_education_qualification_1.passingDate`}
                  control={control}
                  render={({ fieldState: { invalid }, field: { value } }) => (
                    <>
                      <div className="my-2 label">Date of Passing</div>
                      <div>
                        <Input
                          isDisabled
                          className="mt-2"
                          disabled
                          type="text"
                          isInvalid={invalid}
                          value={value}
                        />
                      </div>
                    </>
                  )}
                />
              </div>
            )}
            {essential_education_qualification_1?.status ===
              "Appeared / Appearing" && (
              <div>
                <Controller
                  name={`essential_education_qualification_1.passingDate`}
                  control={control}
                  render={({ fieldState: { invalid }, field: { value } }) => (
                    <>
                      <div className="my-2 label">Date of Passing</div>
                      <div>
                        <Input
                          isDisabled
                          className="mt-2"
                          disabled
                          type="text"
                          isInvalid={invalid}
                          value={value}
                        />
                      </div>
                    </>
                  )}
                />
              </div>
            )}
          </div>
          {showPhdQualification && (
            <>
              <hr className="my-2" />
              <h4>2. Education Qualification</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Controller
                    name="essential_education_qualification_2.name"
                    control={control}
                    render={({ fieldState: { invalid }, field: { value } }) => (
                      <>
                        <div className="my-2 label">Qualifying Examination</div>
                        <div>
                          <Select
                            isDisabled
                            size="md"
                            items={otherDeg?.map((degree: any) => ({
                              label: degree,
                              value: degree,
                            }))}
                            selectedKeys={[value]}
                            isInvalid={invalid}
                          >
                            {(option: any) => (
                              <SelectItem key={option?.value}>
                                {option?.label}
                              </SelectItem>
                            )}
                          </Select>
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="essential_education_qualification_2.discipline"
                    control={control}
                    render={({ fieldState: { invalid }, field: { value } }) => (
                      <>
                        <div className="my-2 label">Subject / Discipline</div>
                        <div>
                          <Select
                            isDisabled
                            size="md"
                            items={otherRequiredDegreelist?.map(
                              (degree: any) => ({
                                label: degree,
                                value: degree,
                              }),
                            )}
                            selectedKeys={[value]}
                            isInvalid={invalid}
                          >
                            {(option: any) => (
                              <SelectItem key={option?.value}>
                                {option?.label}
                              </SelectItem>
                            )}
                          </Select>
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="essential_education_qualification_2.institute_name"
                    control={control}
                    render={({ fieldState: { invalid }, field: { value } }) => (
                      <>
                        <div className="my-2 label">
                          Institute / College Name
                        </div>
                        <div>
                          <Input
                            isDisabled
                            className="mt-2"
                            disabled
                            type="text"
                            isInvalid={invalid}
                            value={value}
                          />
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="essential_education_qualification_2.university_name"
                    control={control}
                    render={({ fieldState: { invalid }, field: { value } }) => (
                      <>
                        <div className="my-2 label">University Name:</div>
                        <div>
                          <Input
                            isDisabled
                            className="mt-2"
                            disabled
                            type="text"
                            isInvalid={invalid}
                            value={value}
                          />
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="essential_education_qualification_2.status"
                    control={control}
                    render={({ fieldState: { invalid }, field: { value } }) => (
                      <>
                        <div className="my-2 label">Exam Status</div>
                        <div>
                          <Select
                            isDisabled
                            size="md"
                            items={[
                              {
                                label: "Passed",
                                value: "Passed",
                              },
                              {
                                label: "Appeared / Appearing",
                                value: "Appeared / Appearing",
                              },
                            ]}
                            selectedKeys={[value]}
                            isInvalid={invalid}
                          >
                            {(option: any) => (
                              <SelectItem key={option?.value}>
                                {option?.label}
                              </SelectItem>
                            )}
                          </Select>
                        </div>
                      </>
                    )}
                  />
                </div>
                {essential_education_qualification_2.status === "Passed" && (
                  <div>
                    <Controller
                      name="essential_education_qualification_2.passingDate"
                      control={control}
                      render={({
                        fieldState: { invalid },
                        field: { value },
                      }) => (
                        <>
                          <div className="my-2 label">Date of Passing</div>
                          <div>
                            <Input
                              isDisabled
                              className="mt-2"
                              disabled
                              type="text"
                              isInvalid={invalid}
                              value={value}
                            />
                          </div>
                        </>
                      )}
                    />
                  </div>
                )}
                {essential_education_qualification_2.status ===
                  "Appeared / Appearing" && (
                  <div>
                    <Controller
                      name="essential_education_qualification_2.passingDate"
                      control={control}
                      render={({
                        fieldState: { invalid },
                        field: { value },
                      }) => (
                        <>
                          <div className="my-2 label">Date of Passing</div>
                          <div>
                            <Input
                              isDisabled
                              className="mt-2"
                              disabled
                              type="text"
                              isInvalid={invalid}
                              value={value}
                            />
                          </div>
                        </>
                      )}
                    />
                  </div>
                )}
              </div>
            </>
          )}
          <hr className="my-2" />
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">
                Other Education Qualification Details
              </h2>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableColumn>Examination</TableColumn>
              <TableColumn>Subject</TableColumn>
              <TableColumn>Institute / College Name</TableColumn>
              <TableColumn>University Name</TableColumn>
              <TableColumn>Passing Date </TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={"No data found."}
              isLoading={universalLoader}
              loadingContent={<Spinner label="Loading..." />}
            >
              {eqFields?.map((item: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.discipline}</TableCell>
                  <TableCell>{item?.institute_name}</TableCell>
                  <TableCell>{item?.university_name}</TableCell>
                  <TableCell>
                    {moment(item?.passingDate).format("DD-MM-YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <hr className="my-2" />
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">Medical Registration Details</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 items-end">
            <div>
              <Controller
                name="reg_type"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-1 label">
                      {" "}
                      Registering Authority (MCI / State Council / DCI)
                    </div>
                    <div>
                      <Select
                        isDisabled
                        size="md"
                        items={[
                          {
                            label: "MCI",
                            value: "MCI",
                          },
                          {
                            label: "DCI",
                            value: "DCI",
                          },
                          {
                            label: "State Council",
                            value: "State Council",
                          },
                        ]}
                        selectedKeys={[value]}
                        isInvalid={invalid}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.value}>
                            {option?.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </>
                )}
              />
            </div>
            {reg_type === "State Council" && (
              <div className="col">
                <Controller
                  name="reg_state"
                  control={control}
                  rules={{
                    required: { value: true, message: "State is required" },
                  }}
                  render={({ field: { value }, fieldState: { invalid } }) => (
                    <>
                      <div className="label my-2">State</div>
                      <>
                        <div className={invalid ? "is-invalid" : ""}></div>
                        <Select
                          isDisabled
                          items={stateList}
                          selectedKeys={[value]}
                          isInvalid={invalid}
                        >
                          {(option: any) => (
                            <SelectItem key={option?.name}>
                              {option?.name}
                            </SelectItem>
                          )}
                        </Select>
                      </>
                    </>
                  )}
                />
              </div>
            )}
            <div>
              <Controller
                name="reg_no"
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Registration No:</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        isInvalid={invalid}
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="reg_date"
                control={control}
                render={({ fieldState: { invalid }, field: { value } }) => (
                  <>
                    <div className="my-2 label">Registration Date</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="date"
                        isInvalid={invalid}
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default QualificationExperience;
