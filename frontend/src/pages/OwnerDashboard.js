import {useEffect,useState} from "react"
import api from "../services/api"
import Sidebar from "../components/Sidebar"

export default function OwnerDashboard(){
 const [list,setList]=useState([])

 useEffect(()=>{
  api.get("/owner/dashboard")
   .then(res=>setList(res.data))
 },[])

 return(
  <div className="main">
   <Sidebar/>

   <div className="content">
    <h2>Store Ratings</h2>

    <div className="card-grid">
     {list.map((u,i)=>(
      <div className="store-card" key={i}>
       <h4>{u.name}</h4>
       <p>⭐ {u.rating}</p>
      </div>
     ))}
    </div>
   </div>
  </div>
 )
}
