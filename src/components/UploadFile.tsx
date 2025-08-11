import ExcelIcon from "@/assets/img/svg/Excel";
import React from "react";

const UploadFile: React.FC<any> = ({
  preview,
  setPreview,
  setData,
  handleLogoChange,
}) => {
  return (
    <>
      <div className="col-span-3">
        <label>Upload Excel file</label>
        {preview ? (
          <div className="flex items-center justify-center">
            <div className="relative w-fit">
              <div className="p-3 bg-slate-100 rounded-md mt-4 flex flex-col items-center justify-center">
                <ExcelIcon />
                <p> {preview.name}</p>
              </div>
              <div
                onClick={() => {
                  setPreview(null);
                  setData([]);
                }}
                className="cursor-pointer w-fit absolute top-1 right-0"
              >
                <i className="fa-solid fa-circle-xmark text-gray-800" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full mt-3">
            <label
              htmlFor="dropzone-file-excel"
              className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-blue-200/35"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop excel
                </p>
                <p className="text-xs text-gray-500">XLSX, XLS, CSV</p>
              </div>
              <input
                id="dropzone-file-excel"
                type="file"
                className="hidden"
                accept=".xlsx, .xls, .csv"
                onChange={handleLogoChange}
              />
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFile;
