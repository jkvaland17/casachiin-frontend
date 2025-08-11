import { Button } from "@heroui/react";
import React from "react";

const MyEditButton = ({ no, setIsEdit }) => {
  return (
    <div className="btn_Container d-flex justify-content-end gap-3 cursor-pointer rounded-circle">
      <Button
        disabled
        onClick={() => setIsEdit(no)}
        className="rounded-circle p-0"
        variant="outline-secondary"
        style={{ height: "40px", width: "40px" }}
      >
        <span className="material-symbols-outlined mt-1">edit</span>
      </Button>
    </div>
  );
};

export default MyEditButton;
