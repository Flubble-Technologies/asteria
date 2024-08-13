import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDreamsApi } from '../../api/requests/dreams.api';
import { IDream } from '../../types/IDream';
import { DreamContext } from './dream-context';

export const DreamProvider = ({ children }: any) => {
    const [dreams, setDreams] = useState<IDream[]>([]);

    const fetchDreams = async () => {
        try {
            const response = await getDreamsApi();
            setDreams(response);
        } catch (error) {
            console.error('Failed to fetch dreams:', error);
        }
    };


    useEffect(() => {
        fetchDreams();
    }, []);

    const refreshDreams = async () => {
        await fetchDreams();
    };

    return (
        <DreamContext.Provider value={{ dreams, refreshDreams }}>
            {children}
        </DreamContext.Provider>
    )
};

export const useDreams = () => useContext(DreamContext);
