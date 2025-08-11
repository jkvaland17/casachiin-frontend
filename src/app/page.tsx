"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  CallPlatformToken,
  CallSendOtp,
  CallVerifyOtp,
  CallCheckTwoFactorStatus,
  CallVerifyTwoFactorStatus,
  CallEnrollFace,
  CallFaceAuthenticate,
} from "@/_ServerActions";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import EmailIcon from "@/assets/img/svg/Email";
import PasswordIcon from "@/assets/img/svg/Password";
import { EyeSlashFilledIcon } from "@/assets/img/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/img/svg/EyeFilledIcon";
import LOGO from "../assets/img/brand/logo.png";
// import Lottie from "lottie-react";
// import BLOCKCHAIN from "../assets/img/lottie/lottie.json";
import Link from "next/link";
import PhoneIcon from "@/assets/img/svg/Phone";
import OtpIcon from "@/assets/img/svg/Otp";
import CameraModal from "@/components/CameraModal";
import { handleCommonErrors } from "@/Utils/HandleError";
import CustomModal from "@/components/Global/modal";

const Page: React.FC = () => {
  const session = useSession();
  const router = useRouter() as any;
  const {
    isOpen,
    onOpen,
    onOpenChange,
    onClose: CameraModalOnCLose,
  } = useDisclosure();
  const {
    isOpen: instructionIsOpen,
    onOpen: instructionOnOpen,
    onClose: instructionOnClose,
  } = useDisclosure();
  const [newEnroll, setNewEnroll] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authenticateLoader, setAuthenticateLoader] = React.useState(false);
  const sessionStatus = session.status;
  const sessionData = session?.data?.user as any;
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible1, setIsVisible1] = React.useState(false);
  const [twoFactorOTP, setTwoFactorOtp] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState({
    otp: "",
    token: "",
  });
  const [forgotPassword, setForgotPassword] = useState(true);
  const [disableResendOtp, setDisableResendOtp] = useState(false);
  const [forgotPassword1, setForgotPassword1] = useState(false);
  const [otpVerifyForm, setOTPVerifyForm] = useState(false);
  const [token, setToken] = useState("");
  const [timerCount, setTimerCount] = useState(30);
  const [errors, setErrors] = useState<any>({});

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const [verifyOtp, setVerifyOtp] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [sendOtp, setSendOtp] = useState({
    phone: "",
    email: "",
  });

  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
    captcha: "",
    platformName: "admin",
    platformToken: "",
    deviceDetail: "",
  });

  const getPlatformToken = async (): Promise<void> => {
    try {
      setLoading(true);
      const data: any = await CallPlatformToken("admin");

      if (data?.data) {
        setLoginData((prevLoginData) => ({
          ...prevLoginData,
          platformToken: data.data?.data[0]?.token,
          deviceDetail: window.navigator.userAgent,
        }));

        setLoading(false);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerCount > 0) {
        setTimerCount(timerCount - 1);
        setDisableResendOtp(true);
      } else {
        setDisableResendOtp(false);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timerCount]);

  useEffect(() => {
    redirection();
  }, [sessionStatus]);

  useEffect(() => {
    getPlatformToken();
  }, []);

  const appendForgotPasswordParam = (path: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("type");

    // Check if the 'forgotPassword' parameter exists, and append it to the URL
    return myParam === "forgotPassword" ? `${path}?type=forgotPassword` : path;
  };

  const redirection = () => {
    if (sessionStatus === "authenticated") {
      router.push(appendForgotPasswordParam("/admin/dashboard"));
    } else {
      router.push(appendForgotPasswordParam("/"));
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await signIn("credentials", {
        ...loginData,
        redirect: false,
        callbackUrl: "/superadmin",
      });
      if (data?.status === 200) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("loginStatus", "active");
        }
      }
      if (data?.error) {
        toast.error(data?.error);
        setLoading(false);
      }
    } catch (e) {
      if ((e as any)?.response?.data.status_code === 400) {
        setLoading(false);
      }
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const Data = {
        phone: sendOtp.phone,
        email: sendOtp.email,
        platformName: "web",
        platformToken: loginData.platformToken,
      };
      const data = (await CallSendOtp(Data)) as any;
      // console.log(":::---", data);
      if (data.data) {
        setToken(data?.data?.token);
        setForgotPassword1(false);
        setOTPVerifyForm(true);
        setLoading(false);
        setTimerCount(30);
        toast.success("OTP sent successfully to mobile & email");
      }
      // console.log(data.error);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newErrors = {} as any;

      if (!verifyOtp.password || verifyOtp.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters long.";
      }

      if (verifyOtp.password !== verifyOtp.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setLoading(true);
      const Data = {
        otp: verifyOtp.otp,
        token,
        password: verifyOtp.password,
      };
      const data = (await CallVerifyOtp(Data)) as any;
      if (data.data) {
        setOTPVerifyForm(false);
        setForgotPassword(true);
        setLoading(false);
        toast.success(data?.data?.message);
      }

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleChangeVerifyOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newErrors = {} as any;
    if (name === "otp" && value.length > 6) {
      newErrors.otp = "OTP cannot exceed 6 digits";
      setErrors(newErrors);
    } else {
      newErrors.otp = "";
      setErrors(newErrors);
      setVerifyOtp({ ...verifyOtp, [name]: value });
    }
  };
  const handleChangeSendOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSendOtp({ ...sendOtp, [name]: value });
  };
  const Check2FaStatus = async () => {
    try {
      setLoading(true);
      setDisableResendOtp(true);
      const Data = {
        userId: loginData.userId,
        password: loginData.password,
      };
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
      const { data, error } = (await CallCheckTwoFactorStatus(Data)) as any;
      console.log(data);

      if (data?.data?.is2FARequired) {
        toast.success(data?.message);
        setTwoFactorData({
          otp: "",
          token: data?.token,
        });
        setTwoFactorOtp(true);
        setForgotPassword(false);
        setLoading(false);
        setDisableResendOtp(false);
        if (data?.data?.isAuthenticated) {
          setIsAuthenticated(true);
        } else if (data?.data?.isFaceEnrolled) {
          setNewEnroll(false);
          setIsAuthenticated(true);
        } else {
          instructionOnOpen();
        }
      } else if (!data?.data?.is2FARequired) {
        handleLogin();
      }

      if (error) {
        toast.error(error);
        setLoading(false);
        setDisableResendOtp(false);
      }
    } catch (error) {
      if ((error as any)?.response?.data.status_code === 400) {
        setLoading(false);
      }
    }
  };
  const Verify2FaStatus = async () => {
    try {
      setLoading(true);
      const Data = {
        otp: twoFactorData.otp,
        token: twoFactorData.token,
      };

      const { data, error } = (await CallVerifyTwoFactorStatus(Data)) as any;
      if (data?.status === 200) {
        toast.success(data?.message);
        setLoading(false);
        handleLogin();
      }
      if (error) {
        toast.error(error);
        setLoading(false);
        setDisableResendOtp(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleFaceAction = async (file: string, isEnroll: boolean) => {
    try {
      setAuthenticateLoader(true);
      const Data = {
        image: file,
        phone: loginData.userId,
        ...(isEnroll && { password: loginData.password }),
      };
      console.log(Data, isEnroll);

      const response = isEnroll
        ? await CallEnrollFace(Data)
        : await CallFaceAuthenticate(Data);
      const { data, error, func } = response as any;
      console.log(data, error, func);
      if (data?.data?.enrollImage) {
        toast.success("Face enrolled successfully");
        setNewEnroll(false);
        setIsAuthenticated(true);
        onOpenChange();
        instructionOnClose();
        setAuthenticateLoader(false);
      }
      if (data?.data?.isAuthenticated) {
        toast.success(data?.message);
        handleLogin();
      }
      if (error) {
        console.log(error);
        handleCommonErrors(error);
        setAuthenticateLoader(false);
      }
    } catch (error) {
      handleCommonErrors(error);
      setAuthenticateLoader(false);
    }
  };
  const HandleFaceRecognisation = async (file: string) => {
    await handleFaceAction(file, newEnroll);
  };
  const HandleCloseInstrunctionModal = () => {
    instructionOnClose();
    setNewEnroll(true);
    onOpen();
  };
  return (
    <>
      <div className="main-content">
        <div className="flex gap-4 w-full">
          <div className="w-full lg:w-1/2 sidebar_login">
            <div className="circle-top"></div>
            <div className="card w-full md:w-[500px] flex flex-col bg-transparent p-4 shadow-none">
              <div className="flex gap-3 items-center mb-10">
                {/* <Image src={LOGO} alt="Logo" width={85} height={85} /> */}
                <div className="text-white text-xl font-semibold">
                  CA Admin Panel
                </div>
              </div>
              <form
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  Check2FaStatus();
                }}
                className="w-full mt-5"
                autoComplete="new-login"
              >
                <Input
                  type="text"
                  name="userId"
                  isRequired
                  placeholder="Enter username"
                  onChange={handleChange}
                  className="mb-5 text-white border-black caret-black"
                  startContent={<EmailIcon />}
                  size="lg"
                  autoComplete="new-username"
                />
                <Input
                  isRequired
                  name="password"
                  placeholder="Enter password"
                  startContent={<PasswordIcon />}
                  size="lg"
                  autoComplete="new-password"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  onChange={handleChange}
                  className="mb-5 text-white border-gray-400 rounded-md focus:border-white caret-black"
                />
                <Button
                  isLoading={loading}
                  type="submit"
                  fullWidth
                  color="primary"
                  size="lg"
                  className="mt-4 rounded-2xl"
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
