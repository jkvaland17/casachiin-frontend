import React from "react";
import { useForm } from "react-hook-form";

const MyUpload: React.FC<any> = ({
  preview,
  setPreview,
  handleChange,
  setValue,
  name,
  placeholder,
  title,
}) => {
  const { register } = useForm();
  return (
    <div className="mt-3">
      <label>{title} Upload</label>
      <div className="flex items-center justify-center w-full mt-3">
        <label
          htmlFor="dropzone-file-excel"
          className="flex flex-col items-center justify-center w-full min-h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-3">
            <svg
              className="w-10 h-10 mb-4 text-gray-500"
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
              <span className="font-semibold">{placeholder}</span>
            </p>
          </div>
          {preview ? (
            <div className="relative w-fit mb-3 border rounded-md">
              <div className="px-5 py-3 bg-slate-200 rounded-md">
                <i className="fa-solid fa-file-lines" /> {preview?.name}
              </div>
              <div
                onClick={() => {
                  setValue(name, null);
                  setPreview(null);
                }}
                className="cursor-pointer w-fit absolute top-0 right-0 z-50"
              >
                <i className="fa-solid fa-circle-xmark text-gray-800" />
              </div>
            </div>
          ) : (
            <input
              {...register(name)}
              id="dropzone-file-excel"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleChange}
            />
          )}
        </label>
      </div>
    </div>
  );
};

export default MyUpload;
