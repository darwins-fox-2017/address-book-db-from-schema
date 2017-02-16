

import Group from "./group.js";
import Contact from "./contact.js";
import ContactGroup from "./contact-group.js";
const repl=require('repl');

let r=repl.start('=>')
 r.context.addcontact=Contact.addContact;
 r.context.updatecontact=Contact.updateContact;
 r.context.deletecontact=Contact.deleteData;
 r.context.showall=Contact.showAll;
 r.context.showbyfilter=Contact.showFreeFilter;
 r.context.addgroup=Group.addGroup;
 r.context.deletegroup=Group.deleteGroup;
 r.context.changegroupname=Group.changeGroupName;
 r.context.showgroup=Group.showgroup
 r.context.addconection=ContactGroup.addConection;
 r.context.changeconection=ContactGroup.changeConection;
 r.context.deleteconection=ContactGroup.deleteConection;
 r.context.help= Contact.help;
