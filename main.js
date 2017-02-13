"use strict"

import {Contacts} from "./contact.js"

const repl = require('repl')

let contacts = new Contacts()
let start = repl.start('> ')

start.context.showContacts = contacts.showContacts
start.context.addContacts = contacts.addContacts
start.context.editContacts = contacts.updateContacts
start.context.deleteContacts = contacts.deleteContacts
