import Contact from './contact.js'
import Groups from './group.js'

let repl = require('repl');
let sqlite3 = require('sqlite3');
let file = 'address.db';
let db = new sqlite3.Database(file);

var replStr = repl.start('> ')
// dari file group
replStr.context.tambahGroups = Groups.insertGroups;
replStr.context.rubahGroups = Groups.updateGroups;
replStr.context.hapusGroups = Groups.deleteGroups;
replStr.context.lihatGroups = Groups.showGroups;

// dari file contact
replStr.context.tambahContact = Contact.insertContact;
replStr.context.rubahContact = Contact.updateContact;
replStr.context.hapusContact = Contact.deleteContact;
replStr.context.lihatContact = Contact.showContact;
replStr.context.tambahContactGroups = Contact.assignContactToGroup;
