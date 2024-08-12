import { DreamType } from "../constants/dream-types";

export interface ICreateDream {
    date: Date;
    title: string;
    type: DreamType;
    initialX: number;
    initialY: number;
    description: string;
}