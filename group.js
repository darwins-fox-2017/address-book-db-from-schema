export default class Group {

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
