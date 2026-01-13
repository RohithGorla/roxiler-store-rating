import { useNavigate } from "react-router-dom"

export default function Sidebar(){
 const nav = useNavigate()

 return(
  <div className="sidebar">
    <h3>Roxiler App</h3>

    <p onClick={()=>nav("/user")}>Dashboard</p>
    <p onClick={()=>nav("/")}>Logout</p>
  </div>
 )
}
