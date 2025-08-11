import Passcode from "@/components/Passcode";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/react";
import React from "react";

type OTPVerificationModalProps = {
  isiframOpen: boolean;
  oniframOpenChange: () => void;
  committeeMembers: any[];
  otps: string[][];
  updateOtp: (index: number, newOtp: string[]) => void;
  finalSubmit: () => void;
  Loading: boolean;
  setOtps: any;
};

export default function OTPVerificationModal({
  isiframOpen,
  oniframOpenChange,
  committeeMembers,
  otps,
  updateOtp,
  finalSubmit,
  Loading,
  setOtps,
}: OTPVerificationModalProps) {
  return (
    <Modal
      size="sm"
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      isOpen={isiframOpen}
      onOpenChange={() => {
        const initialOtps = committeeMembers.map(() => new Array(4).fill(""));
        setOtps(initialOtps);
        oniframOpenChange();
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-md pb-0 mb-0">
              Please input OTP to submit screening result
            </ModalHeader>
            <ModalBody>
              {committeeMembers.map((member, index) => (
                <div key={index}>
                  <h5>{member.name}</h5>
                  <Passcode
                    otp={otps[index] || new Array(4).fill("")}
                    setotp={(newOtp: any) => updateOtp(index, newOtp)}
                  />
                </div>
              ))}
              <div className="my-4 flex justify-end items-center gap-4">
                <Button
                  color="primary"
                  size="md"
                  isLoading={Loading}
                  onPress={finalSubmit}
                >
                  Verify & Submit
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
