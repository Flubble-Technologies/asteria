import { DreamEmotionalState } from "../constants/dream-emotional-state";
import { DreamType } from "../constants/dream-types";

export interface DreamStatistics {
    total: number;
    dreams: Record<DreamType, number>;
    recurringElements: Record<string, number>;
    emotions: Record<DreamEmotionalState, number>;
}