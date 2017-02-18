const jsonfile = require('jsonfile');
const sqlite = require('sqlite3').verbose();
const faker = require('faker');
let file = 'data.db'
let db = new sqlite.Database(file)


export class Group{
  constructor(data){
    this.group_name = data["group_name"]
    this.created_at = data["created_at"] || new Date()
  }


  addGroup(){
    let SEED_GROUP = `INSERT INTO groups (group_name, created_at) VALUES ('${this.group_name}','${this.created_at}');`

    db.serialize(function() {
      db.run(SEED_GROUP,function(err){
        if (err){
          console.log(err);
        } else {
          console.log(`New group has been added`);
        }
      })
    })
  }

  showGroup(){
    let SHOW_GROUP = `SELECT * FROM groups`

    db.serialize(function() {
      db.all(SHOW_GROUP,function(err,rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }

  updateGroup(id,col,val){
    let UPDATE_GROUP = `UPDATE groups SET ${col} = '${val}' WHERE id = ${id}`

    db.serialize(function() {
      db.all(UPDATE_GROUP,function(err){
        if (err){
          console.log(err);
        } else {
          console.log("data has been successfully updated");
        }
      })
    })
    // this.seedContact(UPDATE_CONTACT,"update")
  }

  deleteGroup(id){
    let DELETE_GROUP = `DELETE FROM groups WHERE id = ${id}`


    db.serialize(function() {
      db.all(DELETE_GROUP,function(err){
        if (err){
          console.log(err);
        } else {
          console.log("data has been successfully deleted");
        }
      })
    })

  }

}
