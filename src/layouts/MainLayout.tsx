import { PropsWithChildren } from "react"

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <main className="flex min-w-screen min-h-screen flex-col p-12 dark:bg-slate-950">
            {children}
        </main>
    )
}