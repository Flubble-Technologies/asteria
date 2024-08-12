import apiService from "../../services/api.service";
import { ILogin, ISignup } from "../../types/auth.types";
import { IUserResponse } from "../../types/ILogin-response";

import { API_ENDPOINTS } from "./API_ENDPOINTS";

export async function loginApi(params: ILogin) {
    return await apiService.post(API_ENDPOINTS.auth.login, params);
}

export async function logoutApi() {
    return await apiService.post(API_ENDPOINTS.auth.logout);
}

export async function signupApi(params: ISignup, options: any) {
    return await apiService.post(API_ENDPOINTS.auth.signup, params, options);
}

export async function meApi() {
    return await apiService.get(API_ENDPOINTS.auth.me);
}

export async function refreshTokenAPI(): Promise<IUserResponse> {
    return await apiService.post(API_ENDPOINTS.auth.refreshToken);
}

export async function updateProfileApi(params: any) {
    return await apiService.put(API_ENDPOINTS.auth.updateProfile, params);
}