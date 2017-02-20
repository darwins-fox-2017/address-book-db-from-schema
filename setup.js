"use strict"
//LOAD MODULES
const repl = require('repl')
const sqlite = require('sqlite3').verbose()
const fs = require('fs')

const file = 'address_book.db'
const db = new sqlite.Database(file)

let readFile = fs.readFileSync('data.json', 'utf-8')
let dataDummy = JSON.parse(readFile)

//SQL STATEMENT
let CREATE_CONTACT = "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,firstName TEXT NOT NULL, lastName TEXT, phone TEXT, email TEXT, createdAt DATE)"
let CREATE_GROUP   = "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, groupName TEXT NOT NULL, createdAt DATE)"
let CREATE_DETAILS = "CREATE TABLE IF NOT EXISTS group_details(id INTEGER PRIMARY KEY AUTOINCREMENT, contactId INTEGER, groupId INTEGER, FOREIGN KEY(contactId) REFERENCES contacts(id), FOREIGN KEY (groupId) REFERENCES groups(id))"

let SEED_DATA_CONTACT  = "INSERT INTO contacts(firstName, lastName, phone, email, createdAt) VALUES "
let SEED_DATA_GROUP = "INSERT INTO groups (groupName, createdAt) VALUES "
let SEED_DATA_DETAILS = "INSERT INTO group_details(contactId, groupId) VALUES "

//CREATE TABLE CONTACTS
let createTableContacts = () => {
  db.serialize(function(){
    db.run(CREATE_CONTACT, function(err){
      err ? console.log(err):console.log(`CREATE TABLE SUCCESSFUL`)
    })
  })
}

//CREATE TABLE GROUP
let createTableGroups = () => {
  db.serialize(function(){
    db.run(CREATE_GROUP, function(err){
      err ? console.log(err):console.log('CREATE TABLE SUCCESSFUL');
    })
  })
}

//CREATE GROUP DETAILS
let createTableGroup_Details = () => {
  db.serialize(function(){
    db.run(CREATE_DETAILS, function(err){
      err ? console.log(err): console.log('CREATE_DETAILS')
    })
  })
}

// INSERT INTO CONTACTS
let seedDataContacts = () =>{
  db.serialize(function(){
    db.run(SEED_DATA_CONTACT, function(err){
      err ? console.log(err): console.log(`SEED DATA SUCCESSFUL`);
    })
  })
}

for (let i = 0; i < dataDummy.contacts.length; i++) {
  if (i < dataDummy.contacts.length -1) {
    SEED_DATA_CONTACT += `('${dataDummy.contacts[i].firstName}', '${dataDummy.contacts[i].lastName}', '${dataDummy.contacts[i].phone}', '${dataDummy.contacts[i].email}', '${dataDummy.contacts[i].createdAt}'),`
  }else {
    SEED_DATA_CONTACT += `('${dataDummy.contacts[i].firstName}', '${dataDummy.contacts[i].lastName}', '${dataDummy.contacts[i].phone}', '${dataDummy.contacts[i].email}', '${dataDummy.contacts[i].createdAt}')`
  }
}

//INSERT INTO GROUP
let seedDataGroups = () =>{
  db.serialize(function(){
    db.run(SEED_DATA_GROUP, function(err){
      err ? console.log(err): console.log(`SEED DATA SUCCESSFUL`);
    })
  })
}

for (let i = 0; i < dataDummy.groups.length; i++) {
  if (i < dataDummy.groups.length -1) {
    SEED_DATA_GROUP += `('${dataDummy.groups[i].groupName}', '${dataDummy.groups[i].createdAt}'),`
  }else {
    SEED_DATA_GROUP += `('${dataDummy.groups[i].groupName}', '${dataDummy.groups[i].createdAt}')`
  }
}

//INSERT INTO GROUP DETAILS
let seedDataGroup_Details = () =>{
  db.serialize(function(){
    db.run(SEED_DATA_DETAILS, function(err){
      err ? console.log(err): console.log(`SEED DATA SUCCESSFUL`);
    })
  })
}

for (let i = 0; i < dataDummy.group_details.length; i++) {
  if (i < dataDummy.group_details.length -1) {
    SEED_DATA_DETAILS += `('${dataDummy.group_details[i].contactId}', '${dataDummy.group_details[i].groupId}'),`
  }else {
    SEED_DATA_DETAILS += `('${dataDummy.group_details[i].contactId}', '${dataDummy.group_details[i].groupId}')`
  }
}


let start = repl.start('> ')
    start.context.createContacts = createTableContacts
    start.context.createGroups = createTableGroups
    start.context.createDetails = createTableGroup_Details

    start.context.seedContact = seedDataContacts
    start.context.seedGroup = seedDataGroups
    start.context.seedDetais = seedDataGroup_Details
