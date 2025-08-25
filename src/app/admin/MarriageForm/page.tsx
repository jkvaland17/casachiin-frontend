"use client";
import React from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Checkbox,
} from "@heroui/react";

export default function MarriageForm() {
  return (
    <Card className="mx-auto p-[10rem] bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-lg font-bold mb-2">નમૂનો-૧</h1>
        <p className="text-sm mb-2">(જુઓ નિયમ-૨ નો પેટા નિયમ-(૧) )</p>
        <h2 className="text-base font-semibold">
          લગન યાદી ભરીને મોકલવા માટેની અરજી
        </h2>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {/* Greeting */}
        <div className="w-[20%]">
          <p className="mb-2">પ્રતિ,</p>
          <p>લગન રજિસ્ટ્રાર શ્રી,</p>
          <Input type="text" variant={"underlined"} />
          <Input type="text" variant={"underlined"} />
        </div>

        {/* Subject */}
        <div className="text-center mb-6">
          <p className="font-semibold">વિષય :- લગન નોંધણી.</p>
        </div>

        {/* Main Content */}
        <div>
          <p className="mb-4">શ્રીમાન,</p>
          <div className="mb-4 flex">
            <Input className="w-[20%]" type="email" variant={"underlined"} />
            <span className="ml-2">ના રોજ</span>
            <Input className="w-[20%]" type="email" variant={"underlined"} />
            <span className="ml-8">
              સ્થળે અમારું વિવાહપૂર્વક લગન કરવામાં આવ્યું છે.
            </span>
          </div>
          <p className="mb-4">
            અમારા લગનની નીચેની વિગતો લગન રજિસ્ટરમાં દાખલ કરવા અને અમને લગન
            નોંધણી પ્રમાણપત્ર કાઢી આપવા
          </p>
          <p className="mb-4">અમારી વિનતી છે.</p>

          <p className="mb-4">અમે, આથી જાહેર કરીએ છીએ કે,</p>

          {/* Numbered Points */}
          <div className="space-y-3 mb-6">
            <p>
              ૧. અમારું લગન કાયદેસર વિવાહપૂર્વક કરવામાં આવ્યું હતું અને લગન
              નોંધણી અધિનિયમ,૨૦૦૬
            </p>
            <p className="ml-4">
              (સન ૨૦૦૬ ના ગુજરાતના અધિનિયમ ક્રમાંક-૧૬) ની કલમ-૧૧ હેઠળ નોંધણી થવા
              માટે સક્ષમ છે.
            </p>

            <p>
              ૨. અંગત લગન અધિનિયમમાં મુકવામાં આવેલી શરતોનું પાલન કરતામાં આવ્યું
              છે.
            </p>

            <p>
              ૩. અરજીમાં આપવામાં આવેલી વિગતો અમારી ઉત્તમ જાણ અને માન્યતા પ્રમાણે
              ખરી છે,અને
            </p>

            <p>
              ૪. આ સાથે,કરાવેલી ફી અને દસ્તાવેજો સહિત લગનની યાદી,યોગ્ય રીતે
              ભરીને (બે નકલમાં) જોડેલ છે.
            </p>
          </div>

          {/* Signature Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">સ્થળ :</p>
              <Input className="w-[60%]" type="text" variant="underlined" />
            </div>

            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">સહી :</p>
              <Input className="w-[60%]" type="text" variant="underlined" />
              <span>(પતિ)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Right Column */}
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">તારીખ :</p>
              <Input className="w-[60%]" type="text" variant="underlined" />
            </div>
            <div className="flex items-center gap-2">
              <p className="whitespace-nowrap">સહી :</p>
              <Input className="w-[60%]" type="text" variant="underlined" />
              <span>(પત્ની)</span>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <p className="font-semibold mb-3 flex items-start">
              બિડાણ :<span className="ml-2">(૧) લગન યાદી (બે નકલમાં)</span>
            </p>

            <div className="ml-16 space-y-1">
              <p>(૨) કરાવેલી ફી</p>
              <p>(૩) બીજા દસ્તાવેજો</p>

              {/* underline wali lines — (ક),(ખ),(ગ) */}
              <div className="ml-5 mt-2 space-y-3">
                {["(ક)", "(ખ)", "(ગ)"].map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="w-10 text-center whitespace-nowrap">
                      {label}
                    </span>
                    <Input
                      type="text"
                      variant="underlined"
                      className="flex-1 max-w-[420px]" /* lambi underline jaisi screenshot me */
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
