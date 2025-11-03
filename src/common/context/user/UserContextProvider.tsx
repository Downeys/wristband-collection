'use client';

import React, { createContext, useEffect, useMemo } from "react";
import { UserContextState } from "./UserContextState";
import { InitialUserContextState } from "./InitialUserContextState";
import { useUser } from "@auth0/nextjs-auth0";
import UsersApi from "@/apis/UsersApi";
import { useQuery } from "@tanstack/react-query";

export const UserContext = createContext<UserContextState>(InitialUserContextState);

export default function UserContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const { user, isLoading, error } = useUser();
    const { data, isLoading: isQueryLoading, refetch } = useQuery({
        queryKey: ["getUserByEmail", user?.email],
        queryFn: async () => await UsersApi.getUserByEmail(user?.email ?? '')
    })
    useEffect(() => {
        (async () => {
            if (!isQueryLoading && user?.email && !data?.email) {
                await UsersApi.createUser({ username: user.nickname ?? user.email, email: user.email})
                refetch();
            }
        })()
    }, [user])
    const value = useMemo<UserContextState>(() => ({
        userId: data?.id ?? '',
        username: data?.username ?? '',
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email ?? '',
        isLoading,
        error
    }), [data, isLoading, error]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}