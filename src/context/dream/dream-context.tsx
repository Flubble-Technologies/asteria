import { createContext } from "react";
import { IDream } from "../../types/IDream";

interface IDreamContext {
    dreams: IDream[];
    refreshDreams: () => void;
}


export const DreamContext = createContext({} as IDreamContext);
