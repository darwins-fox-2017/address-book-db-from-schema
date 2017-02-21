"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = "address-book.db";
var db = new sqlite.Database (file);

let ADD = "INSERT INTO contacts (firstName, lastName, phone, email, createdAt) VALUES ($firstName, $lastName, $phone, $email, $createdAt)"
let EDIT = "UPDATE contacts SET firstName = $firstName, lastName = $lastName, phone = $phone, email = $email, createdAt = $createdAt WHERE id = $id"
let DELETE = "DELETE FROM contacts WHERE id = $id"
let SHOW = "SELECT * FROM contacts"

export class Contact {
  constructor(){}
  
  addContact(firstName, lastName, phone, email, createdAt){
    db.serialize(function(){
      db.run(ADD,{$firstName : firstName, $lastName : lastName, $phone : phone, $email : email, $createdAt : createdAt}, function(err){
        if (err) console.log(err);
        else console.log('DATA CONTACT ADDED SUCCESS');
      })
    })
  }
  
  editContact(firstName, lastName, phone, email, createdAt, id){
    db.serialize(function(){
      db.run(EDIT,{$firstName : firstName, $lastName : lastName, $phone : phone, $email : email, $createdAt : createdAt, $id : id}, function(err){
        if (err) console.log(err);
        else console.log('DATA CONTACT EDITED SUCCESS');
      })
    })
  }

  deleteContact(id){
    db.serialize(function(){
      db.run(DELETE,{$id:id}, function(err){
        if (err) console.log(err);
        else console.log('DATA CONTACT GROUP_DELETED SUCCESS');
      })
    })
  }

  showContact(){
    db.serialize(function(){
      db.each(SHOW, function(err, row){
        if (err) console.log(err);
        else console.log(row);
      })
    })
  }
  
  
}