import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";

interface CustomModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  isDismissable: boolean;
  isKeyboardDismissDisabled: boolean;
  onClose: () => void;
  action: (data: any) => void;
  title: string;
}
const CustomModal: React.FC<CustomModalProps> = ({
  children,
  isOpen,
  onClose,
  action,
  title,
  isDismissable,
  isKeyboardDismissDisabled,
}) => {
  return (
    <Modal
      backdrop="blur"
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Later
              </Button>
              <Button color="primary" onPress={action}>
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
