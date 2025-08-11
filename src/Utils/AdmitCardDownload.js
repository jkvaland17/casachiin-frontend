import Dataservice from "@/services/requestApi";
import toast from "react-hot-toast";

export const AdmitCardDownload = async (id, type, token, setLoading, name) => {
  try {
    setLoading(true);
    const { data: printeResponse } = await Dataservice.AdmitCardDownload(
      id,
      token,
    );
    const url = window.URL.createObjectURL(new Blob([printeResponse]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    toast.success("Admit Card downloaded successfully");
    setLoading(false);
  } catch (error) {
    console.log(error);
    toast.error("download failed");
    setLoading(false);
  }
};

export const CallDownloadScoreCard = async (
  id,
  type,
  token,
  setLoading,
  name,
) => {
  try {
    setLoading(true);
    const { data: printeResponse } = await Dataservice.DownloadScoreCard(
      id,
      token,
    );
    const url = window.URL.createObjectURL(new Blob([printeResponse]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    toast.success("Admit Card downloaded successfully");
    setLoading(false);
  } catch (error) {
    console.log(error);
    toast.error("download failed");
    setLoading(false);
  }
};

export const DownloadPDF = async (
  params,
  CallAPI,
  formData,
  token,
  setLoading,
  name,
  successMessage = "",
  method = "get",
) => {
  try {
    setLoading(true);

    const { data: printeResponse } = await Dataservice.DownloadPDF(
      CallAPI,
      params,
      formData,
      token,
      method,
    );
    const url = window.URL.createObjectURL(new Blob([printeResponse]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    toast.success(
      successMessage ? successMessage : "Pdf downloaded successfully",
    );
    setLoading(false);
  } catch (error) {
    console.log(error);
    toast.error("download failed");
    setLoading(false);
  }
};
