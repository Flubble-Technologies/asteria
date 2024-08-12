// src/services/ApiService.ts

import axios from 'axios';
let onUnauthorized: any | null = null;

export const initializeApiService = (logoutCallback: any) => {
    onUnauthorized = logoutCallback;
};

const API_BASE_URL = 'http://192.168.1.107:4242'//'https://api.valemgo.com.tr' //
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(config => {
    return config;
});

export enum ApiErrorType {
    UNKNOWN = 'UNKNOWN',
    CONFILCT = 'CONFLICT',
    NOT_FOUND = 'NOT_FOUND',
    FORBIDDEN = 'FORBIDDEN',
    BAD_REQUEST = 'BAD_REQUEST',
    UNAUTHORIZED = 'UNAUTHORIZED',
    NETWORK_ERROR = 'NETWORK_ERROR',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export interface IApiError {
    type: ApiErrorType;
    error: any;
    message?: string;
}

const HandleApiError = (error: any) => {
    const apiError: IApiError = {
        type: ApiErrorType.UNKNOWN,
        error,
    };
    console.log('error', error.response);

    if (error.response) {
        apiError.message = error.response.data.message;
        switch (error.response.status) {
            case 401:
                apiError.type = ApiErrorType.UNAUTHORIZED;
                if (onUnauthorized) {
                    console.log('onUnauthorized called');
                    onUnauthorized(false);
                }
                break;
            case 403:
                apiError.type = ApiErrorType.FORBIDDEN;
                break;
            case 404:
                apiError.type = ApiErrorType.NOT_FOUND;
                break;
            case 409:
                apiError.type = ApiErrorType.CONFILCT;
                break;
            case 500:
                apiError.type = ApiErrorType.INTERNAL_SERVER_ERROR;
                break;
            case 400:
                apiError.type = ApiErrorType.BAD_REQUEST;
                break;
            default:
                apiError.type = ApiErrorType.UNKNOWN;
        }
    } else if (error.request) {
        apiError.type = ApiErrorType.NETWORK_ERROR;
    } else {
        apiError.type = ApiErrorType.UNKNOWN;
    }

    throw apiError;
};

apiClient.interceptors.request.use(config => {
    console.log('Making API request to:', config.url);
    return config;
});


const get = async (path: string, params?: any) => {
    try {
        const response = await apiClient.get(path, { params });
        return response.data;
    } catch (error: any) {
        throw HandleApiError(error);
    }
};

const post = async (path: string, data: any = {}, options?: any) => {
    try {
        const response = await apiClient.post(path, data, options);
        return response.data;
    } catch (error) {
        console.log('errorssss', error);
        throw HandleApiError(error);
    }
};

const put = async (path: string, data: any, options?: any) => {
    try {
        const response = await apiClient.put(path, data, {
            ...options,
        });
        return response.data;
    } catch (error) {
        throw HandleApiError(error);
    }
};

const remove = async (path: string, params: any) => {
    try {
        const response = await apiClient.delete(path, { data: params });
        return response.data;
    } catch (error) {
        throw HandleApiError(error);
    }
};

export default {
    get,
    post,
    put,
    remove,
};
