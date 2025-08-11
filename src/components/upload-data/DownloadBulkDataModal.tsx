import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import React, { useState } from "react";
import PreviousProcess from "./PreviousProcess";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  functionProp: () => void;
  Loading: boolean;
  downloadBtnText: string;
  entity?: string;
  id: string;
};

function DownloadBulkDataModal({
  isOpen,
  onOpenChange,
  functionProp,
  Loading,
  entity = "",
  downloadBtnText,
  id,
}: Props) {
  const router = useRouter();
  const [loader, setLoader] = useState<any>({
    routing: false,
  });
  const routeHandler = async (route: string) => {
    setLoader((prev: any) => ({
      ...prev,
      routing: true,
    }));
    router.push(route);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      size="3xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Previous Processes
            </ModalHeader>
            <ModalBody>
              <PreviousProcess entity={entity} instituteID={id} />
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={loader.routing}
                onPress={() => {
                  routeHandler(`/admin/data-center/${entity}/${id}`);
                }}
              >
                View All Download Processes
              </Button>
              <Button
                isLoading={Loading}
                color="primary"
                onPress={() => {
                  functionProp();
                }}
              >
                {downloadBtnText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default DownloadBulkDataModal;
