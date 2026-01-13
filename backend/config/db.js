const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./database.db")

db.serialize(()=>{

// USERS TABLE
db.run(`CREATE TABLE IF NOT EXISTS users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 email TEXT UNIQUE,
 password TEXT,
 address TEXT,
 role TEXT
)`)

// STORES TABLE
db.run(`CREATE TABLE IF NOT EXISTS stores(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 email TEXT,
 address TEXT,
 owner_id INTEGER
)`)

// RATINGS TABLE
db.run(`CREATE TABLE IF NOT EXISTS ratings(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 user_id INTEGER,
 store_id INTEGER,
 rating INTEGER,
 UNIQUE(user_id,store_id)
)`)

// CHECK IF STORES EXIST
db.get("SELECT COUNT(*) as count FROM stores",(err,row)=>{
 if(err){
  console.log(err)
 }
 else if(row.count === 0){

  // INSERT SAMPLE STORES ONLY ONCE
  db.run(`
  INSERT INTO stores (name,email,address,owner_id) VALUES
  ('Mega Mart Super Store','megamart@gmail.com','Hyderabad, Telangana',2),
  ('Fresh Basket Grocery','freshbasket@gmail.com','Bangalore, Karnataka',2),
  ('City Electronics Hub','cityelectronics@gmail.com','Chennai, Tamil Nadu',2),
  ('Fashion World','fashionworld@gmail.com','Mumbai, Maharashtra',2),
  ('Daily Needs Store','dailyneeds@gmail.com','Pune, Maharashtra',2)
  `)

  console.log("Sample stores inserted successfully")
 }
})

})

module.exports = db
