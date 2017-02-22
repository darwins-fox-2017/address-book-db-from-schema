"use strict"

let repl = require('repl')

import Contact from './contact'
import Group from './group'


// instantiate

class Main {

    static help() {
      console.log("1, 'help', 'Show All Commands'");
      console.log("2, 'seedContact(firstname, lastname, companyName, phone, email)', 'Insert new contact'"); //
      console.log("3, 'updateContact(firstname, lastname, companyName, phone, email, id)', 'Update contacts'"); //
      console.log("4, 'deleteContact(id)', 'Delete 1 contact'");
      console.log("5, 'assignContactToGroup(contacts_id, groups_id)', 'Assign 1 contact to group'"); //
      console.log("6, 'showContactGroup()', 'Show Contact Group'");
      console.log("7, 'createGroup(groupName)', 'Create 1 Group'"); //$=
      console.log("8, 'updateGroupupdateGroup(groupName, groupId)', 'Update 1 Group'"); // $=
      console.log("9, 'deleteGroup(groupId)', 'Delete 1 Group'"); // $
      console.log("10, 'showGroup()', 'Show All Group'"); // $
    }
}



var start = repl.start('REPL > ')
// Repl untuk Contact
start.context.help = Main.help
start.context.seedContact = Contact.seedContact
start.context.updateContact = Contact.updateContact
start.context.deleteContact = Contact.deleteContact
start.context.assignContactToGroup = Contact.assignContactToGroup
start.context.showContactGroup = Contact.showContactGroup
// Repl untuk group
start.context.createGroup = Group.createGroup
start.context.updateGroup = Group.updateGroup
start.context.deleteGroup = Group.deleteGroup
start.context.showGroup = Group.showGroup
