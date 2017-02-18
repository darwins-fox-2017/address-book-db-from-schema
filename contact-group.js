"use strict"

const repl    = require("repl");
const sqlite  = require('sqlite3').verbose()
var file      = 'address_book.db'
var db        = new sqlite.Database(file)

//SQL
let INSERT_DATA = "INSERT INTO group_contacts (contact_id, group_id) VALUES ($contact_id, $group_id)"

export class ContactGroups{
  static addContactToGroup(contact_id, group_id){
    db.serialize(function(){
      db.run(INSERT_DATA,{
        $contact_id: contact_id,
        $group_id: group_id
      },function(err){
        if(err){
          console.log(err);
        }else{console.log(':: SUCCESS INSERT DATA INTO GROUP CONTACTS ::')}
      })
    })
  }
}
