"use client";
import React from "react";
import Image from "next/image";
import LOGO from "../assets/img/brand/logo.png";
import LogoJammu from "@/assets/img/LogoJammu.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import toast from "react-hot-toast";
import {
  CallGetPermissionByUserId,
  CallPlatformToken,
  CallSendOtp,
  CallVerifyOtp,
} from "@/_ServerActions";
import { Input } from "@heroui/input";
import PhoneIcon from "@/assets/img/svg/Phone";
import EmailIcon from "@/assets/img/svg/Email";
import { Button, Skeleton } from "@heroui/react";
import OtpIcon from "@/assets/img/svg/Otp";
import PasswordIcon from "@/assets/img/svg/Password";
import { EyeSlashFilledIcon } from "@/assets/img/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/img/svg/EyeFilledIcon";
import { handleCommonErrors } from "@/Utils/HandleError";

interface SidebarProps {
  show: boolean;
  renderHome: boolean;
  onSidebarToggle: (isOpens: boolean) => void;
  sessionFinalRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  show,
  onSidebarToggle,
  renderHome,
  sessionFinalRole,
}) => {
  const location = usePathname();
  const session = useSession() as any;

  const sessionStatus = session.status;
  const sessionData = session?.data?.user as any;
  const [loading, setLoading] = useState(false);

  const [allSlideBar, setAllSlideBar] = useState<any>([]);
  const [forgotPassword1, setForgotPassword1] = useState(true);
  const [disableResendOtp, setDisableResendOtp] = useState(false);
  const [otpVerifyForm, setOTPVerifyForm] = useState(false);
  const [token, setToken] = useState("");
  const [timerCount, setTimerCount] = useState(30);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible1, setIsVisible1] = React.useState(false);
  const [errors, setErrors] = useState<any>({});

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const [verifyOtp, setVerifyOtp] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
    captcha: "",
    platformName: "admin",
    platformToken: "",
    deviceDetail: "",
  });

  const [sendOtp, setSendOtp] = useState({
    phone: "",
    email: "",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getPlatformToken = async (): Promise<void> => {
    try {
      setLoading(true);

      const data: any = await CallPlatformToken("admin");

      if (data?.data) {
        setLoginData((prevLoginData) => ({
          ...prevLoginData,
          platformToken: data.data.data[0].token,
          deviceDetail: window.navigator.userAgent,
        }));
        setLoading(false);
      }
    } catch (err) {
      // console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlatformToken();
  }, []);

  useEffect(() => {
    if (sessionData && sessionData?.data?.isPasswordUpdated === false) {
      onOpen();
    }
  }, [sessionData]);

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
      if (data.data) {
        setToken(data?.data?.token);
        setForgotPassword1(false);
        setOTPVerifyForm(true);

        setTimerCount(30);
        toast.success("OTP sent successfully to mobile & email");
        setLoading(false);
      }
      // console.log(data.error);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
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
      if (data.data?.message === "Password reset successfully") {
        setOTPVerifyForm(false);
        toast.success("Password reset successfully you have to login now", {
          duration: 5000,
        });
        setTimeout(() => {
          signOut();
        }, 4000);

        setLoading(false);
      }

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (e) {
      // console.log(e);
      setLoading(false);
    }
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

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      getData();
    }
  }, [sessionStatus]);

  // Example Usage

  const getData = async () => {
    try {
      setLoading(true);
      const { data, error } = (await CallGetPermissionByUserId(
        sessionData?.data?._id,
      )) as any;
      if (data?.data) {
        const filterData = data?.data
          .filter((item: any) => item.show)
          .map((item: any) => ({
            ...item,
            views: item.views
              ? item.views.filter((view: any) => view.show)
              : [],
          }));
        setAllSlideBar(filterData || []);
      }
      if (error) {
        handleCommonErrors(error);
      }
      setLoading(false);
    } catch (error) {
      console.log("error::: ", error);
      setLoading(false);
    }
  };

  const [isOpens, setIsOpen] = useState<boolean>(show);
  const handleResize = () => {
    if (window.innerWidth <= 991) {
      setIsOpen(false);
      onSidebarToggle(false);
    }
  };
  useEffect(() => {
    handleResize(); // Set the initial state based on the initial screen size
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setIsOpen(show);
  }, [show, sessionStatus]);
  const handleCloseSidebar = () => {
    setIsOpen(false);
    onSidebarToggle(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        size={"2xl"}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        hideCloseButton
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`It's mandatory to Change your password to proceed.`}
              </ModalHeader>
              {forgotPassword1 && (
                <>
                  <form
                    onSubmit={handleSendOtp}
                    className="w-full mt-3"
                    autoComplete="new-login"
                  >
                    <ModalBody>
                      <Input
                        type="text"
                        name="phone"
                        isRequired
                        placeholder="Enter mobile number"
                        onChange={handleChangeSendOtp}
                        startContent={<PhoneIcon />}
                        className="mb-5 text-white border-white caret-black"
                        size="lg"
                        autoComplete="new-username"
                      />
                      <Input
                        isRequired
                        name="email"
                        placeholder="Enter email"
                        size="lg"
                        startContent={<EmailIcon />}
                        autoComplete="new-password"
                        type={"email"}
                        onChange={handleChangeSendOtp}
                        className="mb-5 text-white border-gray-400 rounded-md focus:border-white caret-black"
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        isLoading={loading}
                        type="submit"
                        fullWidth
                        color="primary"
                        size="lg"
                        className="mt-4 rounded-md"
                      >
                        Send OTP
                      </Button>
                    </ModalFooter>
                  </form>{" "}
                </>
              )}

              {otpVerifyForm && (
                <>
                  <form
                    onSubmit={handleChangePassword}
                    className="w-full mt-3"
                    autoComplete="new-login"
                  >
                    <ModalBody>
                      <Input
                        type="number"
                        name="otp"
                        isRequired
                        placeholder="Enter otp"
                        startContent={<OtpIcon />}
                        onChange={handleChangeVerifyOtp}
                        maxLength={6}
                        className="mb-5 text-white border-white caret-black"
                        size="lg"
                        autoComplete="new-username"
                      />
                      {errors.otp && (
                        <p className="text-red-500 text-sm mb-2">
                          {errors.otp}
                        </p>
                      )}
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
                        onChange={handleChangeVerifyOtp}
                        className="mb-5 text-white border-gray-400 rounded-md focus:border-white caret-black"
                      />{" "}
                      {errors.password && (
                        <p className="text-red-500 text-sm mb-2">
                          {errors.password}
                        </p>
                      )}
                      <Input
                        isRequired
                        name="confirmPassword"
                        placeholder="Enter confirm password"
                        startContent={<PasswordIcon />}
                        size="lg"
                        autoComplete="new-password"
                        endContent={
                          <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility1}
                            aria-label="toggle password visibility"
                          >
                            {isVisible1 ? (
                              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible1 ? "text" : "password"}
                        onChange={handleChangeVerifyOtp}
                        className="mb-5 text-white border-gray-400 rounded-md focus:border-white caret-black"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mb-2">
                          {errors.confirmPassword}
                        </p>
                      )}
                      {timerCount === 0 ? (
                        <Button
                          disabled={disableResendOtp}
                          onClick={handleSendOtp}
                          style={{ width: "120px", float: "right" }}
                        >
                          Resend OTP
                        </Button>
                      ) : (
                        <p className="text-primary  text-end">
                          Resend OTP in {`${timerCount}`} secs
                        </p>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        isLoading={loading}
                        type="submit"
                        fullWidth
                        color="primary"
                        size="lg"
                        className="mt-4 rounded-md"
                      >
                        Verify OTP
                      </Button>
                    </ModalFooter>
                  </form>{" "}
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>

      <nav className={`sidebar ${isOpens ? "block" : "hidden"}`}>
        <button
          className="close_nav block lg:hidden"
          onClick={handleCloseSidebar}
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="main-logo">
          {sessionData?.data?.name?.toLowerCase().includes("jammu") ? (
            <Image src={LogoJammu} alt="Logo" width={50} height={50} />
          ) : (
            <Image src={LOGO} alt="Logo" width={65} height={65} />
          )}
          <h6 className="logo_text">ALL INDIA INSTITUTE OF MEDICAL SCIENCES</h6>
        </div>
        {loading && (
          <div className="w-full flex items-center gap-3 mt-5">
            <div className="w-full flex flex-col gap-2">
              {Array.from({ length: 10 }).map((_, index: number) => (
                <Skeleton
                  key={index}
                  className="h-8 w-full rounded-lg bg-[#18202b9a] border-none"
                />
              ))}
            </div>
          </div>
        )}
        <ul className="menu-links">
          {allSlideBar.map((route: any, index: number) => {
            if (route?.show) {
              return (
                <React.Fragment key={index}>
                  <li className="nav-link">
                    <Link
                      className={`${
                        location?.split("/")[2] === route.path?.split("/")[1] &&
                        "active"
                      }`}
                      href={
                        route.views?.length > 0
                          ? route.views[0].layout + route.views[0].path
                          : route.layout + route.path
                      }
                      // href={route.layout + route.path}
                    >
                      <div className="icon_box">
                        <span className="material-symbols-rounded">
                          {route.icon}
                        </span>
                      </div>
                      {route.name}
                    </Link>
                  </li>
                  {location?.split("/")[2] === route.path?.split("/")[1] &&
                    route.views?.map((i: any, idx: any) => {
                      if (i?.show) {
                        return (
                          <li key={idx} className="nav-link sub-nav-link">
                            <Link
                              className={`${
                                location?.split("/")[3] ===
                                  i.path?.split("/")[1] && "sub-active"
                              }`}
                              href={i.layout + i.path}
                            >
                              {i.name}
                            </Link>
                          </li>
                        );
                      }
                    })}
                </React.Fragment>
              );
            }
          })}

          <li className="nav-link lg_btn">
            <Link
              href={"/"}
              onClick={() => {
                signOut();
                sessionStorage.clear();
              }}
            >
              <div className="icon_box">
                <span className="material-symbols-rounded">logout</span>
              </div>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Sidebar;
