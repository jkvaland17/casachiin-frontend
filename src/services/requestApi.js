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
  // Topic

  FindAllTopics(token) {
    return http.get(`admin/findAllTopics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateTopic(data, token) {
    return http.post("/admin/createTopic", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindTopicsByPost(id, token) {
    return http.get(`admin/findTopicsByPost/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateTopic(id, data, token) {
    return http.patch(`/admin/updateTopic?admin_id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Master

  CreateMaster(data, token) {
    return http.post("/admin/createMaster", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindMaterByType(type, token) {
    return http.get(`/admin/findMastersByMasterType?masterType=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllAdvertisement(id, status, token) {
    let url = `/admin/advertisementByLabel?labelId=${id}`;
    if (status) {
      url = `/admin/advertisementByLabel?labelId=${id}&tag=${status}`;
    }
    return http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindSpecialityByAdvertisementId(id, token) {
    return http.get(`admin/findSpecialityByAdvertisementId?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindMastersByParentId(id, token) {
    return http.get(`user/FindMastersByParentId?masterParentId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Permission
  FindAllPermissions(token) {
    return http.get("/admin/findAllPermissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindPermissionByPermissionType(id, token) {
    return http.get(
      `/admin/findPermissionByPermissionType?permissionTypeId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  FindMasterByPermissionType(id, token) {
    return http.get(
      `/admin/findMasterByPermissionType?permissionTypeId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  FindPermissionByAdminId(id, token) {
    return http.get(`/admin/findPermissionByAdminId?adminId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  CreateAdminPermission(data, token) {
    return http.post("/admin/createAdminPermission", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // SubAdmin

  FindAllSubAdminByDepartment(id, token) {
    return http.get(`admin/findAdminByDeparment?permissionId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateSubAdmin(data, token) {
    return http.post("/admin/createAdmin", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetDownloadExcel(token, data, api) {
    return http.post(`/admin/${api}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
      responseType: "blob",
    });
  }

  GetDownloadExcelScreening(token, data, api) {
    return http.get(`/admin/${api}?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
      responseType: "blob",
    });
  }
  // User
  FindAllUsers(data, token) {
    return http.get(`user/findAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllApplications(data, token) {
    return http.get(`admin/findAllApplications?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindScrutinyData(data, token) {
    return http.get(`admin/findScrutinyData?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindVerificationDocumentList(data, token) {
    return http.get(`admin/findVerificationDocumentList?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindUserApplication(data, token) {
    return http.get(
      `admin/findUserApplication?userId=${data.id}&page=${data.pageNo}&limit=${data.limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  SocialMediaLogin(data, token) {
    return http.post("admin/loginSocialMedia", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateUser(data, token) {
    return http.post("/admin/createUser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateUser(id, data, token) {
    return http.patch(`/admin/createUser${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateQualificationExperience(data, token) {
    return http.post("admin/createQualificationExperience", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetUserByUserId(id, token) {
    return http.get(`user/findUserByUserId?admin_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetApplicationById(id, token) {
    return http.get(`admin/findApplicationById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateApplication(id, data, token) {
    return http.patch(`admin/updateApplicationByAdmin?_id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindUserByDeparment(token) {
    return http.get("admin/findUserByDeparment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  //Notification
  GetAllNotification(token) {
    return http.get("admin/findAllNotifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetNotificationById(id, token) {
    return http.get(`admin/findNotificationById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  CreateNotification(data, token) {
    return http.post("/admin/createNotification", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DeleteNotification(data, token) {
    return http.delete(`/admin/deleteNotification?id=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //Inbox
  GetAllInbox(token) {
    return http.get("admin/findAllConversation", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindUserConversation(data, token) {
    return http.get(`admin/findConversationById?userId=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Queries
  GetAllQueriesTicket(data, token) {
    return http.get(`admin/findAllQuery?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllQueryV2(data, token) {
    return http.get(`admin/findAllQueryV2?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetQueryById(id, token) {
    return http.get(`admin/findQueryById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  PatchQuery(data, token) {
    return http.patch("/admin/updateQuery", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  //Ticket
  GetAllTicket(token) {
    return http.get("admin/findAllTickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetTicketById(id, token) {
    return http.get(`admin/findTicketById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  PatchTicket(data, token) {
    return http.patch("/admin/updateTicket", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Advertisement
  CreateAdvertisement(data, token) {
    return http.post("admin/createAdvertisement", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateAdvertisement(id, data, token) {
    return http.patch(`admin/updateAdvertisement?advertisementId=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllAdvertisement(token) {
    return http.get("admin/advertisement/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetSpecialityByAdvertisementId(id, token) {
    return http.get(`admin/findSpecialityByAdvertisementId?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetPWBDList(token) {
    return http.get(`admin/findPWBDCategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AssignSpecialityByAdvertisementId(id, data, token) {
    return http.post(`admin/createSuperSpeciality?advertisement=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetAllPostApplied(idA, idD, token) {
    return http.get(
      `admin/findPostAppliedBySuperSpecialityId?id=${idA}&superSpeciality=${idD}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  CreatePostApplied(data, token) {
    return http.post("admin/createPostApplied", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetPostAppliedById(id, token) {
    return http.get(`admin/findPostAppliedById?postApplied_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdatePostApplied(id, data, token) {
    return http.patch(`admin/updatePostApplied?postApplied_id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Department
  GetAllDepartment(token) {
    return http.get("admin/findAllDepartments", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateDepartment(data, token) {
    return http.post("admin/createDepartment", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateDepartment(id, data, token) {
    return http.patch(`admin/updateDepartment/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Global SuperSpeciality
  CreateMasterSuperSpeciality(data, token) {
    return http.post("admin/createMasterSuperSpeciality", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateMasterSuperSpeciality(id, data, token) {
    return http.patch(
      `admin/updateMasterSuperSpeciality?superSpecialityId=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  GetAllMasterSuperSpecialities(token) {
    return http.get("admin/findMasterSuperSpecialities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Global Categories
  CreateMasterCategory(data, token) {
    return http.post("admin/createMasterCategory", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateMasterCategory(id, data, token) {
    return http.patch("admin/updateMasterCategory?categoryId=", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllMasterCategory(token) {
    return http.get("admin/findMasterCategories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetDepartmentbyPermissionType(id, token) {
    return http.get(
      `admin/findMastersByPermissionType?permissionTypeId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  GetPermissionsByPermissionType(id, token) {
    return http.get(
      `admin/findPermissionsByPermissionType?permissionTypeId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  // ExamCenter

  FindAllExamCenters(token) {
    return http.get(`admin/getExamCenters`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateExamCenter(data, token) {
    return http.post("/admin/createExamCenter", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindExamCenterById(id, token) {
    return http.get(`admin/getExamCenterById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateExamCenters(id, data, token) {
    return http.patch(`/admin/updateExamCenter/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Question
  FindAllQuestion(data, token) {
    return http.get(
      `admin/findAllQuestions?advertisement=${data.advertisement}&post_applied=${data.post_applied}&superSpeciality=${data.superSpeciality}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  CreateQuestion(data, token) {
    return http.post("admin/createQuestion", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllQuery(data, token) {
    return http.get(`admin/findAllQuery?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindQueryById(id, token) {
    return http.get(`admin/findQueryById?_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateQuery(id, data, token) {
    return http.patch(`/admin/updateQuery?id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UploadExcelData(data, id, token) {
    return http.post(`admin/uploadExcelData?advertisement=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateScreeningDetail(data, id, token) {
    return http.patch(
      `admin/updateScreeningDetailOfApplication?_id=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  CreateFeeStructure(data, token) {
    return http.post(`admin/createFeeStructure${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllFeeStructure(token) {
    return http.get("admin/findAllFeeStructures", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetTransactionDownload(id, type, iType, printOnly, token) {
    return http.get(`admin/${type}?${iType}=${id}`, {
      responseType: printOnly === "printOnly" ? "json" : "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateFeeStructure(data, id, token) {
    return http.patch(`admin/updateFeeStructure?_id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Admin
  GetAllUserType(token) {
    return http.get("user/userType/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateAdmin(data, token) {
    return http.post("user/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UploadExcel(data, token) {
    return http.post("admin/uploadExcelData", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateAdmin(data, id, token) {
    return http.patch(`admin/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Categories
  GetAllCategories(token) {
    return http.get("master/masterCategory/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetCategoriesId(id, token) {
    return http.get(`master/getMasterDataById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateCategories(data, token) {
    return http.post("master/masterCategory/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetCreById(id, token) {
    return http.get(`admin/cre/getById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Data
  GetAllCategoriesData(token) {
    return http.get("master/masterData/all?", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllCategoriesDataId(data, token) {
    return http.get(`master/masterData/all?categoryId=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateCategoriesData(data, token) {
    return http.post("master/masterData/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UserByType(id, token) {
    return http.get(`/user/userByType?userTypeId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllAdmin(token) {
    return http.get("/admin/getAdminUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetSubAdmin(type, id, token) {
    return http.get(`/admin/getAdminUsersById?${type}=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetExcelDownload(id, token) {
    return http.get(`/admin/getAdminUsersById?adminId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getAllCategory(data, token) {
    return http.get(`master/getAllCategory?isHOD=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllCategoryByType(data, token) {
    return http.get(`master/getAllCategory?type=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetAllSpecialtiesId(id, token) {
    return http.get(`master/masterData/all?categoryId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetOrgAdmins(token) {
    return http.get(`admin/getOrgAdmins`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AssignApplication(data, token) {
    return http.patch(`admin/assignApplication`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  cellMasterData(cId, pId, val, token) {
    return http.get(
      `user/userByType?userTypeId=${cId}&parentId=${pId}&positionValue=${val}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  callPositions(token) {
    return http.get(`master/positions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  PlatformToken(data) {
    return http.get(`master/platform?name=${data}`);
  }

  GetAllSms(token) {
    return http.get("admin/findAllSms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  FindCategory(aid, id, pwbd, token) {
    return http.get(
      `user/findCategoryList?advertisement=${aid}&id=${id}&pwbd=${pwbd}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetAllState(token) {
    return http.get("/user/findStateCity", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  FindRequiredEducation(aid, id, token) {
    return http.get(
      `user/findRequiredEducation?advertisement=${aid}&id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetAdvertisement(params, token) {
    return http.get(`admin/findAllAdvertisement?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetPostAppliedBySpecialityId(id, advertisementId, token) {
    return http.get(
      `user/findPostByAdvertisementAndSpecialityId/?id=${advertisementId}&superSpeciality=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetPreferredDepartementList(id, token) {
    return http.get(`user/findDepartmentDetails/?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllTransition(data, token) {
    return http.get(`admin/findAllTransactions?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  VerifyTransaction(data, token) {
    return http.post(`user/verifySbiPayment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetDownloadChat(token, data) {
    return http.post(`/admin/downloadQueryChatsExcel`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set Content-Type to application/json
      },
      responseType: "blob",
    });
  }

  FindScrutinyData(data, token) {
    return http.get(`admin/findScrutinyData?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateVerificationStatus(data, token) {
    return http.patch(`admin/updateScrutinyData`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateScrutinyStatus(data, token) {
    return http.patch(`admin/updateScrutinyStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateTempUserByExcel(data, token) {
    return http.post(`admin/createTempUserByExcel`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UploadAdmitCardExcel(data, token) {
    return http.post(`admin/uploadAdmitCardExcel`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAdmitCard(data, token) {
    return http.get(`admin/getAllAdmitCard?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getAllotedCandidateData(instituteId, token) {
    return http.get(
      `admin/findInstituteAllotmentById?instituteAllotmentId=${instituteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  updateInstituteAllotment(id, data, token) {
    return http.patch(
      `admin/updateInstituteAllotmentByAdmin?instituteAllotmentId=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  CountInstituteAllotmentByStatus(data, token) {
    return http.get(`admin/countInstituteAllotmentByStatus?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FilterByAdvertisementAndStatus(data, token) {
    return http.get(`admin/findAllcounsellingAllotment?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  NotifyUserForAdmitCard(data, token) {
    return http.post(`admin/notifyUserForAdmitCard`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  AdmitCardDownload(data, token) {
    return http.post("admin/downloadAdmitCard", data, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DownloadScoreCard(data, token) {
    return http.get(`admin/downloadScoreCard?applicationId=${data}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateMasterData(data, token) {
    return http.patch(`master/updateMasterData`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UploadFile(data, token) {
    return http.post(`user/uploadFile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  MasterCategoryByCode(data, token) {
    return http.get(`master/masterCategoryByCode?code=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllInterviewPenal(data, token) {
    return http.get(`admin/findAllGroup?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  FindAllSubAdmin(data, token) {
    return http.get(`admin/findAllSubAdmin?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateSubAdminCellHead(data, token) {
    return http.post(`admin/createAdminMember`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetRoles(data, token) {
    return http.get(`master/getRoles?code=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateGroup(data, token) {
    return http.post(`admin/createGroup`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindGroup(id, token) {
    return http.get(`admin/findGroup?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findAllInterviewPanel(token) {
    return http.get(`/admin/findAllGroup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindApprovedApplications(data, token) {
    return http.get(`admin/findAllApplicationInterview?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllInterview(data, token) {
    return http.get(`admin/findAllInterview?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AssignMultipleInterviews(data, token) {
    return http.post(`admin/assignMultipleInterviews`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateInterview(data, token) {
    return http.post(`admin/createInterview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateMultipleInterview(data, token) {
    return http.post(`admin/createMultipleInterviews`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  InterviewApplicationForMember(params, data, token) {
    return http.get(
      `admin/findAllApplicationInterviewForMember?${params}&${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  InterviewApplicationDataForMember(id, token) {
    return http.get(`admin/findApplicationInterviewForMember?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  InterviewForMember(data, token) {
    return http.get(`admin/findAllInterviewForMember?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ApplicationInterview(data, token) {
    return http.get(`admin/findApplicationInterview?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ViewInterview(id, token) {
    return http.get(`admin/findInterview?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateInterview(data, token) {
    return http.patch(`admin/updateInterview?id=${data?._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateInterviewStats(data, token) {
    return http.patch(`admin/updateInterviewStats?id=${data?._id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllInterviewApplications(data, token) {
    return http.get(`admin/findApprovedApplications?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateUserInterview(data, token) {
    return http.post(`admin/createUserInterview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllUserInterview(token) {
    return http.get(`admin/findAllUserInterview`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllUserInterviewById(id, token) {
    return http.get(`admin/findUserInterview?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // Enable Interview Edit
  AllowInterviewStatesUpdate(data, token) {
    return http.patch(`admin/allowInterviewStatesUpdate`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AssignMultipleInterviewsUpdate(data, token) {
    return http.patch(`admin/transferApplicationInterview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateApplicationInterview(data, token) {
    return http.patch(`admin/updateApplicationInterview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllScoreInterviewById(id, token) {
    return http.get(`admin/findSubmittedInterviewForMember?interview=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetApplicationSummaryUrl(id, token) {
    return http.get(`admin/getApplicationSummaryUrl?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  RemoveInterviewMarks(id, token) {
    return http.patch(
      `admin/removeInterviewMarks?id=${id}`,
      { data: null },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  ReAssignMultipleInterviews(data, token) {
    return http.post(`admin/assignGroupToApplicationInterview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllApplicationStats(data, token) {
    return http.get(`admin/findAllApplicationStats?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  FindTransactionsStats(id, token) {
    return http.get(`admin/findTransactionsStats?advertisement_noId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindDocumentVerificationList(id, token) {
    return http.get(
      `admin/findDocumentVerificationList?advertisementId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  FindDocumentVerificationById(id, token) {
    return http.get(`admin/findDocumentVerificationById?applicationId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindShortListingApplicationById(id, token) {
    return http.get(
      `admin/findShortListingApplicationById?applicationId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  UpdateDocumentRemarkAndStatus(data, token) {
    return http.patch(`admin/updateDocumentRemarkAndStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  FindAllSubmittedScoreInterviewById(id, token) {
    return http.get(`admin/findSubmittedInterview?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindScrutinyStats(data, token) {
    return http.get(`admin/findScrutinyStats?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  FindDepartmentListForInterview(id, token) {
    return http.get(`admin/findDepartmentListForInterview?interviewId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  LockAwardSheet(data, token) {
    return http.post(`admin/lockAwardSheet`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UnlockAwardSheet(data, token) {
    return http.post(`admin/unlockAwardSheet`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ScheduleMeeting(data, token) {
    return http.post(`admin/scheduleMeeting`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateScreeningDetails(data, token) {
    return http.patch(`admin/updateScreeningDetails`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ChangeGroupIdInApplicationInterview(data, token) {
    return http.post(`admin/changeGroupIdInApplicationInterview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //CRE

  MasterData(code, token) {
    return http.get(`master/masterData/new/all?code=${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreAll(token) {
    return http.get(`admin/cre/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  CreCreate(data, token) {
    return http.post(`admin/cre/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  UpdateCre(id, data, token) {
    return http.patch(`admin/cre/update?id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  UpdateCreFinalSubmit(id, data, token) {
    return http.post(`admin/cre/finalSubmit?id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  FindShortListingApplication(id, token) {
    return http.get(`admin/findShortListingApplication?advertisementId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateDocumentFinalStatus(data, token) {
    return http.patch(`admin/updateDocumentFinalStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateScreeningFinalStatusByAdmin(data, token) {
    return http.patch(`admin/updateScreeningDocumentFinalStatusByAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateInterviewDocumentStatus(data, token) {
    return http.patch(`admin/updateInterviewDocumentStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateScreeningFinalStatus(data, token) {
    return http.patch(`admin/updateScreeningFinalStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateInterviewApplicationStatus(data, token) {
    return http.patch(`admin/updateInterviewApplicationStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findApplicationScreeningList(id, token) {
    return http.get(`admin/findApplicationScreeningList?${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findApplicationScreeningById(query, token) {
    return http.get(`admin/findApplicationScreeningById?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateDocumentScreening(data, token) {
    return http.patch(`admin/updateDocumentScreening`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateObjectiveScreening(data, token) {
    return http.patch(`admin/updateObjectiveScreening`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateObjectiveFinalStatus(data, token) {
    return http.patch(`admin/updateObjectiveFinalStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateScreeningFinalStatusByAdminFinal(data, token) {
    return http.patch(`admin/updateScreeningFinalStatusByAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllMeetings(data, token) {
    return http.get(`admin/findAllMeetings?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindApplicationScreeningList(data, token) {
    return http.get(`admin/findApplicationScreeningList?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateMeeting(data, token) {
    return http.post(`admin/createMeeting`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AssignMeeting(data, token) {
    return http.post(`admin/assignMeeting`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FinalSubmissionList(data, token) {
    return http.get(`admin/finalSubmissionList?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateFinalSubmission(data, token) {
    return http.patch(`admin/updateFinalSubmissionStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  SendOTP(token) {
    return http.get(`admin/sendfinalSubmissionOtp`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllCommittee(data, token) {
    return http.get(`admin/findAllCommittee?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findApplicationScreeningStats(id, token) {
    return http.get(`admin/findApplicationScreeningStats?${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findAllDepartmentForHOD(id, token) {
    return http.get(`admin/findAllDepartmentForHOD?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getExcelFormateLinkByType(data, token) {
    return http.get(
      `admin/getExcelFormateLinkByType?excelFormateLinkType=UploadInsitute`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      },
    );
  }

  uploadApplicationData(data, token) {
    return http.post(`admin/counsellingId`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  uploadInstituteData(data, token) {
    return http.post(`admin/uploadCounsellingInstituteData`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findAllDepartmentForCellHead(id, token) {
    return http.get(
      `admin/findAllDepartmentForCellHead?advertisementId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  SendCommitteeNoticeOtp(token) {
    return http.get(`admin/sendCommitteeNoticeOtp`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  findMeetingById(id, token) {
    return http.get(`admin/findMeetingById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateCommittee(data, token) {
    return http.post(`admin/createCommittee`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  candidateListByMeetingId(params, token) {
    return http.get(`admin/candidateListByMeetingId?meetingId=${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateMeeting(data, token) {
    return http.patch(`admin/updateCommittee`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateMeeting(data, token) {
    return http.patch(`admin/updateMeeting`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindCommitteeById(id, token) {
    return http.get(`admin/findCommitteeById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DownloadHODeSignPdf(id, token) {
    return http.get(`admin/downloadHODeSignPdf?groupId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
  }
  UploadHODeSignPdf(data, token) {
    return http.post(`admin/uploadHODeSignPdf`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  needClarificationCandidateList(params, token) {
    return http.get(`admin/needClarificationCandidateList?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  SendScreeningOTP(data, token) {
    return http.post(`admin/sendfinalSubmissionOtp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  verifyFinalSubmissionOtp(data, token) {
    return http.post(`admin/verifyFinalSubmissionOtp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getCommitteeMembers(params, token) {
    return http.get(`admin/getCommitteeMembers?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FinalSummaryCounts(params, token) {
    return http.get(`admin/finalSummaryCounts?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindCommitteeMembersList(params, token) {
    return http.get(`admin/findCommitteeMembersList?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindApplicationScreeningStatsByAdvertisementId(data, token) {
    return http.get(
      `admin/findApplicationScreeningStatsByAdvertisementId${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  allowDocumnetToReupload(data, token) {
    return http.patch(`admin/allowDocumnetToReupload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  allowObjectiveDocToReupload(data, token) {
    return http.patch(`admin/allowObjectiveDocToReupload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetScreeningReport(params, token) {
    return http.get(`admin/getScreeningReport?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
  }
  getDocumentScreeningConditions(id, token) {
    return http.get(
      `admin/getDocumentScreeningConditions?applicationId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  UploadInterviewHODExcel(data, token) {
    return http.post(`admin/uploadInterviewHODExcel`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UploadApplicationExcelForInterview(data, token) {
    return http.post(`admin/uploadApplicationExcelForInterview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UploadInterviewExcel(data, token) {
    return http.post(`admin/uploadInterviewExcel`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetUserMeetingByUserId(token) {
    return http.get(`admin/getUserMeetingByUserId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetScreeningTrailByAppId(data, token) {
    return http.get(`admin/getScreeningTrailByAppId?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllQueriesTicketRFQ(data, token) {
    return http.get(`admin/findAllExamQuery?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetQueryByIdRFQ(id, token) {
    return http.get(`admin/findExamQueryById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  PatchQueryRFQ(data, token) {
    return http.patch("admin/updateExamQuery", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ScheduleRFQ(data, token) {
    return http.post("admin/scheduleRFQ", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetScheduledRFQList(token) {
    return http.get("admin/getScheduledRFQList", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getQueryCategoryList(token) {
    return http.get(`user/getQueryCategoryList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateTempPass(data, token) {
    return http.post(`admin/updateTempPass`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AddInstituteAdmin(data, token) {
    return http.post(`admin/addInstituteAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getAllCounsellingInstitutes(token) {
    return http.get(`admin/findAllInstitutes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllNotificationCandidate(data, token) {
    return http.get(`admin/getAllNotification?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AddNotification(data, token) {
    return http.post(`admin/addNotification`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetIdNotification(data, token) {
    return http.get(`admin/getIdNotification?id=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateNotification(data, token) {
    return http.patch(`admin/updateNotification?id=${data?.id}`, data?.data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findAdvertisementForHOD(data, token) {
    return http.get(`/admin/findAdvertisementByRole?loginType=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  FindAllScoreCardStageOne(data, token) {
    return http.get(`admin/findAllScoreCard?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateCommitteeByAdmin(data, token) {
    return http.post(`admin/createCommitteeByAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllSubAdminAndHod(data, token) {
    return http.get(`admin/findAllSubAdminAndHod?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateCounsellingByAdmin(data, token) {
    return http.post(`admin/createCounselling`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllCounselling(token) {
    return http.get(`admin/findAllCounsellings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DeleteCounselling(data, token) {
    return http.delete(`admin/deleteCounselling?counsellingId=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindCounsellingbyId(data, token) {
    return http.get(`admin/findCounsellingById?counsellingId=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetStudentAllotmentStats(data, token) {
    return http.get(`admin/getCandidateStats?counsellingId=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetStudentAllotmentUsers(data, token) {
    return http.get(
      `admin/getStudentAllotmentStatsFromCounsellingApplication?counsellingId=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetAllotmentUserDetails(data, token) {
    return http.get(`admin/getInstituteAllotmentByRound?roundNumber=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetCounsellingApplicationData(data, token) {
    return http.get(
      `admin/getCounsellingApplicationsDataByCounsellingId?_id=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetExcelTemplate(data, token) {
    return http.get(
      `admin/getExcelFormateLinkByType?excelFormateLinkType=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetInstituteWisePreference(data, token) {
    return http.get(
      `admin/getInstituteWisePreferenceCount?counsellingId=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetInstituteLastRound(data, token) {
    return http.get(
      `admin/getInstituteAllotmentLastRound?counsellingId=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  UpdateCounselling(id, data, token) {
    return http.patch(`admin/updateCounselling?counsellingId=${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UploadCounsellingInstitute(id, data, token) {
    return http.post(
      `admin/uploadCounsellingInstituteData?counsellingId=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetInstituteAllotment(data, token) {
    return http.get(`admin/getInstituteAllotmentByRound?roundNumber=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetOptionalChoice(data, token) {
    return http.get(
      `admin/findOptionalchoiceByCounsellingId?counsellingId=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  CreateInstituteAllotment(data, token) {
    return http.post(`admin/createInstituteAllotments`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  exportApplicationsByAdvertisement(data, token) {
    return http.get(
      `admin/exportApplicationsByAdvertisement?advertisement_noId=665d918b6a81a8605fd292e5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      },
    );
  }

  CreateOptionalExercise(id, data, token) {
    return http.patch(
      `admin/updateAllotmentExerciseDate?counsellingId=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  UploadCounsellingCandidate(id, data, token) {
    return http.post(
      `admin/uploadCounsellingApplication?counsellingId=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  AddMembersToCommittee(data, token) {
    return http.post(`admin/addMembersToCommittee`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetScreeningHeads(data, token) {
    return http.get(`admin/getScreeningHeads?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetFinalMembers(data, token) {
    return http.get(`admin/getFinalMembers?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetFindOneGroup(data, token) {
    return http.get(`admin/findOneGroup?groupId=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateCommitteeByAdmin(data, token) {
    return http.post(`admin/updateCommitteeByAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getExcelFinalSubmissionList(params, token) {
    return http.get(`admin/getExcelFinalSubmissionList?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
  }
  DetailedScreeningReport(data, token) {
    return http.post(`admin/detailedScreeningReport`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
  }
  SendScreeningHODMail(data, token) {
    return http.post(`admin/sendScreeningHODMail`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  adminLockScreening(data, token) {
    return http.post(`admin/lockScreening`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  adminUnlockScreening(data, token) {
    return http.post(`admin/unlockScreening`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindGroupsByAdv(data, token) {
    return http.get(`admin/findGroupsByAdv?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  FindInterviewPanelOfAdmin(id, token) {
    return http.get(`admin/findInterviewPanelOfAdmin?interviewId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindApplicationInterviewByGroup(params, token) {
    return http.get(`admin/findApplicationInterviewByGroup?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findApplicationInterviewById(id, token) {
    return http.get(`admin/findApplicationInterviewById?_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AddHeadsToCommittee(data, token) {
    return http.post(`admin/addHeadsToCommittee`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateCommitteeInterview(data, token) {
    return http.post(`admin/createCommitteeForHrSubCommitteeByAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateCommitteeInterview(data, token) {
    return http.post(`admin/updateCommitteeForHrSubCommitteeByAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  SendAwardSheetOTP(type, token) {
    return http.post(`admin/sendAwardSheetOTP`, type, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetInterviewResult(query, token) {
    return http.get(`admin/getInterviewResult?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  CalculateInterviewResult(data, token) {
    return http.post(`admin/calculateInterviewResult`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ChairPersonSendOtpToMember(data, token) {
    return http.post(`admin/sendFinalAwardSheetOTP`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  LockFinalAwardSheet(data, token) {
    return http.post(`admin/lockFinalAwardSheet`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetAwardsheetStatus(query, token) {
    return http.get(`admin/getAwardsheetStatus?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindSeatsOfAdvertisements(query, token) {
    return http.get(`admin/findSeatsOfAdvertisement?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateWaitingList(data, token) {
    return http.patch(`admin/updateWaitingList`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ResendFinalAwardSheetOTP(data, token) {
    return http.post(`admin/resendFinalAwardSheetOTP`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FinalSelectionListDownload(data, token) {
    return http.get(`admin/getFinalAwardSheetSummary?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetCounsellingApplicationStatusSummary(query, token) {
    return http.get(`admin/fetchCounsellingApplicationStatusSummary?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindPositionByDepartment(id, token) {
    return http.get(`admin/findPositionByDepartment?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  AddSubjectExpert(data, token) {
    return http.post(`admin/addSubjectExpert`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetInterviewStatistics(data, token) {
    return http.get(`admin/getInterviewStatistics?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetInterviewStatsDepartmentWise(data, token) {
    return http.get(`admin/getInterviewStatsDepartmentWise?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  Send2FAOtp(data, token) {
    return http.post(`admin/send2FAOtp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  Send2FAOtp(data, token) {
    return http.post(`admin/send2FAOtp`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateInterviewGrade(data, token) {
    return http.post(`admin/updateInterviewGrade`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindUpdatedGradeList(data, token) {
    return http.get(`admin/findUpdatedGradeList?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateMemberDetails(data, token) {
    return http.patch(`admin/updateMemberDetails`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateApplicationInterviewReports(data, token) {
    return http.patch(`admin/updateApplicationInterviewReports`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetUploadInstituteExcelErrors(id, data, token) {
    return http.post(
      `admin/uploadCounsellingInstituteData?counsellingId=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  GetUploadCandidatesExcelErrors(id, data, token) {
    return http.post(
      `admin/uploadCounsellingApplication?counsellingId=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  EnrollFace(data, token) {
    return http.post(`admin/enrollFace`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FaceAuthenticate(data, token) {
    return http.post(`admin/faceAuthenticate`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetInstituteAllotmentData(data, token) {
    return http.post(
      `admin/getInstituteAllotmentsByAdvertisementAndInstituteId`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetAllInstituteAllotmentStats(param, token) {
    return http.get(`admin/getAllInstituteAllotmentStats?${param}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetAdminById(adminId, token) {
    return http.get(`admin/getAdminById?adminId=${adminId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  FindAllInstitutesForNORCET(params, token) {
    return http.get(`admin/findAllInstitutesList?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetDocumentsByInstituteAllotmentId(id, token) {
    return http.get(
      `admin/getDocumentsByInstituteAllotmentId?instituteallotmentId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  GetAllInstituteRoles(param, token) {
    return http.get(`admin/getPanelRolesForInstitute` + param, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  CreateInstituteMembers(data, token) {
    return http.post(`admin/createInstituteMember`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  CreateFaceSession(token) {
    return http.post("admin/createFaceSession", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetFaceSessionResult(id, token) {
    return http.get(`admin/getSessionResultById?sessionId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  MapCandidateDocuments(data, token) {
    return http.post(`admin/mapCandidateDocuments`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetCandidateForMapping(query, token) {
    return http.get(`admin/getRemainingCandidateForMapping?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetInstituteMembers(query, token) {
    return http.get(`admin/getInstituteMembers?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateInstituteDocStatus(data, token) {
    return http.patch(`admin/updateInstituteDocStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateInstituteScreeningStatus(data, token) {
    return http.patch(`admin/updateInstituteScreeningStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  SendInterviewCredentialMail(data, token) {
    return http.post(`admin/sendInterviewCredentialMail`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  CreateInstituteScreeningSchedule(data, token) {
    return http.post(`admin/createInstituteScreeningSchedule`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetInstituteScreeningSchedule(token) {
    return http.get(`admin/getInstituteScreeningSchedule`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  RemoveGroupMember(data, token) {
    return http.patch(`admin/removeGroupMember`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateMemberAttendance(data, token) {
    return http.patch(`admin/updateMemberAttendence`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindInstituteById(id, token) {
    return http.get(`/admin/findInstituteById?instituteId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  AddScrutinyData(data, token) {
    return http.post(`admin/addScrutinyData`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  DeleteCommittee(data, token) {
    return http.delete(`admin/deleteCommitteeByAdminn?id=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetCommitteeCount(data, token) {
    return http.get(`admin/getCountOfCommitteeForDepartment?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  SendScreeningCredentialMail(data, token) {
    return http.post(`admin/sendScreeningCommitteeCredentialMail`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ConvertRejectedScrutinyToPending(data, token) {
    return http.patch(`admin/convertRejectedScrutinyToPending`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  SendInterviewResultToCellAdmin(data, token) {
    return http.post(`admin/sendInterviewResultToCellAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getApplicationExcelHeaders(data, token) {
    return http.get(
      `admin/getApplicationExcelHeaders?advertisementId=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  FindGroupsByAdvId(data, token) {
    return http.get(`admin/findGroupsByAdvId?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllStateCountPreferencesWise(data, token) {
    return http.post(`admin/findAllStateCountPreferencesWise`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetPermissionByUserId(id, token) {
    console.log("id",{id, token});
    
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
  GetInterviewResultByAdvertisement(data, token) {
    return http.post(`admin/getInterviewResultByAdvertisement`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: data?.type === "pdf" ? "blob" : "json",
    });
  }
  InstituteRolesAdvertisementWise(params, token) {
    return http.get(`admin/instituteRolesAdvertisementWise${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateInstituteMembers(data, token) {
    return http.patch(`admin/updateInstituteMember`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetTransactionExcelHeaders(data, token) {
    return http.get(
      `admin/getTransactionExcelHeaders?advertisementId=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }

  getQrCodeData(id, token) {
    return http.get(`admin/getInterviewResultURLByQRId?qrId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllGroupWiseCount(params, token) {
    return http.get(`admin/findAllGroupWise?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateJobQueue(data, token) {
    return http.post(`admin/createJobQueue`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllJobQueue(id, token) {
    return http.get(`admin/getAllJobQueue?advId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  RemoveJobQueue(data, token) {
    return http.post(`admin/removeJobQueue`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindStatuscode(id, token) {
    return http.get(`admin/findAllStatuscodeList?advertisementId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateStatuscode(data, token) {
    return http.post(`admin/createStatuscode`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UploadApplicantStatus(data, token) {
    return http.post(`admin/uploadApplicantStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateStatuscode(data, token) {
    return http.patch(`admin/updateStatuscode`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetApplicant(id, token) {
    return http.get(`admin/getApplicant?_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DownloadApplicant(id, token) {
    return http.get(`admin/downloadApplicant?_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetStatuscode(id, token) {
    return http.get(`admin/getStatuscode?statusCodeId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ParticularOneStatusCodeAdd(data, token) {
    return http.post(`admin/particularOneStatusCodeAdd`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ExcelDownloadForStatuscode(token, id) {
    return http.get(`admin/excelDownloadForStatuscode?statusCodeId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
  }
  UpdateApplicant(data, token) {
    return http.patch(`admin/updateApplicant?_id=${data?.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetIndividualScores(data, token) {
    return http.get(`admin/getIndividualScores?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UploadTadiParData(data, token) {
    return http.post(`admin/uploadTadiParData`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetTadiParData(data, token) {
    return http.get(`admin/getTadiParData?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  FindAllTadiParCandidateList(data, token) {
    return http.get(`admin/findAllTadiParCandidateList?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ExcelDownloadForStatuscode(token, data) {
    return http.get(`admin/downloadTadiParCandidateListExcel?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });
  }
  findAdvertisementByStatus(data, token) {
    return http.get(`admin/findAdvertisementByStatus?type=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createChat(data, token) {
    return http.post(`admin/createChat`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateChat(data, token) {
    console.log(data);

    return http.patch(`admin/updateChat`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CurrentUserChatHistoryByAppId(id, token) {
    return http.get(`admin/getChatHistoryById?application=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllChatHistoryByAdvId(id, token) {
    return http.get(`admin/findAllChat?${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  SendBulkQueryReply(data, token) {
    return http.post(`admin/sendBulkQueryReply`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAppointmentLetter(data, token) {
    return http.get(`admin/findAllAppointmentLetter?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DownloadPDF(CallAPI, params, formData, token, method) {
    const config = {
      responseType: "blob",
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = `${CallAPI}?${params}`;
    return method === "get"
      ? http[method](url, config)
      : http[method](url, formData, config);
  }
  FindPostByAdvId(params, token) {
    return http.get(`user/findPostByAdvId?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DownloadCounsellingExcel(data, token) {
    return http.get(
      `admin/getCounsellingApplicationsByCounsellingId?_id=${data}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  UpdateCounsellingStatus(data, token) {
    return http.patch(`admin/updateCounsellingApplicationStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AdvertisementsWithScreeningStatus(id, token) {
    return http.get(`/admin/advertisementsWithScreeningStatus?labelId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetScreeningConfigByAdvertisement(query, token) {
    return http.get(`admin/getScreeningConfigByAdvertisement?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateScreeningConfig(data, token) {
    return http.post(`admin/createScreeningConfig`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateCommitteeV2(data, token) {
    return http.post(`admin/createGlobalCommittee`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllCommittee(data, token) {
    return http.get(`admin/getAllCommittee?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetScreeningCommitteesByAdvertisement(data, token) {
    return http.get(`admin/getScreeningCommitteesByAdvertisement?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetDepartmentsWithHODs(data, token) {
    return http.get(`admin/getDepartmentsWithHODs?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllCommitteesWithMembers(data, token) {
    return http.get(`admin/getAllCommitteesWithMembers?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AssignCommitteeToScreening(data, token) {
    return http.post(`admin/assignCommitteeToScreening`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  StartScreeningProcess(data, token) {
    return http.post(`admin/startScreeningProcess`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  ViewScreeningCommitteeDetails(params, token) {
    return http.get(`admin/viewScreeningCommitteeDetails?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAssignedScreenings(params, token) {
    return http.get(`admin/getAssignedScreenings?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetCommitteeDetails(data, token) {
    return http.get(`admin/getCommitteeById?id=${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateCommittee(data, token) {
    return http.patch(
      `admin/updateGlobalCommittee?committeeId=${data?._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  GetAssignedCommitteesByDepartment(data, token) {
    return http.get(`admin/getAssignedCommitteesByDepartment?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateScreeningStepByAdvertisement(data, token) {
    return http.patch(`admin/updateScreeningStepByAdvertisement`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllHODList(query, token) {
    return http.get(`admin/findAllSubAdminAndHod?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AssignHODtoDepartment(data, token) {
    return http.post(`admin/assignHODToDepartment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAllCandidatesByDepartment(query, token) {
    return http.get(
      `/admin/fetchScreeningCandidatesByAssignmentStatus?${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  AssignCandidates(data, token) {
    return http.post(`/admin/assignCandidatesToCommitteeForScreening`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  AutoAssignCommitteeToScreening(data, token) {
    return http.post(
      `admin/autoAssignCandidatesToCommitteesForScreening`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  GetSummerySlip(data, token) {
    return http.get(`/admin/downloadSummarySlipByInstitute?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  JobList(params, token) {
    return http.get(`admin/job-list?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetExcelError(query, token) {
    return http.get(`admin/validateApplicantStatus/${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetJobStatus(data, token) {
    return http.get(`/admin/job-status/${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetScreeningStats(token) {
    return http.get(`admin/getScreeningStats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetScreeningStatsByAdvertisement(query, token) {
    return http.get(`admin/getScreeningStatsByAdv?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetCommitteeByAdvtAndDepartment(query, token) {
    return http.get(`admin/getAllCommitteesByAdvertisement?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getInstituteScreeningCandidateList(params, token) {
    return http.get(`admin/getInstituteScreeningCandidateList?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateVerificationAndStatus(data, token) {
    return http.patch(`admin/updateVerificationAndStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateAllInstituteDocsStatus(data, token) {
    return http.patch(`admin/updateAllInstituteDocsStatus`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  findMasterByCode(code) {
    return http.get(`master/findMasterByCode?code=${code}`);
  }
  FindPostAndSetByGroup(data, token) {
    return http.get(`admin/findPostAndSetByGroup?${data}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DownloadApplicationExcelHeaders(data, token) {
    return http.post(`admin/downloadApplicationExcelHeaders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DownloadSummarySlipByAdvertisementId(data, token) {
    return http.post(`/admin/downloadSummarySlipByAdvertisementId`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetDownloadUploadEntities(params, token) {
    return http.get(`admin/getDownloadUploadEntities?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new DataService();
