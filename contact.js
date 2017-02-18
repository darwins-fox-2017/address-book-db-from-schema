const jsonfile = require('jsonfile');
const sqlite = require('sqlite3').verbose();
const faker = require('faker');
let file = 'data.db'
let db = new sqlite.Database(file)


export class Contact{
  constructor(data){
    this.contact_name = data["contact_name"]
    this.company_name = data["company_name"]
    this.phone = data["phone"]
    this.email = data["email"]
    this.created_at = data["created_at"]
  }


  addContacts(){
    let validEmail = /\w+@\w+.\w+/.test(this.email)
    let phone = this.phone.match(/\d*/g).join("")

    if(phone.length>17 || phone.length <10){

      return `invalid phone format`

    }else if(!validEmail){

      return `invalid email format `

    }else{

      let SEED_CONTACT = `INSERT INTO contacts (contact_name, company_name, phone, email, created_at) VALUES ('${this.contact_name}','${this.company_name}','${this.phone}','${this.email}','${this.created_at}');`

      db.serialize(function() {
        db.run(SEED_CONTACT,function(err){
          if (err){
            console.log(err);
          } else {
            console.log(`Contact has been added`);
          }
        })
      })

    }
  }

  showContact(){
    let SHOW_CONTACT = `SELECT * FROM contacts`

    db.serialize(function() {
      db.all(SHOW_CONTACT,function(err,rows){
        if (err){
          console.log(err);
        } else {
          console.log(rows);
        }
      })
    })
  }

  updateContact(id,col,val){
    let UPDATE_CONTACT = `UPDATE contacts SET ${col} = '${val}' WHERE id = ${id}`

    db.serialize(function() {
      db.all(UPDATE_CONTACT,function(err){
        if (err){
          console.log(err);
        } else {
          console.log("data has been successfully updated");
        }
      })
    })
  }

  deleteContact(id){
    let DELETE_CONTACT = `DELETE FROM contacts WHERE id = ${id}`

    db.serialize(function() {
      db.all(DELETE_CONTACT,function(err){
        if (err){
          console.log(err);
        } else {
          console.log("data has been successfully deleted");
        }
      })
    })
  }


}

let contactDetail =  {
    "contact_name" : faker.name.firstName(),
    "company_name" : faker.company.companyName(),
    "phone" : faker.phone.phoneNumberFormat(),
    "email" : faker.internet.email(),
    "created_at" : new Date()
  }

var contact = new Contact(contactDetail)

// contact.showContact()
// contact.addContacts()
// (contact_name, company_name, phone, email, created_at)
// contact.updateContact(25,"contact_name",faker.name.firstName())
// contact.deleteContact(25)
