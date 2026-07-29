"use server"

import { validateAccessToken } from "@/service/validateAccessToken"

export const getAllProperties = async()=>{
    const accessToken = await validateAccessToken();

    const res = await fetch(`${process.env.BACKEND_API_URL}/properties`,{
        headers:{
            Cookie:`accessToken=${accessToken}`
        },
        cache:"no-store"
    })

    const result = await res.json();
    return result;
}