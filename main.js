"use strict"
const repl = require("repl")
const sqlite3 = require("sqlite3")

let file = "address_book.db"
let db = new sqlite3.Database(file)

// import Contact from "./contact.js"
// import Group from "./group.js"
// import contactGroup from "./contact-group.js"

class Contact {

  add(nama, telp, email) {
    db.serialize( () => {
      let query = `INSERT INTO contacts(nama, telp, email) VALUES ('${nama}', '${telp}', '${email}')`
      db.run(query, (err) => {
        if(err)
          console.log(err)
        else
          console.log("Add contact success")
      })
    })
  }

  view() {
    db.serialize( () => {
      let query = `SELECT contacts.*, subquery.namagroup AS group_contacts FROM contacts LEFT JOIN (SELECT * FROM group_contacts, groups WHERE group_contacts.group_id = groups.id) AS subquery ON subquery.contact_id = contacts.id`
      db.each(query, (err, row) => {
        if(!err)
          console.log(`\nID : ${row.id}\nNama : ${row.nama}\nTelp : ${row.telp}\nEmail : ${row.email}\nNama Group : ${row.group_contacts}`)
        else
          console.log(err)
      })
    })
  }

  update(id, name, telp, email) {
    db.serialize( () => {
      let query = `UPDATE contacts SET name = '${name}', telp = '${telp}', email = ${email} WHERE id = ${id}`
      db.run(query, (err) => {
        if(!err)
          console.log("Update contacts success");
        else
          console.log(err);
      })
    })
  }

  delete(id) {
    db.serialize( () => {
      let query = `DELETE FROM contacts WHERE id = ${id}`
      db.run(query, (err) => {
        if(!err)
          console.log("Delete success")
        else
          console.log(err);
      })
    })
  }

}


class Group {

 add(nama) {
   db.serialize( () => {
     let query = `INSERT INTO groups(namagroup) VALUES ('${nama}')`
     db.run(query, (err) => {
       if(!err)
         console.log("Insert group succes");
       else
         console.log(err);
     })
   })
 }

 view() {
   db.serialize( () => {
     let query = `SELECT * FROM groups`
     db.each(query, (err, row) => {
       if(!err)
         console.log(`\nID : ${row.id}\nNama Group : ${row.namagroup}`)
       else
         console.log(err);
     })
   })
 }

 update(id, newNama) {
   db.serialize( () => {
     let query = `UPDATE groups SET namagroup = '${newNama}' WHERE id = ${id}`
     db.run(query, (err) => {
       if(!err)
         console.log("Update group berhasil")
       else
         console.log(err);
     })
   })
 }

 delete(id) {
   db.serialize( () => {
     let query = `DELETE FROM groups WHERE id = ${id}`
     db.run(query, (err) => {
       if(!err)
         console.log("Delete groups success");
       else
         console.log(err);
     })
   })
 }

}

class contactGroup {

  add(contactId, groupId) {
    db.serialize( () => {
      let query = `INSERT INTO group_contacts(contact_id, group_id) VALUES (${contactId}, ${groupId})`
      db.run(query, (err) => {
        if(!err)
          console.log("Insert Contact Group succes");
        else
          console.log(err);
      })
    })
  }

  view() {
    db.serialize( () => {
      let query = `SELECT * FROM group_contacts`
      db.each(query, (err, row) => {
        if(!err)
          console.log(`\nID : ${row.id}\nID Contact : ${row.contact_id}\nID Group : ${row.group_id}`)
        else
          console.log(err);
      })
    })
  }
}

class Main {
  constructor() {
    this.contact = new Contact()
    this.group = new Group()
    this.contactGroup = new contactGroup()
  }

  //Done
  showContact() {
    this.contact.view()
  }

  //Done
  insertContact(name, telp, email) {
    this.contact.add(name, telp, email)
  }

  //Done
  insertContactToGroup(contact_id, group_id) {
    this.contactGroup.add(contact_id, group_id)
  }

// Ganti Contact Update()
  updateContact(id, name, telp, email) {
    this.contact.update(id, name, telp, email)
  }

  //Done
  deleteContact(id) {
    this.contact.delete(id)
  }
  // Done
  insertGroup(name) {
    this.group.add(name)
  }

  //Done
  updateGroup(id, name) {
    this.group.update(id, name)
  }

  //Done
  deleteGroup(id) {
    this.group.delete(id)
  }

  //Done
  showGroup() {
    this.group.view()
  }

}

let r = repl.start("> ")
let main = new Main()
r.context.main = main
