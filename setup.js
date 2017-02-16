"use strict"
const repl=require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = 'contacts.db';
var db = new sqlite3.Database(file);
var fs=require('fs');


var CREATE_TABEL_CONTACS = "CREATE TABLE IF NOT EXISTS contacs(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT NOT NULL ,email TEXT NOT NULL ,phone_number TEXT NOT NULL )"
var CREATE_TABEL_GROUPS = "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
var CREATE_TABEL_GROUPS_CONTACS = "CREATE TABLE IF NOT EXISTS groups_contacs (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, contac_id INTEGER, FOREIGN KEY(group_id) REFERENCES groups (id), FOREIGN KEY(contac_id) REFERENCES contacs (id))"

let createTabel =()=>{
  db.serialize(function(){
    db.run(CREATE_TABEL_CONTACS,function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('tabel created');
      }
    })

    db.run(CREATE_TABEL_GROUPS,function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('tabel created');
      }
    })

    db.run(CREATE_TABEL_GROUPS_CONTACS,function(err){
      if (err) {
        console.log(err);
      } else {
        console.log('tabel created');
      }
    })


  });
}

let initialData=(jsonContact,jsonGroup,jsonContac_group)=>{
  let INSERT_CONTACT = "INSERT INTO contacs (name,company,email,phone_number) VALUES (?,?,?,?)"
  let INSERT_GROUP = "INSERT INTO groups(id,name) VALUES(?,?) "
  let INSERT_CONTAC_GROUP = "INSERT INTO groups_contacs (id) VALUES(?) "
  db.serialize(function(){
    for (var i = 0; i < jsonContact.length; i++) {
      db.run(INSERT_CONTACT,[jsonContact[i].nama, jsonContact[i].perusahan, jsonContact[i].email, jsonContact[i].phone_number], function(err){
        if (err) {
          console.log(err);
        } else {
          console.log('tabel inserted');
        }
      })
    }

    for (var i = 0; i < jsonGroup.length; i++) {
      db.run(INSERT_GROUP,[jsonGroup[i].id,jsonGroup[i].name],function(err){
        if (err) {
          console.log(err);
        } else {
          console.log('tabel inserted');
        }
      })
    }

    for (var i = 0; i < jsonContac_group.length; i++) {
      db.run(INSERT_CONTAC_GROUP,[jsonContac_group[i].id],function(err){
        if (err) {
          console.log(err);
        } else {
          console.log('tabel inserted');
        }
      })
    }

  });


 }


 var dataContacts = fs.readFileSync("contacts.json").toString();
 dataContacts = JSON.parse(dataContacts);
let dataGroups = fs.readFileSync("groups.json").toString();
 dataGroups = JSON.parse(dataGroups);
let datacontacs_groups = fs.readFileSync("contact-group.json").toString();
 datacontacs_groups = JSON.parse(datacontacs_groups);
createTabel();
console.log(dataContacts);
initialData(dataContacts,dataGroups,datacontacs_groups);
