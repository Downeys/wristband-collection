import { useRouter } from 'next/navigation';
import React, { createContext } from 'react';

interface RouterContext {

}

export const RouterContext = createContext<RouterContext>({})

export const RouterProvider = ({ children, props }: { children: React.ReactNode, props: RouterContext }) => {
    const router = useRouter()
    const value = {};
    return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>

}