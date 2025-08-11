"use client";
import React, { useEffect, useState } from "react";

import { Input, RadioGroup } from "@heroui/react";
import { Select, SelectItem, Textarea, Spinner } from "@heroui/react";

import { Controller } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import moment from "moment";
import {
  CallPWBDList,
  CallFindCategory,
  CallGetAllState,
  CallGetAdvertisement,
} from "@/_ServerActions";
import Image from "next/image";
import INDIANFLAG from "@/assets/img/icons/common/indian-flag.png";
import GlOBE from "@/assets/img/icons/common/globe.png";
import MARRIED from "@/assets/img/icons/common/married.png";
import UNMARRIED from "@/assets/img/icons/common/unmarried.png";
import { handleCommonErrors } from "@/Utils/HandleError";
import { useRadio, cn } from "@heroui/react";
import { useSession } from "next-auth/react";

interface BasicDetailsProps {
  formMethods: any;
  applicationId: any;
}

interface DepartmentDetails {
  departmentForChoice: string;
  // add other properties if needed
}

interface PostAppliedItem {
  _id: string;
  departmentDetails: DepartmentDetails[];
}

export const CustomRadio = (props: any) => {
  const {
    Component,
    children,
    getBaseProps,
    getLabelProps,
    getLabelWrapperProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg  p-4",
        "data-[selected=true]:border-primary",
      )}
    >
      <div {...getLabelWrapperProps()} className="m-0">
        {children && <span {...getLabelProps()}>{children}</span>}
      </div>
    </Component>
  );
};

