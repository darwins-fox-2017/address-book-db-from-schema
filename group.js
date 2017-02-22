'use strict'

export default class Group {
  constructor(db) {
    this.db = db
  }

 add(nama) {
   this.db.serialize( () => {
     let query = `INSERT INTO groups(groupname) VALUES ('${name}')`
     this.db.run(query, (err) => {
       if(!err) console.log("Insert group is success");
       else console.log(err);
     })
   })
 }

 view() {
   this.db.serialize( () => {
     let query = `SELECT * FROM groups`
     this.db.each(query, (err, row) => {
       if(!err) console.log(`\nID : ${row.id}\n Group Name : ${row.groupname}`)
       else console.log(err);
     })
   })
 }

 update(id, newName) {
   this.db.serialize( () => {
     let query = `UPDATE groups SET groupname = '${newName}' WHERE id = ${id}`
     this.db.run(query, (err) => {
       if(!err) console.log("Updated group successfully")
       else console.log(err);
     })
   })
 }

 delete(id) {
   this.db.serialize( () => {
     let query = `DELETE FROM groups WHERE id = ${id}`
     this.db.run(query, (err) => {
       if(!err) console.log("Delete groups success");
       else console.log(err);
     })
   })
 }

}