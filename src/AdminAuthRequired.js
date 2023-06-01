import { redirect } from "react-router-dom"

export async function AdminAuthRequired() {
    const isLoggedin = localStorage.getItem("isAdminLoggedin")
    
    if(!isLoggedin){
        return redirect("/admin")
    }

    return null
}

