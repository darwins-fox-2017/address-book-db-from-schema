"use strict"

const sqlite = require('sqlite3').verbose()
const repl = require ('repl')

const file = 'address_book.db'
const db = new sqlite.Database(file)

//SQL STATEMENT
let ADD_GROUP = "INSERT INTO groups (groupName, createdAt) VALUES ($groupName, Date('now'))"
let UPDATE_GROUP = "UPDATE groups SET groupName = $groupName, createdAt = Date('now') WHERE id = $id"
let DELETE_GROUP = "DELETE FROM groups WHERE id = $id"
let DELETE_GROUP_DETAILS = "DELETE FROM group_details WHERE groupId = $id"
let SHOW_DATA =  "SELECT groups.*, subquery.firstName AS members FROM groups LEFT JOIN (SELECT * FROM group_details,contacts where group_details.contactId = contacts.id) AS subquery ON subquery.groupId = groups.id"

export class Groups {
  constructor() {}

  addGroup(groupName){
    db.serialize(function(){
      db.run(ADD_GROUP, {$groupName:groupName}, function(err){
        err ? console.log(err):console.log("SEED DATA SUCCESSFUL");
      })
    })
  }

  updateGroup(groupName,id){
    db.serialize(function(){
      db.run(UPDATE_GROUP, {$id:id, $groupName:groupName}, function(err){
        err ? console.log(err):console.log(`UPDATE DATA SUCCESSFUL`)
      })
    })
  }

  deleteGroup(id){
    db.serialize(function(){
      db.run(DELETE_GROUP, {$id:id}, function(err){
        err ? console.log(err):console.log(`DATA HAS BEEN DELETED`);
      })
    })

    db.serialize(function(){
      db.run(DELETE_GROUP_DETAILS,{$id:id}, function(err){
        err ? console.log(err):console.log(`DATA HAS BEEN DELETED IN CONTACT GROUPS`)
      })
    })
  }

  showGroups(){
    db.serialize(function(){
      db.each(SHOW_DATA, function(err, row){
        err ? console.log(err):console.log(row)
      })
    })
  }
}
