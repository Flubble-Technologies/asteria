import { createContext } from "react";
import { IDream } from "../../types/IDream";
import { IQuery } from "../../types/IQuery";

interface IDreamContext {
    error: any;
    dreams: IDream[];
    hasMore: boolean;
    refreshDreams: () => void;
    dreamsWithFilter: IDream[];
    setHasMore: (hasMore: boolean) => void;
    fetchDreamsWithFilter  : (params: IQuery) => void;
    setDreamsWithFilter: (dreamsWithFilter: IDream[]) => void;
}


export const DreamContext = createContext({} as IDreamContext);
