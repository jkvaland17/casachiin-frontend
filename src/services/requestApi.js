import http from "./http-common";

class DataService {
  GetExcelDownload() {
    throw new Error("Method not implemented.");
  }
  // Login Services
  Login(data) {
    return http.post(`admin/login`, data);
  }

  UpdateAdminPassword(data, token) {
    return http.patch(`admin/updateAdminPassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  VerifyOTP(data) {
    return http.post(`admin/verifyOtpPassword`, data);
  }
  GetSendOtp(data, token) {
    return http.post(`admin/sendOtp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

    PlatformToken(data) {
    return http.get(`master/platform?name=${data}`);
  }

    CheckTwoFactorStatus(data, token) {
    return http.post(`admin/check2FARequiredStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  VerifyTwoFactorStatus(data, token) {
    return http.post(`admin/verify2FA`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Admin
  FindAllAdmin(data, token) {
    return http.get(
      `admin/findAllAdmins?page=${data.pageNo}&limit=${data.limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  FindSubAdminByAdminId(token) {
    return http.get("admin/findSubAdminByAdminId", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FilterAdmin(data, token) {
    return http.get(
      `/admin/findAllAdminsByQuery?name=${data.name}&email=${data.email}&state=${data.state}&permissionId=${data.permissionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetPermissionByUserId(id, token) {
    return http.get(`admin/getPermissionByUserId?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreatePermission(data, token) {
    return http.post(`admin/createPermission`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdatePermission(data, token) {
    return http.patch(`admin/updatePermission`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  CreateUser(data, token) {
    return http.post("admin/createUser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateUser(query, data, token) {
    return http.patch(`admin/updateUser?${query}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetAllUser(query, token) {
    return http.get(`admin/getAllUsers?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UserDelete(id, token) {
    return http.delete(`admin/deleteUser?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new DataService();
