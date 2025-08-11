"use client";

import React, { useState } from "react";
import DynamicTable from "../DynamicTable";
import * as XLSX from "xlsx";
import { Progress } from "@heroui/react";

interface ReadUploadExcelProps {
  label: string;
  setFile: (file: File | null) => void;
}

const ReadUploadExcel: React.FC<ReadUploadExcelProps> = ({
  label,
  setFile,
}) => {
  const [excelPreview, setExcelPreview] = useState<any>(null);
  const [excelData, setExcelData] = useState([]);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const handleExcelChange = async (e: any) => {
    if (e.target.files.length > 0) {
      setLoadingExcel(true);
      const file = e.target.files[0];
      setExcelPreview(file);
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(sheet) as any;

          setExcelData(sheetData);
        } catch (error) {
          console.error("Error processing file: ", error);
        } finally {
          setLoadingExcel(false);
        }
      };

      reader.onerror = (error) => {
        console.error("File reading error: ", error);
        setLoadingExcel(false);
      };

      reader.readAsArrayBuffer(file);
    } else {
      setExcelPreview(null);
      setFile(null);
      setExcelData([]);
    }
  };

  return (
    <>
      <label>{label}</label>
      <div className="col-span-2 flex items-center justify-center">
        {excelPreview ? (
          <div className="w-full flex flex-col justify-center items-center">
            <div>
              <div className="relative w-fit">
                <div className="bg-slate-100 rounded-md mt-4 flex flex-col items-center justify-center p-4">
                  <i className="fa-solid fa-file-invoice text-4xl"></i>
                  <p>{excelPreview.name}</p>
                </div>
                <div
                  onClick={() => {
                    setExcelPreview(null);
                    setFile(null);
                    setExcelData([]);
                  }}
                  className="cursor-pointer w-fit absolute top-1 right-1"
                >
                  <i className="fa-solid fa-circle-xmark text-gray-800" />
                </div>
              </div>
            </div>
            {loadingExcel && (
              <Progress
                isIndeterminate
                label="Uploading..."
                className="max-w-md mt-2"
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full mt-3">
            <label
              htmlFor="dropzone-file-excel"
              className="flex flex-col items-center justify-center w-full h-52 border-4 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80px"
                  height="80px"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M736.68 435.86a173.773 173.773 0 0 1 172.042 172.038c0.578 44.907-18.093 87.822-48.461 119.698-32.761 34.387-76.991 51.744-123.581 52.343-68.202 0.876-68.284 106.718 0 105.841 152.654-1.964 275.918-125.229 277.883-277.883 1.964-152.664-128.188-275.956-277.883-277.879-68.284-0.878-68.202 104.965 0 105.842zM285.262 779.307A173.773 173.773 0 0 1 113.22 607.266c-0.577-44.909 18.09-87.823 48.461-119.705 32.759-34.386 76.988-51.737 123.58-52.337 68.2-0.877 68.284-106.721 0-105.842C132.605 331.344 9.341 454.607 7.379 607.266 5.417 759.929 135.565 883.225 285.262 885.148c68.284 0.876 68.2-104.965 0-105.841z"
                      fill="#8a8a8a"
                    />

                    <path
                      d="M339.68 384.204a173.762 173.762 0 0 1 172.037-172.038c44.908-0.577 87.822 18.092 119.698 48.462 34.388 32.759 51.743 76.985 52.343 123.576 0.877 68.199 106.72 68.284 105.843 0-1.964-152.653-125.231-275.917-277.884-277.879-152.664-1.962-275.954 128.182-277.878 277.879-0.88 68.284 104.964 68.199 105.841 0z"
                      fill="#8a8a8a"
                    />

                    <path
                      d="M545.039 473.078c16.542 16.542 16.542 43.356 0 59.896l-122.89 122.895c-16.542 16.538-43.357 16.538-59.896 0-16.542-16.546-16.542-43.362 0-59.899l122.892-122.892c16.537-16.542 43.355-16.542 59.894 0z"
                      fill="##000000"
                    />

                    <path
                      d="M485.17 473.078c16.537-16.539 43.354-16.539 59.892 0l122.896 122.896c16.538 16.533 16.538 43.354 0 59.896-16.541 16.538-43.361 16.538-59.898 0L485.17 532.979c-16.547-16.543-16.547-43.359 0-59.901z"
                      fill="##000000"
                    />

                    <path
                      d="M514.045 634.097c23.972 0 43.402 19.433 43.402 43.399v178.086c0 23.968-19.432 43.398-43.402 43.398-23.964 0-43.396-19.432-43.396-43.398V677.496c0.001-23.968 19.433-43.399 43.396-43.399z"
                      fill="#000000"
                    />
                  </g>
                </svg>
                <p className="mb-2 text-xl text-gray-600">
                  Drop a file or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  File with up to 10,000 rows works best
                </p>
              </div>
              <input
                onChange={handleExcelChange}
                id="dropzone-file-excel"
                type="file"
                className="hidden"
                accept=".xlsx, .xls, .csv"
              />
            </label>
          </div>
        )}
      </div>
      <div className="my-3">
        {excelData?.length > 0 && <DynamicTable data={excelData} />}
      </div>
    </>
  );
};

export default ReadUploadExcel;
