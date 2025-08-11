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
            title: "Department/Centre",
            icon: "fa-regular fa-hospital",
            value: "department",
            col: 1,
          },
          {
            name: "input",
            title: "Present Designation",
            icon: "fa-regular fa-hospital",
            value: "present_designation",
            col: 1,
          },
          // {
          //   name: "input",
          //   title: "Category",
          //   icon: "fa-regular fa-hospital",
          //   value: "category.value",
          //   col: 1,
          // },
          {
            name: "input",
            title: "Father's Name",
            icon: "fa-solid fa-user",
            value: "father_name",
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
          //       value: "Others",
          //       icon: "fa-solid fa-earth-americas",
          //     },
          //   ],
          // },
          {
            name: "input",
            type: "date",
            title: "Date of Birth",
            icon: "fa-solid fa-user",
            value: "date_of_birth",
            col: 1,
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
            type: "date",
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
            type: "date",
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
            title: "Were you on EOL during Assessment period?",
            icon: "fa-solid fa-calendar-days",
            value: "eol_during_assessment",
            col: 1,
          },
          {
            name: "input",
            title: "Alternate Number",
            icon: "fa-solid fa-user",
            value: "alternate_number",
            col: 1,
          },
          {
            name: "input",
            title: "APS to the Grade of",
            icon: "fa-regular fa-hospital",
            value: "aps_grade",
            col: 1,
          },
          {
            name: "input",
            type: "date",
            title: "Date of Joining/Promotion to the present post",
            icon: "fa-solid fa-user",
            value: "aps_date_of_joining",
            col: 1,
          },
          {
            name: "radio",
            title: "Were you on EOL during Assessment period?",
            value: "eol_during_assessment",
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
            isShow: "eol_during_assessment",
            validator: ["yes"],
            title: "No. of days availed EOL",
            icon: "fa-solid fa-calendar-days",
            value: "eol_days",
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
    key: "Other Education Qualification Details",
    allFields: [
      {
        title: "Education Qualification Details",
        defaultCol: 3,
        fields: [
          {
            name: "input",
            title: "Name of the Degree",
            icon: "fa-regular fa-hospital",
            value: "essential_education_qualification.name",
            col: 1,
          },
          {
            name: "input",
            title: "Subject/Discipline/Title",
            icon: "fa-regular fa-hospital",
            value: "essential_education_qualification.discipline",
            col: 1,
          },
          {
            name: "input",
            title: "University/Institute/College Name",
            icon: "fa-regular fa-hospital",
            value: "essential_education_qualification.institute_name",
            col: 1,
          },
          {
            name: "input",
            title: "Place of University/Institute/College",
            icon: "fa-regular fa-hospital",
            value: "essential_education_qualification.place_of_institute",
            col: 1,
          },
          {
            name: "input",
            title: "Date of Passing",
            icon: "fa-regular fa-hospital",
            value: "essential_education_qualification.passingDate",
            col: 1,
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
    ],
  },
  {
    step: 3,
    name: "Publication Research Work",
    key: "Publication and Research Work Details",
    allFields: [
      {
        title: "Publication and Research Work Details",
        defaultCol: 1,
        fields: [
          {
            name: "table",
            title: "",
            icon: "",
            thead: [
              { title: "Category", keyname: "category" },
              { title: "Title", keyname: "title" },
              { title: "Publication Status", keyname: "status" },
              {
                title: "1st Author/Communicating Author",
                keyname: "author_type",
              },
              {
                title: "File",
                keyname: "file",
                type: "file",
              },
            ],
            value: "pubResearchWork",
            col: 1,
          },
        ],
      },
      {
        title: "Your Best Paper",
        defaultCol: 1,
        fields: [
          {
            name: "input",
            title: "Title of Best Papers",
            icon: "fa-regular fa-hospital",
            value: "best_faculty_paper.title",
            col: 1,
          },
          {
            name: "file",
            title: "Upload Documents",
            icon: "fa-regular fa-hospital",
            value: "best_faculty_paper.file",
            col: 1,
          },
        ],
      },
      {
        title: "Research Project as Chief Investigator or Co-Investigator",
        defaultCol: 1,
        fields: [
          {
            name: "table",
            title: "",
            icon: "",
            thead: [
              { title: "Source of Funding", keyname: "source_of_funding" },
              { title: "Title of Project", keyname: "project_title" },
              { title: "Role", keyname: "role" },
              { title: "Year", keyname: "year" },
              { title: "Total Amount", keyname: "total_amount" },
            ],
            value: "Investigator",
            col: 1,
          },
        ],
      },
    ],
  },
  {
    step: 4,
    name: "Awards",
    key: "Awards, Fellowships and Membership of Professional Bodies Details",
    allFields: [
      {
        title:
          "Awards, Fellowships and Membership of Professional Bodies Details",
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
      {
        title:
          "Membership of Editorial Boards of Indexed International Journal/Review Committees at National Bodies and Institution Details",
        defaultCol: 1,
        fields: [
          {
            name: "table",
            title: "",
            icon: "",
            thead: [
              { title: "Year", keyname: "editorial_year" },
              {
                title: "Description (300 Characters)",
                keyname: "editorial_description",
              },
            ],
            value: "membership",
            col: 1,
          },
        ],
      },
      {
        title:
          "Service Details (Contribution made towards the development of new Unit/ Speciality/ Laboratory/ Facility/ Programs/ Therapeutic or Diagnostic Procedures developed or Patents taken(enclosed evidence))",
        defaultCol: 1,
        fields: [
          {
            name: "table",
            title: "",
            icon: "",
            thead: [
              { title: "Year", keyname: "service_year" },
              {
                title: "Description (300 Characters)",
                keyname: "service_description",
              },
            ],
            value: "service",
            col: 1,
          },
        ],
      },
      {
        title: "Contribution Details in Community and National Programmes",
        defaultCol: 1,
        fields: [
          {
            name: "table",
            title: "",
            icon: "",
            thead: [
              { title: "Year", keyname: "contribution_year" },
              {
                title: "Description (300 Characters)",
                keyname: "contribution_description",
              },
            ],
            value: "contribution",
            col: 1,
          },
        ],
      },
    ],
  },
  {
    step: 5,
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
    step: 6,
    name: "Images",
    key: "Profile Images",
    allFields: [
      {
        title: "Profile Images",
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
        title: "Signature Images",
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
        title: "Thumbprint Images",
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
