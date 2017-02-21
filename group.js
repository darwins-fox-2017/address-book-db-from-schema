"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = "address-book.db";
var db = new sqlite.Database (file);

// let ADD = "INSERT INTO groups (firstName, lastName, phone, email, createdAt) VALUES ($firstName, $lastName, $phone, $email, $createdAt)"
// let EDIT = "UPDATE groups SET firstName = $firstName, lastName = $lastName, phone = $phone, email = $email, createdAt = $createdAt WHERE id = $id"
// let DELETE = "DELETE FROM groups WHERE id = $id"
// let SHOW = "SELECT * FROM groups"

let ADD = "INSERT INTO groups (groupName, createdAt) VALUES ($groupName, Date('now'))"
let EDIT = "UPDATE groups SET groupName = $groupName, createdAt = Date('now') WHERE id = $id"
let DELETE = "DELETE FROM groups WHERE id = $id"
let DELETE_GROUP_DETAILS = "DELETE FROM group_details WHERE groupId = $id"
let SHOW =  "SELECT * FROM groups"


export class Group {
  constructor(){}
  
  addGroup(groupName, createdAt){
    db.serialize(function(){
      db.run(ADD,{$groupName:groupName}, function(err){
        if (err) console.log(err);
        else console.log('DATA GROUP ADDED SUCCESS');
      })
    })
  }
  
  editGroup(groupName,id){
    db.serialize(function(){
      db.run(EDIT,{$groupName : groupName, $id : id}, function(err){
        if (err) console.log(err);
        else console.log('DATA GROUP EDITED SUCCESS');
      })
    })
  }
  
  deleteGroup(id){
    db.serialize(function(){
      db.run(DELETE,{$id:id}, function(err){
        if (err) console.log(err);
        else console.log('DATA GROUP DELETED SUCCESS');
      })
    })
    
    db.serialize(function(){
      db.run(DELETE_GROUP_DETAILS,{$id:id}, function(err){
        if (err) console.log(err);
        else console.log('DATA GROUP IN CONTACT IS DELETED TOO');
      })
    })
    
    
  }
  
  showGroup(){
    db.serialize(function(){
      db.each(SHOW, function(err, row){ 
        if (err) console.log(err);
        else console.log(row);
      })
    })
  }
  
  
}