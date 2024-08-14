import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDreamsApi, getDreamsByFilterApi } from '../../api/requests/dreams.api';
import { IDream } from '../../types/IDream';
import { DreamContext } from './dream-context';
import { IQuery } from '../../types/IQuery';

export const DreamProvider = ({ children }: any) => {
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState<any>(null);
    const [dreams, setDreams] = useState<IDream[]>([]);
    const [dreamsWithFilter, setDreamsWithFilter] = useState<IDream[]>([]);

    const fetchDreams = async () => {
        try {
            const response = await getDreamsApi();
            setDreams(response);
        } catch (error) {
            console.error('Failed to fetch dreams:', error);
        }
    };

    const fetchDreamsWithFilter = async (params: IQuery) => {
        getDreamsByFilterApi(params).then((response) => {
            setDreamsWithFilter(response.results);
            setHasMore(response.totalResults > response.results.length);
            setError(null);
        }).catch((error) => {
            console.error('Failed to fetch dreams:', error);
            setError(error);
        });
    }


    useEffect(() => {
        fetchDreams();
    }, []);

    const refreshDreams = async () => {
        await fetchDreams();
    };

    return (
        <DreamContext.Provider value={{ dreams, refreshDreams, hasMore, setDreamsWithFilter, dreamsWithFilter, setHasMore, fetchDreamsWithFilter, error }}>
            {children}
        </DreamContext.Provider>
    )
};

export const useDreams = () => useContext(DreamContext);
