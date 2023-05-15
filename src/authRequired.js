import { redirect } from "react-router-dom"

export async function authRequired() {
    const isLoggedin = true
    
    if(!isLoggedin){
        return redirect("/login")
    }

    return null
}

// localStorage.getItem("isLoggedin")