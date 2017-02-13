let repl = require('repl');
let sqlite3 = require('sqlite3');
let file = 'address.db';
let db = new sqlite3.Database(file);

class Contact {
  static insertContact(name, company, phone, email) {
    let pattern_email = /[a-zA-Z]*@[a-zA-Z]{5}.com/g;
    let pattern_name = /.{4}[\D]/g;

    if(pattern_name.test(name)) {
      if(pattern_email.test(email)) {
        let QUERY_INSERT = `INSERT INTO contacts (name, company_name, telephone, email) VALUES ('${name}', '${company}', '${phone}', '${email}')`;
        db.serialize(function() {
          db.run(QUERY_INSERT, function(err) {
            (err) ? console.log(err) : console.log('data table contact berhasil ditambahkan');
          });
        });
      } else {
        console.log('format penulisan email salah');
      }
    } else {
      console.log('format penulisan nama kurang dari 4 digit');
    }
  }

  static updateContact(name, telp, company, email, id) {
    var QUERY_UPDATE = `UPDATE contacts SET name = '${name}', company_name = '${company}', telephone = '${telp}', email = '${email}' WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(QUERY_UPDATE, function(err) {
        (err) ? console.log(err) : console.log('data table contact berhasil diubah');
      });
    });
  }

  static deleteContact(id) {
    var QUERY_DELETE = `DELETE FROM contacts WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(QUERY_DELETE, function(err) {
        (err) ? console.log(err) : console.log('data table contacts berhasil dihapus');
      });
    });
  }

  static showContact() {
    var QUERY_SELECT = `SELECT * FROM contacts LEFT JOIN contact_groups ON contacts.id = contact_groups.contacts_id`;
    db.serialize(function() {
      db.each(QUERY_SELECT, function(err, row) {
        (err) ? console.log(err) : console.log(row);
      });
    });
  }

  static assignContactToGroup(contacts_id, groups_id) {
    var QUERY_INSERT = `INSERT INTO contact_groups (contacts_id, groups_id) VALUES ('${contacts_id}','${groups_id}')`;
    db.serialize(function() {
      db.run(QUERY_INSERT, function(err) {
        (err) ? console.log(err) : console.log('table contact_groups berasil di update');
      });
    });
  }
}

export default Contact
