import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import FaceDetection from "./FaceDetection";
interface CameraModalProps {
  isOpen: boolean;
  loader: boolean;
  newEnroll: boolean;
  title: string;
  onOpenChange: () => void;
  setLoader: (isOpen: boolean) => void;
  action: (data: any) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onOpenChange,
  action,
  title,
  newEnroll,
  loader,
  setLoader,
}) => {
  const HandleCapturePhoto = (file: string) => {
    setLoader(true);
    action(file);
  };
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      size="full"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody className="flex justify-center items-center">
              <FaceDetection
                action={HandleCapturePhoto}
                newEnroll={newEnroll}
                loader={loader}
                modalToggle={onOpenChange}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CameraModal;
