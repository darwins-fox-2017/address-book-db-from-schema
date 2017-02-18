import {Contacts} from "./contact.js";
import {Groups} from "./group.js"
import{ContactGroups} from "./contact-group.js"

const repl = require('repl')
var relp = repl.start('> ')
relp.context.addContact         = Contacts.addContact
relp.context.updateContact      = Contacts.updateContact
relp.context.deleteContacts     = Contacts.deleteContacts
relp.context.showContact        = Contacts.showContact
relp.context.addGroup           = Groups.addGroup
relp.context.updateGroup        = Groups.updateGroup
relp.context.deleteGroup        = Groups.deleteGroup
relp.context.showGroup          = Groups.showGroup
relp.context.addContactToGroup  = ContactGroups.addContactToGroup

//running: babel-node main.js
/*
addContact('Aiko', 'SEJODOH', '081234567', 'aiko@gmail.com', '18-01-2017')
addGroup('Founder')
addContactToGroup('1', '3')
deleteContacts(3)
deleteGroup(3)
showContact()
showGroup()
updateContact(3, 'Aiko', 'SEJODOH', '081234567890', 'aiko@gmail.com', '18-01-2017')
updateGroup(2,'Co-Founder', '18-01-2017')
*/