const BasicDetails: React.FC<BasicDetailsProps> = ({
  formMethods,
  applicationId,
}) => {
  console.log("applicationId::: ", applicationId);
  // const params = useSearchParams();
  const { data: session } = useSession();
  const [advertisementId, setAdvertisementId] = useState();
  const [universalLoader, setUniversalLoader] = useState(false);
  const [advertisement, setAdvertisement] = useState([]);
  const [advertisementStartDate, setAdvertisementStartDate] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [statePaList, setStatePaList] = useState([]);
  const [cityPaList, setCityPaList] = useState([]);
  // const [speciality, setSpeciality] = useState([]);
  // const [postApplied, setPostApplied] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState(0);
  // const [preferredDepartementSeq, setPreferredDepartementSeq] = useState([]);
  // const [preferredDepartementList, setPreferredDepartementList] = useState([]);
  const [ageRelaxationCategory, setAgeRelaxationCategory] = useState<any>([]);
  // const [todayDate, setTodayDate] = useState("");
  // const [modelStatus, setModelStatus] = useState<any>();
  // const [modelData, setModelData] = useState<any>([]);
  // const [postalAddress, setPostalAddress] = useState(false);
  const [PWBDList, setPWBDList] = useState([]);

  const { control, setValue, watch } = formMethods;

  const [
    advertisement_noId,
    post_applied_forId,
    permanent_address_country,
    permanent_address_state,
    postal_address_country,
    postal_address_state,
    id_proof,
    pwbd,
    nationality,
    is_regular_govt_servant,
    date_of_appointment,
    till_date,
    category,
    date_of_birth,
  ] = watch([
    "advertisement_noId",
    "specialityId",
    "post_applied_forId",
    "permanent_address.country",
    "permanent_address.state",
    "postal_address.country",
    "postal_address.state",
    "id_proof",
    "pwbd",
    "nationality",
    "is_regular_govt_servant",
    "date_of_appointment",
    "till_date",
    "category",
    "preferred_departments_sequence",
    "date_of_birth",
  ]);
  // const [fieldCancelData, setFieldCancelData] = useState({
  //   advertisement_noId: getValues("advertisement_noId"),
  //   specialityId: getValues("specialityId"),
  //   post_applied_forId: getValues("post_applied_forId"),
  //   pwbd: getValues("pwbd"),
  //   category: getValues("category"),
  // });
  useEffect(() => {
    getState();
    if (session) {
      getAdvertisement();
      GetPWBDList();
      // setTodayDate(getTodayDate());
      if (!countryList.length) {
        setCountryList(Country.getAllCountries() as any);
      }
    }
  }, [session]);
  useEffect(() => {
    if (advertisement_noId) {
      getSuperSpeciality(advertisement_noId);
    }
  }, [advertisement_noId]);
  useEffect(() => {
    if (advertisement_noId && advertisement) {
      handleClosingDate(advertisement_noId);
    }
  }, [advertisement_noId, advertisement]);

  // useEffect(() => {
  //   if (specialityId && advertisementId) {
  //     GetPostApplied(specialityId);
  //   }
  // }, [specialityId, advertisementId]);
  useEffect(() => {
    if (permanent_address_country?.length) {
      handleState("IN", "permanent_address");
    }
    if (postal_address_country?.length) {
      handleState("IN", "postal_address");
    }
  }, [permanent_address_country, postal_address_country]);
  useEffect(() => {
    if (permanent_address_state?.length) {
      handleCity(permanent_address_state, "permanent_address");
    }
    if (postal_address_state?.length) {
      handleCity(postal_address_state, "postal_address");
    }
  }, [permanent_address_state, postal_address_state]);
  // const getTodayDate = () => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, "0");
  //   const day = String(today.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };
  useEffect(() => {
    if (date_of_birth) {
      validateAgeRelaxation(date_of_birth);
    }
  }, [
    pwbd,
    is_regular_govt_servant,
    date_of_birth,
    date_of_appointment,
    category,
  ]);

  const getAdvertisement = async () => {
    try {
      setUniversalLoader(true);
      const { data } = (await CallGetAdvertisement("")) as any;
      if (data?.message === "Success") {
        setAdvertisement(data?.data);
        setUniversalLoader(false);
      }
      if (data?.error) {
        handleCommonErrors(data?.error);
      }
    } catch (error) {
      setUniversalLoader(false);
    }
  };
  const getSuperSpeciality = async (value: any) => {
    const newAdvertisementId = value?._id;
    setAdvertisementId(newAdvertisementId);
    // try {
    //   setUniversalLoader(true);

    //   const { data } = (await CallFindSpecialityByAdvertisementId(
    //     newAdvertisementId,
    //   )) as any;
    //   if (data?.message === "Success") {
    //     setSpeciality(data?.data);
    //     setUniversalLoader(false);
    //   }
    //   if (data?.error) {
    //     handleCommonErrors(data?.error);
    //   }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setUniversalLoader(false);
    // }
  };
  // const GetPostApplied = async (value: any) => {
  //   setUniversalLoader(true);
  //   try {
  //     const { data } = (await CallPostAppliedBySpecialityId(
  //       value,
  //       advertisementId,
  //     )) as any;
  //     if (data?.data) {
  //       setPostApplied(data?.data);
  //       setUniversalLoader(false);
  //     }
  //     if (data?.error) {
  //       handleCommonErrors(data?.error);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setUniversalLoader(false);
  //   } finally {
  //     setUniversalLoader(false);
  //   }
  // };
  const GetPWBDList = async () => {
    setUniversalLoader(true);
    try {
      const { data, error } = (await CallPWBDList()) as any;
      if (data?.message === "Success") {
        setPWBDList(data?.data);
        setUniversalLoader(false);
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.error(error);
      setUniversalLoader(false);
    } finally {
      setUniversalLoader(false);
    }
  };

  function removeDuplicatesArray(arr: any) {
    const uniqueSet = new Set(arr?.map((obj: any) => JSON.stringify(obj)));
    return Array.from(uniqueSet)?.map((str: any) => JSON.parse(str));
  }

  useEffect(() => {
    if (post_applied_forId) {
      showDepartment(post_applied_forId);
    }
  }, [post_applied_forId]);

  const showDepartment = async (postAppliedId: string) => {
    const postApplied: PostAppliedItem[] = [
      // Your postApplied items here
    ];

    const newDepartmentList = postApplied?.find(
      (item) => item?._id === postAppliedId,
    );
    const extractDepartment =
      newDepartmentList?.departmentDetails as DepartmentDetails[];

    //alldepartment
    // const preferredList = extractDepartment?.map(
    //   (item) => item?.departmentForChoice,
    // );

    // setPreferredDepartementSeq(preferred_departments_sequence);
    // setPreferredDepartementList(preferredList);

    handleCategoryList(extractDepartment);

    // const { data } = (await CallPreferredDepartementList(postAppliedId)) as any;
    // if (data?.message === "Success") {
    //   setPreferredDepartementList(data?.data);
    //   setUniversalLoader(false);
    // }
  };
  const handleCategoryList = (newDepartmentList: any) => {
    const AllCategories = ["UR", "OBC", "SC", "ST", "EWS"];
    let propertiesWithValueMoreThan0 = [];
    const a = [] as any;
    newDepartmentList?.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (
          key !== "department" &&
          key !== "totalPosts" &&
          (pwbd === "yes" || !key.includes("PWBD")) &&
          item[key] > 0
        ) {
          if (key === "UR" || key === "EWS") {
            a.push(key);
            propertiesWithValueMoreThan0 = AllCategories;
            return;
          }
          a.push(key.replaceAll("_PWBD", ""));
          propertiesWithValueMoreThan0.push(key.replaceAll("_PWBD", ""));
        }
      });
    });
    const b = removeDuplicatesArray(a) as any;
    setAgeRelaxationCategory(b);
  };
  const handleState = (code: string, Addresstype: string) => {
    const newStateList = State.getStatesOfCountry(code) as any;
    if (watch(`${Addresstype}.country`).length < 1) {
      setValue(`${Addresstype}.state`, "");
      setValue(`${Addresstype}.city`, "");
    }
    if (Addresstype === "permanent_address") {
      setStateList([]);
      setCityList([]);
    } else {
      setStatePaList([]);
      setCityPaList([]);
      setStatePaList(newStateList);
    }
  };
  const handleCity = (code: string, Addresstype: string) => {
    const newCityList = City.getCitiesOfState("IN", code) as any;
    if (watch(`${Addresstype}.state`)?.length < 1) {
      setValue(`${Addresstype}.city`, "");
    }
    if (Addresstype === "permanent_address") {
      setCityList([]);
      setCityList(newCityList);
    } else {
      setCityPaList([]);
      setCityPaList(newCityList);
    }
  };

  // const ReplaceKey = (list: any) => {
  //   const updatedData = list?.map((item: any, idx: number) => ({
  //     key: idx + 1,
  //     _id: item?._id,
  //     departmentName: item.value,
  //   }));
  //   return updatedData;
  // };
  // const setOrderArrange = (val: any) => {
  //   setPreferredDepartementSeq(val);
  //   setValue("preferred_departments_sequence", ReplaceKey(val));
  // };
  // const CheckNationality = (e: any, changeNationalityVal: any) => {
  //   const value = e.target.value;
  //   changeNationalityVal(value);
  //   if (value === "Others") {
  //     setIsModalOpen(true);
  //   } else {
  //     setValue("nationality_country", "");
  //   }
  // };
  // const pwdPercentge = Array.from({ length: 61 }, (_, index) => index + 40);

  const checkPWBD = () => {
    if (pwbd === "yes") {
      return true;
    }
    return false;
  };
  const checkGovtEmployee = () => {
    if (is_regular_govt_servant === "yes") {
      const totalExperience = moment(till_date)?.diff(
        date_of_appointment,
        "years",
      );
      if (totalExperience >= 3) {
        return true;
      }
      return false;
    }
    return false;
  };
  const validateAgeRelaxation = (value: any) => {
    let relaxation = 0;
    let maximumAge = moment(advertisementStartDate)
      .subtract(50, "years")
      .add(1, "day")
      .format("YYYY-MM-DD")
      .toString();
    if (category === "UR" || category === "EWS") {
      if (
        (ageRelaxationCategory.includes("UR") ||
          ageRelaxationCategory.includes("EWS")) &&
        (checkGovtEmployee() || checkPWBD())
      ) {
        relaxation += 5;
      } else {
        relaxation += 0;
      }
    } else if (category === "OBC" && ageRelaxationCategory.includes("OBC")) {
      if (checkGovtEmployee() || checkPWBD()) {
        relaxation += 8;
      } else {
        relaxation += 3;
      }
    } else if (
      ((category === "SC" || category === "ST") &&
        ageRelaxationCategory.includes("ST")) ||
      ageRelaxationCategory.includes("SC")
    ) {
      if (checkGovtEmployee() || checkPWBD()) {
        relaxation += 5;
      } else {
        relaxation += 5;
      }
    } else {
      relaxation += 0;
    }
    maximumAge = moment(maximumAge)
      .subtract(relaxation, "years")
      .format("YYYY-MM-DD");
    const totalYear = 50 + relaxation;
    const checkAge = moment(value, "YYYY-MM-DD").isBefore(
      moment(maximumAge, "YYYY-MM-DD"),
    );
    return (
      !checkAge || `You should not be older than ${totalYear} years to register`
    );
  };
  // const handleAddress = (e: any) => {
  //   e.preventDefault();
  //   setStatePaList(stateList);
  //   setCityPaList(cityList);
  //   setValue("postal_address.pin_code", watch("permanent_address.pin_code"));
  //   setValue("postal_address.city", watch("permanent_address.city"));
  //   setValue("postal_address.state", watch("permanent_address.state"));
  //   setValue(
  //     "postal_address.other_state",
  //     watch("permanent_address.other_state"),
  //   );
  //   setValue(
  //     "postal_address.countryName",
  //     watch("permanent_address.countryName"),
  //   );
  //   setValue("postal_address.country", watch("permanent_address.country"));
  //   setValue(
  //     "postal_address.address_line_3",
  //     watch("permanent_address.address_line_3"),
  //   );
  //   setValue(
  //     "postal_address.address_line_2",
  //     watch("permanent_address.address_line_2"),
  //   );
  //   setValue(
  //     "postal_address.address_line_1",
  //     watch("permanent_address.address_line_1"),
  //   );
  // };
  // const idNoLength = () => {
  //   if (id_proof === "Aadhaar Card") {
  //     return 12;
  //   } else if (id_proof === "Passport") {
  //     return 20;
  //   }
  // return 18;
  // };
  const handleClosingDate = (val: any) => {
    const closingDate = advertisement?.find((item: any) => item?._id === val);
    setAdvertisementStartDate(moment(closingDate)?.format("YYYY.MM.DD"));
  };
  const PreventWordInput = (val: any) => {
    const disableKey = [
      "E",
      "e",
      "ArrowUp",
      "ArrowDown",
      ".",
      "+",
      "-",
      "@",
      "#",
      "",
    ];
    if (disableKey.includes(val.key)) {
      val.preventDefault();
    }
  };
  // const handlePopUp = (e: any, key: any) => {
  //   let minValue: any;
  //   if (modelData.length) {
  //     minValue = Math.min(...modelData);
  //   }
  //   setModelStatus(key);
  //   if (
  //     (applicationId?.length &&
  //       modelStatus > key &&
  //       !modelData.includes(key) &&
  //       minValue > key) ||
  //     modelStatus === 0
  //   ) {
  //     setConfirmModal(true);
  //     setModelData([...modelData, key]);
  //   }
  // };

  const selectedCategory: any = PWBDList.find(
    (category: any) => category?.value === watch("pwbd_category"),
  );

  const subCategory = selectedCategory?.sub_category;

  useEffect(() => {
    if (advertisementId) {
      getCategory();
    }
  }, [advertisementId]);

  const getCategory = async () => {
    try {
      setUniversalLoader(true);
      const { data, error } = (await CallFindCategory(advertisementId)) as any;
      if (data?.message === "Success") {
        setCategoryList(data?.data);

        setUniversalLoader(false);
      }
      if (error) {
        handleCommonErrors(error);
      }
      setUniversalLoader(false);
    } catch (error) {
      console.error(error);
    } finally {
      setUniversalLoader(false);
    }
  };

  // const getIdPattern = (id_proof: string) => {
  //   switch (id_proof) {
  //     case "Voter ID/EPIC Card":
  //       return /^[A-Z]{3}[0-9]{7}$/;
  //     case "PAN Card":
  //       return /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  //     case "Driving Licence":
  //       return /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
  //     case "Aadhaar Card":
  //       return /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
  //     case "Passport":
  //       return /^[A-Z0-9]{6,20}$/;
  //     case "Armed Force ID Card":
  //       return /^[A-Z0-9]{6,12}$/;
  //     default:
  //       return /^[A-Za-z0-9\-_]{6,20}$/;
  //   }
  // };

  // const getMinLength = (id_proof: string) => {
  //   switch (id_proof) {
  //     case "Passport":
  //       return 6;
  //     case "Aadhaar Card":
  //       return 12;
  //     default:
  //       return 5;
  //   }
  // };

  const getState = async () => {
    const { data } = (await CallGetAllState()) as any;
    setStateList(data?.data);
    setStatePaList(data?.data);
  };

  return (
    <>
      <div className="CA_form_current_head">
        <div className="content_breif">
          <h2 className="main_title">Basic Details</h2>
        </div>
      </div>
      {universalLoader ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Controller
                name="preferred_language"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Preferred Language</div>
                    <Select
                      isDisabled
                      size="md"
                      items={[
                        { label: "English", value: "English" },
                        { label: "हिन्दी", value: "हिन्दी" },
                      ]}
                      id="pwbd_percentage"
                      selectedKeys={[value]}
                      defaultSelectedKeys={[value]}
                    >
                      {(option: any) => (
                        <SelectItem key={option?.value}>
                          {option?.label}
                        </SelectItem>
                      )}
                    </Select>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="advertisement_noId.value"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Advertisement No.</div>
                    <Input
                      isDisabled
                      className="mt-2"
                      disabled
                      type="text"
                      placeholder="Enter name"
                      value={value}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="specialityName"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">
                      Speciality/Super Speciality
                    </div>
                    <Input
                      isDisabled
                      className="mt-2"
                      disabled
                      type="text"
                      placeholder="Enter name"
                      value={value}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="postApplied"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Post Applied For</div>
                    <Input
                      isDisabled
                      className="mt-2"
                      disabled
                      type="text"
                      placeholder="Enter name"
                      value={value}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="pwbd"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">
                      Are you in the category of PWBD : (Persons with benchmark
                      disability as per the rights of persons with disability
                      act, 2016)
                    </div>
                    <div className={"custom_radio  mb-0"}>
                      <RadioGroup
                        isDisabled
                        orientation="horizontal"
                        id="gender"
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
            {pwbd === "yes" && (
              <>
                <div>
                  <Controller
                    name="pwbd_percentage"
                    control={control}
                    render={({ field: { value } }) => (
                      <>
                        <div className="my-2 label">PWBD(%)</div>
                        <Input
                          isDisabled
                          className="mt-2"
                          disabled
                          type="text"
                          placeholder="Enter name"
                          value={value}
                        />
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="pwbd_category"
                    control={control}
                    render={({ field: { value } }) => (
                      <>
                        <div className="my-2 label">PWBD Category</div>
                        <Select
                          isDisabled
                          size="md"
                          items={PWBDList}
                          selectedKeys={[value]}
                          defaultSelectedKeys={[value]}
                        >
                          {(option: any) => (
                            <SelectItem key={option?.value}>
                              {option?.value}
                            </SelectItem>
                          )}
                        </Select>
                      </>
                    )}
                  />
                </div>
              </>
            )}
            {watch("pwbd_category") && (
              <div>
                <Controller
                  name="pwbd_subcategory"
                  control={control}
                  render={({ field: { value } }) => (
                    <>
                      <div className="my-2 label">PWBD Category</div>
                      <Select
                        isDisabled
                        size="md"
                        items={
                          subCategory
                            ? subCategory?.map((degree: any) => ({
                                label: degree,
                                value: degree,
                              }))
                            : []
                        }
                        id="pwbd_percentage"
                        selectedKeys={[value]}
                        defaultSelectedKeys={[value]}
                      >
                        {(option: any) => (
                          <SelectItem key={option?.value}>
                            {option?.label}
                          </SelectItem>
                        )}
                      </Select>
                    </>
                  )}
                />
              </div>
            )}
            <div>
              <Controller
                name="category.value"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">Category</div>
                    <Select
                      isDisabled
                      size="md"
                      items={categoryList}
                      id="pwbd_percentage"
                      selectedKeys={[value]}
                      defaultSelectedKeys={[value]}
                    >
                      {(option: any) => (
                        <SelectItem key={option?.value}>
                          {option?.value}
                        </SelectItem>
                      )}
                    </Select>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="father_name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Father's Name is required",
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <>
                    <div className="my-2 label">{"Father's Name"}</div>
                    <Input
                      isDisabled
                      className="mt-2"
                      disabled
                      startContent={
                        <div className="pr-2">
                          <i className="fa-solid fa-user"></i>
                        </div>
                      }
                      type="text"
                      placeholder="Enter name"
                      isInvalid={invalid}
                      value={value}
                      onChange={(e: { target: { value: any } }) => {
                        onChange(e.target.value);
                        // showModal({
                        //   title: "Father's Name",
                        //   var: "father_name",
                        //   input: true,
                        // });
                      }}
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="mother_name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Mother's Name is required",
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <>
                    <div className="my-2 label">{"Mother's Name"}</div>
                    <Input
                      isDisabled
                      className="mt-2"
                      disabled
                      startContent={
                        <div className="pr-2">
                          <i className="fa-solid fa-user"></i>
                        </div>
                      }
                      value={value}
                      isInvalid={invalid}
                      onChange={(e: { target: { value: any } }) => {
                        onChange(e.target.value);
                        // showModal({
                        //   title: "Mother's Name",
                        //   var: "mother_name",
                        //   input: true,
                        // });
                      }}
                      type="text"
                      placeholder="Enter name"
                    />
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="gender"
                control={control}
                rules={{
                  required: { value: true, message: "Please Select Gender" },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <>
                    <div className="my-2 label">
                      Gender {invalid && <span className="text-danger">*</span>}
                    </div>
                    <div
                      className={
                        invalid
                          ? "is-invalid custom_radio mb-0"
                          : "custom_radio  mb-0"
                      }
                    >
                      <RadioGroup
                        isDisabled
                        orientation="horizontal"
                        id="gender"
                        value={value}
                        onChange={(e: { target: { value: any } }) => {
                          onChange(e.target.value);
                          // showModal({
                          //   title: "Gender",
                          //   var: "gender",
                          // });
                        }}
                      >
                        <CustomRadio value="Male">
                          <i className="fa-solid fa-person"></i>
                        </CustomRadio>
                        <CustomRadio value="Female">
                          <i className="fa-solid fa-person-dress"></i>
                        </CustomRadio>
                        <CustomRadio value="Third Gender">
                          <i className="fa-solid fa-transgender"></i>
                        </CustomRadio>
                      </RadioGroup>
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="nationality"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please Select Nationality",
                  },
                }}
                render={({ field: { value }, fieldState: { invalid } }) => (
                  <>
                    <div className="my-2 label">
                      Nationality{" "}
                      {invalid && <span className="text-danger">*</span>}
                    </div>
                    <div
                      className={
                        invalid
                          ? "is-invalid custom_radio mb-0"
                          : "custom_radio  mb-0"
                      }
                    >
                      <RadioGroup
                        isDisabled
                        orientation="horizontal"
                        id="nationality"
                        value={value}
                        isInvalid={invalid}
                        onChange={() => {
                          // CheckNationality(e, onChange);
                          // showModal({
                          //   title: "Nationality",
                          //   var: "nationality",
                          // });
                        }}
                      >
                        <CustomRadio value="Indian">
                          <Image
                            src={INDIANFLAG}
                            width={25}
                            height={25}
                            alt="Indian"
                          />
                        </CustomRadio>
                        <CustomRadio value="Others">
                          <Image
                            src={GlOBE}
                            width={25}
                            height={25}
                            alt="others"
                          />
                        </CustomRadio>
                      </RadioGroup>
                    </div>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="date_of_birth"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please Select Date of birth",
                  },
                  validate: (val: any) => validateAgeRelaxation(val),
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error },
                }) => (
                  <>
                    <div className="label my-2"> Date of Birth</div>
                    <Input
                      isDisabled
                      className="mt-2"
                      disabled
                      startContent={
                        <div className="pr-2">
                          <i className="fa-solid fa-rectangle-list"></i>
                        </div>
                      }
                      type="date"
                      id="date_of_birth"
                      value={moment(value).format("YYYY-MM-DD")}
                      isInvalid={invalid}
                      onChange={(e: { target: { valueAsDate: any } }) => {
                        onChange(e.target.valueAsDate);
                        // showModal({
                        //   title: "Date of Birth",
                        //   var: "date_of_birth",
                        // });
                      }}
                      min={moment(new Date(advertisementStartDate))
                        ?.subtract(55, "years")
                        ?.add(1, "day")
                        ?.format("YYYY-MM-DD")
                        ?.toString()}
                      max={moment(new Date(advertisementStartDate))
                        ?.subtract(18, "years")
                        ?.subtract(1, "day")
                        ?.format("YYYY-MM-DD")
                        ?.toString()}
                    />

                    {error && error?.message}
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="marital_status"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Marital Status is required",
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <div className="form-group mb-3">
                    <div className="my-2 label">
                      Marital Status
                      {invalid && <span className="text-danger">*</span>}
                    </div>
                    <div
                      className={
                        invalid
                          ? "is-invalid custom_radio mb-0"
                          : "custom_radio  mb-0"
                      }
                    >
                      <RadioGroup
                        isDisabled
                        orientation="horizontal"
                        id="marital_status"
                        isInvalid={invalid}
                        value={value}
                        onChange={(e: any) => {
                          onChange(e);
                          // showModal({
                          //   title: "Marital Status",
                          //   var: "marital_status",
                          // });
                        }}
                      >
                        <CustomRadio value="Married">
                          <Image
                            src={MARRIED}
                            width={25}
                            height={25}
                            alt="Indian"
                          />
                        </CustomRadio>
                        <CustomRadio value="Unmarried">
                          <Image
                            src={UNMARRIED}
                            width={25}
                            height={25}
                            alt="Indian"
                          />
                        </CustomRadio>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="id_proof"
                control={control}
                rules={{
                  required: { value: true, message: "Please Select ID Proof" },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <>
                    <div className="label my-2"> ID Proof:</div>
                    <Select
                      isDisabled
                      size="md"
                      items={[
                        {
                          value: "Voter ID/EPIC Card",
                          label: "Voter ID/EPIC Card",
                        },
                        { value: "PAN Card", label: "PAN Card" },
                        { value: "Driving Licence", label: "Driving Licence" },
                        { value: "Aadhaar Card", label: "Aadhaar Card" },
                        { value: "Passport", label: "Passport" },
                        {
                          value: "Armed Force ID Card",
                          label: "Armed Force ID Card",
                        },
                        {
                          value: "Med. Reg.ID Card",
                          label: "Med. Reg.ID Card",
                        },
                      ]}
                      defaultSelectedKeys={[value]}
                      id="id_proof"
                      isInvalid={invalid}
                      onChange={(e: any) => {
                        onChange(e);
                        // showModal({
                        //   title: "Preferred Language",
                        //   var: "preferred_language",
                        // });
                      }}
                      startContent={
                        <div className="pr-2">
                          <i className="fa-solid fa-rectangle-list"></i>
                        </div>
                      }
                    >
                      {(option: any) => (
                        <SelectItem key={option?.value}>
                          {option?.label}
                        </SelectItem>
                      )}
                    </Select>
                  </>
                )}
              />
            </div>
            <div>
              <Controller
                name="id_no"
                control={control}
                rules={{
                  required: { value: true, message: "ID No is required" },
                }}
                render={({ field: { value }, fieldState: { invalid } }) => (
                  <>
                    <div className="label my-2"> ID No:</div>
                    <>
                      <Input
                        isDisabled
                        id="id_no"
                        value={value}
                        isInvalid={invalid}
                        startContent={
                          <div className="pr-2">
                            <i className="fa-solid fa-rectangle-list"></i>
                          </div>
                        }
                        onKeyDown={(e) => {
                          if (id_proof === "Aadhaar Card") {
                            PreventWordInput(e);
                          }
                        }}
                        type={
                          watch("id_proof") === "PAN Card" ||
                          watch("id_proof") === "Driving Licence" ||
                          watch("id_proof") === "Voter ID/EPIC Card" ||
                          watch("id_proof") === "Armed Force ID Card" ||
                          watch("id_proof") === "Med. Reg.ID Card" ||
                          watch("id_proof") === "Passport"
                            ? "text"
                            : "number"
                        }
                        placeholder="Enter ID number"
                      />
                    </>
                  </>
                )}
              />
            </div>
            {id_proof === "Passport" ||
            id_proof === "Driving Licence" ||
            id_proof === "Med. Reg.ID Card" ||
            id_proof === "Armed Force ID Card" ? (
              <>
                <div className="col">
                  <Controller
                    name="place_of_issue"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Place of Issue is required",
                      },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div> Place of Issue:</div>

                        <>
                          <div className={invalid ? "is-invalid" : ""}>
                            <span className="material-symbols-outlined">
                              location_on
                            </span>
                          </div>
                          <Input
                            disabled
                            id="place_of_issue"
                            value={value}
                            isInvalid={invalid}
                            onChange={(e: { target: { value: any } }) => {
                              onChange(e.target.value);
                              // showModal({
                              //   title: "Place of Issue",
                              //   var: "place_of_issue",
                              //   input: true,
                              // });
                            }}
                            type="text"
                          />
                        </>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="issue_date"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Issue Date is required",
                      },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div> Issue Date:</div>

                        <>
                          <div className={invalid ? "is-invalid" : ""}>
                            <span className="material-symbols-outlined">
                              date_range
                            </span>
                          </div>
                          <Input
                            disabled
                            id="issue_date"
                            value={moment(value).format("YYYY-MM-DD")}
                            isInvalid={invalid}
                            onChange={(e: { target: { value: any } }) => {
                              onChange(e.target.value);
                              // showModal({
                              //   title: "Issue Date",
                              //   var: "issue_date",
                              // });
                            }}
                            type="date"
                            max={moment(new Date())
                              .format("YYYY-MM-DD")
                              .toString()}
                          />
                        </>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="valid_till"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Valid Till is required",
                      },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div> Valid Till:</div>

                        <>
                          <div className={invalid ? "is-invalid" : ""}>
                            <span className="material-symbols-outlined">
                              date_range
                            </span>
                          </div>
                          <Input
                            disabled
                            id="valid_till"
                            isInvalid={invalid}
                            value={moment(value).format("YYYY-MM-DD")}
                            onChange={(e: { target: { value: any } }) => {
                              onChange(e.target.value);
                              // showModal({
                              //   title: "Valid Till",
                              //   var: "valid_till",
                              // });
                            }}
                            type="date"
                          />
                        </>
                      </>
                    )}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          <hr className="my-5" style={{ border: "1px solid #BFBFBF" }} />
          <div className="CA_form_current_head mt-2">
            <div className="content_breif">
              <h2 className="main_title"> Permanent Address</h2>
            </div>
          </div>
          {nationality === "Indian" ? (
            <>
              <div className="row">
                <div className="col">
                  <Controller
                    name="permanent_address.country"
                    control={control}
                    rules={{
                      required: { value: true, message: "Country is required" },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div className="label my-2">Country: </div>

                        <Select
                          isDisabled
                          size="md"
                          id="permanent_address_country"
                          selectedKeys={[value]}
                          items={[
                            { value: "0", label: "--Select--" },
                            { value: "India", label: "India" },
                          ]}
                          isInvalid={invalid}
                          onChange={(e: any) => {
                            // showModal({
                            //   title: "State",
                            //   var: "permanent_address_state",
                            // });
                            onChange(e);
                            handleCity(e.target.value, "permanent_address");
                            // if (postalAddress) {
                            //   handleAddress(e);
                            // }
                          }}
                        >
                          {(option: any) => (
                            <SelectItem key={option?.value}>
                              {option?.label}
                            </SelectItem>
                          )}
                        </Select>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="permanent_address.state"
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
                            id="permanent_address_state"
                            selectedKeys={[value]}
                            isInvalid={invalid}
                          >
                            {(option: any) => (
                              <SelectItem key={option?.isoCode}>
                                {option?.name}
                              </SelectItem>
                            )}
                          </Select>
                        </>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="permanent_address.city"
                    control={control}
                    rules={{
                      required: { value: true, message: "City is required" },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div className="my-2 label">City</div>
                        <>
                          <div className={invalid ? "is-invalid" : ""}></div>
                          <Input
                            isDisabled
                            type="select"
                            id="permanent_address_city"
                            value={value}
                            isInvalid={invalid}
                            onChange={(e: any) => {
                              // showModal({
                              //   title: "City",
                              //   var: "permanent_address_city",
                              // });
                              onChange(e);
                              // if (postalAddress) {
                              //   handleAddress(e);
                              // }
                            }}
                          >
                            <option value="0">--Select--</option>
                            {cityList?.map((item: any, idx: any) => (
                              <option key={idx} value={item?.name}>
                                {item?.name}
                              </option>
                            ))}
                          </Input>
                        </>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="permanent_address.pin_code"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Pin Code is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Mobile number should be 6 digits",
                      },
                    }}
                    render={({ field: { value }, fieldState: { invalid } }) => (
                      <>
                        <div className="my-2 label">Pin Code</div>
                        <>
                          <Input
                            isDisabled
                            id="permanent_address_pin_code"
                            value={value}
                            isInvalid={invalid}
                            type="number"
                            onKeyDown={PreventWordInput}
                          />
                        </>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="permanent_address.address_line_1"
                    control={control}
                    rules={{
                      required: { value: true, message: "Address is required" },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div className="my-2 label">Address</div>

                        <Textarea
                          isDisabled
                          minRows={6}
                          labelPlacement="outside"
                          className="col-span-12 md:col-span-6 mb-6 md:mb-0 row-span-12 border rounded-md"
                          id="permanent_address_address_line_1"
                          value={value}
                          isInvalid={invalid}
                          onChange={(e: { target: { value: any } }) => {
                            // showModal({
                            //   title: "Address",
                            //   var: "permanent_address_address_line_1",
                            //   input: true,
                            // });
                            onChange(e.target.value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col">
                <Controller
                  name="permanent_address.country"
                  control={control}
                  rules={{
                    required: { value: true, message: "Country is required" },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <>
                      <div className="label my-2">Country: </div>
                      <Select
                        isDisabled
                        id="permanent_address_country"
                        startContent={
                          <div className="pr-2">
                            <i className="fa-solid fa-globe"></i>
                          </div>
                        }
                        selectedKeys={[value]}
                        isInvalid={invalid}
                        onChange={(e) => {
                          // showModal({
                          //   title: "Country",
                          //   var: "permanent_address_country",
                          // });
                          onChange(e);
                          handleState(e.target.value, "permanent_address");
                        }}
                      >
                        {watch("migrated") === "no"
                          ? [
                              <SelectItem key="Nepal">Nepal</SelectItem>,
                              <SelectItem key="Bhutan">Bhutan</SelectItem>,
                              <SelectItem key="Tibet">Tibet</SelectItem>,
                            ]
                          : [
                              <SelectItem key="Pakistan">Pakistan</SelectItem>,
                              <SelectItem key="Burma">Burma</SelectItem>,
                              <SelectItem key="Sri Lanka">
                                Sri Lanka
                              </SelectItem>,
                              <SelectItem key="East African countries of Kenya">
                                East African countries of Kenya
                              </SelectItem>,
                              <SelectItem key="Uganda">Uganda</SelectItem>,
                              <SelectItem key="United Republic of Tanzania (formerly Tanganyika and Zanzibar)">
                                United Republic of Tanzania (formerly Tanganyika
                                and Zanzibar)
                              </SelectItem>,
                              <SelectItem key="Zambia">Zambia</SelectItem>,
                              <SelectItem key="Malwi">Malwi</SelectItem>,
                              <SelectItem key="Zaire">Zaire</SelectItem>,
                              <SelectItem key="Ethiopia">Ethiopia</SelectItem>,
                              <SelectItem key="Vietman">Vietman</SelectItem>,
                            ]}
                      </Select>
                    </>
                  )}
                />
              </div>
              <div className="col">
                <Controller
                  name="permanent_address.address_line_1"
                  control={control}
                  rules={{
                    required: { value: true, message: "Address is required" },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <>
                      <div className="my-2 label">Address</div>
                      <Textarea
                        isDisabled
                        minRows={6}
                        labelPlacement="outside"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0 row-span-12 border rounded-md"
                        id="permanent_address_address_line_1"
                        value={value}
                        isInvalid={invalid}
                        onChange={(e: { target: { value: any } }) => {
                          // showModal({
                          //   title: "Address",
                          //   var: "permanent_address_address_line_1",
                          //   input: true,
                          // });
                          onChange(e.target.value);
                        }}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          )}
          <hr className="my-5" style={{ border: "1px solid #BFBFBF" }} />
          <div className="CA_form_current_head">
            <div className="content_breif">
              <h2 className="main_title"> Postal Address</h2>
            </div>
          </div>
          {nationality === "Indian" ? (
            <>
              <div className="row">
                <div className="col">
                  <Controller
                    name="postal_address.country"
                    control={control}
                    rules={{
                      required: { value: true, message: "Country is required" },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div className="label my-2">Country: </div>{" "}
                        <Select
                          isDisabled
                          id="permanent_address_country"
                          selectedKeys={[value]}
                          isInvalid={invalid}
                          startContent={
                            <div className="pr-2">
                              <i className="fa-solid fa-globe"></i>
                            </div>
                          }
                          onChange={(e) => {
                            // showModal({
                            //   title: "Country",
                            //   var: "permanent_address_country",
                            // });
                            onChange(e);
                            handleState("IN", "postal_address");
                          }}
                        >
                          <SelectItem key="0">--Select--</SelectItem>
                          <SelectItem key="India">India</SelectItem>
                        </Select>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="postal_address.state"
                    control={control}
                    rules={{
                      required: { value: true, message: "State is required" },
                    }}
                    render={({ field: { value }, fieldState: { invalid } }) => (
                      <>
                        <div className="my-2 label">State</div>
                        <>
                          <div className={invalid ? "is-invalid" : ""}></div>
                          <Select
                            isDisabled
                            id="permanent_address_state"
                            selectedKeys={[value]}
                            isInvalid={invalid}
                          >
                            {statePaList?.map((item: any) => (
                              <SelectItem key={item?.isoCode}>
                                {item?.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="postal_address.city"
                    control={control}
                    rules={{
                      required: { value: true, message: "City is required" },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div className="my-2 label">City</div>
                        <>
                          <div className={invalid ? "is-invalid" : ""}></div>
                          <Input
                            isDisabled
                            type="select"
                            id="permanent_address_city"
                            value={value}
                            isInvalid={invalid}
                            onChange={(e: any) => {
                              // showModal({
                              //   title: "City",
                              //   var: "permanent_address_city",
                              // });
                              onChange(e);
                              // if (postalAddress) {
                              //   handleAddress(e);
                              // }
                            }}
                          >
                            <option value="0">--Select--</option>
                            {cityPaList?.map((item: any, idx: any) => (
                              <option key={idx} value={item?.name}>
                                {item?.name}
                              </option>
                            ))}
                          </Input>
                        </>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="postal_address.pin_code"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Pin Code is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Mobile number should be 6 digits",
                      },
                    }}
                    render={({ field: { value }, fieldState: { invalid } }) => (
                      <>
                        <div className="my-2 label">Pin Code</div>
                        <>
                          <Input
                            isDisabled
                            id="permanent_address_pin_code"
                            value={value}
                            isInvalid={invalid}
                            type="number"
                            onKeyDown={PreventWordInput}
                          />
                        </>
                      </>
                    )}
                  />
                </div>
                <div className="col">
                  <Controller
                    name="postal_address.address_line_1"
                    control={control}
                    rules={{
                      required: { value: true, message: "Address is required" },
                    }}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid },
                    }) => (
                      <>
                        <div className="my-2 label">Address</div>
                        <Textarea
                          isDisabled
                          minRows={6}
                          labelPlacement="outside"
                          className="col-span-12 md:col-span-6 mb-6 md:mb-0 row-span-12 border rounded-md"
                          id="permanent_address_address_line_1"
                          value={value}
                          isInvalid={invalid}
                          onChange={(e: { target: { value: any } }) => {
                            // showModal({
                            //   title: "Address",
                            //   var: "permanent_address_address_line_1",
                            //   input: true,
                            // });
                            onChange(e.target.value);
                          }}
                        />
                      </>
                    )}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="row">
              <div className="col">
                <Controller
                  name="postal_address.country"
                  control={control}
                  rules={{
                    required: { value: true, message: "Country is required" },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <>
                      <div className="label my-2">Country: </div>

                      <Select
                        isDisabled
                        id="postal_address_country"
                        selectedKeys={[value]}
                        startContent={
                          <div className="pr-2">
                            <i className="fa-solid fa-globe"></i>
                          </div>
                        }
                        isInvalid={invalid}
                        onChange={(e) => {
                          // showModal({
                          //   title: "Country",
                          //   var: "postal_address_country",
                          // });
                          onChange(e);
                          handleState(e.target.value, "postal_address");
                        }}
                      >
                        {watch("migrated") === "no"
                          ? [
                              <SelectItem key="Nepal">Nepal</SelectItem>,
                              <SelectItem key="Bhutan">Bhutan</SelectItem>,
                              <SelectItem key="Tibet">Tibet</SelectItem>,
                            ]
                          : [
                              <SelectItem key="Pakistan">Pakistan</SelectItem>,
                              <SelectItem key="Burma">Burma</SelectItem>,
                              <SelectItem key="Sri Lanka">
                                Sri Lanka
                              </SelectItem>,
                              <SelectItem key="East African countries of Kenya">
                                East African countries of Kenya
                              </SelectItem>,
                              <SelectItem key="Uganda">Uganda</SelectItem>,
                              <SelectItem key="United Republic of Tanzania (formerly Tanganyika and Zanzibar)">
                                United Republic of Tanzania (formerly Tanganyika
                                and Zanzibar)
                              </SelectItem>,
                              <SelectItem key="Zambia">Zambia</SelectItem>,
                              <SelectItem key="Malwi">Malwi</SelectItem>,
                              <SelectItem key="Zaire">Zaire</SelectItem>,
                              <SelectItem key="Ethiopia">Ethiopia</SelectItem>,
                              <SelectItem key="Vietman">Vietman</SelectItem>,
                            ]}
                      </Select>
                    </>
                  )}
                />
              </div>
              <div className="col">
                <Controller
                  name="postal_address.address_line_1"
                  control={control}
                  rules={{
                    required: { value: true, message: "Address is required" },
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { invalid },
                  }) => (
                    <>
                      <div className="my-2 label">Address</div>
                      <Textarea
                        isDisabled
                        minRows={6}
                        id="postal_address_address_line_1"
                        value={value}
                        className="border rounded-md"
                        isInvalid={invalid}
                        onChange={(e: { target: { value: any } }) => {
                          onChange(e.target.value);
                          // showModal({
                          //   title: "Address",
                          //   var: "postal_address_address_line_1",
                          // });
                        }}
                      />
                    </>
                  )}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BasicDetails;
