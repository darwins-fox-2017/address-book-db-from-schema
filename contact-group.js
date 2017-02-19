"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = "address-book.db";
var db = new sqlite.Database(file);

let ADD = "INSERT INTO group_details (contactId, groupId) VALUES ($value1, $value2)"
let EDIT = "UPDATE group_details SET contactId = $contactId, groupId = $groupId WHERE id = $id"
let DELETE = "DELETE FROM group_details WHERE id = $id"
let SHOW = "select group_details.id, (select groupName from groups where groups.id = group_details.groupId ) AS groups,(select firstName from contacts where contacts.id = group_details.contactId ) AS contacts from group_details"

export class ContactGroup {
  constructor() {}

  addContactGroup(contactId, groupId){
    db.serialize(function(){
      db.run(ADD,{$value1 : contactId, $value2:contactId},function(err){
        if (err) console.log(err);
        else console.log(('DATA CONTACT GROUP ADDED SUCCESS'));
      })
    })
  }
  
  editContactGroup(contactId, groupId,id){
    db.serialize(function(){
      db.run(EDIT,{$contactId:contactId, $groupId:groupId, $id:id}, function(err){
        err ? console.log(err):console.log(`DATA CONTACT GROUP UPDATED SUCCESS`);
      })
    })
  }

  deleteContactsGroups(id){
    db.serialize(function(){
      db.run(DELETE,{$id:id}, function(err){
        err ? console.log(err):console.log(`DATA CONTACT GROUP HAS BEEN DELETED`)
      })
    })
  }

  showContactGroup(){
    db.serialize(function(){
      db.each(SHOW, function(err, row){
        err ? console.log(err):console.log(row)
      })
    })
  }



}