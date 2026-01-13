import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../App.css"

export default function Login(){
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const nav = useNavigate()

 const login=async()=>{
  try{
   const res = await api.post("/auth/login",{email,password})
   localStorage.setItem("token",res.data.token)

   if(res.data.role==="admin") nav("/admin")
   else if(res.data.role==="owner") nav("/owner")
   else nav("/user")
  }catch{
   alert("Invalid login")
  }
 }

 return(
  <div className="auth-container">
   <div className="auth-card">
    <h2>Login</h2>

    <input
     placeholder="Email"
     onChange={e=>setEmail(e.target.value)}
    />

    <input
     type="password"
     placeholder="Password"
     onChange={e=>setPassword(e.target.value)}
    />

    <button onClick={login}>Login</button>

    <p className="switch" onClick={()=>nav("/signup")}>
     New user? Signup
    </p>
   </div>
  </div>
 )
}
