let repl = require('repl')
let sqlite = require('sqlite3')
let data = 'addressbook.db'
let db = new sqlite.Database(data)

let CONTACT_TABLE = `CREATE TABLE IF NOT EXIST contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company_name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL);`
db.serialize(function() {
  db.run(CONTACT_TABLE,function() {
    if (err) {
      console.log(err);
    } else {
      console.log(`contact table created`);
    }
  })
})

let GROUP_TABLE = `CREATE TABLE IF NOT EXIST groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`
db.serialize(function() {
  db.run(GROUP_TABLE,function() {
    if (err) {
      console.log(err);
    } else {
      console.log(`group table created`);
    }
  })
})

let CONTACT_GROUP_TABLE = "CREATE TABLE IF NOT EXISTS contact_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contacts_id INTEGER, groups_id INTEGER, FOREIGN KEY (contacts_id) REFERENCES contacts(id), FOREIGN KEY (groups_id) REFERENCES groups(id));";
db.serialize(function() {
  db.run(CONTACT_GROUP_TABLE, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`contact group table created`);
    }
  });
});

function import_json() {
  const fs = require('fs')
  var list = JSON.parse(fs.readFileSync('data.json', "utf-8"));
  for ( let i = 0; i < list.contact.length; i++) {
    var IMPORT_CONTACT = `INSERT INTO contacts (name, company_name, phone, email) VALUES ('${list.contact[i].name}', '${list.contact[i].company}', '${list.contact[i].phone}', '${list.contact[i].email}')`;
    db.serialize(function() {
      db.run(IMPORT_CONTACT, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('table contact data added');
        }
      });
    });
  }

  for ( let i = 0; i < list.groups.length; i++) {
    var IMPORT_GROUPS = `INSERT INTO groups (name) VALUES ('${list.groups[i].name}')`;
    db.serialize(function() {
      db.run(IMPORT_GROUPS, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('table groups data added');
        }
      });
    });
  }

  for ( let i = 0; i < list.contact_groups.length; i++) {
    var IMPORT_CONTACT_GROUPS = `INSERT INTO contact_groups (contacts_id, groups_id) VALUES ('${list.contact_groups[i].group_id}', '${list.contact_groups[i].contact_id}')`;
    db.serialize(function() {
      db.run(IMPORT_CONTACT_GROUPS, function(err) {
        (err) ? console.log(err) : console.log('table contact groups data added');
      });
    });
  }
}

import_json()
