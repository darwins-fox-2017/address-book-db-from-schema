const sqlite = require('sqlite3').verbose();
let fileName = 'contacts.db';
var db = new sqlite.Database(fileName);
const repl = require('repl')

class Group {
  constructor() {

  }

  static addGroup(groupName){
    let QUERY_ADD_GROUP = `INSERT INTO groups (name) VALUES (?)`
    db.run(QUERY_ADD_GROUP, [groupName], function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(`Group ${groupName} added succesfully!`);
      }
    })
  }

  static showAll(){
    let QUERY_SHOW_ALL_GROUP = `SELECT * FROM groups`
    db.each(QUERY_SHOW_ALL_GROUP, function(err, row){
      if (err) {
        console.log(err);
      } else {
        console.log(row);
      }
    })
  }

  static deleteGroup(id) {
       let DELETE_GROUP_QUERY = `DELETE FROM groups WHERE id=${id}`
       db.run(DELETE_GROUP_QUERY, function(err) {
           if (err) {
               console.log(err);
           } else {
               console.log('group was deleted');
           }
       })
   }

   static changeGroupName(id, newName) {
       let DELETE_GROUP_QUERY = `UPDATE groups SET name = "${newName}" WHERE id=${id}`
       db.run(DELETE_GROUP_QUERY, function(err) {
           if (err) {
               console.log(err);
           } else {
               console.log('Group name was changed');
           }
       })
}
}

export default Group
