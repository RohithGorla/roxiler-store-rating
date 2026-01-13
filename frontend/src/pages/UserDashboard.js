import {useEffect,useState} from "react"
import api from "../services/api"
import Sidebar from "../components/Sidebar"

export default function UserDashboard(){
 const [stores,setStores]=useState([])
 const [search,setSearch]=useState("")

 useEffect(()=>{
  api.get("/user/stores")
   .then(res=>setStores(res.data))
 },[])

 const rate=(id,val)=>{
  api.post("/user/rating",{store_id:id,rating:val})
   .then(()=>alert("Rating saved"))
 }

 const filtered = stores.filter(s =>
  s.name.toLowerCase().includes(search.toLowerCase())
 )

 return(
  <div className="main">
   <Sidebar/>

   <div className="content">

    <div className="topbar">
      <h2>User Dashboard</h2>
      <input
        placeholder="Search store..."
        onChange={e=>setSearch(e.target.value)}
      />
    </div>

    <div className="card-grid">
     {filtered.map(s=>(
      <div className="store-card" key={s.id}>
       <h4>{s.name}</h4>
       <p>{s.address}</p>
       <p>⭐ {s.avgRating || "N/A"}</p>

       {[1,2,3,4,5].map(n=>(
        <button
         key={n}
         className="star-btn"
         onClick={()=>rate(s.id,n)}
        >
         {n}
        </button>
       ))}
      </div>
     ))}
    </div>

   </div>
  </div>
 )
}
