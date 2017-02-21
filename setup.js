const repl = require("repl")
const sqlite3 = require("sqlite3")
const fs = require("fs")

let file = "address_book.db"
let db = new sqlite3.Database(file)

let arrContact = JSON.parse(fs.readFileSync("seedContact.json", "utf-8"))
let arrGroup = JSON.parse(fs.readFileSync("seedGroup.json", "utf-8"))
let arrGroupContact = JSON.parse(fs.readFileSync("seedGroupContact.json", "utf-8"))

console.log(arrGroup[0].nama)

QUERY_CONTACT = `CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL, telp TEXT NOT NULL, email TEXT NOT NULL)`
QUERY_GROUP = `CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, namagroup TEXT NOT NULL)`
QUERY_GROUPCONTACT = `CREATE TABLE IF NOT EXISTS group_contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,contact_id INTEGER, group_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id),FOREIGN KEY(group_id) REFERENCES groups(id))`

// INSERT_CONTACT = `INSERT INTO contacts VALUES (nama, telp, text) VALUES `

// console.log("Test")

let createTable = () => {
  db.serialize( () => {
    db.run(QUERY_CONTACT, (err) => {
      if(err)
        console.log(err)
      else
        console.log("Create contact success")
    })
    db.run(QUERY_GROUP, (err) => {
      if(err)
        console.log(err)
      else
        console.log("Create Group Success")
    })
    db.run(QUERY_GROUPCONTACT, (err) => {
      if(err)
        console.log(err)
      else
        console.log("Finish");
    })
  })
}

let seedData = () => {
  db.serialize( () => {
    let stmt = db.prepare("INSERT INTO contacts (nama, telp, email) VALUES (?, ?, ?)")
    for(let i=0; i<arrContact.length; i++) {
      stmt.run(arrContact[i].nama, arrContact[i].telp, arrContact[i].email)
    }
    stmt.finalize()

    stmt = db.prepare("INSERT INTO groups (namagroup) VALUES (?)")
    for(let i=0; i<arrGroup.length; i++) {
      stmt.run(arrGroup[i].nama)
    }
    stmt.finalize()

    stmt = db.prepare("INSERT INTO group_contacts (contact_id, group_id) VALUES (?, ?)")
    for(let i=0; i<arrGroupContact.length; i++) {
      stmt.run(arrGroupContact[i].contact_id, arrGroupContact[i].group_id)
    }
    stmt.finalize()

  })
}

let r = repl.start('> ')
r.context.createTable = createTable
r.context.seedData = seedData