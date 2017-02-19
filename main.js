
"use strict"

// import {Contacts} from "./contact.js"
// import {Groups} from "./group.js"
import {ContactGroup} from "./contact-group.js"

const repl = require('repl')

// let contacts = new Contacts()
// let groups = new Groups()
let contactGroup = new ContactGroup()

let start = repl.start('> ')

start.context.addContactGroup = contactGroup.addContactGroup
start.context.editContactGroup = contactGroup.editContactGroup
