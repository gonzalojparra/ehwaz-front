'use client'
import axios from "@/lib/axios";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export default async function Page(){
    const router = useRouter();

    useEffect(()=>{
        axios.post('/api/permissions', {url: window.location.pathname}).then((response)=>{
            if(response.data.data == false){
                router.push('/')
            }
        });            
    }, [])

    return (
        <div>ASDDSA</div>
    )
}