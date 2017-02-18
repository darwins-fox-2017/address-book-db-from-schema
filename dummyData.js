var faker = require('faker');
var jsonfile = require('jsonfile')
var data = {
  "contacts":[],
  "groups" :[]
}

for (var i = 0; i < 5; i++) {
  contact =  {
      "contactName" : faker.name.firstName(),
      "company" : faker.company.companyName(),
      "phone" : faker.phone.phoneNumberFormat(),
      "email" : faker.internet.email(),
      "created_at" : faker.date.past()//new Date ().toLocaleString()
    }

  group = {
      "groupName" : faker.random.word(),
      "created_at" : faker.date.past()
    }
  data.contacts.push(contact)
  data.groups.push(group)
}

// console.log(data);
// console.log(faker);

jsonfile.writeFileSync('data.json', data, {spaces: 2})
