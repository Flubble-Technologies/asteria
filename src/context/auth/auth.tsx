


import { useMemo, ReactNode, useEffect, useReducer, useCallback } from 'react';


import { AuthContext } from './auth-context';
import { AuthConsumer } from './auth-consumer';
import {  loginApi, logoutApi, meApi, refreshTokenAPI, signupApi } from '../../api/requests/auth.api';
import { IUserResponse } from '../../types/ILogin-response';
import { ILogin, ISignup } from '../../types/auth.types';
import { initializeApiService } from '../../services/api.service';

interface Payload {
    loading: boolean;
    authenticated: boolean;
    user: IUserResponse | null;
}

const initialState: Payload = {
    user: null,
    loading: true,
    authenticated: false,
};

const reducer = (_: Payload, payload: Payload): Payload => payload;

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const clearSession = () => {
        dispatch({
            user: null,
            loading: false,
            authenticated: false,
        });
    };

    const setSession = (user: IUserResponse) => {
        dispatch({
            user,
            loading: false,
            authenticated: true,
        });
    };

    const initialize = useCallback(async function () {
        console.log('Initializing authentication context...');
        try {
            await refreshToken();
            const user = await meApi();
            console.log('User fetched successfully:', user);
            setSession(user);
        } catch (err) {
            console.error('Failed to fetch user:', err);
            clearSession();
        }
    }, []);


    const login = useCallback(async (data: ILogin) => {
        try {
            const user = await loginApi(data);
            setSession(user);
            return user;
        } catch (error) {
            throw error;
        }
    }, []);

    const signUp = useCallback(async (data: ISignup, options: any) => {
        try {
            return await signupApi(data, options);
        } catch (error) {
            //console.log("hata signupta", error)
            throw error;
        }
    }, []);


    const refreshToken = useCallback(async () => {
        console.log('Refreshing token...');
        try {
            /* dispatch({
                loading: true,
                authenticated: false,
                user: null,
            }); */
            await refreshTokenAPI();
            const user = await meApi();
            console.log('Token refreshed successfully:', user);
            setSession(user);
            return user;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            clearSession();
            throw error;
        }
    }, []);


    const logout = useCallback(async (check: boolean) => {
        try {
            console.log('Logging out...', state.authenticated);
            if (check && state.authenticated) {
                clearSession();
                await logoutApi();
            } else {
                await refreshToken();
            }
        } catch (error) {
            clearSession();
            throw error;
        }
    }, [state.authenticated, refreshToken]);

    const logoutCallback = useCallback(
        (check: boolean) => {
            logout(check);
        },
        [logout],
    );

    useEffect(() => {
        initialize();
        //refreshToken();
    }, [initialize, refreshToken]);


    const memoized = useMemo(
        () => ({
            ...state,
            login,
            logout,
            clearSession,
            user: state.user,
            refreshUser: initialize,
            authenticated: state.authenticated,
            signUp,
        }),
        [login, logout, initialize, state],
    );


    const providerValue = useMemo(
        () => ({
            ...memoized,
            logoutCallback,
        }),
        [memoized, logoutCallback],
    );

    useEffect(() => {
        initializeApiService(logoutCallback);
        //initialize();
    }, [initialize, logoutCallback]);

    return (
        <AuthContext.Provider value={providerValue}>
            <AuthConsumer>{children}</AuthConsumer>
        </AuthContext.Provider>
    );
}
