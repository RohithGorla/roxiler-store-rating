import { useNavigate } from "react-router-dom"

export default function Navbar(){
 const nav = useNavigate()

 const logout = ()=>{
  localStorage.clear()
  nav("/")
 }

 return(
  <div className="nav">
    <h3>Roxiler App</h3>
    <button onClick={logout}>Logout</button>
  </div>
 )
}
