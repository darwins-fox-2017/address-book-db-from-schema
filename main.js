
"use strict"

import {Contact} from "./contact.js"
import {Group} from "./group.js"
import {ContactGroup} from "./contact-group.js"

const repl = require('repl')

let contact = new Contact()
let group = new Group()
let contactGroup = new ContactGroup()

let start = repl.start('> ')

//contact group
start.context.addCG = contactGroup.addCG
start.context.editCG = contactGroup.editCG
start.context.deleteCG = contactGroup.deleteCG
start.context.showCG = contactGroup.showCG

//contact
start. context.addContact = contact.addContact
start.context.editContact = contact.editContact
start.context.deleteContact = contact.deleteContact
start.context.showContact = contact.showContact

//group details
start.context.addGroup = group.addGroup
start.context.showGroup = group.showGroup
start.context.editGroup = group.editGroup
start.context.deleteGroup = group.deleteGroup

