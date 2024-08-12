import { UUID } from "../..";

export interface IBaseResponse {
    id: UUID;
    createdAt?: Date;
    updatedAt?: Date;
}