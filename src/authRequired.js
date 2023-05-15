import { redirect } from "react-router-dom"

export async function authRequired() {
    const isLoggedin = localStorage.getItem("isLoggedin")
    
    if(!isLoggedin){
        return redirect("/login")
    }

    return null
}

