"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'address-book.db';
const db = new sqlite.Database(file);

const fs = require('fs')
let readFile = fs.readFileSync('data.json', 'utf-8')
let data = JSON.parse(readFile)

let CREATE_CONTACT = "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,firstName TEXT NOT NULL, lastName TEXT, phone TEXT, email TEXT, createdAt DATE)"
let CREATE_GROUP = "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, groupName TEXT NOT NULL, createdAt DATE)"
let CREATE_DETAIL = "CREATE TABLE IF NOT EXISTS group_details(id INTEGER PRIMARY KEY AUTOINCREMENT, contactId INTEGER, groupId INTEGER, FOREIGN KEY(contactId) REFERENCES contacts(id), FOREIGN KEY (groupId) REFERENCES groups(id))"

let SEED_DATA_CONTACT = "INSERT INTO contacts(firstName, lastName, phone, email, createdAt) VALUES "
let SEED_DATA_GROUP = "INSERT INTO groups (groupName, createdAt) VALUES "
let SEED_DATA_DETAIL = "INSERT INTO group_details(contactId, groupId) VALUES "

//CREATE
let createTableContact = () => {
    db.serialize(function() {
        db.run(CREATE_CONTACT, function(err) {
            if (err) console.log(err);
            else console.log(('table contact is created'));
        })
    })
}

let createTableGroup = () => {
    db.serialize(function() {
        db.run(CREATE_GROUP, function(err) {
            if (err) console.log(err);
            else console.log(('table group is created'));
        })
    })
}

let createTableDetail = () => {
    db.serialize(function() {
        db.run(CREATE_DETAIL, function(err) {
            if (err) console.log(err);
            else console.log(('table detail is created'));
        })
    })
}

//INSERT JSON INTO SEED
for (let i = 0; i < data.contacts.length; i++) {
    if (i < data.contacts.length -1) {
        SEED_DATA_CONTACT += `('${data.contacts[i].firstName}', '${data.contacts[i].lastName}', '${data.contacts[i].phone}', '${data.contacts[i].email}', '${data.contacts[i].createdAt}'),`
        // console.log(SEED_DATA_CONTACT);
    } 
    else {
      SEED_DATA_CONTACT += `('${data.contacts[i].firstName}', '${data.contacts[i].lastName}', '${data.contacts[i].phone}', '${data.contacts[i].email}', '${data.contacts[i].createdAt}')`
    }
}

for (let i = 0; i < data.groups.length; i++) {
    if (i < data.groups.length -1) {
        SEED_DATA_GROUP += `('${data.groups[i].groupName}', '${data.groups[i].createdAt}'),`
        // console.log(SEED_DATA_GROUP);
    }
    else {
      SEED_DATA_GROUP += `('${data.groups[i].groupName}', '${data.groups[i].createdAt}')`
    }
}

for (let i = 0; i < data.group_details.length; i++) {
    if (i < data.group_details.length -1) {
        SEED_DATA_DETAIL += `('${data.group_details[i].contactId}', '${data.group_details[i].groupId}'),`
    }
    else {
      SEED_DATA_DETAIL += `('${data.group_details[i].contactId}', '${data.group_details[i].groupId}')`
    }
}
// console.log(SEED_DATA_DETAIL);

//SEED DATA
let Contact = () => {
    db.serialize(function() {
        db.run(SEED_DATA_CONTACT, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('SEED CONTACT SUCCESS');
            }
        });
    });
}

let Group = () => {
    db.serialize(function() {
        db.run(SEED_DATA_GROUP, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('SEED GROUP SUCCESS');
            }
        });
    });
}

let Detail = () => {
    db.serialize(function() {
        db.run(SEED_DATA_DETAIL, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('SEED DETAIL SUCCESS');
            }
        });
    });
}


let start = repl.start('> ');

//create
start.context.TableContact = createTableContact
start.context.TableGroup = createTableGroup
start.context.TableDetail = createTableDetail

//seed
start.context.SeedContact = Contact
start.context.SeedGroup = Group
start.context.SeedDetail = Detail