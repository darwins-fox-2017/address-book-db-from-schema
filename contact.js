"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

const file = 'address_book.db'
const db = new sqlite.Database(file)

//SQL STATEMENT
let ADD_DATA = "INSERT INTO contacts(firstName, lastName, phone, email, createdAt) VALUES ($firstName, $lastName, $phone, $email, Date('now'))"
let EDIT_DATA = "UPDATE contacts SET firstName = $firstName, lastName = $lastName, phone = $phone, email = $email, createdAt = Date('now') WHERE id = $id"
let DELETE_DATA = "DELETE FROM contacts WHERE id = $id"
let DELETE_GROUOP_DETAILS = "DELETE FROM contacts WHERE id = $id"
let SHOW_DATA = "SELECT contacts.*, subquery.groupName AS groupContact FROM contacts LEFT JOIN (SELECT * FROM group_details, groups WHERE group_details.groupId = groups.id) AS subquery ON subquery.contactId = contacts.id"

function validateEmail(email){
  let validate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return validate.test(email);
}

export class Contacts {
  constructor() {}

  addContacts(firstName, lastName, phone, email){
    if (validateEmail(email) == false) {
      return `Email is not valid`
    }else if (phone.length < 6 || phone.length > 12) {
      return `phone is not valid`
    }else {
      db.serialize(function(){
        db.run(ADD_DATA,
          {
            $firstName:firstName,
            $lastName:lastName,
            $phone:phone,
            $email:email
          }, function(err){
            err ? console.log(err):console.log(`SEED DATA SUCCESSFUL`)
          })
      })
    }
  }

  updateContacts(firstName, lastName, phone, email, id){
    if (validateEmail(email) == false) {
      return `Email is not valid`
    }else if (phone.length < 6 || phone.length > 12) {
      return `phone is not valid`
    }else {
      db.serialize(function(){
        db.run(EDIT_DATA,
          {
            $id:id,
            $firstName:firstName,
            $lastName:lastName,
            $phone:phone,
            $email:email
          }, function(err){
            err ? console.log(err):console.log(`UPDATE DATA SUCCESSFUL`)
          })
      })
    }
  }

  deleteContacts(id){
    db.serialize(function(){
      db.run(DELETE_DATA,
        {
          $id:id,
        }, function(err){
          err ? console.log(err):console.log(`DATA HAS BEEN DELETED`)
        })
    })

    db.serialize(function(){
      db.run(DELETE_GROUOP_DETAILS,
        {
          $id:id,
        }, function(err){
          err ? console.log(err):console.log(`DATA HAS BEEN DELETED IN CONTACT GROUPS`)
        })
    })
  }

  showContacts(){
    db.serialize(function(){
      db.each(SHOW_DATA, function(err, row){
        err ? console.log(err):console.log(row);
      })
    })
  }
}
