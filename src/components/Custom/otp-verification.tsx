"use client";
import React, { useRef, useState } from "react";
import { Button, Input, Link } from "@heroui/react";

function OtpVerification() {
  const [otp, Setotp] = useState(new Array(6).fill(""));
  const inputref = useRef<any>([]);

  const changeHandler = (cValue: string, cIndex: number) => {
    if (isNaN(Number(cValue))) {
      return;
    }
    Setotp([
      ...otp.map((oValue, oIndex) => (cIndex === oIndex ? cValue : oValue)),
    ]);

    if (cIndex < otp.length - 1 && cValue) {
      inputref.current[cIndex + 1]?.focus();
    }
  };

  const backSpaceHandler = (e: React.KeyboardEvent, cIndex: number) => {
    if (e.key === "Backspace" && otp[cIndex] === "") {
      if (cIndex > 0) {
        inputref.current[cIndex - 1]?.focus();
      }
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Entered OTP is ${otp.join("")}`);
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden ">
      <div className="relative mx-auto w-fit pb-9 pt-10 ">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-12 ">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="text-3xl font-semibold">
              <p>OTP Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your mobile 7711*****04</p>
            </div>
          </div>

          <div>
            <form action="" method="post" onSubmit={submitHandler}>
              <div className="flex flex-col space-y-12">
                <div className="mx-auto flex w-full max-w-2xl flex-row items-center justify-between gap-2">
                  {otp.map((item, index) => (
                    <div className="h-14 min-w-14" key={index}>
                      <Input
                        ref={(el) => {
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
                        onChange={(e) => changeHandler(e.target.value, index)}
                        onKeyDown={(e) => backSpaceHandler(e, index)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex items-center justify-center">
                    <Button
                      type="submit"
                      color="primary"
                      className="w-full py-6"
                      variant="shadow"
                    >
                      Verify Account
                    </Button>
                  </div>

                  <div className="flex flex-row items-center justify-center space-x-1 text-center text-sm font-medium text-gray-500">
                    <p>Didn&apos;t receive code?</p>{" "}
                    <Link size="sm" className="cursor-pointer font-semibold">
                      Resend
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
