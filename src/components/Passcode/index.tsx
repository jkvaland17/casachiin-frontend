"use client";
import React, { KeyboardEvent, useRef } from "react";
import { Input } from "@heroui/react";

function Passcode({ otp, setotp }: any) {
  const inputref = useRef<any>([]);

  const changeHandler = (cValue: string, cIndex: number) => {
    if (isNaN(Number(cValue))) {
      return;
    }

    setotp([
      ...otp.map((oValue: any, oIndex: any) =>
        cIndex === oIndex ? cValue : oValue,
      ),
    ]);

    if (cIndex < otp.length - 1 && cValue) {
      inputref.current[cIndex + 1]?.focus();
    }
  };

  const backSpaceHandler = (e: KeyboardEvent, cIndex: number) => {
    if (e.key === "Backspace" && otp[cIndex] === "") {
      if (cIndex > 0) {
        inputref.current[cIndex - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col space-y-12">
      <div className=" flex items-center gap-5">
        {otp.map((item: any, index: any) => (
          <div
            className="h-14 w-14 border-2 border-[#e4e4e7] rounded-xl"
            key={index}
          >
            <Input
              ref={(el: any) => {
                inputref.current[index] = el;
              }}
              radius="sm"
              className="h-full w-full"
              classNames={{
                inputWrapper: "h-full w-full",
                input: "text-3xl text-center",
              }}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e: any) => changeHandler(e.target.value, index)}
              onKeyDown={(e: any) => backSpaceHandler(e, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Passcode;
