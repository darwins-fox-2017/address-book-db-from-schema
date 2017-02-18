"use strict"

const repl    = require("repl");
const sqlite  = require("sqlite3").verbose();
var file      = "address_book.db";
var db        = new sqlite.Database(file);
var fs        = require("fs");
var data      = JSON.parse(fs.readFileSync("data.json","utf-8"))

//SQL
var CREATE_TABLE_CONTACTS         = "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company_name TEXT, phone TEXT, email TEXT, created_at DATE);"
var CREATE_TABLE_GROUPS           = "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL, created_at DATE);"
var CREATE_TABLE_GROUP_CONTACTS   = "CREATE TABLE IF NOT EXISTS group_contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id), FOREIGN KEY(group_id) REFERENCES groups(id));"
var SEED_DATA_CONTACTS            = "INSERT INTO contacts(name, company_name, phone, email, created_at) VALUES ";
var SEED_DATA_GROUPS              = "INSERT INTO groups(group_name, created_at) VALUES ";
var SEED_DATA_GROUP_CONTACTS      = "INSERT INTO group_contacts(contact_id, group_id) VALUES ";

//INSERT
for (let i = 0; i < data.contacts.length; i++){
  if(i < data.contacts.length-1){
    SEED_DATA_CONTACTS += `('${data.contacts[i].name}','${data.contacts[i].company_name}','${data.contacts[i].phone}','${data.contacts[i].email}','${data.contacts[i].created_at}'),`
  } else {
    SEED_DATA_CONTACTS += `('${data.contacts[i].name}','${data.contacts[i].company_name}','${data.contacts[i].phone}','${data.contacts[i].email}','${data.contacts[i].created_at}')`
  }
}

for(let j = 0; j < data.groups.length; j++){
  if(j < data.groups.length-1){
    SEED_DATA_GROUPS += `('${data.groups[j].group_name}','${data.groups[j].created_at}'),`
  } else {
    SEED_DATA_GROUPS += `('${data.groups[j].group_name}','${data.groups[j].created_at}')`
  }
}

for(let k = 0; k < data.group_contacts.length; k++){
  if(k < data.group_contacts.length-1){
    SEED_DATA_GROUP_CONTACTS += `('${data.group_contacts[k].contact_id}','${data.group_contacts[k].group_id}'),`
  } else {
    SEED_DATA_GROUP_CONTACTS += `('${data.group_contacts[k].contact_id}','${data.group_contacts[k].group_id}')`
  }
}

//CREATE TABLE
let createTableContacts = ()=>{
  db.serialize(function(){
    db.run(CREATE_TABLE_CONTACTS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log(':: SUCCESS CREATE TABLE CONTACTS ::');
      }
    });
  });
}

let createTableGroups = ()=>{
  db.serialize(function(){
    db.run(CREATE_TABLE_GROUPS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log(':: SUCCESS CREATE TABLE CONTACTS ::');
      }
    });
  });
}

let createTableGroupContacts = ()=>{
  db.serialize(function(){
    db.run(CREATE_TABLE_GROUP_CONTACTS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log(':: SUCCESS CREATE TABLE CONTACTS ::');
      }
    });
  });
}

//SEED DATA
let seedDataContacts  = ()=>{
  db.serialize(function(){
    db.run(SEED_DATA_CONTACTS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log(':: SUCCESS SEED DATA CONTACTS ::');
      }
    });
  });
}

let seedDataGroups  = ()=>{
  db.serialize(function(){
    db.run(SEED_DATA_GROUPS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log(':: SUCCESS SEED DATA GROUPS ::');
      }
    });
  });
}

let seedDataGroupContacts  = ()=>{
  db.serialize(function(){
    db.run(SEED_DATA_GROUP_CONTACTS, function(err){
      if(err){
        console.log(err);
      }else {
        console.log(':: SUCCESS SEED DATA GROUP CONTACTS ::');
      }
    });
  });
}

//REPL
let relp = repl.start('> ');
relp.context.createContacts        = createTableContacts
relp.context.createGroups          = createTableGroups
relp.context.createGroupContacts   = createTableGroupContacts
relp.context.seedDataContacts      = seedDataContacts
relp.context.seedDataGroups        = seedDataGroups
relp.context.seedDataGroupContacts = seedDataGroupContacts

//running: node setup.js
/*
createContacts()
createGroups()
createGroupContacts()
seedDataContacts()
seedDataGroups()
seedDataGroupContacts()
*/
