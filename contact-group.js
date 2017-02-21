'use strict'

export default class contactGroup {
  constructor(db) {
    this.db = db
  }

  add(contactId, groupId) {
    this.db.serialize( () => {
      let query = `INSERT INTO group_contacts(contact_id, group_id) VALUES (${contactId}, ${groupId})`
      this.db.run(query, (err) => {
        if(!err)
          console.log("Insert Contact Group succes");
        else
          console.log(err);
      })
    })
  }

  view() {
    this.db.serialize( () => {
      let query = `SELECT * FROM group_contacts`
      this.db.each(query, (err, row) => {
        if(!err)
          console.log(`\nID : ${row.id}\nID Contact : ${row.contact_id}\nID Group : ${row.group_id}`)
        else
          console.log(err);
      })
    })
  }
}
