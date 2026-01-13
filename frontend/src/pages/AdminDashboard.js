import { useEffect, useState } from "react"
import api from "../services/api"
import Sidebar from "../components/Sidebar"

export default function AdminDashboard(){
 const [stats,setStats]=useState({})
 const [users,setUsers]=useState([])
 const [stores,setStores]=useState([])
 const [tab,setTab]=useState("stats")

 const [newUser,setNewUser]=useState({})
 const [newStore,setNewStore]=useState({})

 useEffect(()=>{
  api.get("/admin/dashboard")
   .then(res=>setStats(res.data))

  api.get("/admin/users")
   .then(res=>setUsers(res.data))

  api.get("/admin/stores")
   .then(res=>setStores(res.data))
 },[])

 const addUser=()=>{
  api.post("/admin/users",newUser)
   .then(()=>alert("User added"))
 }

 const addStore=()=>{
  api.post("/admin/stores",newStore)
   .then(()=>alert("Store added"))
 }

 return(
  <div className="main">
   <Sidebar/>

   <div className="content">

    {/* Tabs */}
    <div style={{marginBottom:"15px"}}>
     <button onClick={()=>setTab("stats")}>Stats</button>
     <button onClick={()=>setTab("users")}>Users</button>
     <button onClick={()=>setTab("stores")}>Stores</button>
    </div>

    {/* STATS */}
    {tab==="stats" && (
     <div className="card-grid">
      <div className="stat-card">
       <h2>{stats.users}</h2>
       <p>Total Users</p>
      </div>

      <div className="stat-card">
       <h2>{stats.stores}</h2>
       <p>Total Stores</p>
      </div>

      <div className="stat-card">
       <h2>{stats.ratings}</h2>
       <p>Total Ratings</p>
      </div>
     </div>
    )}

    {/* USERS */}
    {tab==="users" && (
     <>
     <h3>All Users</h3>

     <table border="1" width="100%">
      <tr>
       <th>Name</th>
       <th>Email</th>
       <th>Role</th>
      </tr>
      {users.map(u=>(
       <tr key={u.id}>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.role}</td>
       </tr>
      ))}
     </table>

     <h3>Add User</h3>
     <input placeholder="Name"
      onChange={e=>setNewUser({...newUser,name:e.target.value})}/>
     <input placeholder="Email"
      onChange={e=>setNewUser({...newUser,email:e.target.value})}/>
     <input placeholder="Password"
      onChange={e=>setNewUser({...newUser,password:e.target.value})}/>
     <input placeholder="Address"
      onChange={e=>setNewUser({...newUser,address:e.target.value})}/>
     <select
      onChange={e=>setNewUser({...newUser,role:e.target.value})}>
      <option>Select role</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
      <option value="owner">Owner</option>
     </select>

     <button onClick={addUser}>Add User</button>
     </>
    )}

    {/* STORES */}
    {tab==="stores" && (
     <>
     <h3>All Stores</h3>

     <table border="1" width="100%">
      <tr>
       <th>Name</th>
       <th>Email</th>
       <th>Address</th>
      </tr>
      {stores.map(s=>(
       <tr key={s.id}>
        <td>{s.name}</td>
        <td>{s.email}</td>
        <td>{s.address}</td>
       </tr>
      ))}
     </table>

     <h3>Add Store</h3>
     <input placeholder="Name"
      onChange={e=>setNewStore({...newStore,name:e.target.value})}/>
     <input placeholder="Email"
      onChange={e=>setNewStore({...newStore,email:e.target.value})}/>
     <input placeholder="Address"
      onChange={e=>setNewStore({...newStore,address:e.target.value})}/>
     <input placeholder="Owner ID"
      onChange={e=>setNewStore({...newStore,owner_id:e.target.value})}/>

     <button onClick={addStore}>Add Store</button>
     </>
    )}

   </div>
  </div>
 )
}
