'use strict'

export default class Group {
  constructor(db) {
    this.db = db
  }

 add(nama) {
   this.db.serialize( () => {
     let query = `INSERT INTO groups(namagroup) VALUES ('${nama}')`
     this.db.run(query, (err) => {
       if(!err)
         console.log("Insert group succes");
       else
         console.log(err);
     })
   })
 }

 view() {
   this.db.serialize( () => {
     let query = `SELECT * FROM groups`
     this.db.each(query, (err, row) => {
       if(!err)
         console.log(`\nID : ${row.id}\nNama Group : ${row.namagroup}`)
       else
         console.log(err);
     })
   })
 }

 update(id, newNama) {
   this.db.serialize( () => {
     let query = `UPDATE groups SET namagroup = '${newNama}' WHERE id = ${id}`
     this.db.run(query, (err) => {
       if(!err)
         console.log("Update group berhasil")
       else
         console.log(err);
     })
   })
 }

 delete(id) {
   this.db.serialize( () => {
     let query = `DELETE FROM groups WHERE id = ${id}`
     this.db.run(query, (err) => {
       if(!err)
         console.log("Delete groups success");
       else
         console.log(err);
     })
   })
 }

}
