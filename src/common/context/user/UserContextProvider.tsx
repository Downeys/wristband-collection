'use client';

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { UserContextState } from "./UserContextState";
import { InitialUserContextState } from "./InitialUserContextState";
import { useUser } from "@auth0/nextjs-auth0";
import UsersApi from "@/apis/UsersApi";

interface InternalState {
    userId: string | null;
    username: string | null;
    email: string | null;
    firstName?: string | null;
    lastName?: string | null;
 }

export const UserContext = createContext<UserContextState>(InitialUserContextState);

export default function UserContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { user, isLoading, error } = useUser();
    const [state, setState] = useState<InternalState>({ ...InitialUserContextState });
    useEffect(() => {
        (async () => {
            if (user?.email && !state.email) {
                var userProfile = await UsersApi.getUserByEmail(user.email);
                if (!userProfile || !userProfile.email) {
                    userProfile = await UsersApi.createUser({ username: user.nickname ?? user.email, email: user.email})
                }
                setState({
                    userId: userProfile.id,
                    username: userProfile.username,
                    email: userProfile.email,
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName
                })
            }
        })()
    }, [user])
    const value = useMemo<UserContextState>(() => ({ ...state, isLoading, error }), [state, isLoading, error]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}