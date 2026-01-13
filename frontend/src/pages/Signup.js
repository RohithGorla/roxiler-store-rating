import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "../App.css"

export default function Signup(){
 const [form,setForm]=useState({})
 const nav=useNavigate()

 const signup=async()=>{
  await api.post("/auth/signup",form)
  alert("Registered")
  nav("/")
 }

 return(
  <div className="auth-container">
   <div className="auth-card">
    <h2>Create Account</h2>

    <input
     placeholder="Full Name"
     onChange={e=>setForm({...form,name:e.target.value})}
    />

    <input
     placeholder="Email"
     onChange={e=>setForm({...form,email:e.target.value})}
    />

    <input
     placeholder="Address"
     onChange={e=>setForm({...form,address:e.target.value})}
    />

    <input
     type="password"
     placeholder="Password"
     onChange={e=>setForm({...form,password:e.target.value})}
    />

    <button onClick={signup}>Signup</button>

    <p className="switch" onClick={()=>nav("/")}>
     Already have account? Login
    </p>
   </div>
  </div>
 )
}
