"use strict"

let repl = require('repl')

import Contact from './contact'
import Group from './group'
var Table = require('cli-table');

// instantiate
var table = new Table({
    head: ['No.', 'Command','Description']
  , colWidths: [8, 70,30]
});


class Main {
  static help() {
    table.push(
    [1, 'help', 'Show All Commands'],
    [2, 'seedContact(firstname, lastname, companyName, phone, email)', 'Insert new contact'],
    [3, 'updateContact(firstname, lastname, companyName, phone, email, id)', 'Update contacts'],
    [4, 'deleteContact(id)', 'Delete 1 contact'],
    [5, 'assignContactToGroup(contacts_id, groups_id)', 'Assign 1 contact to group'],
    [6, 'showContactGroup()', 'Show Contact Group'],
    [7, 'createGroup(groupName)', 'Create 1 Group'],
    [8, 'updateGroupupdateGroup(groupName, groupId)', 'Update 1 Group'],
    [9, 'deleteGroup(groupId)', 'Delete 1 Group'],
    [10, 'showGroup()', 'Show All Group'])
    console.log(table.toString());
  }
}


var r = repl.start('REPL > ')
// Repl Contact
r.context.help = Main.help
r.context.seedContact = Contact.seedContact
r.context.updateContact = Contact.updateContact
r.context.deleteContact = Contact.deleteContact
r.context.assignContactToGroup = Contact.assignContactToGroup
r.context.showContactGroup = Contact.showContactGroup
// Repl Group
r.context.createGroup = Group.createGroup
r.context.updateGroup = Group.updateGroup
r.context.deleteGroup = Group.deleteGroup
r.context.showGroup = Group.showGroup
