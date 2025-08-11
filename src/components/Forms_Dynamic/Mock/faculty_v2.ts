import { Step } from "../Type";

export const app: Step[] = [
  {
    step: 1,
    name: "Basic Details",
    key: "Basic Details",
    allFields: [
      {
        title: "Basic Details",
        defaultCol: 2,
        fields: [
          {
            name: "input",
            title: "Preferred Language",
            icon: "fa-solid fa-language",
            value: "preferred_language",
            col: 1,
          },
          {
            name: "input",
            title: "Advertisement No.",
            icon: "fa-solid fa-language",
            value: "advertisement_noId.value",
            col: 1,
          },
          {
            name: "input",
            title: "Speciality/Super Speciality",
            icon: "fa-solid fa-user",
            value: "specialityId.value",
            col: 2,
          },
          {
            name: "input",
            title: "Post Applied For",
            icon: "fa-solid fa-user",
            value: "post_applied_forId.postName",
            col: 1,
          },
          {
            name: "radio",
            title:
              "Are you in the category of PWBD : (Persons with benchmark disability as per the rights of persons with disability act, 2016)",
            value: "pwbd",
            col: 1,
            option: [
              {
                value: "yes",
                icon: "fa-solid fa-check",
              },
              {
                value: "no",
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "pwbd",
            validator: ["yes"],
            title: "PWBD(%):",
            icon: "fa-solid fa-sheet-plastic",
            value: "pwbd_percentage",
            col: 1,
          },
          {
            name: "input",
            isShow: "pwbd",
            validator: ["yes"],
            title: "PWBD Category",
            icon: "fa-solid fa-sheet-plastic",
            value: "pwbd_category",
            col: 1,
          },
          {
            name: "input",
            isShow: "pwbd",
            validator: ["yes"],
            title: "PWBD Sub Category",
            icon: "fa-solid fa-sheet-plastic",
            value: "pwbd_subcategory",
            col: 1,
          },
          {
            name: "input",
            title: "Category",
            icon: "fa-solid fa-shapes",
            value: "category.value",
            col: 1,
          },
          {
            name: "input",
            title: "Father's Name",
            icon: "fa-solid fa-user",
            value: "father_name",
            col: 1,
          },
          {
            name: "input",
            title: "Mother's Name",
            icon: "fa-solid fa-user",
            value: "mother_name",
            col: 1,
          },
          {
            name: "radio",
            title: "Gender",
            value: "gender",
            col: 1,
            option: [
              {
                value: "Male",
                icon: "fa-solid fa-person",
              },
              {
                value: "Female",
                icon: "fa-solid fa-person-dress",
              },
              {
                value: "Third Gender",
                icon: "fa-solid fa-transgender",
              },
            ],
          },
          {
            name: "input",
            title: "Nationality",
            icon: "fa-solid fa-flag-checkered",
            value: "nationality",
            col: 1,
          },
          // {
          //   name: "radio",
          //   title: "Nationality",
          //   value: "nationality",
          //   col: 1,
          //   option: [
          //     {
          //       value: "Indian",
          //       icon: "fa-solid fa-flag-checkered",
          //     },
          //     {
          //       value: "Other",
          //       icon: "fa-solid fa-earth-americas",
          //     },
          //   ],
          // },
          {
            name: "radio",
            title: "Have you Migrated?",
            isShow: "nationality",
            validator: ["Others"],
            value: "migrated",
            col: 1,
            option: [
              {
                value: "yes",
                icon: "fa-solid fa-check",
              },
              {
                value: "no",
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "radio",
            title: "Are You Regular Govt. Servant?",
            value: "is_regular_govt_servant",
            col: 1,
            option: [
              {
                value: "yes",
                icon: "fa-solid fa-check",
              },
              {
                value: "no",
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            type: "date",
            isShow: "is_regular_govt_servant",
            validator: ["yes"],
            title: "Date of Appointment",
            icon: "fa-solid fa-user",
            value: "date_of_appointment",
            col: 1,
          },
          {
            name: "input",
            type: "date",
            isShow: "is_regular_govt_servant",
            validator: ["yes"],
            title: "Till Date",
            icon: "fa-solid fa-user",
            value: "till_date",
            col: 1,
          },
          {
            name: "input",
            type: "date",
            title: "Date of Birth",
            icon: "fa-solid fa-user",
            value: "date_of_birth",
            col: 1,
          },
          {
            name: "radio",
            title: "Marital Status",
            value: "marital_status",
            col: 1,
            option: [
              {
                value: "Married",
                icon: "fa-solid fa-mars-stroke",
              },
              {
                value: "Unmarried",
                icon: "fa-solid fa-mars-double",
              },
            ],
          },
          {
            name: "radio",
            title: "A Citizen of India by birth or by domicile?",
            isShow: "nationality",
            validator: ["Indian"],
            value: "is_indian_citizen",
            col: 1,
            option: [
              {
                value: "By Birth",
                icon: "fa-solid fa-cake-candles",
              },
              {
                value: "By Domicile",
                icon: "fa-brands fa-creative-commons-pd-alt",
              },
            ],
          },
          {
            name: "input",
            title: "ID Proof:",
            icon: "fa-solid fa-shapes",
            value: "id_proof",
            col: 1,
          },
          {
            name: "input",
            title: "ID No:",
            icon: "fa-solid fa-rectangle-list",
            value: "id_no",
            col: 1,
          },
          {
            name: "input",
            isShow: "id_proof",
            validator: [
              "Passport",
              "Driving Licence",
              "Med. Reg.ID Card",
              "Armed Force ID Card",
            ],
            title: "Place of Issue",
            icon: "fa-solid fa-rectangle-list",
            value: "place_of_issue",
            col: 1,
          },
          {
            name: "input",
            isShow: "id_proof",
            validator: [
              "Passport",
              "Driving Licence",
              "Med. Reg.ID Card",
              "Armed Force ID Card",
            ],
            title: "Issue Date",
            icon: "fa-solid fa-calendar-days",
            value: "issue_date",
            col: 1,
          },
          {
            name: "input",
            isShow: "id_proof",
            validator: [
              "Passport",
              "Driving Licence",
              "Med. Reg.ID Card",
              "Armed Force ID Card",
            ],
            title: "Valid Till",
            icon: "fa-solid fa-calendar-days",
            value: "valid_till",
            col: 1,
          },
          {
            name: "input",
            isShow: "id_proof",
            validator: [
              "Passport",
              "Driving Licence",
              "Med. Reg.ID Card",
              "Armed Force ID Card",
            ],
            title:
              "Are you a Ex-serviceman/Commissioned Officer(including ECO,SSCO)",
            icon: "fa-solid fa-calendar-days",
            value: "valid_till",
            col: 1,
          },
          {
            name: "input",
            title: "Alternate Number",
            icon: "fa-solid fa-user",
            value: "alternate_number",
            col: 1,
          },
        ],
      },
      {
        title: "Permanent Address",
        defaultCol: 1,
        fields: [
          {
            name: "input",
            title: "Country",
            icon: "fa-solid fa-earth-europe",
            value: "permanent_address.country",
            col: 1,
          },
          {
            name: "input",
            isShow: "permanent_address.country",
            validator: ["India"],
            title: "State",
            icon: "fa-brands fa-usps",
            value: "permanent_address.state",
            col: 1,
          },
          {
            name: "input",
            isShow: "permanent_address.country",
            validator: ["India"],
            title: "City",
            icon: "fa-solid fa-city",
            value: "permanent_address.city",
            col: 1,
          },
          {
            name: "input",
            isShow: "permanent_address.country",
            validator: ["India"],
            title: "Pincode",
            icon: "fa-solid fa-code-commit",
            value: "permanent_address.pin_code",
            col: 1,
          },
          {
            name: "textarea",
            title: "Address",
            icon: "fa-regular fa-address-book",
            value: "permanent_address.address_line_1",
            col: 1,
          },
        ],
      },
      {
        title: "Postal Address",
        defaultCol: 1,
        fields: [
          {
            name: "input",
            title: "Country",
            icon: "fa-solid fa-earth-europe",
            value: "postal_address.country",
            col: 1,
          },
          {
            name: "input",
            isShow: "postal_address.country",
            validator: ["India"],
            title: "State",
            icon: "fa-brands fa-usps",
            value: "postal_address.state",
            col: 1,
          },
          {
            name: "input",
            isShow: "postal_address.country",
            validator: ["India"],
            title: "City",
            icon: "fa-solid fa-city",
            value: "postal_address.city",
            col: 1,
          },
          {
            name: "input",
            isShow: "postal_address.country",
            validator: ["India"],
            title: "Pincode",
            icon: "fa-solid fa-code-commit",
            value: "postal_address.pin_code",
            col: 1,
          },
          {
            name: "textarea",
            title: "Address",
            icon: "fa-regular fa-address-book",
            value: "postal_address.address_line_1",
            col: 1,
          },
        ],
      },
    ],
  },
  {
    step: 2,
    name: "Qualification",
    key: "Required Education Details",
    allFields: [
      {
        title: "Required Education Details",
        defaultCol: 3,
        fields: [
          {
            name: "input",
            title: "Name of the Degree",
            icon: "fa-solid fa-suitcase-medical",
            value: "essential_education_qualification.name",
            col: 1,
          },
          {
            name: "input",
            title: "Subject/Discipline/Title",
            icon: "fa-solid fa-suitcase-medical",
            value: "essential_education_qualification.discipline",
            col: 1,
          },
          {
            name: "input",
            title: "University/Institute/College Name",
            icon: "fa-solid fa-suitcase-medical",
            value: "essential_education_qualification.institute_name",
            col: 1,
          },
          {
            name: "input",
            title: "Place of University/Institute/College",
            icon: "fa-solid fa-suitcase-medical",
            value: "essential_education_qualification.place_of_institute",
            col: 1,
          },
          {
            name: "input",
            type: "date",
            title: "Date of Passing ",
            icon: "fa-solid fa-suitcase-medical",
            value: "essential_education_qualification.passingDate",
            col: 1,
          },
          {
            name: "input",
            type: "date",
            title:
              "Date of Completion of Residency Period of Passing/Qualifying Exam",
            icon: "fa-solid fa-suitcase-medical",
            value: "essential_education_qualification.residencyPassingDate",
            col: 1,
          },
          {
            name: "input",
            isShow: "essential_education_qualification.name",
            validator: ["DNB(Super-Speciality)", "DNB(Speciality)"],
            title: "Have you done DNB from Hospital with less than 500 beds?",
            icon: "fa-regular fa-hospital",
            value:
              "essential_education_qualification.beds_greater_than_500_for_DNB_degree",
            col: 1,
          },
          {
            name: "input",
            isShow: "essential_education_qualification.name",
            validator: ["DNB(Super-Speciality)", "DNB(Speciality)"],
            title: "Number of beds in Hospital",
            icon: "fa-regular fa-hospital",
            value: "essential_education_qualification.DNB_hospital_no_of_beds",
            col: 1,
          },
          {
            name: "file",
            title: "Upload Certificate",
            icon: "fa-regular fa-hospital",
            value: "essential_education_qualification.file",
            col: 3,
          },
        ],
      },
      {
        title: "Other Education Qualification Details",
        defaultCol: 1,
        fields: [
          {
            name: "table",
            title: "",
            icon: "",
            thead: [
              { title: "Examination", keyname: "name" },
              { title: "Subject", keyname: "discipline" },
              { title: "University", keyname: "institute_name" },
              { title: "Place of University", keyname: "place_of_institute" },
              { title: "Passing Date", keyname: "passingDate", type: "date" },
            ],
            value: "other_education_qualification",
            col: 1,
          },
        ],
      },
      {
        title: "Registration Details",
        defaultCol: 3,
        fields: [
          {
            name: "input",
            title: "Registration No:",
            icon: "fa-solid fa-suitcase-medical",
            value: "mci_dci_nursing_reg_no",
            col: 1,
          },
          {
            name: "input",
            title: "Registration Type",
            icon: "fa-solid fa-suitcase-medical",
            value: "mci_dci_nursing_reg_type",
            col: 1,
          },
          {
            name: "input",
            title: "Year of Registration",
            icon: "fa-solid fa-suitcase-medical",
            value: "mci_dci_nursing_reg_year",
            col: 1,
          },
          {
            name: "input",
            title: "State Registration No",
            icon: "fa-solid fa-suitcase-medical",
            value: "state_reg_no",
            col: 1,
          },
          {
            name: "input",
            title: "State Year of Registration",
            icon: "fa-solid fa-suitcase-medical",
            value: "is_state_reg",
            col: 1,
          },
          {
            name: "input",
            title: "State",
            icon: "fa-solid fa-suitcase-medical",
            value: "reg_state",
            col: 1,
          },
        ],
      },
      {
        title: "Work Experience Details",
        defaultCol: 1,
        fields: [
          {
            name: "table",
            title: "",
            icon: "",
            thead: [
              { title: "Post Name", keyname: "postName" },
              {
                title: "Date of Joining",
                keyname: "date_of_joining",
                type: "date",
              },
              {
                title: "Date of Leaving",
                keyname: "date_of_leaving",
                type: "date",
              },
              { title: "Currently Working", keyname: "currently_working" },
              {
                title: "Organization Name with Address",
                keyname: "organization_name",
              },
              { title: "Organization Type", keyname: "organization_type" },
              { title: "Nature of work", keyname: "nature_of_work" },
            ],
            value: "post_held",
            col: 1,
          },
        ],
      },
    ],
  },
  {
    step: 3,
    name: "Object Criteria for Screening",
    key: "1. ACADEMIC & PROFESSIONAL ACHIEVEMENTS",
    validator: "advertisement_noId.subFormTemplate",
    allFields: [
      {
        title: "1. ACADEMIC & PROFESSIONAL ACHIEVEMENTS",
        defaultCol: 2,
        fields: [
          {
            name: "radio",
            isShow: "essential_education_qualification.name",
            validator: [
              "DM(02 Years) or Equivalent",
              "DM(03 Years) or Equivalent",
              "DM(05 Years) or Equivalent",
              "DM(06 Years) or Equivalent",
              "DM/MCh(02 Years) or Equivalent",
              "DM/MCh(03 Years) or Equivalent",
              "DM/MCh(05 Years) or Equivalent",
              "DM/MCh(06 Years) or Equivalent",
              "DNB(Speciality) or Equivalent",
              "DNB(Super-Speciality) or Equivalent",
              "MCh(02 Years) or Equivalent",
              "MCh(03 Years) or Equivalent",
              "MCh(05 Years) or Equivalent",
              "MCh(06 Years) or Equivalent",
              "MD or Equivalent",
              "MD/MS or Equivalent",
              "MDS or Equivalent",
              "MS or Equivalent",
            ],
            title: "1.1. NTSC Scholarship Winner in School",
            value: "screenScoreDetails.instituteTypeNTSC.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "file",
            isShow: "essential_education_qualification.name",
            validator: [
              "DM(02 Years) or Equivalent",
              "DM(03 Years) or Equivalent",
              "DM(05 Years) or Equivalent",
              "DM(06 Years) or Equivalent",
              "DM/MCh(02 Years) or Equivalent",
              "DM/MCh(03 Years) or Equivalent",
              "DM/MCh(05 Years) or Equivalent",
              "DM/MCh(06 Years) or Equivalent",
              "DNB(Speciality) or Equivalent",
              "DNB(Super-Speciality) or Equivalent",
              "MCh(02 Years) or Equivalent",
              "MCh(03 Years) or Equivalent",
              "MCh(05 Years) or Equivalent",
              "MCh(06 Years) or Equivalent",
              "MD or Equivalent",
              "MD/MS or Equivalent",
              "MDS or Equivalent",
              "MS or Equivalent",
            ],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.instituteTypeNTSC.docs",
            col: 2,
          },

          {
            name: "radio",
            title: "1.2. International Fellowship from Non-LMIC Country",
            isShow: "essential_education_qualification.name",
            validator: [
              "DM(02 Years) or Equivalent",
              "DM(03 Years) or Equivalent",
              "DM(05 Years) or Equivalent",
              "DM(06 Years) or Equivalent",
              "DM/MCh(02 Years) or Equivalent",
              "DM/MCh(03 Years) or Equivalent",
              "DM/MCh(05 Years) or Equivalent",
              "DM/MCh(06 Years) or Equivalent",
              "DNB(Speciality) or Equivalent",
              "DNB(Super-Speciality) or Equivalent",
              "MCh(02 Years) or Equivalent",
              "MCh(03 Years) or Equivalent",
              "MCh(05 Years) or Equivalent",
              "MCh(06 Years) or Equivalent",
              "MD or Equivalent",
              "MD/MS or Equivalent",
              "MDS or Equivalent",
              "MS or Equivalent",
            ],
            value: "screenScoreDetails.fellowship.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.fellowship.hasDetails",
            validator: [true],
            title: "MBBS/BDS from",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.fellowship.fellowshipRange",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.fellowship.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.fellowship.docs",
            col: 2,
          },

          {
            name: "radio",
            title: "1.3. Served in Armed Forces",
            isShow: "essential_education_qualification.name",
            validator: [
              "DM(02 Years) or Equivalent",
              "DM(03 Years) or Equivalent",
              "DM(05 Years) or Equivalent",
              "DM(06 Years) or Equivalent",
              "DM/MCh(02 Years) or Equivalent",
              "DM/MCh(03 Years) or Equivalent",
              "DM/MCh(05 Years) or Equivalent",
              "DM/MCh(06 Years) or Equivalent",
              "DNB(Speciality) or Equivalent",
              "DNB(Super-Speciality) or Equivalent",
              "MCh(02 Years) or Equivalent",
              "MCh(03 Years) or Equivalent",
              "MCh(05 Years) or Equivalent",
              "MCh(06 Years) or Equivalent",
              "MD or Equivalent",
              "MD/MS or Equivalent",
              "MDS or Equivalent",
              "MS or Equivalent",
            ],
            value: "screenScoreDetails.armedForces.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.armedForces.hasDetails",
            validator: [true],
            title: "Number of years served",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.armedForces.servedArmedForcesDuration",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.armedForces.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.armedForces.docs",
            col: 2,
          },

          {
            name: "radio",
            title: "1.4. BCLS (Basic Cardiac Life Support) course.",
            isShow: "essential_education_qualification.name",
            validator: [
              "DM(02 Years) or Equivalent",
              "DM(03 Years) or Equivalent",
              "DM(05 Years) or Equivalent",
              "DM(06 Years) or Equivalent",
              "DM/MCh(02 Years) or Equivalent",
              "DM/MCh(03 Years) or Equivalent",
              "DM/MCh(05 Years) or Equivalent",
              "DM/MCh(06 Years) or Equivalent",
              "DNB(Speciality) or Equivalent",
              "DNB(Super-Speciality) or Equivalent",
              "MCh(02 Years) or Equivalent",
              "MCh(03 Years) or Equivalent",
              "MCh(05 Years) or Equivalent",
              "MCh(06 Years) or Equivalent",
              "MD or Equivalent",
              "MD/MS or Equivalent",
              "MDS or Equivalent",
              "MS or Equivalent",
            ],
            value: "screenScoreDetails.bcls.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "file",
            isShow: "screenScoreDetails.bcls.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.bcls.docs",
            col: 2,
          },

          {
            name: "radio",
            title:
              " 1.5. NELS (National Emergency Life Support) / ACLS (Advanced Cardiac Life Support) course.",
            isShow: "essential_education_qualification.name",
            validator: [
              "DM(02 Years) or Equivalent",
              "DM(03 Years) or Equivalent",
              "DM(05 Years) or Equivalent",
              "DM(06 Years) or Equivalent",
              "DM/MCh(02 Years) or Equivalent",
              "DM/MCh(03 Years) or Equivalent",
              "DM/MCh(05 Years) or Equivalent",
              "DM/MCh(06 Years) or Equivalent",
              "DNB(Speciality) or Equivalent",
              "DNB(Super-Speciality) or Equivalent",
              "MCh(02 Years) or Equivalent",
              "MCh(03 Years) or Equivalent",
              "MCh(05 Years) or Equivalent",
              "MCh(06 Years) or Equivalent",
              "MD or Equivalent",
              "MD/MS or Equivalent",
              "MDS or Equivalent",
              "MS or Equivalent",
            ],
            value: "screenScoreDetails.acls_nels.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "file",
            isShow: "screenScoreDetails.acls_nels.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.acls_nels.docs",
            col: 2,
          },

          {
            name: "radio",
            isShow: "essential_education_qualification.name",
            validator: [
              "B.Sc. Nursing or Equivalent",
              "Diploma(02 Years) or Equivalent",
              "Doctorate Degree or Equivalent",
              "M.Sc. or Equivalent",
              "Master's Degree or Equivalent",
              "Registered Nurse and Midwife with sister Tutors Diploma or Equivalent",
              "B.Sc. Nursing",
              "Ph.D",
              "Registered Nurse and Midwife, with sister Tutors Diploma",
            ],
            title: "1.1. NTSC Scholarship Winner in School",
            value: "screenScoreDetails.instituteTypeNTSC.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "file",
            isShow: "essential_education_qualification.name",
            validator: [
              "B.Sc. Nursing or Equivalent",
              "Diploma(02 Years) or Equivalent",
              "Doctorate Degree or Equivalent",
              "M.Sc. or Equivalent",
              "Master's Degree or Equivalent",
              "Registered Nurse and Midwife with sister Tutors Diploma or Equivalent",
              "B.Sc. Nursing",
              "Ph.D",
              "Registered Nurse and Midwife, with sister Tutors Diploma",
            ],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.instituteTypeNTSC.docs",
            col: 2,
          },

          {
            name: "radio",
            isShow: "essential_education_qualification.name",
            validator: [
              "B.Sc. Nursing or Equivalent",
              "Diploma(02 Years) or Equivalent",
              "Doctorate Degree or Equivalent",
              "M.Sc. or Equivalent",
              "Master's Degree or Equivalent",
              "Registered Nurse and Midwife with sister Tutors Diploma or Equivalent",
              "B.Sc. Nursing",
              "Ph.D",
              "Registered Nurse and Midwife, with sister Tutors Diploma",
            ],
            title: "1.2. Funded Fellowship",
            value: "screenScoreDetails.fellowshipFunded.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.fellowshipFunded.hasDetails",
            validator: [true],
            title: "Funded Fellowship From",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.fellowshipFunded.fellowshipFrom",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.fellowshipFunded.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.fellowshipFunded.docs",
            col: 2,
          },
          {
            name: "radio",
            isShow: "essential_education_qualification.name",
            validator: [
              "B.Sc. Nursing or Equivalent",
              "Diploma(02 Years) or Equivalent",
              "Doctorate Degree or Equivalent",
              "M.Sc. or Equivalent",
              "Master's Degree or Equivalent",
              "Registered Nurse and Midwife with sister Tutors Diploma or Equivalent",
              "B.Sc. Nursing",
              "Ph.D",
              "Registered Nurse and Midwife, with sister Tutors Diploma",
            ],
            title: "1.3. Post Doc Fellowship received",
            value: "screenScoreDetails.fellowshipReceived.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.fellowshipReceived.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.fellowshipReceived.fellowshipFrom",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.fellowshipReceived.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.fellowshipReceived.docs",
            col: 2,
          },
        ],
      },

      {
        title: " 2. RESEARCH AND PUBLICATIONS",
        defaultCol: 2,
        fields: [
          {
            name: "radio",
            title: "2.1. Pubmed Indexed Publication",
            value: "screenScoreDetails.pubmedIndexed.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "table",
            title: "",
            icon: "",
            isShow: "screenScoreDetails.pubmedIndexed.hasDetails",
            validator: [true],
            thead: [
              {
                title: "Pubmed Indexed Publication Type",
                keyname: "Indexed_type",
              },
              {
                title: "Number Of Publication",
                keyname: "numberOfPublications",
              },
              {
                title: "File",
                keyname: "docs",
                type: "file",
              },
            ],
            value:
              "screenScoreDetails.pubmedIndexed.pubmed_indexed_publication",
            col: 2,
          },

          {
            name: "radio",
            title: "2.2. Thesis Publication",
            value: "screenScoreDetails.publicationThesis.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.publicationThesis.hasDetails",
            validator: [true],
            title: "Number Of Publication",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.publicationThesis.numberOfPublications",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.publicationThesis.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.publicationThesis.docs",
            col: 2,
          },

          {
            name: "radio",
            title: "2.3. Google Scholar H-Index Number",
            value: "screenScoreDetails.googleScholar.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.googleScholar.hasDetails",
            validator: [true],
            title: "H-Index number",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.googleScholar.googleScholarH_indexnumber",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.googleScholar.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.googleScholar.docs",
            col: 2,
          },

          {
            name: "radio",
            title: "2.4. Book Chapter Published",
            value: "screenScoreDetails.publicationChapter.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.publicationChapter.hasDetails",
            validator: [true],
            title: "Number Of Publication",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.publicationChapter.numberOfPublications",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.publicationChapter.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.publicationChapter.docs",
            col: 2,
          },

          {
            name: "radio",
            title:
              "2.5. Funded project from ICMR/ DST/SERB/DBT/ CSIR/International",
            value: "screenScoreDetails.fundedProject.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "table",
            title: "",
            icon: "",
            isShow: "screenScoreDetails.fundedProject.hasDetails",
            validator: [true],
            thead: [
              {
                title: "Funded Project As",
                keyname: "fundedProjectAsPost",
              },
              {
                title: "Funded from",
                keyname: "fundedFrom",
              },
              {
                title: "File",
                keyname: "docs",
                type: "file",
              },
            ],
            value: "screenScoreDetails.fundedProject.fundedProjectDetails",
            col: 2,
          },

          {
            name: "radio",
            title: "2.6.Accepted Patent",
            value: "screenScoreDetails.acceptedPatent.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.acceptedPatent.hasDetails",
            validator: [true],
            title: "Number Of Publication",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.acceptedPatent.acceptedPatentNumber",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.acceptedPatent.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.acceptedPatent.docs",
            col: 2,
          },
        ],
      },
      {
        title: "3. TEACHING AND PRESENTATIONS",
        defaultCol: 2,
        fields: [
          {
            name: "radio",
            title:
              "3.1. Oral Presentation/Lecture in National Conference/Workshop",
            value:
              "screenScoreDetails.oralNationalConferenceWorkshop.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow:
              "screenScoreDetails.oralNationalConferenceWorkshop.hasDetails",
            validator: [true],
            title:
              "Number Of Oral Presentation / Lecture in National Conference / Workshop",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.oralNationalConferenceWorkshop.numberOfPresentationLecture",
            col: 2,
          },
          {
            name: "file",
            isShow:
              "screenScoreDetails.oralNationalConferenceWorkshop.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.oralNationalConferenceWorkshop.docs",
            col: 2,
          },

          {
            name: "radio",
            title: "3.2. Poster Presentation in National Conferences",
            value: "screenScoreDetails.posterNationalConference.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow: "screenScoreDetails.posterNationalConference.hasDetails",
            validator: [true],
            title: "Number of Poster Presentation in National Conference",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.posterNationalConference.numberOfPresentationLecture",
            col: 2,
          },
          {
            name: "file",
            isShow: "screenScoreDetails.posterNationalConference.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.posterNationalConference.docs",
            col: 2,
          },

          {
            name: "radio",
            title:
              "3.3. Oral Presentation/Lecture in International Conferences organized by Scientific Association.",
            value:
              "screenScoreDetails.oralInternationalConferenceScientific.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow:
              "screenScoreDetails.oralInternationalConferenceScientific.hasDetails",
            validator: [true],
            title:
              "Number Of Oral Presentation/lecture in International Conference organized by Scientific Association",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.oralInternationalConferenceScientific.numberOfPresentationLecture",
            col: 2,
          },
          {
            name: "file",
            isShow:
              "screenScoreDetails.oralInternationalConferenceScientific.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.oralInternationalConferenceScientific.docs",
            col: 2,
          },

          {
            name: "radio",
            title:
              " 3.4. Poster Presentation at an International Conference organized by a Scientific Association.",
            value:
              "screenScoreDetails.posterInternationalConferenceScientific.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow:
              "screenScoreDetails.posterInternationalConferenceScientific.hasDetails",
            validator: [true],
            title:
              "Number Of Oral Presentation/lecture in International Conference organized by Scientific Association",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.posterInternationalConferenceScientific.numberOfPresentationLecture",
            col: 2,
          },
          {
            name: "file",
            isShow:
              "screenScoreDetails.posterInternationalConferenceScientific.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.posterInternationalConferenceScientific.docs",
            col: 2,
          },

          {
            name: "radio",
            title:
              "3.5. Attended Basic Course Workshop in Medical Education Technologies (NMC).",
            value: "screenScoreDetails.basicMedicalEducation.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "file",
            isShow: "screenScoreDetails.basicMedicalEducation.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.basicMedicalEducation.docs",
            col: 2,
          },

          {
            name: "radio",
            title:
              "3.6. Attended Advanced Course in Medical Education (ACME) (NMC).",
            value: "screenScoreDetails.advancedMedicalEducation.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "file",
            isShow: "screenScoreDetails.advancedMedicalEducation.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.advancedMedicalEducation.docs",
            col: 2,
          },

          {
            name: "radio",
            title: "3.7. NMC course in Biomedical Research.",
            value: "screenScoreDetails.NMCCoarse.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "file",
            isShow: "screenScoreDetails.NMCCoarse.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.NMCCoarse.docs",
            col: 2,
          },

          {
            name: "radio",
            title:
              "3.8. Attended Curriculum Implementation Support Program (CISP) (NMC).",
            value: "screenScoreDetails.attended_CISP.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "file",
            isShow: "screenScoreDetails.attended_CISP.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value: "screenScoreDetails.attended_CISP.docs",
            col: 2,
          },

          {
            name: "radio",
            title:
              "  3.9. International (e.g. FAIMER) / Advanced Course in Research Methodology",
            value:
              "screenScoreDetails.courseInResearchMethodologyInternational.hasDetails",
            col: 2,
            option: [
              {
                value: true,
                icon: "fa-solid fa-check",
              },
              {
                value: false,
                icon: "fa-solid fa-xmark",
              },
            ],
          },
          {
            name: "input",
            isShow:
              "screenScoreDetails.courseInResearchMethodologyInternational.hasDetails",
            validator: [true],
            title: "Course in Research Methodology Duration",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.courseInResearchMethodologyInternational.courseInResearchMethodologyDuration",
            col: 2,
          },
          {
            name: "file",
            isShow:
              "screenScoreDetails.courseInResearchMethodologyInternational.hasDetails",
            validator: [true],
            title: "Upload Documents",
            icon: "fa-solid fa-calendar-days",
            value:
              "screenScoreDetails.courseInResearchMethodologyInternational.docs",
            col: 2,
          },
        ],
      },
    ],
  },
  // {
  //   step: 4,
  //   name: "Publication Research Work",
  //   key: "Publication and Research Work Details",
  //   allFields: [
  //     {
  //       title: "Publication and Research Work Details",
  //       defaultCol: 1,
  //       fields: [
  //         {
  //           name: "table",
  //           title: "",
  //           icon: "",
  //           thead: [
  //             { title: "Category", keyname: "category" },
  //             { title: "Published", keyname: "published" },
  //             { title: "Under Publication", keyname: "under_publication" },
  //             {
  //               title: "1st Author/Communicating Author",
  //               keyname: "communicating_author",
  //             },
  //             // {
  //             //   title: "File",
  //             //   keyname: "file",
  //             //   type: "file",
  //             // },
  //           ],
  //           value: "pubResearchWork",
  //           col: 1,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Your Best Paper",
  //       defaultCol: 1,
  //       fields: [
  //         {
  //           name: "input",
  //           title: "Title of Best Papers",
  //           icon: "fa-regular fa-hospital",
  //           value: "best_faculty_paper.title",
  //           col: 1,
  //         },
  //         {
  //           name: "file",
  //           title: "Upload Documents",
  //           icon: "fa-regular fa-hospital",
  //           value: "best_faculty_paper.file",
  //           col: 1,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Research Project as Chief Investigator or Co-Investigator",
  //       defaultCol: 1,
  //       fields: [
  //         {
  //           name: "table",
  //           title: "",
  //           icon: "",
  //           thead: [
  //             { title: "Source of Funding", keyname: "source_of_funding" },
  //             { title: "Title of Project", keyname: "project_title" },
  //             { title: "Role", keyname: "role" },
  //             { title: "Year", keyname: "year" },
  //             { title: "Total Amount", keyname: "total_amount" },
  //           ],
  //           value: "Investigator",
  //           col: 1,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    step: 5,
    name: "Awards",
    key: "Awards Details",
    allFields: [
      {
        title: "Awards Details",
        defaultCol: 1,
        fields: [
          {
            name: "table",
            title: "",
            icon: "",
            thead: [
              { title: "Title of Award", keyname: "award_title" },
              { title: "Award Category", keyname: "award_category" },
              { title: "Year", keyname: "award_year" },
              {
                title: "Description (300 Characters)",
                keyname: "award_description",
              },
            ],
            value: "awards",
            col: 1,
          },
        ],
      },
      // {
      //   title:
      //     "Membership of Editorial Boards of Indexed International Journal/Review Committees at National Bodies and Institution Details",
      //   defaultCol: 1,
      //   fields: [
      //     {
      //       name: "table",
      //       title: "",
      //       icon: "",
      //       thead: [
      //         { title: "Year", keyname: "editorial_year" },
      //         {
      //           title: "Description (300 Characters)",
      //           keyname: "editorial_description",
      //         },
      //       ],
      //       value: "membership",
      //       col: 1,
      //     },
      //   ],
      // },
      // {
      //   title:
      //     "Service Details (Contribution made towards the development of new Unit/ Speciality/ Laboratory/ Facility/ Programs/ Therapeutic or Diagnostic Procedures developed or Patents taken(enclosed evidence))",
      //   defaultCol: 1,
      //   fields: [
      //     {
      //       name: "table",
      //       title: "",
      //       icon: "",
      //       thead: [
      //         { title: "Year", keyname: "service_year" },
      //         {
      //           title: "Description (300 Characters)",
      //           keyname: "service_description",
      //         },
      //       ],
      //       value: "service",
      //       col: 1,
      //     },
      //   ],
      // },
      // {
      //   title: "Contribution Details in Community and National Programmes",
      //   defaultCol: 1,
      //   fields: [
      //     {
      //       name: "table",
      //       title: "",
      //       icon: "",
      //       thead: [
      //         { title: "Year", keyname: "contribution_year" },
      //         {
      //           title: "Description (300 Characters)",
      //           keyname: "contribution_description",
      //         },
      //       ],
      //       value: "contribution",
      //       col: 1,
      //     },
      //   ],
      // },
    ],
  },
  {
    step: 6,
    name: "Notable",
    key: "Describe your most Notable Contribution to Education, Research and Healthcare (1000 Characters)",
    allFields: [
      {
        title:
          "Describe your most Notable Contribution to Education, Research and Healthcare (1000 Characters)",
        defaultCol: 1,
        fields: [
          {
            name: "textarea",
            title: "",
            icon: "fa-solid fa-file-waveform",
            value: "notable_contribution_description",
            col: 1,
          },
        ],
      },
      {
        title:
          "In your understanding, What are the top 5 current priorities of the Institute within it's mandate? (3000 Characters)",
        defaultCol: 1,
        fields: [
          {
            name: "textarea",
            title: "",
            icon: "fa-solid fa-file-waveform",
            value: "institute_priorities",
            col: 1,
          },
        ],
      },
      {
        title:
          "What will be your medium to Long Term Research Focus and Strategy, if selected (1000 Characters)",
        defaultCol: 1,
        fields: [
          {
            name: "textarea",
            title: "",
            icon: "fa-solid fa-file-waveform",
            value: "research_focus",
            col: 1,
          },
        ],
      },
    ],
  },
  {
    step: 7,
    name: "Images",
    key: "Certificate",
    allFields: [
      {
        title: "Certificate",
        defaultCol: 1,
        fields: [
          {
            name: "file",
            title: "Certificate",
            icon: "fa-solid fa-calendar-days",
            value: "dobCertificate",
            col: 1,
          },
        ],
      },
      {
        title: "Profile Photo",
        defaultCol: 1,
        fields: [
          {
            name: "image",
            title: "Profile Photo",
            icon: "",
            value: "photo.presignedUrl",
            col: 1,
          },
        ],
      },
      {
        title: "Signature Photo",
        defaultCol: 1,
        fields: [
          {
            name: "image",
            title: "Signature Photo",
            icon: "",
            value: "signature.presignedUrl",
            col: 1,
          },
        ],
      },
      {
        title: "Thumbprint Photo",
        defaultCol: 1,
        fields: [
          {
            name: "image",
            title: "Thumbprint Photo",
            icon: "",
            value: "thumbprint.presignedUrl",
            col: 1,
          },
        ],
      },
    ],
  },
];
