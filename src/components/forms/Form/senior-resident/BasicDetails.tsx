"use client";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { Input, RadioGroup } from "@heroui/react";
import { Select, SelectItem, Textarea, Spinner } from "@heroui/react";

import { Controller } from "react-hook-form";
import { Country, State, City } from "country-state-city";
import moment from "moment";
import {
  CallGetSpecialityByAdvertisementId,
  CallGetAllAdvertisement,
  CallGetAllPostApplied,
  CallPWBDList,
  CallFindCategory,
  CallGetAllState,
} from "@/_ServerActions";
import Image from "next/image";
import INDIANFLAG from "@/assets/img/icons/common/indian-flag.png";
import GlOBE from "@/assets/img/icons/common/globe.png";
import MARRIED from "@/assets/img/icons/common/married.png";
import UNMARRIED from "@/assets/img/icons/common/unmarried.png";
import { handleCommonErrors } from "@/Utils/HandleError";
import { useRadio, cn } from "@heroui/react";
interface BasicDetailsProps {
  formMethods: any;
  applicationId: any;
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
  const [universalLoader, setUniversalLoader] = useState<any>(false);
  const [advertisement, setAdvertisement] = useState<any>([]);
  const [advertisementStartDate, setAdvertisementStartDate] = useState<any>("");
  const [categoryList, setCategoryList] = useState<any>([]);
  const [countryList, setCountryList] = useState<any>([]);
  const [stateList, setStateList] = useState<any>([]);
  const [cityList, setCityList] = useState<any>([]);
  const [statePaList, setStatePaList] = useState<any>([]);
  const [cityPaList, setCityPaList] = useState<any>([]);
  const [speciality, setSpeciality] = useState<any>([]);
  const [postApplied, setPostApplied] = useState<any>([]);
  // const [isModalOpen, setIsModalOpen] = useState<any>(false);
  // const [preferredDepartementSeq, setPreferredDepartementSeq] = useState<any>(
  //   [],
  // );
  // const [preferredDepartementList, setPreferredDepartementList] = useState<any>(
  //   [],
  // );
  const [ageRelaxationCategory, setAgeRelaxationCategory] = useState<any>([]);
  // const [todayDate, setTodayDate] = useState<any>("");
  const [modelStatus, setModelStatus] = useState<any>();
  const [modelData, setModelData] = useState<any>([]);
  // const [postalAddress, setPostalAddress] = useState<any>(false);
  const [PWBDList, setPWBDList] = useState<any>([]);
  const [indianStateList, setIndianStateList] = useState([]);

  const { control, setValue, watch, getValues, clearErrors } = formMethods;
  // console.log("watch::: ", watch("advertisement_noId._id"));

