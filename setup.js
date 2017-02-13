"use strict"

const repl = require('repl')
const fs = require('fs')
const sqlite = require('sqlite3').verbose()

var file = 'address_book.db'
var db = new sqlite.Database(file)
let readfile = fs.readFileSync('data.json', 'utf-8')
let data = JSON.parse(readfile)

// SQL Statement
var CREATE_TABLE_CONTACTS = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, company_name TEXT, email TEXT, phone TEXT, created_at DATE)"
var CREATE_TABLE_GROUPS = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL, created_at DATE)"
var CREATE_TABLE_CONTACTGROUP = "CREATE TABLE IF NOT EXISTS group_contact (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER, FOREIGNKEY(contact_id) REFERENCES contacts(id), FOREIGNKEY(group_id) REFERENCES groups(id))"
var SEED_DATA_CONTACTS = "INSERT INTO contacts (firstname, lastname, company_name, email, phone, created_at) VALUES "
var SEED_DATA_GROUPS = "INSERT INTO groups (group_name, created_at) VALUES "

// Create TABLE CONTACTS
let createTableContacts = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create TABLE
    db.run(CREATE_TABLE_CONTACTS, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE_TABLE_CONTACTS');
      }
    })
  })
}

// CREATE_TABLE_GROUPS
let createTableGroups = () => {
  // Run SQL one at a time
  db.serialize(function() {
    // Create TABLE
    db.run(CREATE_TABLE_GROUPS, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log('CREATE_TABLE_GROUPS');
      }
    })
  })
}

// GENERATE DATA CONTATCS FROM JSON
for (let i = 0; i < data.contacts.length; i++) {
  if (i < data.contacts.length - 1) {
    SEED_DATA_CONTACTS += `('${data.contacts[i].firstname}', '${data.contacts[i].lastname}', '${data.contacts[i].company_name}', '${data.contacts[i].email}', '${data.contacts[i].phone}', '${data.contacts[i].created_at}'),`
  } else {
    SEED_DATA_CONTACTS += `('${data.contacts[i].firstname}', '${data.contacts[i].lastname}', '${data.contacts[i].company_name}', '${data.contacts[i].email}', '${data.contacts[i].phone}', '${data.contacts[i].created_at}')`
  }
}

// GENERATE DATA GROUPS FROM JSON
for (let i = 0; i < data.groups.length; i++) {
  if (i < data.groups.length - 1) {
    SEED_DATA_GROUPS += `('${data.groups[i].group_name}', '${data.groups[i].created_at}'),`
  } else {
    SEED_DATA_GROUPS += `('${data.groups[i].group_name}', '${data.groups[i].created_at}')`
  }
}

// SEED_DATA_CONTACTS
let seedDataContacts = () => {
  db.run(SEED_DATA_CONTACTS, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log(SEED_DATA_CONTACTS)
    }
  })
}

// SEED_DATA_GROUPS
let seedDataGroups = () => {
  db.run(SEED_DATA_GROUPS, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log(SEED_DATA_GROUPS)
    }
  })
}

var r = repl.start('> ')
r.context.createTableContacts = createTableContacts
r.context.createTableGroups = createTableGroups
r.context.seedDataContacts = seedDataContacts
r.context.seedDataGroups = seedDataGroups
