const repl = require("repl")
const sqlite3 = require("sqlite3")
const fs = require("fs")

let file = "address_book.db"
let db = new sqlite3.Database(file)

let arrContact = JSON.parse(fs.readFileSync("seedContacts.json", "utf-8"))
let arrGroup = JSON.parse(fs.readFileSync("seedGroups.json", "utf-8"))
let arrGroupContact = JSON.parse(fs.readFileSync("seedGroupContacts.json", "utf-8"))


const QUERY_CONTACT = `CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL)`
const QUERY_GROUP = `CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL)`
const QUERY_GROUPCONTACT = `CREATE TABLE IF NOT EXISTS group_contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,contact_id INTEGER, group_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id),FOREIGN KEY(group_id) REFERENCES groups(id))`


let createTable = () => {
  db.serialize( () => {
    db.run(QUERY_CONTACT, (err) => {
      if(err)
        console.log(err)
      else
        console.log("Created contact successfully")
    })
    db.run(QUERY_GROUP, (err) => {
      if(err)
        console.log(err)
      else
        console.log("Created group successfully")
    })
    db.run(QUERY_GROUPCONTACT, (err) => {
      if(err)
        console.log(err)
      else
        console.log("Created groupcontact successfully");
    })
  })
}

let seedData = () => {
  db.serialize( () => {
    let stmt = db.prepare("INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)")
    for(let i=0; i<arrContact.length; i++) {
      stmt.run(arrContact[i].name, arrContact[i].phone, arrContact[i].email)
    }
    stmt.finalize()

    stmt = db.prepare("INSERT INTO groups (groupname) VALUES (?)")
    for(let i=0; i<arrGroup.length; i++) {
      stmt.run(arrGroup[i].groupname)
    }
    stmt.finalize()

    stmt = db.prepare("INSERT INTO group_contacts (contact_id, group_id) VALUES (?, ?)")
    for(let i=0; i<arrGroupContact.length; i++) {
      stmt.run(arrGroupContact[i].contact_id, arrGroupContact[i].group_id)
    }
    stmt.finalize()

  })
}

let repel = repl.start('Command Here> ')
repel.context.createTable = createTable
repel.context.seedData = seedData