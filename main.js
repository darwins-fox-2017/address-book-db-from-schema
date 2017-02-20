"use strict"
const repl = require("repl")
const sqlite3 = require("sqlite3")

let file = "address_book.db"
let db = new sqlite3.Database(file)

import Contact from "./contact.js"
import Group from "./group.js"
import contactGroup from "./contact-group.js"

class Main {
  constructor() {
    this.contact = new Contact()
    this.group = new Group()
    this.contactGroup = new contactGroup()
  }

  //Done
  showContact() {
    this.contact.view()
  }

  //Done
  insertContact(name, telp, email) {
    this.contact.add(name, telp, email)
  }

  //Done
  insertContactToGroup(contact_id, group_id) {
    this.contactGroup.add(contact_id, group_id)
  }

// Ganti Contact Update()
  updateContact(id, name, telp, email) {
    this.contact.update(id, name, telp, email)
  }

  //Done
  deleteContact(id) {
    this.contact.delete(id)
  }
  // Done
  insertGroup(name) {
    this.group.add(name)
  }

  //Done
  updateGroup(id, name) {
    this.group.update(id, name)
  }

  //Done
  deleteGroup(id) {
    this.group.delete(id)
  }

  //Done
  showGroup() {
    this.group.view()
  }

}

let r = repl.start("> ")
let main = new Main()
r.context.main = main
