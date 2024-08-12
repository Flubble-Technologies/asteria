import { DreamEmotionalState } from "../constants/dream-emotional-state";
import { DreamImageStatus } from "../constants/dream-image-status";
import { DreamType } from "../constants/dream-types";
import { IBaseResponse } from "./IBase-response";
import { DreamImages } from "./IDream-images";

export interface IDream extends IBaseResponse {
    date: string;
    title: string;
    type: DreamType;
    initialX: number;
    initialY: number;
    description: string;
    images: DreamImages[];
    interpretation: string;
    imageStatus: DreamImageStatus;
    emotionalState: DreamEmotionalState;
}