"use strict"

import {Contacts} from "./contact.js"
import {Groups} from "./group.js"
import {ContactsGroups} from "./contact-group.js"

const repl = require('repl')

let contacts = new Contacts()
let groups = new Groups()
let contactGroup = new ContactsGroups()

let start = repl.start('> ')

start.context.showContacts = contacts.showContacts
start.context.addContacts = contacts.addContacts
start.context.editContacts = contacts.updateContacts
start.context.deleteContacts = contacts.deleteContacts

start.context.showGroups = groups.showGroups
start.context.addGroup = groups.addGroup
start.context.editGroup = groups.updateGroup
start.context.deleteGroup = groups.deleteGroup

start.context.showContactGroup = contactGroup.showContactGroup
start.context.addContactGroup = contactGroup.addContactGroup
start.context.deleteContactGroup = contactGroup.deleteContactsGroups
start.context.updateContactGroup = contactGroup.updateContactGroup
