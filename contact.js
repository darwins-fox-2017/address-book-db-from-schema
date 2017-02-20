export default class Contact {

  add(nama, telp, email) {
    db.serialize( () => {
      let query = `INSERT INTO contacts(nama, telp, email) VALUES ('${nama}', '${telp}', '${email}')`
      db.run(query (err) => {
        if(err)
          console.log(err)
        else
          console.log("Add contact success")
      })
    })
  }

  view() {
    db.serialize( () => {
      let query = `SELECT * FROM contacts`
      db.each(query (err, row) => {
        if(!err)
          console.log(`ID : ${row.id}\nNama : ${row.nama}\nTelp : ${row.telp}\nEmail : ${row.email}`)
        else
          console.log(err)
      })
    })
  }

  update(id, col, data) {
    db.serialize( () => {
      let query = `UPDATE contacts SET ${col} = '${data}' WHERE id = ${id}`
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
