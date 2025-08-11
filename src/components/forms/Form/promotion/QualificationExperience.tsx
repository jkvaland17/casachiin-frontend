import {
  // CallFindRequiredEducation,
  CallFindSpecialityByAdvertisementId,
} from "@/_ServerActions";
import {
  Spinner,
  VisuallyHidden,
  Input,
  RadioGroup,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { useRadio, cn } from "@heroui/react";
import moment from "moment";

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
  const { control, watch, setValue } = formMethods;

  const [universalLoader, setUniversalLoader] = useState<any>(false);
  // const [requiredDegreelist, setRequiredDegreelist] = useState([]);
  // const [requiredDisciplineslist, setRequiredDisciplineslist] = useState([]);
  const [showPhdQualification, setShowPhdQualification] = useState(false);

  const [
    essential_education_qualification,
    // phd_education_qualification,
    // postHeldData,
  ] = watch([
    "essential_education_qualification",
    "phd_education_qualification",
    "postHeldData",
  ]);
  const {
    fields: eqFields,
    // append: eqAppend,
    // remove: eqRemove,
    // update: eqUpdate,
  } = useFieldArray({ name: "other_education_qualification", control });

  useEffect(() => {
    if (watch("advertisement_noId")) {
      getSuperSpeciality();
    }
  }, [watch("advertisement_noId")]);

  // useEffect(() => {
  //   if (watch("specialityId")) {
  //     getData();
  //   }
  // }, [watch("specialityId")]);

  useEffect(() => {
    if (essential_education_qualification.name) {
      validatePhdEducation();
    }
  }, [essential_education_qualification.name]);

  const validatePhdEducation = () => {
    if (
      essential_education_qualification.name.includes("Doctorate Degree") ||
      essential_education_qualification.name.includes("M.Sc.") ||
      essential_education_qualification.name.includes("Diploma(02 Years)") ||
      essential_education_qualification.name.includes("Master's Degree")
    ) {
      setShowPhdQualification(true);
    } else {
      setShowPhdQualification(false);
    }
  };

  // const getData = async () => {
  //   try {
  //     setUniversalLoader(true);
  //     const { data } = (await CallFindRequiredEducation(
  //       watch("advertisement_noId._id"),
  //       watch("specialityId"),
  //     )) as any;

  //     if (data?.message === "Success") {
  //       setRequiredDegreelist(data?.data?.requiredEducation?.degree);
  //       setRequiredDisciplineslist(data?.data?.requiredEducation?.disciplines);
  //     }
  //     setUniversalLoader(false);
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     setUniversalLoader(false);
  //   }
  // };

  const getSuperSpeciality = async () => {
    try {
      setUniversalLoader(true);

      const { data } = (await CallFindSpecialityByAdvertisementId(
        watch("advertisement_noId._id"),
      )) as any;
      const findSpId = data?.data?.find(
        (ele: any) => ele?.value === watch("specialityName"),
      );
      if (findSpId) {
        setValue("specialityId", findSpId?._id);
      }
      setUniversalLoader(false);
    } catch (error) {
      console.error(error);
    } finally {
      setUniversalLoader(false);
    }
  };

  return (
    <>
      {universalLoader ? (
        <Spinner />
      ) : (
        <>
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">Education Qualification Details</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Controller
                name="essential_education_qualification.name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Name of the Degree </div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                      {/* <Select
                        isDisabled
                        size="md"
                        items={requiredDegreelist}
                        selectedKeys={[value]}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.degreeName}>
                            {option?.degreeName}
                          </SelectItem>
                        )}
                      </Select> */}
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="essential_education_qualification.discipline"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Subject/Discipline/Title</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                      {/* <Select
                        isDisabled
                        size="md"
                        items={requiredDegreelist}
                        selectedKeys={[value]}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.degreeName}>
                            {option?.degreeName}
                          </SelectItem>
                        )}
                      </Select> */}
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="essential_education_qualification.institute_name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">
                      University/Institute/College Name
                    </div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="essential_education_qualification.place_of_institute"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">
                      Place of University/Institute/College
                    </div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="essential_education_qualification.passingDate"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Date of Passing</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="date"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="essential_education_qualification.attempts"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">No. of Attempts</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            {essential_education_qualification.name ===
              "DNB(Super-Speciality)" ||
              (essential_education_qualification.name === "DNB(Speciality)" ? (
                <>
                  <div>
                    <Controller
                      name="essential_education_qualification.beds_greater_than_500_for_DNB_degree"
                      control={control}
                      render={({ field: { value } }) => (
                        <>
                          <div className="my-2 label">
                            Have you done DNB from Hospital with less than 500
                            beds?
                          </div>
                          <div className={"custom_radio  mb-0"}>
                            <RadioGroup
                              isDisabled
                              orientation="horizontal"
                              value={value}
                            >
                              <CustomRadio value="yes">
                                <i className="fa-solid fa-check"></i>
                              </CustomRadio>
                              <CustomRadio value="no">
                                <i className="fa-solid fa-xmark"></i>
                              </CustomRadio>
                            </RadioGroup>
                          </div>
                        </>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="essential_education_qualification.DNB_hospital_no_of_beds"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Name of the Degree is required",
                        },
                      }}
                      render={({ field: { value } }) => (
                        <>
                          <div className="my-2 label">
                            Number of beds in Hospital
                          </div>
                          <div>
                            <Input
                              isDisabled
                              className="mt-2"
                              disabled
                              type="text"
                              placeholder="Enter name"
                              value={value}
                            />
                          </div>
                        </>
                      )}
                    />
                  </div>
                  <div></div>
                </>
              ) : null)}
          </div>

          {showPhdQualification && (
            <>
              <hr />
              <div className="CA_form_current_head">
                <div className="content_breif mt-3">
                  <h2 className="main_title">Ph.D Detail</h2>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Controller
                    name="phd_education_qualification.name"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Name of the Degree is required",
                      },
                    }}
                    render={({ field: { value } }) => (
                      <>
                        <div className="my-2 label">Name of the Degree</div>
                        <div>
                          <Input
                            isDisabled
                            className="mt-2"
                            disabled
                            type="text"
                            placeholder="Enter name"
                            value={value}
                          />
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="phd_education_qualification.discipline"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Name of the Degree is required",
                      },
                    }}
                    render={({ field: { value } }) => (
                      <>
                        <div className="my-2 label">
                          Subject/Discipline/Title
                        </div>
                        <div>
                          <Input
                            isDisabled
                            className="mt-2"
                            disabled
                            type="text"
                            placeholder="Enter name"
                            value={value}
                          />
                          {/* <Select
                        isDisabled
                        size="md"
                        items={requiredDegreelist}
                        selectedKeys={[value]}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.degreeName}>
                            {option?.degreeName}
                          </SelectItem>
                        )}
                      </Select> */}
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="phd_education_qualification.institute_name"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Name of the Degree is required",
                      },
                    }}
                    render={({ field: { value } }) => (
                      <>
                        <div className="my-2 label">
                          University/Institute/College Name
                        </div>
                        <div>
                          <Input
                            isDisabled
                            className="mt-2"
                            disabled
                            type="text"
                            placeholder="Enter name"
                            value={value}
                          />
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="phd_education_qualification.place_of_institute"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Name of the Degree is required",
                      },
                    }}
                    render={({ field: { value } }) => (
                      <>
                        <div className="my-2 label">
                          Place of University/Institute/College
                        </div>
                        <div>
                          <Input
                            isDisabled
                            className="mt-2"
                            disabled
                            type="text"
                            placeholder="Enter name"
                            value={value}
                          />
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="phd_education_qualification.passingDate"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Name of the Degree is required",
                      },
                    }}
                    render={({ field: { value } }) => (
                      <>
                        <div className="my-2 label">Date of Passing</div>
                        <div>
                          <Input
                            isDisabled
                            className="mt-2"
                            disabled
                            type="date"
                            placeholder="Enter name"
                            value={value}
                          />
                        </div>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="phd_education_qualification.attempts"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Name of the Degree is required",
                      },
                    }}
                    render={({ field: { value } }) => (
                      <>
                        <div className="my-2 label">No. of Attempts</div>
                        <div>
                          <Input
                            isDisabled
                            className="mt-2"
                            disabled
                            type="text"
                            placeholder="Enter name"
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

          <hr className="my-2" />
          <Table
            topContent={
              <div className="CA_form_current_head">
                <div className="content_breif">
                  <h2 className="main_title">
                    {" "}
                    Other Education Qualification Details
                  </h2>
                </div>
              </div>
            }
          >
            <TableHeader>
              <TableColumn>Examination</TableColumn>
              <TableColumn>Subject</TableColumn>
              <TableColumn>University</TableColumn>
              <TableColumn>Place of University</TableColumn>
              <TableColumn>Passing Date</TableColumn>
              <TableColumn>No. of Attempts</TableColumn>
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
                  <TableCell>{item?.place_of_institute}</TableCell>
                  <TableCell>
                    {moment(item?.passingDate).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>{item?.attempts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <hr className="my-2" />
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title">Register Details</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Controller
                name="mci_dci_nursing_reg_no"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Registration No:</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="mci_dci_nursing_reg_type"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Registration Type</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="mci_dci_nursing_reg_year"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Year of Registration</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="state_reg_no"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">State Registration No:</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="state_reg_year"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">State Year of Registration</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="state"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Name of the Degree is required",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">State</div>
                    <div>
                      <Input
                        isDisabled
                        className="mt-2"
                        disabled
                        type="text"
                        placeholder="Enter name"
                        value={value}
                      />
                    </div>
                  </>
                )}
              />
            </div>
          </div>

          <hr className="my-2" />
          <Table
            topContent={
              <div className="CA_form_current_head">
                <div className="content_breif">
                  <h2 className="main_title">Your All Details of employment</h2>
                </div>
              </div>
            }
          >
            <TableHeader>
              <TableColumn>Post Name </TableColumn>
              <TableColumn>Date of Joining</TableColumn>
              <TableColumn>Date of Leaving</TableColumn>
              <TableColumn>Currently Working</TableColumn>
              <TableColumn>Organization Name with Address</TableColumn>
              <TableColumn>Organization Type</TableColumn>
              <TableColumn>Nature of work</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No data found."}>
              {watch("post_held")?.map((item: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{item?.postName}</TableCell>
                  <TableCell>
                    {" "}
                    {moment(item?.date_of_joining).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>
                    {item?.date_of_leaving
                      ? moment(item?.date_of_leaving).format("DD-MM-YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell>{item?.currently_working}</TableCell>
                  <TableCell>{item?.organization_name}</TableCell>
                  <TableCell>{item?.organization_type}</TableCell>
                  <TableCell>{item?.nature_of_work}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};

export default QualificationExperience;
