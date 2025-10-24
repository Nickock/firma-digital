export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  SERVER_ERROR = 500
}

export enum AuditLogActions {
  USER_CREATED = 'user_created',
  EMAIL_VERIFICATION = 'email_verification',
  USER_DATA_UPDATED = 'user_data_updated',
  USER_AUNTENTIFIED = 'user_autentified',
  USER_COMPLETED = 'user_completed'
}

export enum UserStatus {
  CREATED = 'created',
  EMAIL_VERIFIED = 'email_verified',
  DATA_UPLOAD = 'data_upload',
  AUNTENTIFIED = 'autentified',
  COMPLETED = 'completed'
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}
