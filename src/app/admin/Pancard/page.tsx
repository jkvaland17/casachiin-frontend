"use client"
import FlatCard from "@/components/FlatCard";
import { Button, Checkbox, Input, Textarea } from "@heroui/react";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const Pancard = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ content: () => contentRef.current });
  return (
    <FlatCard>
      <div className="max-w-4xl mx-auto p-6 bg-white" ref={contentRef}>
        <div className="text-center p-4 mb-4">
          <h1 className="text-xl font-bold mb-2">Form No. 49A</h1>
          <h2 className="text-lg font-semibold mb-3">
            Application for Allotment of Permanent Account Number
          </h2>
          <div className="text-sm mb-2">
            <span className="font-medium">
              [In the case of Indian Citizens/Indian Companies/Entities
              incorporated in India/
            </span>
          </div>
          <div className="text-sm mb-3">
            <span className="font-medium">
              Unincorporated entities formed in India]
            </span>
          </div>
          <div className="text-sm font-medium mb-2">See Rule 114</div>
          <div className="text-sm italic">
            To avoid mistake(s), please follow the accompanying instructions and
            examples before filling up the form
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold mb-4">
          1. Full Name (Full expanded name to be mentioned as appearing in proof
          of identity/date of birth/address documents: initials are not
          permitted)
        </h1>
        <div>
          Please select title, <Checkbox defaultSelected /> as applicable
          <div className="flex gap-4 mt-2">
            <Checkbox /> Shri
            <Checkbox /> Smt
            <Checkbox /> Kumari
            <Checkbox /> M/s
          </div>
          <div className="mt-4 gap-5 flex">
            <Input
              className="mt-2"
              placeholder="Last Name / Surname"
              label="Last Name / Surname"
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="First Name"
              label="First Name"
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="Middle Name"
              label="Middle Name"
              labelPlacement="outside"
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold mb-4">
          2. Abbreviations of the above name, as you would like it, to be
          printed on the PAN card
        </h1>
        <div>
          <div className="flex gap-4 mt-2">
            <Textarea
              placeholder="Abbreviated Name"
              className="w-full"
              rows={3}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          3. Have you ever been known by any other name? <Checkbox /> Yes{" "}
          <Checkbox /> No (please tick as applicable)
        </h1>
        <div>
          <span className="text-xs">If yes, please give that other name</span>
          <div>
            Please select title, <Checkbox defaultSelected /> as applicable
            <div className="flex gap-4 mt-2">
              <Checkbox /> Shri
              <Checkbox /> Smt
              <Checkbox /> Kumari
              <Checkbox /> M/s
            </div>
            <div className="mt-4 gap-5 flex">
              <Input
                className="mt-2"
                placeholder="Last Name / Surname"
                label="Last Name / Surname"
                labelPlacement="outside"
              />
              <Input
                className="mt-2"
                placeholder="First Name"
                label="First Name"
                labelPlacement="outside"
              />
              <Input
                className="mt-2"
                placeholder="Middle Name"
                label="Middle Name"
                labelPlacement="outside"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          4. Gender (for Individual applicants only) <Checkbox /> Male{" "}
          <Checkbox /> Female <Checkbox /> Transgender (please tick as
          applicable)
        </h1>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          5. Date of Birth/Incorporation/Agreement/Partnership or Trust Deed/
          Formation of Body of individuals or Association of Persons
        </h1>
        <div className="mt-5">
          <Input
            type="date"
            placeholder="Date of Birth"
            label="Date of Birth"
            labelPlacement="outside"
          />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          6. Details of Parents (applicable only for individual applicants)
        </h1>
        <div className="mt-5">
          <span>
            Whether mother is a single parent and you wish to apply for PAN by
            furnishing the name of your mother only? <Checkbox /> Yes{" "}
            <Checkbox /> No (please tick as applicable) If yes, please fill in
            mother’s name in the appropriate space provide below.
          </span>
          <div className="mt-4">
            <span className="font-semibold">
              Father’s Name (Mandatory except where mother is a single parent
              and PAN is applied by furnishing the name of mother only)
            </span>
            <div className="mt-4 gap-5 flex">
              <Input
                className="mt-2"
                placeholder="Last Name / Surname"
                label="Last Name / Surname"
                labelPlacement="outside"
              />
              <Input
                className="mt-2"
                placeholder="First Name"
                label="First Name"
                labelPlacement="outside"
              />
              <Input
                className="mt-2"
                placeholder="Middle Name"
                label="Middle Name"
                labelPlacement="outside"
              />
            </div>
          </div>
          <div className="mt-4">
            <span className="font-semibold">
              Mother’s Name (optional except where mother is a single parent and
              PAN is applied by furnishing the name of mother only)
            </span>
            <div className="mt-4 gap-5 flex">
              <Input
                className="mt-2"
                placeholder="Last Name / Surname"
                label="Last Name / Surname"
                labelPlacement="outside"
              />
              <Input
                className="mt-2"
                placeholder="First Name"
                label="First Name"
                labelPlacement="outside"
              />
              <Input
                className="mt-2"
                placeholder="Middle Name"
                label="Middle Name"
                labelPlacement="outside"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">7. Address</h1>
        <span className="font-semibold">Residence Address</span>
        <div className="mt-4 gap-5 flex">
          <Input
            className="mt-2"
            placeholder="Flat / Room / Door / Block No."
            label="Flat / Room / Door / Block No."
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Name of Premises / Building / Village"
            label="Name of Premises / Building / Village"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Road / Street / Lane/Post Office"
            label="Road / Street / Lane/Post Office"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Area / Locality / Taluka/ Sub- Division"
            label="Area / Locality / Taluka/ Sub- Division"
            labelPlacement="outside"
          />
        </div>
        <div className="mt-4 gap-5 flex">
          <Input
            className="mt-2"
            placeholder="Town / City / District"
            label="Town / City / District"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="State / Union Territory"
            label="State / Union Territory"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Pincode / Zip code"
            label="Pincode / Zip code"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Country Name"
            label="Country Name"
            labelPlacement="outside"
          />
        </div>
        <span className="font-semibold">Office Address</span>
        <div className="mt-4 gap-5 flex">
          <Input
            className="mt-2"
            placeholder="Name of office"
            label="Name of office"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Flat / Room / Door / Block No."
            label="Flat / Room / Door / Block No."
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Name of Premises / Building / Village"
            label="Name of Premises / Building / Village"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Road / Street / Lane/Post Office"
            label="Road / Street / Lane/Post Office"
            labelPlacement="outside"
          />
        </div>
        <div className="mt-4 gap-5 flex">
          <Input
            className="mt-2"
            placeholder="Area / Locality / Taluka/ Sub- Division"
            label="Area / Locality / Taluka/ Sub- Division"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Town / City / District"
            label="Town / City / District"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="State / Union Territory"
            label="State / Union Territory"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Pincode / Zip code"
            label="Pincode / Zip code"
            labelPlacement="outside"
          />
        </div>
        <div className="mt-4 gap-5 grid grid-cols-4">
          <Input
            className="mt-2"
            placeholder="Country Name"
            label="Country Name"
            labelPlacement="outside"
          />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          8. Address for Communication <Checkbox /> Residence <Checkbox />{" "}
          Office (Please tick as applicable)
        </h1>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          9. Telephone Number & Email ID details
        </h1>
        <div className="mt-4 gap-5 flex">
          <Input
            className="mt-2"
            placeholder="Telephone / Mobile number"
            label="Telephone / Mobile number"
            labelPlacement="outside"
            startContent={<span>+91</span>}
          />
          <Input
            label="Email"
            labelPlacement="outside"
            placeholder="Email"
            type="email"
          />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">10. Status of applicant</h1>
        Please select status, <Checkbox defaultSelected /> as applicable
        <div className="mt-4 gap-5 flex">
          <Checkbox /> Government
          <Checkbox /> Individual
          <Checkbox /> Hindu undivided family
          <Checkbox /> Company
          <Checkbox /> Partnership Firm
          <Checkbox /> Association of Persons
        </div>
        <div className="mt-4 gap-5 flex">
          <Checkbox /> Trusts
          <Checkbox /> Body of Individuals
          <Checkbox /> Local Authority
          <Checkbox /> Artificial Juridical Persons
          <Checkbox /> Limited Liability Partnership
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          11. Registration Number (for company, firms, LLPs etc.)
        </h1>
        <div className="mt-4 gap-5 grid grid-cols-2">
          <Input
            className="mt-2"
            placeholder="Registration Number"
            label="Registration Number"
            labelPlacement="outside"
            startContent={<span>+91</span>}
          />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          12. In case of a person, who is required to quote Aadhaar number or
          the Enrolment ID of Aadhaar application form as per section 139 AA
        </h1>
        <div className="mt-4">
          <Input
            className="mt-2"
            placeholder="AADHAAR Number"
            label="Please mention your AADHAAR number (if allotted)"
            labelPlacement="outside"
          />
        </div>
        <div className="mt-4">
          <Input
            className="mt-2"
            placeholder="Enrolment ID of Aadhaar application form"
            label="If AADHAAR number is not allotted, please mention the enrolment ID of Aadhaar application form"
            labelPlacement="outside"
          />
        </div>
        <div className="mt-4">
          <Input
            className="mt-2"
            placeholder="Name as per AADHAAR"
            label="Name as per AADHAAR letter or card or as per the Enrolment ID of Aadhaar application form"
            labelPlacement="outside"
          />
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">13. Source of Income</h1>
        Please select, <Checkbox defaultSelected /> as applicable
        <div className="mt-4 gap-5 flex">
          <Checkbox /> Salary
          <Checkbox /> Capital Gains
          <Checkbox /> Income from Business / Profession
          <Checkbox /> Business/Profession code
        </div>
        <div className="mt-4 gap-5 flex">
          <Checkbox /> [For Code: Refer instructions]
          <Checkbox /> Income from Other sources
          <Checkbox /> Income from House property
          <Checkbox /> No income
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          14. Representative Assessee (RA)
        </h1>
        <span>
          Full name, address of the Representative Assessee, who is assessible
          under the Income Tax Act in respect of the person, whose particulars
          have been given in the column 1-13.
        </span>
        <br />
        <span className="font-semibold">
          Full Name (Full expanded name : initials are not permitted)
        </span>
        <div>
          Please select title, <Checkbox defaultSelected /> as applicable
          <div className="flex gap-4 mt-2">
            <Checkbox /> Shri
            <Checkbox /> Smt
            <Checkbox /> Kumari
            <Checkbox /> M/s
          </div>
          <div className="mt-4 gap-5 flex">
            <Input
              className="mt-2"
              placeholder="Last Name / Surname"
              label="Last Name / Surname"
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="First Name"
              label="First Name"
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="Middle Name"
              label="Middle Name"
              labelPlacement="outside"
            />
          </div>
          <span className="font-semibold"> Address</span>
          <div className="mt-4 gap-5 flex">
            <Input
              className="mt-2"
              placeholder="Flat / Room / Door / Block No."
              label="Flat / Room / Door / Block No."
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="Name of Premises / Building / Village"
              label="Name of Premises / Building / Village"
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="Road / Street / Lane/Post Office"
              label="Road / Street / Lane/Post Office"
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="Area / Locality / Taluka/ Sub- Division"
              label="Area / Locality / Taluka/ Sub- Division"
              labelPlacement="outside"
            />
          </div>
          <div className="mt-4 gap-5 flex">
            <Input
              className="mt-2"
              placeholder="Town / City / District"
              label="Town / City / District"
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="State / Union Territory"
              label="State / Union Territory"
              labelPlacement="outside"
            />
            <Input
              className="mt-2"
              placeholder="Pincode"
              label="Pincode"
              labelPlacement="outside"
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">
          15. Documents submitted as Proof of Identity (POI), Proof of Address
          (POA) and Proof of Date of Birth (POB)
        </h1>
        <div>
          <span>
            I/We have enclosed <Input className="mt-2" /> as proof of identity,{" "}
            <Input className="mt-2" /> as proof of address and{" "}
            <Input className="mt-2" /> as proof of date of birth. [Please refer
            to the instructions (as specified in Rule 114 of I.T. Rules, 1962)
            for list of mandatory certified documents to be submitted as
            applicable] [Annexure A, Annexure B & Annexure C are to be used
            wherever applicable]
          </span>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold">16.</h1>
        <div>
          <span>
            I/We <Input className="mt-2" /> , the applicant, in the capacity of
            <Input className="mt-2" /> do hereby declare that what is stated
            above is true to the best of my/our information and belief.
          </span>
        </div>
        <div className="flex gap-5 mt-5">
          <Input
            className="mt-2"
            placeholder="Place"
            label="Place"
            labelPlacement="outside"
          />
          <Input
            className="mt-2"
            placeholder="Date"
            label="Date"
            labelPlacement="outside"
            type="date"
          />
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <Button color="primary" onPress={reactToPrintFn}>
          Print
        </Button>
      </div>
    </FlatCard>
  );
};

export default Pancard;
