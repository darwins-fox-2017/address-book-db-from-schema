"use strict"
const jsonfile = require('jsonfile');
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const data = jsonfile.readFileSync('data.json');
const faker = require('faker');
let file = 'data.db'
let db = new sqlite.Database(file)


let CREATE_CONTACT_TABLE = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_name TEXT NOT NULL, company_name TEXT, phone TEXT, email TEXT, created_at DATETIME);`

let CREATE_GROUP_TABLE = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL, created_at DATETIME);`

let CREATE_CONTACT_GROUP_TABLE = `CREATE TABLE IF NOT EXISTS contact_groups (id_contact_group INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER NOT NULL, group_id INTEGER NOT NULL, FOREIGN KEY (group_id) REFERENCES groups(id), FOREIGN KEY (contact_id) REFERENCES contacts(id));`


let createContact = () => {
  db.serialize(function(){
    db.run(CREATE_CONTACT_TABLE,function(err){
      if(err){
        console.log(err);
      }else{
        console.log('contact table has been successfully created');
      }
    })
  })
}

let createGroup = () => {
  db.serialize(function(){
    db.run(CREATE_GROUP_TABLE,function(err){
      if(err){
        console.log(err);
      }else{
        console.log('group table has been successfully created');
      }
    })
  })
}

let createContactGroup = () => {
  db.serialize(function(){
    db.run(CREATE_CONTACT_GROUP_TABLE,function(err){
      if(err){
        console.log(err);
      }else{
        console.log('contact_groups table has been successfully created');
      }
    })
  })
}

createContactGroup()
// let input = repl.start('> ')
//
// input.context.createContact = createContact
// input.context.createGroup = createGroup
// input.context.createContactGroup = createContactGroup
// input.context.addContacts = addContacts
// input.context.addGroup = addGroup
