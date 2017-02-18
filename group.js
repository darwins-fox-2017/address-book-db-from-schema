"use strict"

const repl    = require("repl");
const sqlite  = require('sqlite3').verbose()
var file      = 'address_book.db'
var db        = new sqlite.Database(file)

//SQL
let INSERT_DATA           = "INSERT INTO groups (group_name, created_at) VALUES ($group_name, date('now'))"
let UPDATE_DATA           = "UPDATE groups SET group_name = $group_name,created_at = $created_at WHERE id = $id"
let DELETE_DATA           = "DELETE FROM groups WHERE id = $id"
let DELETE_GROUP_CONTACTS = "DELETE FROM group_contacts WHERE group_id = $id"
let SHOW_DATA             = "SELECT groups.*, subquery.name AS member_name FROM groups LEFT JOIN (SELECT * FROM group_contacts, contacts WHERE group_contacts.contact_id = contacts.id) AS subquery ON subquery.group_id = groups.id"

export class Groups{
  static addGroup(group_name, created_at){
      db.serialize(function(){
        db.run(INSERT_DATA,{
          $group_name: group_name,
          $created_at: created_at
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log(':: SUCCESS INSERT DATA GROUP ::');
          }
        })
      })
  }

  static updateGroup(group_name, created_at, id){
      db.serialize(function(){
        db.run(UPDATE_DATA,{
          $id : id,
          $group_name: group_name,
          $created_at: created_at
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log(':: SUCCESS UPDATE DATA GROUP ::');
          }
        })
      })
  }

  static deleteGroup(id){
    db.serialize(function(){
      db.run(DELETE_DATA,{
        $id : id
      },function(err){
        if(err){
          console.log(err);
        } else{
          console.log(':: SUCCESS DELETE DATA GROUP ::');
        }
      })
    })

    db.serialize(function(){
      db.run(DELETE_GROUP_CONTACTS,{
        $id : id
      },function(err){
        if(err){
          console.log(err);
        } else{
          console.log(':: SUCCESS DELETE IN GROUP CONTACT ::');
        }
      })
    })
  }

  static showGroup(){
    db.serialize(function(){
      db.each(SHOW_DATA,function(err,rows){
        if(err){
          console.log(err);
        } else{
          console.log(rows);
        }
      })
    })
  }
}
