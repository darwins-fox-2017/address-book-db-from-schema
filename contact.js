'use strict'

export default class Contact {
  constructor(db) {
    this.db = db
  }

  add(nama, telp, email) {
    this.db.serialize( () => {
      let query = `INSERT INTO contacts(nama, telp, email) VALUES ('${nama}', '${telp}', '${email}')`
      this.db.run(query, (err) => {
        if(err)
          console.log(err)
        else
          console.log("Add contact success")
      })
    })
  }

  view() {
    this.db.serialize( () => {
      let query = `SELECT contacts.*, subquery.namagroup AS group_contacts FROM contacts LEFT JOIN (SELECT * FROM group_contacts, groups WHERE group_contacts.group_id = groups.id) AS subquery ON subquery.contact_id = contacts.id`
      this.db.each(query, (err, row) => {
        if(!err)
          console.log(`\nID : ${row.id}\nNama : ${row.nama}\nTelp : ${row.telp}\nEmail : ${row.email}\nNama Group : ${row.group_contacts}`)
        else
          console.log(err)
      })
    })
  }

  update(id, name, telp, email) {
    this.db.serialize( () => {
      let query = `UPDATE contacts SET nama = '${name}', telp = '${telp}', email = '${email}' WHERE id = ${id}`
      console.log(query);
      this.db.run(query, (err) => {
        if(!err)
          console.log("Update contacts success");
        else
          console.log(err);
      })
    })
  }

  delete(id) {
    this.db.serialize( () => {
      let query = `DELETE FROM contacts WHERE id = ${id}`
      this.db.run(query, (err) => {
        if(!err)
          console.log("Delete success")
        else
          console.log(err);
      })
    })
  }

}
