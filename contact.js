'use strict'

export default class Contact {
  constructor(db) {
    this.db = db
  }

  add(name, phone, email) {
    this.db.serialize( () => {
      let query = `INSERT INTO contacts(name, phone, email) VALUES ('${name}', '${phone}', '${email}')`
      this.db.run(query, (err) => {
        if(err) console.log(err)
        else console.log("Add contact is success")
      })
    })
  }

  view() {
    this.db.serialize( () => {
      let query = `SELECT contacts.*, subquery.groupname AS group_contacts FROM contacts LEFT JOIN (SELECT * FROM group_contacts, groups WHERE group_contacts.group_id = groups.id) AS subquery ON subquery.contact_id = contacts.id`
      this.db.each(query, (err, row) => {
        if(!err) console.log(`\nID : ${row.id}\nName : ${row.name}\nPhone : ${row.phone}\nEmail : ${row.email}\nGroup name : ${row.group_contacts}`)
        else console.log(err)
      })
    })
  }

  update(id, name, phone, email) {
    this.db.serialize( () => {
      let query = `UPDATE contacts SET name = '${name}', phone= '${phone}', email = '${email}' WHERE id = ${id}`
      // console.log(query);
      this.db.run(query, (err) => {
        if(!err) console.log("Updated contact successfully");
        else console.log(err);
      })
    })
  }

  delete(id) {
    this.db.serialize( () => {
      let query = `DELETE FROM contacts WHERE id = ${id}`
      this.db.run(query, (err) => {
        if(!err) console.log("Deleted contact successfully")
        else console.log(err);
      })
    })
  }

}