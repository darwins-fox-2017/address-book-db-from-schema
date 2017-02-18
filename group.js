"use strict"

let sqlite3 = require('sqlite3')
let file = 'address_book.db'
let db = new sqlite3.Database(file)

class Group {

  static createGroup(groupName) {
    let SEED_DATA_GROUPS = `INSERT INTO groups (group_name, created_at) VALUES ('${groupName}','now Date()')`

    db.serialize(function() {
      db.run(SEED_DATA_GROUPS, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Insert new group succeed!!')
        }
      })
    })
  }

  static updateGroup(groupName, groupId) {
    let UPDATE_DATA_GROUPS = `UPDATE groups SET group_name = '${groupName}' WHERE id = '${groupId}'`

    db.serialize(function() {
      db.run(UPDATE_DATA_GROUPS, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Update new group succeed!!')
        }
      })
    })
  }

  static deleteGroup(groupId) {
    let DELETE_DATA_GROUP = `DELETE FROM groups WHERE id = '${groupId}'`

    db.serialize(function() {
      db.run(DELETE_DATA_GROUP,function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(`Delete 1 group succeed`)
        }
      })
    })
  }

  static showGroup() {
    let SHOW_DATA_GROUP = `SELECT * FROM groups`

    db.serialize(function() {
      db.all(SHOW_DATA_GROUP, function(err,row){
        if (err) {
          console.log(err)
        } else {
          console.log(row);
        }
      })
    })
  }
}

export default Group
