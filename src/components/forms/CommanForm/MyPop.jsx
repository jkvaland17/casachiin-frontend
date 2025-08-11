import React from "react";

const MyPop = ({ children, handleSubmit, handleCancel, discription }) => {
  return (
    <div>
      <div
        disabled
        onCancel={() => {
          handleCancel();
        }}
        onConfirm={() => {
          handleSubmit();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MyPop;
