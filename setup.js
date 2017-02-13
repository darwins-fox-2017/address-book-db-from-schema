let repl = require('repl');
let sqlite3 = require('sqlite3');
let file = 'address.db';
let db = new sqlite3.Database(file);

// buat table & relasi
let TABLE_CONTACT = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company_name TEXT NOT NULL, telephone INTEGER NOT NULL, email TEXT NOT NULL);`;
db.serialize(function() {
  db.run(TABLE_CONTACT, function(err) {
    (err) ? console.log(err) : console.log('table contact berhasil dibuat');
  });
});

let TABLE_GROUP = "CREATE TABLE IF NOT EXISTS groups ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)";
db.serialize(function() {
  db.run(TABLE_GROUP, function(err) {
    (err) ? console.log(err) : console.log('table group berhasil dibuat');
  });
});

let TABLE_CONTACT_GROUP = "CREATE TABLE IF NOT EXISTS contact_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER, FOREIGN KEY (contacts_id) REFERENCES contacts(id), FOREIGN KEY (groups_id) REFERENCES groups(id));";
db.serialize(function() {
  db.run(TABLE_CONTACT_GROUP, function(err) {
    (err) ? console.log(err) : console.log('table contact_group berhasil dibuat');
  });
});

function import_json() {
  const fs = require('fs')
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  for ( let i = 0; i < list.contact.length; i++) {
    var IMPORT_CONTACT = `INSERT INTO contacts (name, company_name, telephone, email) VALUES ('${list.contact[i].name}', '${list.contact[i].company}', '${list.contact[i].phone}', '${list.contact[i].email}')`;
    db.serialize(function() {
      db.run(IMPORT_CONTACT, function(err) {
        (err) ? console.log(err) : console.log('data table contact berhasil ditambahkan');
      });
    });
  }

  for ( let i = 0; i < list.groups.length; i++) {
    var IMPORT_GROUPS = `INSERT INTO groups (name) VALUES ('${list.groups[i].name}')`;
    db.serialize(function() {
      db.run(IMPORT_GROUPS, function(err) {
        (err) ? console.log(err) : console.log('data table groups berhasil ditambahkan');
      });
    });
  }

  for ( let i = 0; i < list.contact_groups.length; i++) {
    var IMPORT_CONTACT_GROUPS = `INSERT INTO contact_groups (contacts_id, groups_id) VALUES ('${list.contact_groups[i].group_id}', '${list.contact_groups[i].contact_id}')`;
    db.serialize(function() {
      db.run(IMPORT_CONTACT_GROUPS, function(err) {
        (err) ? console.log(err) : console.log('data table contact groupd berhasil ditambahkan');
      });
    });
  }
}

import_json()
