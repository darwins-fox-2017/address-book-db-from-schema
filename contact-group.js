export defaul class contactGroup {

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
  //
  // update(id, newNama) {
  //   db.serialize( () => {
  //     let query = `UPDATE groups SET namagroup = '${newNama} WHERE id = ${id}'`
  //     db.run(query, (err) => {
  //       if(!err)
  //         console.log("Update group berhasil")
  //       else
  //         console.log(err);
  //     })
  //   })
  // }
  //
  // delete(id) {
  //   db.serialize( () => {
  //     let query = `DELETE groups WHERE id = ${id}`
  //     db.run(query, (err) => {
  //       if(!err)
  //         console.log("Delete groups success");
  //       else
  //         console.log(err);
  //     })
  //   })
  // }
  
}
