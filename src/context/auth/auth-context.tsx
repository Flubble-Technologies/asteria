
import { useEffect, useContext, createContext } from 'react';

import { initializeApiService } from '../../services/api.service';
import { IUserResponse } from '../../types/ILogin-response';
import { ILogin, ISignup } from '../../types/auth.types';

interface IAuthContext {
    loading: boolean;
    authenticated: boolean;
    user: IUserResponse | null;
    login: (data: ILogin) => Promise<string>;
    logout: (check: boolean) => void;
    clearSession: () => void;
    refreshUser: () => Promise<void>;
    logoutCallback: (check: boolean) => void;
    signUp: (data: ISignup, options: any) => Promise<any>;
}

export const AuthContext = createContext({} as IAuthContext);

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('AuthContext context must be use inside AuthProvider');
    }

    useEffect(() => {
        initializeApiService(context.logoutCallback);
    }, [context.logoutCallback]);

    return context;
};
