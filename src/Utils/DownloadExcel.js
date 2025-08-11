import toast from "react-hot-toast";
import DataServices from "@/services/requestApi";

export const DownloadExcel = async (
  filterData,
  selectedKeys,
  allData,
  setLoading,
  token,
  api,
  name,
  onCloseExcel,
) => {
  try {
    const rowData =
      selectedKeys === "all"
        ? allData?.map((ele) => ele._id)
        : [...selectedKeys];

    setLoading(true);
    const data = {
      ids: rowData,
      ...filterData,
    };

    const { data: printeResponse } = await DataServices.GetDownloadExcel(
      token,
      data,
      api,
    );

    const blob = new Blob([printeResponse], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setLoading(false);
    if (onCloseExcel) {
      onCloseExcel();
    }
    toast.success("Excel downloaded successfully");
  } catch (error) {
    console.log("error::: ", error);
    toast.error("Download failed");
    setLoading(false);
  }
};

export const DownloadExcelScreening = async (
  data,
  setLoading,
  token,
  api,
  name,
) => {
  try {
    setLoading(true);

    const { data: printeResponse } =
      await DataServices.GetDownloadExcelScreening(token, data, api);

    const blob = new Blob([printeResponse], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setLoading(false);

    toast.success("Excel downloaded successfully");
  } catch (error) {
    console.log("error::: ", error);
    toast.error("download failed");
    setLoading(false);
  }
};

export const DownloadPdfFolder = async (data, setLoading, token, api, name) => {
  try {
    setLoading(true);

    // Call API to get the ZIP file
    const { data: zipResponse } = await DataServices.GetDownloadExcelScreening(
      token,
      data,
      api,
    );

    // Create a Blob from the ZIP file data
    const blob = new Blob([zipResponse], { type: "application/zip" });

    // Generate a download URL
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    // Set the filename for the ZIP file
    link.href = url;
    link.setAttribute("download", `${name}.zip`);

    // Append link to the DOM and trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setLoading(false);

    toast.success("Folder downloaded successfully");
  } catch (error) {
    console.log("Error while downloading folder: ", error);
    toast.error("Download failed");
    setLoading(false);
  }
};

export const DownloadExcelUsingPostMethod = async (
  postData,
  setLoading,
  token,
  api,
  name,
) => {
  try {
    setLoading(true);
    const formData = {
      ...postData,
    };

    const { data: printeResponse } = await DataServices.GetDownloadExcel(
      token,
      formData,
      api,
    );

    const blob = new Blob([printeResponse], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setLoading(false);

    toast.success("Excel downloaded successfully");
  } catch (error) {
    console.log("error::: ", error);
    toast.error("download failed");
    setLoading(false);
  }
};

export const DownloadExcelCode = async (setLoading, token, id) => {
  try {
    setLoading(true);
    const { data: printeResponse } =
      await DataServices.ExcelDownloadForStatuscode(token, id);
    const blob = new Blob([printeResponse], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Status Code");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setLoading(false);
    toast.success("Excel downloaded successfully");
  } catch (error) {
    console.log("error::: ", error);
    toast.error("Download failed");
    setLoading(false);
  }
};

export const DownloadExcelTadiPaar = async (setLoading, token, id) => {
  try {
    setLoading(true);
    const { data: printeResponse } =
      await DataServices.ExcelDownloadForStatuscode(token, id);
    const blob = new Blob([printeResponse], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "TadiPaar");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setLoading(false);
    toast.success("Excel downloaded successfully");
  } catch (error) {
    console.log("error::: ", error);
    toast.error("Download failed");
    setLoading(false);
  }
};

export const excelDownload = async (file, setLoading) => {
  setLoading((prev) => ({ ...prev, downloadBtn: true }));
  const link = document.createElement("a");
  link.href = file;
  link.setAttribute("download", "file");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setLoading((prev) => ({ ...prev, downloadBtn: false }));
};
