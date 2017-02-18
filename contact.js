"use strict"

let sqlite3 = require('sqlite3')
let file = 'address_book.db'
let db = new sqlite3.Database(file)

class Contact {

  static seedContact(firstname, lastname, companyName, phone, email) {
    let regexEmail = /[a-zA-Z]*@[a-zA-Z]{5}.com/g
    if (firstname.length > 4 && regexEmail.test(email) && (phone.length > 10 && phone.length < 13)) {
      let SEED_DATA_CONTACTS = `INSERT INTO contacts (firstname, lastname, company_name, email, phone, created_at) VALUES ('${firstname}', '${lastname}', '${companyName}', '${email}', '${phone}', 'new Date()')`
      db.serialize(function(){
        db.run(SEED_DATA_CONTACTS, function(err){
          if (err) {
            console.log(err)
          } else {
            console.log('Insert data succeed!!')
          }
        })
      })
    } else {
      console.log(`Invalid DATA format. Try Again!`)
    }
    return ''
  }

  static updateContact(firstname, lastname, companyName, phone, email, id) {
    let UPDATE_DATA_CONTACT = `UPDATE contacts SET firstname = '${firstname}', lastname = '${lastname}', company_name = '${companyName}', telephone = '${telp}', email = '${email}' WHERE id = '${id}'`
    db.serialize(function() {
      db.run(UPDATE_DATA_CONTACT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Update data succeed!!')
        }
      });
    });
  }

  static deleteContact(id) {
    var DELETE_DATA_CONTACT = `DELETE FROM contacts WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(DELETE_DATA_CONTACT, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Delete data succeed!!')
        }
      });
    });
  }

  static assignContactToGroup(contacts_id, groups_id) {
    var ASSIGN_DATA_CONTACT_TO_GROUP = `INSERT INTO group_contact (contact_id, group_id) VALUES ('${contacts_id}','${groups_id}')`;
    db.serialize(function() {
      db.run(ASSIGN_DATA_CONTACT_TO_GROUP, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Assign contact to a new group succeed!')
        }
      });
    });
  }

  static showContactGroup() {
    var SELECT_DATA_CONTACTGROUP = `SELECT custom.id, custom.firstname, custom.lastname, custom.company_name, custom.email,
    custom.phone, groups.group_name FROM (SELECT * FROM contacts JOIN group_contact ON contacts.id = group_contact.contact_id)
    as custom JOIN groups ON custom.group_id=groups.id`;

    db.serialize(function() {
      db.each(SELECT_DATA_CONTACTGROUP, function(err, row) {
        if (err) {
          console.log(err)
        } else {
          console.log(row)
        }
      });
    });
  }
}

export default Contact