  const [
    advertisement_noId,
    specialityId,
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
    // preferred_departments_sequence,
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
    "preferred_language",
  ]);

  const fieldCancelData = {
    advertisement_noId: getValues("advertisement_noId"),
    specialityId: getValues("specialityId"),
    post_applied_forId: getValues("post_applied_forId"),
    pwbd: getValues("pwbd"),
    category: getValues("category"),
  };
  useEffect(() => {
    // setApplicationId(param?.id);
    setModelStatus(0);
  }, []);
  useEffect(() => {
    getState();
    getAdvertisement();
    GetPWBDList();
    // setTodayDate(getTodayDate());
    if (!countryList.length) {
      setCountryList(Country.getAllCountries());
    }
  }, []);
  useEffect(() => {
    if (advertisement_noId._id) {
      getSuperSpeciality(advertisement_noId._id);
    }
  }, [advertisement_noId]);
  useEffect(() => {
    if (advertisement_noId && advertisement) {
      handleClosingDate(advertisement_noId);
    }
  }, [advertisement_noId, advertisement]);

  useEffect(() => {
    if (specialityId?._id) {
      GetPostApplied(specialityId?._id);
    }
  }, [specialityId?._id]);

  useEffect(() => {
    if (postApplied?.length) {
      showDepartment(post_applied_forId);
    }
  }, [postApplied, post_applied_forId, pwbd]);
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
      const { data } = (await CallGetAllAdvertisement()) as any;
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
    const newAdvertisementId = value?.toString();
    try {
      setUniversalLoader(true);

      const { data } = (await CallGetSpecialityByAdvertisementId(
        newAdvertisementId,
      )) as any;
      if (data?.message === "Success") {
        setSpeciality(data?.data);

        setUniversalLoader(false);
      }
      if (data?.error) {
        handleCommonErrors(data?.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUniversalLoader(false);
    }
  };
  const GetPostApplied = async (value: any) => {
    setUniversalLoader(true);
    try {
      const { data } = (await CallGetAllPostApplied(value, "")) as any;
      if (data?.message === "Success") {
        setPostApplied(data?.data);
        setUniversalLoader(false);
      }
      if (data?.error) {
        handleCommonErrors(data?.error);
      }
    } catch (error) {
      console.error(error);
      setUniversalLoader(false);
    } finally {
      setUniversalLoader(false);
    }
  };
  const GetPWBDList = async () => {
    setUniversalLoader(true);
    try {
      const { data } = (await CallPWBDList()) as any;
      if (data?.message === "Success") {
        setPWBDList(data?.data);
        setUniversalLoader(false);
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
  const showDepartment = (postAppliedId: any) => {
    const newDepartmentList = postApplied?.find(
      (item: any) => item?._id === postAppliedId,
    ) as any;
    const extractDepartment = newDepartmentList?.departmentDetails;
    // const preferredList = extractDepartment?.map(
    //   (item: { departmentForChoice: any }) => item?.departmentForChoice,
    // );
    // setPreferredDepartementSeq(preferred_departments_sequence);
    // setPreferredDepartementList(preferredList);
    handleCategoryList(extractDepartment);
  };
  useEffect(() => {
    if (specialityId && pwbd && watch("advertisement_noId._id")) {
      getCategory(specialityId?._id);
    }
  }, [specialityId, pwbd, watch("advertisement_noId._id")]);

  const getCategory = async (specialityId: any) => {
    try {
      setUniversalLoader(true);

      const { data, error } = (await CallFindCategory(
        watch("advertisement_noId._id"),
        specialityId,
        pwbd,
      )) as any;
      if (data?.message === "Success") {
        setCategoryList(data?.data);

        setUniversalLoader(false);
      }
      if (error) {
        handleCommonErrors(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUniversalLoader(false);
    }
  };
  const handleCategoryList = (newDepartmentList: any[]) => {
    const AllCategories = ["UR", "OBC", "SC", "ST", "EWS"];
    let propertiesWithValueMoreThan0: string[] = [];
    const a: string[] = [];

    newDepartmentList?.forEach((item: { [key: string]: number }) => {
      Object.keys(item).forEach((key) => {
        if (
          key !== "department" &&
          key !== "totalPosts" &&
          (pwbd === "yes" || !key.includes("PWBD")) &&
          item[key] > 0
        ) {
          if (key === "UR" || key === "EWS") {
            a.push(key);
            propertiesWithValueMoreThan0 = [...AllCategories];
            return;
          }
          const cleanKey = key.replaceAll("_PWBD", "");
          a.push(cleanKey);
          propertiesWithValueMoreThan0.push(cleanKey);
        }
      });
    });

    const b = removeDuplicatesArray(a);
    setAgeRelaxationCategory(b);
    const finalCategory = removeDuplicatesArray(propertiesWithValueMoreThan0);

    if (
      finalCategory.length < 1 &&
      post_applied_forId?.length > 0 &&
      pwbd &&
      !fieldCancelData.post_applied_forId
    ) {
      toast.error("There is no vacancy for selected post");
    }

    // setCategoryList(finalCategory);
  };

  const handleState = (code: string, Addresstype: string) => {
    const newStateList = State.getStatesOfCountry(code);
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
  const handleCity = (code: any, Addresstype: string) => {
    const newCityList = City.getCitiesOfState("IN", code);
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

  // const ReplaceKey = (list: any[]) => {
  //   const updatedData = list?.map(
  //     (item: { _id: any; departmentName: any }, idx: number) => ({
  //       key: idx + 1,
  //       _id: item?._id,
  //       departmentName: item.departmentName,
  //     }),
  //   );
  //   return updatedData;
  // };
  const CheckNationality = (
    e: { target: { value: any } },
    changeNationalityVal: (arg0: any) => void,
  ) => {
    const value = e.target.value;
    changeNationalityVal(value);
    if (value === "Others") {
      // setIsModalOpen(true);
    } else {
      setValue("nationality_country", "");
    }
  };

  // const onChangePreferedDepartment = (
  //   value: string | any[],
  //   Onchange: (arg0: never[]) => void,
  // ) => {
  //   const finalDepartmentSeq = preferredDepartementList?.filter((item: any) =>
  //     value.includes(item?._id),
  //   );
  //   Onchange(finalDepartmentSeq);
  //   const preferredSeq = ReplaceKey(finalDepartmentSeq);
  //   setValue("preferred_departments_sequence", preferredSeq);
  //   setPreferredDepartementSeq(preferredSeq);
  // };
  // const validatePreferedDepartmentLength = (value: string | any[]) => {
  //   return (
  //     (Array.isArray(value) &&
  //       value.length === preferredDepartementList?.length) ||
  //     `Select all ${preferredDepartementList?.length} Preferred Department`
  //   );
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
      return totalExperience >= 3;
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
  // const handleAddress = (e: {
  //   target: { checked: any };
  //   preventDefault: () => void;
  // }) => {
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
  const idNoLength = (id_proof: string) => {
    if (id_proof === "Aadhaar Card") {
      return 12;
    }
    if (id_proof === "Passport") {
      return 20;
    }
    return 18;
  };
  const handleClosingDate = (val: any) => {
    const closingDate = advertisement.find(
      (item: any) => item?._id === val,
    )?.closingDate;
    setAdvertisementStartDate(moment(closingDate)?.format("YYYY.MM.DD"));
  };
  const PreventWordInput = (val: {
    key: string;
    preventDefault: () => void;
  }) => {
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
  const onChangeInputNumber = (
    val: { target: { value: any } },
    max: number,
    onchange: (arg0: any) => void,
  ) => {
    let inputValue = val.target.value;
    const maxLength = max;
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }
    onchange(inputValue);
  };
  const handlePopUp = (
    e: any,
    key: number | React.SetStateAction<undefined> | any,
  ) => {
    let minValue: any;
    if (modelData.length) {
      minValue = Math.min(...modelData);
    }
    setModelStatus(key);
    if (
      (applicationId?.length &&
        modelStatus > key &&
        !modelData.includes(key) &&
        minValue > key) ||
      modelStatus === 0
    ) {
      setModelData([...modelData, key]);
    }
  };
  // const [comment, setComment] = useState<any>({});
  // const [isModel, setIsModel] = useState<any>(false);

  // const showModal = () => {
  // setIsModel(true);
  // setComment(data);
  // };

  const getIdPattern = (id_proof: string) => {
    switch (id_proof) {
      case "Voter ID/EPIC Card":
        return /^[A-Z]{3}[0-9]{7}$/;
      case "PAN Card":
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}/;
      case "Driving Licence":
        return /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
      case "Aadhaar Card":
        return /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
      case "Passport":
        return /^[A-Z0-9]{6,20}$/;
      case "Armed Force ID Card":
        return /^[A-Z0-9]{6,12}$/;
      default:
        return /^[A-Za-z0-9\-_]{6,20}$/;
    }
  };

  const getMinLength = (id_proof: string) => {
    switch (id_proof) {
      case "Passport":
        return 6;
      case "Aadhaar Card":
        return 12;
      default:
        return 5;
    }
  };

  const getState = async () => {
    const { data } = (await CallGetAllState()) as any;
    setStateList(data?.data);
    setStatePaList(data?.data);
    setIndianStateList(data?.data);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
            <div className="col-span-1">
              <Controller
                name="specialityId"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Speciality/Super Speciality is required",
                  },
                }}
                render={({
                  fieldState: { invalid },
                  field: { onChange, value },
                }) => (
                  <>
                    <div className="my-2 label">Subject/Speciality</div>
                    <Select
                      size="md"
                      isDisabled
                      id="specialityId"
                      selectedKeys={[value._id]}
                      isInvalid={invalid}
                      onChange={(e) => {
                        // showModal({
                        //   title: "Speciality/Super Speciality",
                        //   var: "specialityId",
                        // });
                        if (e.target.value === "") {
                          setPostApplied([]);
                          setCategoryList([]);
                        }
                        onChange(e);
                        handlePopUp(e, 3);
                        setValue("date_of_birth", "");
                        setValue("post_applied_forId", "");
                        setValue("category", "");
                        // setPreferredDepartementList([]);
                        setValue("preferred_departments_sequence", []);
                        // setPreferredDepartementSeq([]);
                        clearErrors("preferred_departments_sequence");
                      }}
                      startContent={
                        <div className="pr-2">
                          <i className="fa-solid fa-cube"></i>
                        </div>
                      }
                    >
                      {speciality?.map((item: any) => (
                        <SelectItem key={item?._id}>{item?.value}</SelectItem>
                      ))}
                    </Select>
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
                  <div className="form-group mb-3">
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
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="pwbd"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <div className="form-group  mb-3">
                    <div className="my-2 label">
                      Whether belongs to Persons with Disability (PWBD) category
                      ? {invalid && <span className="text-danger">*</span>}
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
                        id="pwbd"
                        value={value}
                        onChange={(e: { target: { value: any } }) => {
                          // showModal({
                          //   title: "PWBD category",
                          //   var: "pwbd",
                          // });
                          const val = e.target.value;
                          onChange(val);
                          handlePopUp(e, 5);

                          setValue("date_of_birth", "");
                          if (val === "no") {
                            setValue("pwbd_type", "");
                            setValue("pwbd_percentage", "");
                          }
                        }}
                      >
                        <CustomRadio value="yes">
                          <i className="fa-solid fa-check"></i>
                        </CustomRadio>
                        <CustomRadio value="no">
                          <i className="fa-solid fa-xmark"></i>
                        </CustomRadio>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              />
            </div>
            {pwbd === "yes" && (
              <>
                <div>
                  <Controller
                    name="pwbd_facility"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Please Select PWBD(%)",
                      },
                    }}
                    render={({ fieldState: { invalid }, field: { value } }) => (
                      <>
                        <div className="my-2 label">
                          {" "}
                          Which facility do you require to appeare in the exam?
                        </div>
                        <>
                          <Select
                            isDisabled
                            size="md"
                            items={[
                              {
                                label: "Compensatory time required",
                                value: "Compensatory time required",
                              },
                              {
                                label: "Scribe and Compensatory time required",
                                value: "Scribe and Compensatory time required",
                              },
                              {
                                label:
                                  "Neither Scribe nor Compensatory Time required",
                                value:
                                  "Neither Scribe nor Compensatory Time required",
                              },
                            ]}
                            id="pwbd_percentage"
                            selectedKeys={[value]}
                            defaultSelectedKeys={[value]}
                            isInvalid={invalid}
                          >
                            {(option: any) => (
                              <SelectItem key={option?.value}>
                                {option?.label}
                              </SelectItem>
                            )}
                          </Select>
                        </>
                      </>
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="pwbd_percentage"
                    control={control}
                    render={({ fieldState: { invalid }, field: { value } }) => (
                      <>
                        <div className="my-2 label">PWBD(%):</div>
                        <Input
                          isDisabled
                          className="mt-2"
                          disabled
                          type="text"
                          isInvalid={invalid}
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
                    rules={{
                      required: {
                        value: true,
                        message: "Please Select PWBD Type",
                      },
                    }}
                    render={({
                      fieldState: { invalid },
                      field: { onChange, value },
                    }) => (
                      <>
                        <div className="label my-2">PWBD Category</div>
                        <>
                          <div className={invalid ? "is-invalid" : ""}></div>
                          <Select
                            isDisabled
                            id="pwbd_category"
                            selectedKeys={[value]}
                            isInvalid={invalid}
                            onChange={(e: { target: { value: any } }) => {
                              onChange(e.target.value);
                              // showModal({
                              //   title: "PWBD(%)",
                              //   var: "pwbd_category",
                              // });
                            }}
                          >
                            {PWBDList?.map((item: any) => (
                              <SelectItem key={item?.value}>
                                {item?.value}
                              </SelectItem>
                            ))}
                          </Select>
                        </>
                      </>
                    )}
                  />
                </div>
                {watch("pwbd_category") && (
                  <div className="col">
                    <Controller
                      name="pwbd_subcategory"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Please Select PWBD Type",
                        },
                      }}
                      render={({
                        fieldState: { invalid },
                        field: { onChange, value },
                      }) => (
                        <>
                          <div className="label my-2">PWBD Sub Category</div>
                          <>
                            <div className={invalid ? "is-invalid" : ""}></div>

                            <Select
                              isDisabled
                              id="pwbd_category"
                              selectedKeys={[value]}
                              isInvalid={invalid}
                              onChange={(e: { target: { value: any } }) => {
                                onChange(e.target.value);
                                // showModal({
                                //   title: "PWBD(%)",
                                //   var: "pwbd_category",
                                // });
                              }}
                            >
                              {PWBDList?.find(
                                (category: any) =>
                                  category.value === watch("pwbd_category"),
                              )?.sub_category.map((subcategory: any) => (
                                <SelectItem key={subcategory}>
                                  {subcategory}
                                </SelectItem>
                              ))}
                            </Select>
                          </>
                        </>
                      )}
                    />
                  </div>
                )}
              </>
            )}
            <div>
              <Controller
                name="category._id"
                control={control}
                rules={{
                  required: { value: true, message: "Category is required" },
                }}
                render={({
                  fieldState: { invalid },
                  field: { onChange, value },
                }) => (
                  <>
                    <div className="my-2 label">Category</div>
                    <Select
                      isDisabled
                      size="md"
                      startContent={
                        <div className="pr-2">
                          <i className="fa-solid fa-shapes"></i>
                        </div>
                      }
                      id="category"
                      selectedKeys={[value]}
                      isInvalid={invalid}
                      onChange={(e: { target: { value: any } }) => {
                        // showModal({
                        //   title: "Category",
                        //   var: "category",
                        // });
                        handlePopUp(e, 6);
                        onChange(e.target.value);
                        setValue("date_of_birth", "");
                      }}
                    >
                      {categoryList?.map((item: any) => (
                        <SelectItem key={item?._id}>{item?.value}</SelectItem>
                      ))}
                    </Select>
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
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <div className="form-group mb-3">
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
                        onChange={(e: any) => {
                          CheckNationality(e, onChange);
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
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="state_of_domicile"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please Select Nationality",
                  },
                }}
                render={({ field: { value } }) => (
                  <>
                    <div className="my-2 label">State of Domicile</div>
                    <Select
                      isDisabled
                      size="md"
                      startContent={
                        <div className="pr-2">
                          <i className="fa-solid fa-shapes"></i>
                        </div>
                      }
                      id="domicile_state"
                      selectedKeys={[value]}
                    >
                      {indianStateList?.map((item: any) => (
                        <SelectItem key={item?.name}>{item?.name}</SelectItem>
                      ))}
                    </Select>
                  </>
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
                  pattern: {
                    value: getIdPattern(id_proof),
                    message: "Invalid ID Format",
                  },
                  minLength: {
                    value: getMinLength(id_proof),
                    message: `Minimum characters should be ${getMinLength(id_proof)}`,
                  },
                  maxLength: {
                    value: idNoLength(id_proof),
                    message: `Maximum characters should not be more than ${idNoLength(id_proof)}`,
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
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
                        onChange={(e) => {
                          onChangeInputNumber(e, idNoLength(""), onChange);
                          // showModal({
                          //   title: "ID No",
                          //   var: "id_no",
                          // });
                        }}
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
            <div>
              <Controller
                name="ex_serviceman_or_commissioned_officer"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value }, fieldState: { invalid } }) => (
                  <div className="form-group mb-3">
                    <div className="my-2 label">
                      Are you a Ex-serviceman/Commissioned Officer(including
                      ECO,SSCO)
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
                        isInvalid={invalid}
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
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="sr_ship_pursued_or_pursuing"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value }, fieldState: { invalid } }) => (
                  <div className="form-group mb-3">
                    <div className="my-2 label">
                      Are you Currently pursuing or persued SRship?{" "}
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
                        isInvalid={invalid}
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
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="has_dm_mch_degree"
                control={control}
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field: { value }, fieldState: { invalid } }) => (
                  <div className="form-group mb-3">
                    <div className="my-2 label">Do you have DM/MCH Degree </div>
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
                        isInvalid={invalid}
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
                  </div>
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
                      Marital Status{" "}
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
              <div className="label my-2"> Alternate Number</div>
              <Controller
                name="alternate_number"
                control={control}
                rules={{
                  minLength: {
                    value: 10,
                    message: "Mobile number should be 10 digits",
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <>
                    <Input
                      isDisabled
                      startContent={
                        <div className="pr-2">
                          <i className="fa-solid fa-phone"></i>
                        </div>
                      }
                      id="alternate_number"
                      isInvalid={invalid}
                      type="number"
                      value={value}
                      onChange={(e) => {
                        onChangeInputNumber(e, 10, onChange);
                        // showModal({
                        //   title: "Alternate Number",
                        //   var: "alternate_number",
                        // });
                      }}
                      maxLength={10}
                      placeholder="Enter alternate number"
                      onKeyDown={PreventWordInput}
                    />
                  </>
                )}
              />{" "}
            </div>
          </div>
        </>
      )}

      <hr className="my-5" style={{ border: "1px solid #BFBFBF" }} />

      <div className="CA_form_current_head mt-2">
        <div className="content_breif">
          <h2 className="main_title"> Permanent Address</h2>
        </div>
      </div>
      {nationality === "Indian" ? (
        <>
          <div className="row md:columns-2">
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
                  required: { value: true, message: "Pin Code is required" },
                  minLength: {
                    value: 6,
                    message: "Mobile number should be 6 digits",
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <>
                    <div className="my-2 label">Pin Code</div>
                    <>
                      <Input
                        isDisabled
                        id="permanent_address_pin_code"
                        value={value}
                        isInvalid={invalid}
                        type="number"
                        onChange={(e: any) => {
                          // showModal({
                          //   title: "Pin Code",
                          //   var: "permanent_address_pin_code",
                          // });
                          onChangeInputNumber(e, 6, onChange);
                          // if (postalAddress) {
                          //   handleAddress(e);
                          // }
                        }}
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
                      className="col-span-12 md:col-span-6 mb-6 md:mb-0 row-span-12 "
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
                          <SelectItem key="Sri Lanka">Sri Lanka</SelectItem>,
                          <SelectItem key="East African countries of Kenya">
                            East African countries of Kenya
                          </SelectItem>,
                          <SelectItem key="Uganda">Uganda</SelectItem>,
                          <SelectItem key="United Republic of Tanzania (formerly Tanganyika and Zanzibar)">
                            United Republic of Tanzania (formerly Tanganyika and
                            Zanzibar)
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
          <div className="row md:columns-2">
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
                          <SelectItem key={item?.name}>{item?.name}</SelectItem>
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
                  required: { value: true, message: "Pin Code is required" },
                  minLength: {
                    value: 6,
                    message: "Mobile number should be 6 digits",
                  },
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid },
                }) => (
                  <>
                    <div className="my-2 label">Pin Code</div>
                    <>
                      <Input
                        isDisabled
                        id="permanent_address_pin_code"
                        value={value}
                        isInvalid={invalid}
                        onChange={(e: any) => {
                          onChangeInputNumber(e, 6, onChange);
                          // showModal({
                          //   title: "Pin Code",
                          //   var: "permanent_address_pin_code",
                          // });
                        }}
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
                      className="col-span-12 md:col-span-6 mb-6 md:mb-0 row-span-12"
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
                          <SelectItem key="Sri Lanka">Sri Lanka</SelectItem>,
                          <SelectItem key="East African countries of Kenya">
                            East African countries of Kenya
                          </SelectItem>,
                          <SelectItem key="Uganda">Uganda</SelectItem>,
                          <SelectItem key="United Republic of Tanzania (formerly Tanganyika and Zanzibar)">
                            United Republic of Tanzania (formerly Tanganyika and
                            Zanzibar)
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
  );
};

export default BasicDetails;
