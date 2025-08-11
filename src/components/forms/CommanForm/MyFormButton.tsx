import React from "react";
import { Button } from "@heroui/react";

interface FormMethods {
  setValue: (name: string, value: any) => void;
  watch: (name: string) => any;
  setError: (name: string, error: { type: string; message: string }) => void;
}

interface MyFormButtonProps {
  apiVar: string;
  formMethods: FormMethods;
  type: string;
  newObj: Record<string, any>;
  getValue: string;
  DegreeType: string;
  validate: boolean;
}

const MyFormButton: React.FC<MyFormButtonProps> = () => {
  // const param = useParams() as any;
  const universalLoader = false;
  // const [universalLoader, setUniversalLoader] = useState<boolean>(false);
  // const [applicationId, setApplicationId] = useState<string | undefined>();
  // const { data: session } = useSession() as any;
  const btnError = {};

  // useEffect(() => {
  //   if (type === "edit") {
  //     setApplicationId(param?.id);
  //   } else {
  //     setApplicationId(session?.user?.applicationId);
  //   }
  // }, []);

  const handleUpload = async () => {
    // Your handleUpload function implementation here...
  };

  // const [oldData, setOldData] = useState<string>("");
  // const comment = {};
  // const [comment, setComment] = useState<Record<string, any>>({});
  // const [isModel, setIsModel] = useState<boolean>(false);

  // const showModal = (data: Record<string, any>) => {
  //   setIsModel(true);
  //   setComment(data);
  // };

  return (
    <>
      <div className="btn_Container d-flex justify-content-end mt-3 gap-3">
        <Button
          radius="sm"
          size="sm"
          isDisabled
          variant="bordered"
          disabled={false}
          // variant={
          //   btnError && btnError !== undefined
          //     ? "outline-danger"
          //     : "outline-primary"
          // }
          onClick={!universalLoader ? handleUpload : undefined}
        >
          {btnError && btnError !== undefined && (
            <div className="notification_bell"></div>
          )}
          {universalLoader ? "Loading…" : <>Evaluate Score</>}
        </Button>
      </div>
    </>
  );
};

export default MyFormButton;
