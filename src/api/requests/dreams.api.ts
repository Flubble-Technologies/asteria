import { UUID } from "../../..";
import { DreamAnalysisCategories } from "../../constants/dream-analysis-categories";
import { DreamImageStatus } from "../../constants/dream-image-status";
import { TimeFrame } from "../../constants/time-frame";
import apiService from "../../services/api.service";
import { ICreateDream } from "../../types/ICreate-dream";
import { IDream } from "../../types/IDream";
import { DreamStatistics } from "../../types/IDream-statistics";
import { IPaginate } from "../../types/IPaginate";
import { IQuery } from "../../types/IQuery";
import { API_ENDPOINTS } from "./API_ENDPOINTS";

export async function createDreamApi(params: ICreateDream) : Promise<IDream> {
    return await apiService.post(API_ENDPOINTS.dream.base, params);
}

export async function getDreamsApi(): Promise<IDream[]> {
    return await apiService.get(API_ENDPOINTS.dream.base);
}

export async function startImageCreationApi(dreamId: UUID) {
    return await apiService.post(API_ENDPOINTS.dream.addImage(dreamId));
}


export interface IGetDreamResponse {
    images: string[];
    status: DreamImageStatus;
}
export async function getImageForDreamApi(dreamId: UUID) : Promise<IGetDreamResponse> {
    return await apiService.get(API_ENDPOINTS.dream.getImage(dreamId));
}

export async function deleteDreamApi(dreamId: UUID) {
    return await apiService.remove(API_ENDPOINTS.dream.deleteDream(dreamId), {});
}


export async function getDreamsByFilterApi(params: IQuery | null): Promise<IPaginate<IDream>> {
    return await apiService.get(API_ENDPOINTS.dream.filterDreams, params);
}

interface IUpdateDreamPosition {
    initialX: number;
    initialY: number;
}
export async function updateDreamPositionApi(dreamId: UUID, position: IUpdateDreamPosition) {
    return await apiService.put(API_ENDPOINTS.dream.updatePosition(dreamId), position);
}

export interface IAnalyzedDream {
    timeFrame: TimeFrame;
    selectedCategory: DreamAnalysisCategories;
}

export async function analyzeDreamApi(params: IAnalyzedDream) {
    return await apiService.post(API_ENDPOINTS.dream.analyzeDream, params);
}

export async function getImageApi(fileName: string) {
    return await apiService.get(API_ENDPOINTS.images.base(fileName));
}

export async function getDreamStatsApi(timeFrame: string): Promise<DreamStatistics> {
    return await apiService.get(API_ENDPOINTS.dream.stats, { timeFrame: timeFrame });
}