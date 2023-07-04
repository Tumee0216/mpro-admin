import React from "react";
import { useSession } from 'next-auth/react'

export const Header = () => {
    const { data:session } = useSession()
    const user = session?.user.name;
    return(
        <div className="flex justify-between px-4 pt-4">
            <h2 className="text-black font-semibold">Dashboard</h2>
            <h2 className="text-black font-semibold">Welcome back, {user}</h2>
        </div>
    )
}