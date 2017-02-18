"use strict"

const repl    = require("repl");
const sqlite  = require("sqlite3").verbose();
var file      = "address_book.db";
var db        = new sqlite.Database(file);

//SQL
var INSERT_DATA           = "INSERT INTO contacts(name, company_name, phone, email, created_at) VALUES($name, $company_name, $phone, $email, $created_at)"
var UPPDATE_DATA          = "UPDATE contacts SET name = $name, company_name = $company_name, phone = $phone, email = $email, created_at = $created_at WHERE id = $id"
var DELETE_DATA           = "DELETE FROM contacts WHERE id = $id"
var DELETE_GROUP_CONTACTS = "DELETE FROM group_contacts WHERE id = $id"
var SHOW_DATA             = "SELECT contacts.* FROM contacts LEFT JOIN (SELECT * FROM group_contacts,groups WHERE group_contacts.group_id = groups.id) AS subquery ON subquery.contact_id = contacts.id"

function validateEmail(email) {
  var validate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validate.test(email);
}

export class Contacts {
  static addContact(name, company_name, phone, email, created_at){
    if(validateEmail(email) === false && (phone.length < 6 || phone.length > 12)){
      return "Email & phone numbar are not valid! Please input correct format! Format Email: user_name@mail.com | Format phone number: 123456 (min. 6 digit & max. 12 digit)"
    }
    else if(validateEmail(email) === false){
      return "Email is not valid! Please input correct format! Format Email: user_name@mail.com"
    }
    else if(phone.length < 6 || phone.length > 12 ){
      return "Phone number is not valid! Please input correct format! Format phone number: 123456 (min. 6 digit & max. 12 digit)"
    }
    else{
      db.serialize(function(){
        db.run(INSERT_DATA,{
          $name: name,
          $company_name: company_name,
          $phone: phone,
          $email: email,
          $created_at: created_at
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log(':: SUCCESS INSERT DATA CONTACT ::');
          }
        })
      })
    }
  }

  static updateContact(name, company_name, phone, email, created_at, id){
    if(validateEmail(email) === false){
      return "Email is not valid! Please input correct format! Format Email: user_name@mail.com"
    }
    else if(phone.length < 6 || phone.length > 12 ){
      return "Phone number is not valid! Please input correct format! Format phone number: 123456 (min. 6 digit & max. 12 digit)"
    }
    else{
      db.serialize(function(){
        db.run(UPDATE_DATA,{
          $name: name,
          $company_name: company_name,
          $phone: phone,
          $email: email,
          $created_at: created_at,
          $id : id
        },function(err){
          if(err){
            console.log(err);
          } else{
            console.log(':: SUCCESS UPDATE DATA CONTACT ::');
          }
        })
      })
    }
  }

  static deleteContacts(id){
    db.serialize(function(){
      db.run(DELETE_DATA,{
        $id : id,
      },function(err){
        if(err){
          console.log(err);
        } else{
          console.log(':: SUCCESS DELETE DATA CONTACT ::');
        }
      })
    })

    db.serialize(function(){
      db.run(DELETE_GROUP_CONTACTS,{
        $id : id,
      },function(err){
        if(err){
          console.log(err);
        } else{
          console.log(':: SUCCESS DELETE IN GROUP CONTACT ::');
        }
      })
    })
  }

  static showContact(){
    db.serialize(function(){
      db.each(SHOW_DATA,function(err,rows){
        if(err){
          console.log(err);
        } else{
          console.log(rows);
        }
      })
    })
  }
}
