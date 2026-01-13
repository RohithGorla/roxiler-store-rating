const express = require("express")
const db = require("../config/db")
const auth = require("../middleware/authMiddleware")

const router = express.Router()

// Dashboard
router.get("/dashboard",auth(["admin"]),(req,res)=>{
 db.get("SELECT COUNT(*) as users FROM users",(e,u)=>{
  db.get("SELECT COUNT(*) as stores FROM stores",(e,s)=>{
   db.get("SELECT COUNT(*) as ratings FROM ratings",(e,r)=>{
    res.json({users:u.users,stores:s.stores,ratings:r.ratings})
   })
  })
 })
})

// Add user
router.post("/users",auth(["admin"]),(req,res)=>{
 const {name,email,password,address,role}=req.body
 db.run(
  "INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)",
  [name,email,password,address,role]
 )
 res.json("User added")
})

// Add store
router.post("/stores",auth(["admin"]),(req,res)=>{
 const {name,email,address,owner_id}=req.body
 db.run(
  "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)",
  [name,email,address,owner_id]
 )
 res.json("Store added")
})

// List users
router.get("/users",auth(["admin"]),(req,res)=>{
 db.all("SELECT id,name,email,address,role FROM users",(e,rows)=>{
  res.json(rows)
 })
})

// List stores
router.get("/stores",auth(["admin"]),(req,res)=>{
 db.all(`
  SELECT s.*,AVG(r.rating) as avgRating
  FROM stores s
  LEFT JOIN ratings r ON s.id=r.store_id
  GROUP BY s.id
 `,(e,rows)=>res.json(rows))
})

module.exports = router
