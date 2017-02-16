const sqlite3 = require('sqlite3').verbose();
let file = 'contacts.db';
var db = new sqlite3.Database(file);

class ContactGroup{
  static addConection(group_id,contact_id){
    let ADD_CONECTION_QUERY = `INSERT INTO groups_contacs (group_id,contac_id) values(?,?)`
    db.run(ADD_CONECTION_QUERY,[group_id,contact_id], function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('add data success');
      }
    })
  }

  static changeConection(id,group_id,contact_id){
    let CHANGE_CONECTION_QUERY=`UPDATE groups_contacs set group_id=${group_id} contac_id=${contact_id} WHERE id =${id} `
    db.run(CHANGE_CONECTION_QUERY, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('change data success');
      }
    })
  }

  static deleteConection(id){
    let DELETE_CONECTION_QUERY=`DELETE FROM groups_contacs WHERE id =${id}`
    db.run(DELETE_CONECTION_QUERY, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('delete data success');
      }
    })
  }

}


export default ContactGroup
