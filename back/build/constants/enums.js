export var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["ACCEPTED"] = 202] = "ACCEPTED";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["CONFLICT"] = 409] = "CONFLICT";
    HttpStatus[HttpStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(HttpStatus || (HttpStatus = {}));
export var AuditLogActions;
(function (AuditLogActions) {
    AuditLogActions["USER_CREATED"] = "user_created";
    AuditLogActions["EMAIL_VERIFICATION"] = "email_verification";
    AuditLogActions["USER_DATA_UPDATED"] = "user_data_updated";
    AuditLogActions["USER_AUNTENTIFIED"] = "user_autentified";
    AuditLogActions["USER_COMPLETED"] = "user_completed";
})(AuditLogActions || (AuditLogActions = {}));
export var UserStatus;
(function (UserStatus) {
    UserStatus["CREATED"] = "created";
    UserStatus["EMAIL_VERIFIED"] = "email_verified";
    UserStatus["DATA_UPLOAD"] = "data_upload";
    UserStatus["AUNTENTIFIED"] = "autentified";
    UserStatus["COMPLETED"] = "completed";
})(UserStatus || (UserStatus = {}));
export var UserRole;
(function (UserRole) {
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
    UserRole["EXTERNAL_APP"] = "external_app";
})(UserRole || (UserRole = {}));
