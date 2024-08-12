import { IBaseResponse } from './IBase-response'

export interface IUserResponse extends IBaseResponse {
    fullName: string;
    email: string;
    phone: string;
}