"use strict"
const repl = require("repl")
const sqlite3 = require("sqlite3")
let file = "address_book.db"
let db = new sqlite3.Database(file)

import Contact from "./contact.js"
import Group from "./group.js"
import contactGroup from "./contact-group.js"

class Main {
  constructor(db) {
    this.contact = new Contact(db)
    this.group = new Group(db)
    this.contactGroup = new contactGroup(db)
  }

  showContact() {
    this.contact.view()
  }

  insertContact(name, phone, email) {
    this.contact.add(name, phone, email)
  }

  insertContactToGroup(contact_id, group_id) {
    this.contactGroup.add(contact_id, group_id)
  }

  updateContact(id, name, phone, email) {
    this.contact.update(id, name, phone, email)
  }

  deleteContact(id) {
    this.contact.delete(id)
  }

  insertGroup(name) {
    this.group.add(name)
  }

  updateGroup(id, name) {
    this.group.update(id, name)
  }

  deleteGroup(id) {
    this.group.delete(id)
  }

  showGroup() {
    this.group.view()
  }

}

let repel = repl.start("Command Here> ")
let main = new Main(db)
repel.context.main = main