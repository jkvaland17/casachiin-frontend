import { CallUpdateCounsellingStatus } from "@/_ServerActions";
import { handleCommonErrors } from "@/Utils/HandleError";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Alert, Button, Chip } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: any;
  statusColorMap: any;
  getCounsellingStats: any;
};

function ChoiceModification({
  isOpen,
  onOpenChange,
  item,
  statusColorMap,
  getCounsellingStats,
}: Props) {
  const [loading, setLoading] = useState(false);
  const handleChoiceDecider = async () => {
    setLoading(true);
    try {
      const counsellingData = {
        counsellingApplicationId: item?._id,
        status: item?.status === "lockChoice" ? "changeChoice" : "lockChoice",
      };
      const { data, error } = (await CallUpdateCounsellingStatus(
        counsellingData,
      )) as any;

      console.log("counselling Status", data, error);
      if (data?.status === "success") {
        toast.success(data?.message);
        getCounsellingStats();
        onOpenChange(false);
      }

      if (error) {
        handleCommonErrors(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} radius="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Candidates Choice
            </ModalHeader>
            <ModalBody>
              <Input
                value={item?.candidateName}
                labelPlacement="outside"
                label="Candidate Name"
                radius="md"
              />
              <div className="flex gap-2 items-center my-2">
                <p className="text-sm font-medium text-gray-700 ">
                  Current Status
                </p>
                <Chip
                  size="sm"
                  className="text-bold text-sm capitalize"
                  color={statusColorMap[item?.status]}
                  variant="flat"
                >
                  {item?.status}
                </Chip>
              </div>
              <Alert variant="faded" color="warning" className="text-sm">
                You are about to{" "}
                {item?.status === "lockChoice" ? "Re-Open" : "lock"} the choice
                for this candidate.
                {item?.status === "lockChoice"
                  ? " This will allow the candidate to modify their selections."
                  : " This will prevent the candidate from making further changes."}
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="warning"
                isLoading={loading}
                onPress={() => {
                  handleChoiceDecider();
                }}
                className="text-white"
              >
                {item?.status === "lockChoice"
                  ? "Re-open Choice"
                  : "Lock Choice"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ChoiceModification;
