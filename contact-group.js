"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = "address-book.db";
var db = new sqlite.Database(file);

let ADD = "INSERT INTO group_details (contactId, groupId) VALUES ($contactId, $groupId)"
let EDIT = "UPDATE group_details SET contactId = $contactId, groupId = $groupId WHERE id = $id"
let DELETE = "DELETE FROM group_details WHERE id = $id"
let SHOW = "select group_details.id, (select groupName from groups where groups.id = group_details.groupId ) AS groups,(select firstName from contacts where contacts.id = group_details.contactId ) AS contacts from group_details"

export class ContactGroup {
  constructor() {}

  addCG(contactId, groupId){
    db.serialize(function(){
      db.run(ADD,{$contactId : contactId, $groupId:contactId},function(err){
        if (err) console.log(err);
        else console.log('DATA CONTACT_GROUP ADDED SUCCESS');
      })
    })
  }
  
  editCG(contactId, groupId, id){
    db.serialize(function(){
      db.run(EDIT,{$contactId:contactId, $groupId:groupId, $id:id}, function(err){
        if (err) console.log(err);
        else console.log('DATA CONTACT_GROUP EDITED SUCCESS');
      })
    })
  }

  deleteCG(id){
    db.serialize(function(){
      db.run(DELETE,{$id:id}, function(err){
        if (err) console.log(err);
        else console.log('DATA CONTACT GROUP_DELETED SUCCESS');
      })
    })
  }

  showCG(){
    db.serialize(function(){
      db.each(SHOW, function(err, row){
        if (err) console.log(err);
        else console.log(row);
      })
    })
  }


}