import { Dimensions } from "react-native";
import { ApiErrorType } from "../services/api.service";

// in english

export const errorMessages: Record<ApiErrorType, string> = {
    [ApiErrorType.INTERNAL_SERVER_ERROR]: "Server error occurred. Please try again later.",
    [ApiErrorType.NETWORK_ERROR]: "A network error occurred. Check your internet connection and try again.",
    [ApiErrorType.BAD_REQUEST]: "Invalid request. Please check your inputs.",
    [ApiErrorType.NOT_FOUND]: "The requested resource was not found. Make sure the content you are looking for is available.",
    [ApiErrorType.FORBIDDEN]: "Access denied. You may not have permission for this operation.",
    [ApiErrorType.UNAUTHORIZED]: "Authorization error. Make sure you are logged in.",
    [ApiErrorType.UNKNOWN]: "An unknown error occurred. Please try again later.",
    [ApiErrorType.CONFILCT]: "A conflict error occurred. Please try again later."
};