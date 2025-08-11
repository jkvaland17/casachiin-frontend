import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  panelData: any;
  committeeList: any;
  sessionData: any;
  setSessionData: any;
  getAllData: any;
  onOpen: any;
  onClose: any;
  handleNextStep: any;
  assignLoading: any;
};

function MapCandidatesModal({
  isOpen,
  onOpenChange,
  panelData,
  committeeList,
  sessionData,
  setSessionData,
  getAllData,
  onOpen,
  onClose,
  handleNextStep,
  assignLoading,
}: Props) {
  return (
    <div>
      <Button
        type="button"
        color="primary"
        variant="solid"
        radius="sm"
        onPress={() => {
          onOpen();
        }}
        isDisabled={panelData?.members?.length === 0}
      >
        Assign Candidates
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Map Candidate
              </ModalHeader>
              <ModalBody>
                <Select
                  items={committeeList || []}
                  selectedKeys={[sessionData?.committeeId]}
                  label="Committee"
                  labelPlacement="outside"
                  placeholder="Select committee"
                  onChange={(e) => {
                    setSessionData({
                      ...sessionData,
                      committeeId: e.target.value,
                    });
                  }}
                >
                  {(item: any) => (
                    <SelectItem key={item?.committeeId}>
                      {item?.committeeName}
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleNextStep}
                  isLoading={assignLoading}
                >
                  Map Candidate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MapCandidatesModal;
