
"use strict"

import {Contact} from "./contact.js"
// import {Groups} from "./group.js"
import {ContactGroup} from "./contact-group.js"

const repl = require('repl')

let contact = new Contact()
// let groups = new Groups()
let contactGroup = new ContactGroup()

let start = repl.start('> ')

//contact gropu
start.context.addCG = contactGroup.addCG
start.context.editCG = contactGroup.editCG
start.context.deleteCG = contactGroup.deleteCG
start.context.showCG = contactGroup.showCG

//contact
start. context.addContact = contact.addContact
start.context.editContact = contact.editContact
start.context.deleteContact = contact.deleteContact
start.context.showContact = contact.showContact