const express = require("express")
const db = require("../config/db")
const auth = require("../middleware/authMiddleware")

const router = express.Router()

// View stores
router.get("/stores",auth(["user"]),(req,res)=>{
 db.all(`
  SELECT s.*,AVG(r.rating) as avgRating
  FROM stores s
  LEFT JOIN ratings r ON s.id=r.store_id
  GROUP BY s.id
 `,(e,rows)=>res.json(rows))
})

// Rate store
router.post("/rating",auth(["user"]),(req,res)=>{
 const {store_id,rating}=req.body

 db.run(
  "INSERT OR REPLACE INTO ratings(user_id,store_id,rating) VALUES(?,?,?)",
  [req.user.id,store_id,rating]
 )
 res.json("Rating submitted")
})

module.exports = router
