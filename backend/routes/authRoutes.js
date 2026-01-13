const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../config/db")
const auth = require("../middleware/authMiddleware")

const router = express.Router()

// SIGNUP
router.post("/signup", async(req,res)=>{
 const {name,email,password,address}=req.body
 const hash = await bcrypt.hash(password,10)

 db.run(
  "INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)",
  [name,email,hash,address,"user"],
  (err)=>{
   if(err) return res.status(400).json(err.message)
   res.json("User registered")
  }
 )
})

// LOGIN
router.post("/login",(req,res)=>{
 const {email,password}=req.body

 db.get("SELECT * FROM users WHERE email=?",[email],async(err,user)=>{
  if(!user) return res.status(400).json("User not found")

  const match = await bcrypt.compare(password,user.password)
  if(!match) return res.status(400).json("Wrong password")

  const token = jwt.sign(
    {id:user.id,role:user.role},
    "SECRET"
  )

  res.json({token,role:user.role})
 })
})

// UPDATE PASSWORD
router.patch("/update-password",auth(),async(req,res)=>{
 const {newPassword}=req.body
 const hash = await bcrypt.hash(newPassword,10)

 db.run(
  "UPDATE users SET password=? WHERE id=?",
  [hash,req.user.id]
 )
 res.json("Password updated")
})

module.exports = router
