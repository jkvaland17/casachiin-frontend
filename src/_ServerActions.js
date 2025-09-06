"use server";
import DataService from "@/services/requestApi";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./AuthOption";

async function generateServerAction(func, token, ...args) {
  const responseObj = {
    data: null,
    error: null,
    func: null,
  };

  try {
    responseObj.func = func.toString();
    let response;
    if (token) {
      const userAccessToken = await getServerSession(authOptions);
      const session = userAccessToken.user.token;

      if (session) {
        if (args.length) {
          response = await func(...args, session);
        } else {
          response = await func(session);
        }
      }
    } else {
      response = await func(...args);
    }

    if (response) {
      responseObj.data = response.data;
    }
  } catch (error) {
    responseObj.error = error.response?.data?.message || error.message;
  }
  return responseObj;
}

export const CallUpdateAdminPassword = (data) =>
  generateServerAction(DataService.UpdateAdminPassword, true, data);

export const CallFindAllAdmin = (data) =>
  generateServerAction(DataService.FindAllAdmin, true, data);
export const CallSendOtp = (data) =>
  generateServerAction(DataService.GetSendOtp, false, data);

export const CallVerifyOtp = (data) =>
  generateServerAction(DataService.VerifyOTP, false, data);

export const CallPlatformToken = (data) =>
  generateServerAction(DataService.PlatformToken, false, data);

export const CallCheckTwoFactorStatus = (data) =>
  generateServerAction(DataService.CheckTwoFactorStatus, false, data);
export const CallVerifyTwoFactorStatus = (data) =>
  generateServerAction(DataService.VerifyTwoFactorStatus, false, data);


export const CallFindSubAdminByAdminId = () =>
  generateServerAction(DataService.FindSubAdminByAdminId, true);

export const CallGetPermissionByUserId = (id) =>
  generateServerAction(DataService.GetPermissionByUserId, true, id);

export const CallCreatePermission = (date) =>
  generateServerAction(DataService.CreatePermission, true, date);

export const CallUpdatePermission = (date) =>
  generateServerAction(DataService.UpdatePermission, true, date);

export const CallCreateUser = (data) =>
  generateServerAction(DataService.CreateUser, true, data);

export const CallUpdateUser = (query, data) =>
  generateServerAction(DataService.UpdateUser, true, query, data);

export const CallGetAllUser = (data) =>
  generateServerAction(DataService.GetAllUser, true, data);

export const CallUserDelete = (data) =>
  generateServerAction(DataService.UserDelete, true, data);
