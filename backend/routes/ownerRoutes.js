const express = require("express")
const db = require("../config/db")
const auth = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/dashboard",auth(["owner"]),(req,res)=>{
 db.get(
  "SELECT id FROM stores WHERE owner_id=?",
  [req.user.id],
  (e,store)=>{
   db.all(`
    SELECT u.name,r.rating
    FROM ratings r
    JOIN users u ON r.user_id=u.id
    WHERE r.store_id=?`,
    [store.id],
    (e,rows)=>{
     res.json(rows)
    })
  }
 )
})

module.exports = router
