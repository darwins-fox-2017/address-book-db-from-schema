export default class Contact {

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
