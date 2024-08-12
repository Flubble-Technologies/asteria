export interface ColumnSort {
  desc: boolean;
  id: string;
}

export type SortingState = ColumnSort[];

export interface IQuery {
  page: number;
  limit: number;
  sorting?: SortingState[number];
  filters?: Record<string, unknown>;
}


export const useFilter = (query: IQuery, setQuery: (query: IQuery) => void) => {
  const setFilter = (key: string, value: unknown) => {
    setQuery({
      ...query,
      filters: {
        ...query.filters,
        [key]: value,
      },
    });
  };



  return {
    setFilter,
  };
}