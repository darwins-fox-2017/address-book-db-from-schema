"use strict"

const sqlite = require('sqlite3').verbose()
const repl = require('repl')

const file = 'address_book.db'
const db = new sqlite.Database(file)

//SQL STATEMENT
let ADD_CONTACTS_GROUPS = "INSERT INTO group_details (contactId, groupId) VALUES ($contactId, $groupId)"
let EDIT_CONTACTS_GROUPS = "UPDATE group_details SET contactId = $contactId, groupId = $groupId WHERE id = $id"
let DELETE_GROUP_DETAILS = "DELETE FROM group_details WHERE id = $id"
let SHOW_DATA = "select group_details.id, (select groupName from groups where groups.id = group_details.groupId ) AS groups,(select firstName from contacts where contacts.id = group_details.contactId ) AS contacts from group_details"

export class ContactsGroups {
  constructor() {}

  addContactGroup(contactId, groupId){
    db.serialize(function(){
      db.run(ADD_CONTACTS_GROUPS,{$contactId : contactId, $groupId:contactId},function(err){
        err ? console.log(err):console.log(`SEED DATA SUCCESSFUL`)
      })
    })
  }

  updateContactGroup(contactId, groupId,id){
    db.serialize(function(){
      db.run(EDIT_CONTACTS_GROUPS,{$id:id, $contactId:contactId, $groupId:groupId}, function(err){
        err ? console.log(err):console.log(`UPDATE DATA SUCCESSFUL`);
      })
    })
  }

  deleteContactsGroups(id){
    db.serialize(function(){
      db.run(DELETE_GROUP_DETAILS,{$id:id}, function(err){
        err ? console.log(err):console.log(`DATA HAS BEEN DELETED IN CONTACT GROUPS`)
      })
    })
  }

  showContactGroup(){
    db.serialize(function(){
      db.each(SHOW_DATA, function(err, row){
        err ? console.log(err):console.log(row)
      })
    })
  }
}
