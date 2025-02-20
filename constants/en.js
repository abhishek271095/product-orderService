const constant = {
  SUCCESS_STATUS_CODE: 200,
  VALIDATION_STATUS_CODE: 400,
  VALIDATION_TYPE_ERROR: "validationError",
  NOT_FOUND_STATUS_CODE: 404,
  SOMETHING_WENT_WRONG_STATUS_CODE: 500,
  PERMISSION_ERROR_STATUS_CODE: 403,
  ALREADY_EXIST_STATUS_CODE: 409,
  ALREADY_RATING: "You have already rated this user",
  PERMISSION_ERROR: "permission_error",
  SELF_FOLLOWED: "You can't follow yourself",
  SELF_SUBSCRIBE: "You can't subscribe to yourself",
  ALREADY_EXIST: "Already Exits",
  PERMISSION_ERROR_DESCRIPTION:
    "You do not have permission to perform this action.",
  SOMETHING_WENT_WRONG: "We're having some issues, please check back later",
  SOMETHING_WENT_WRONG_TYPE: "internal_issue",
  WRONG_CREDENTIALS_TYPE: "invalid_grant",
  WRONG_CREDENTIALS: "Invalid user credentials",
  WRONG_PASSWORD: "Wrong Password",
  RECORD_NOT_FOUND: "Sorry, there's nothing here",
  USER_ID_NOT_EXIST: "User id not Exist.",
  UNAUTHORIZED_CODE: 401,
  VERSION_ERROR: "Invalid Version",
  TOKEN_VALIDATION: "Token is required",
  GOOGLE_TOKEN_REQUIRED: "Access token required",
  SOCIAL_ID_REQUIRED: "social id required",
  NO_GOOGLE_ACCOUNT: "No google account found.",
  NO_USERS_FOUND: "No users found.",
  MOBILE_NUMBER_REQUIRED: "The mobile number field is required.",
  EMAIL_REQUIRED: "The email field is required.",
  EMAIL_FORMATE: "The email format is invalid.",
  PASSWORD_REQUIRED: "The password field is required.",
  FIRST_NAME_REQUIRED: "The First name field is required.",
  LAST_NAME_REQUIRED: "The Last name field is required.",
  PLATFORM_REQUIRED: "The platform field is required.",
  LINK_REQUIRED: "The link field is required.",
  USERNAME_REQUIRED: "The Username field is required.",
  USERNAME_NOT_VALID: "Username not valid",
  CARD_ID_REQUIRED: "The cardId field is required.",
  CARD_NOT_FOUND: "Card not found.",
  CARD_ADD_IN_FAVORITE: "Card has been added to favorite successfully",
  CARD_REMOVE_IN_FAVORITE: "Card has been removed to favorite successfully",
  CHEF_ADD_IN_FAVORITE: "Chef has been added to favorite successfully",
  CHEF_REMOVE_IN_FAVORITE: "Chef has been removed to favorite successfully",
  OLD_PASS_REQUIRED: "The old password field is required.",
  NEW_PASS_REQUIRED: "The new password field is required.",
  OLD_PASS_NOT_MATCH: "Old password does not match",
  TOKEN_INVALID_ERROR: "verification_failed",
  REFRESH_TOKEN_INVALID_ERROR: "refresh_verification_failed",
  TOKEN_REQUIRED_ERROR: "missing_token",
  TOKEN_INVALID: "Token is invalid",
  TOKEN_EXPIRED: "Session is expired",
  TOKEN_EXPIRED_ERROR: "sessionExpired",
  EMAIL_INVALID_PASSWORD: "Invalid email format",
  INVALID_DEVICE_TYPE: "Invalid device type.",
  INVALID_TYPE: "Invalid type",
  ROOT_NOT_EXIST: "Root id not exist",
  INACTIVE_USER:
    "Your profile has been deactivated by admin, please email info@admin.com for further assistance",
  INACTIVE_USER_ERROR: "inActiveUser",
  NOT_FOUND: "Invalid page. Please go back and request Again.",
  NOT_FOUND_ERROR: "notFound",
  PRIVATE_USER_ERROR: "privateAccount",
  NO_REQUEST_FOUND: "No request found",
  DUPLICATE_ACCOUNT_EXIST_ERROR: "account_exist",
  DUPLICATE_EMAIL_EXIST: "Email already exists.",
  DUPLICATE_MOBILE_NUMBER_EXIST: "Mobile number already exists.",
  DUPLICATE_USERNAME_EXIST: "UserName already exists.",
  SUCCESS: "Success",
  SELF_ACCOUNT: "You can't select your profile",
  ALREADY_FOLLOW: "Already followed",
  ALREADY_REQUESTED: "Already requested",
  REQUEST_ACCEPT: "User has been added to your followers list",
  REQUEST_REJECT: "Request has been removed successfully",
  REQUEST_NOT_FOUND: "We're having some issues, please check back later",
  STATUS_REQUIRED: "Status is required",
  BLOCKED: "You can't follow this user because you are blocked",
  PASSPORT_UPDATED: "Your Password has been updated successfully",
  CHECK_PASSWORD:
    "Password must be minimum 6 characters and maximum 50 characters long",

  CHECK_FIRST_NAME:
    "First name must be minimum 1 characters and maximum 50 characters long",

  CHECK_LAST_NAME:
    "Last name must be minimum 1 characters and maximum 50 characters long",
  MIN_PASSWORD_VALIDATE: "The password must be at least 6 characters",
  MAX_PASSWORD_VALIDATE: "The password may not be greater than 50 characters",
  MIN_NEW_PASSWORD_VALIDATE: "The new password must be at least 6 characters",
  MIX_NEW_PASSWORD_VALIDATE:
    "The new password may not be greater than 50 characters",
  MIN_FIRST_NAME_VALIDATE: "First name at least 2 characters required",
  MAX_FIRST_NAME_VALIDATE:
    "The first name may not be greater than 50 characters.",
  MIN_LAST_NAME_VALIDATE: "Last name at least 2 characters required",
  MIN_MOBILE_NUMBER_NAME_VALIDATE:
    "Mobile number at least 10 characters required",
  MAX_MOBILE_NUMBER_VALIDATE:
    "The mobile number may not be greater than 15 characters.",
  USER_IDS_REQUIRED: "The userIds field is required.",
  TYPE_REQUIRED: "The type field is required.",
  USER_ID_REQUIRED: "The userId field is required.",
  RATING_REQUIRED: "The rating field is required.",
  ID_REQUIRED: "Id field is required.",
  TYPE_REQUIRED: "type field is required.",
  MAX_LAST_NAME_VALIDATE:
    "The last name may not be greater than 50 characters.",
  DUPLICATE_ACCOUNT_EXIST_ERROR: "account_exist",
  DUPLICATE_ACCOUNT_EXIST: "Account already exist.",
  isPrivate: "The isPrivate field is required.",
  isFollowerPrivate: "The isFollowPrivate field is required.",
  USER_BLOCKED: "User blocked successfully.",
  WRONG_OTP: "Wrong otp",
  WRONG_OTP_MSG: "Sorry! code was mismatch",
  WRONG_MOBILE_OTP_MSG: "Sorry! mobile otp was mismatch",
  WRONG_EMAIL_OTP_MSG: "Sorry! email otp was mismatch",
  OTP_REQUIRED: "OTP required.",
  MOBILE_OTP_REQUIRED: "Mobile OTP required.",
  EMAIL_OTP_REQUIRED: "Email OTP required.",
  TYPE_REQUIRED: "The type field required",
  USER_UNBLOCKED: "User unblocked successfully.",
  SEND_MAIL:
    "a One-Time Password reset request has been sent to the registered email address on this account",
  TEMP_USER_NOT_FOUND: "notFound",
  TEMP_USER_NOT_FOUND_MSG: "That didn't quite work, please try again",
  UPDATE_PROFILE: "Your profile has been successfully updated",
  SUBSCRIBE: "User has successfully subscribed",
  UNSUBSCRIBE: "User has successfully unsubscribed",
  USER_LOGOUT: "User has been logout Successfully",
  PRIVATE_FOLLOW_ERROR: "You do not have access to view this list",
  FULL_NAME_REQUIRED: "The name field is required.",
  PHONE_NUMBER: "Phone Number field is required.",
  ADDRESS_REQUIRED: "Address field is required.",
  TYPE_REQUIRED: "Type filed is required.",
  COUNTRY_REQUIRED: "Country filed is required.",
  STATE_REQUIRED: "State filed is required.",
  CITY_REQUIRED: "City filed is required.",
  FLAT_REQUIRED: "Flat filed is required.",
  STREET_REQUIRED: "Street filed is required.",
  ZIP_CODE_REQUIRED: "Zip code filed is required.",
  SOCIAL_ACCOUNT_ERROR:
    "Users accessing CookBook through their social logins cannot request a change of password through us",
  NO_SUBSCRIBE: "You are not subscribe to this user.",
  ADDRESS_NOT_VALID: "Address not valid.",
  NOTIFICATION_ID_REQUIRED: "Notification Id field is required.",
  PAYMENT_FAILED: "Payment Failed",
};

// export module pool to be used in other files
module.exports = Object.freeze(constant);
