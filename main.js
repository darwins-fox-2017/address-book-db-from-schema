import Contact from "./contact.js";
import Group from "./group.js"
const repl = require('repl')

let contactDetail =  {
    "contact_name" : faker.name.firstName(),
    "company_name" : faker.company.companyName(),
    "phone" : faker.phone.phoneNumberFormat(),
    "email" : faker.internet.email(),
    "created_at" : new Date()
  }
let groupDetail =  {
    "group_name" : faker.random.word(),
    "created_at" : new Date()
  }

var group = new Group(groupDetail)
var contact = new Contact(contactDetail)

group.showGroup()
group.addGroup()
// (group_name, created_at)
group.updateGroup(7,"group_name",faker.random.word())
group.deleteGroup(1)

contact.showContact()
contact.addContacts()
// (contact_name, company_name, phone, email, created_at)
contact.updateContact(25,"contact_name",faker.name.firstName())
contact.deleteContact(25)
