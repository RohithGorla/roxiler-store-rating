const jwt = require("jsonwebtoken")

module.exports = (roles=[])=>{
 return (req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1]
  if(!token) return res.status(401).json("Token missing")

  try{
   const decoded = jwt.verify(token,"SECRET")
   if(roles.length && !roles.includes(decoded.role))
     return res.status(403).json("Access denied")

   req.user = decoded
   next()
  }catch(err){
   res.status(401).json("Invalid token")
  }
 }
}
