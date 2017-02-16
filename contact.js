const sqlite3 = require('sqlite3').verbose();
let file = 'contacts.db';
var db = new sqlite3.Database(file);

class Contact {

    static addContact(name, company, email, phone_number) {
        let query_add_student = "INSERT INTO contacs (name,company,email,phone_number) VALUES (?,?,?,?)"
        if (Contact.checkEmail(email) && Contact.checkPhone(phone_number)) {
            db.run(query_add_student, [name, company, email, phone_number], function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('add new contact data success');
                }
            });
        } else {
            console.log('phone number / email error');
        }

    }

    static updateContact(id, field, updateto) {
        let UPDATE_QUERY = `UPDATE contacs set ${field} = "${updateto}" where id = (?)`;
        if (field == 'email') {
            if (Contact.checkEmail(updateto)) {
                db.run(UPDATE_QUERY, [id], function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('update contact data success');
                    }
                });
            } else {
                console.log('wrong email format');
            }
        } else if (field == 'phone_number') {
            if (Contact.checkPhone(updateto)) {
                db.run(UPDATE_QUERY, [id], function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('update contact data success');
                    }
                });
            } else {
                console.log('wrong phone number format');
            }
        } else {
            db.run(UPDATE_QUERY, [id], function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('update contact data success');
                }
            });
        }

    }

    static deleteData(id) {
        let DELETE_QUERY = `DELETE FROM contacs where id = ${id}`;
        db.run(DELETE_QUERY, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`delect contact with ${id} success`);
            }
        });
    }

    static showAll() {
        let SHOW_QUERY = `select contacs.*, groups.name as group_name from contacs left join groups_contacs on
                      contacs.id = groups_contacs.contac_id left join groups on groups_contacs.group_id=groups.id `
        db.each(SHOW_QUERY, function(err, row) {
            if (err) {
                console.log(err);
            } else {
                console.log(row);
            }
        })

    }

    static showFreeFilter(field, value) {
        let SHOW_BY_FILTER = `select contacs.*, groups.name as group_name from contacs left join groups_contacs on
                           contacs.id = groups_contacs.contac_id left join groups on groups_contacs.group_id=groups.id
                           where ${field}=(?)`;
        db.each(SHOW_BY_FILTER, [value], function(err, row) {
            if (err) {
                console.log(err);
            } else {
                console.log(row);
            }
        });
    }

    static checkEmail(email) {
        let regex = /\w.*@\w.*./;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }

    static checkPhone(phone_num) {
        if (phone_num.length < 10 || phone_num.length > 13) {
            return false
        } else {
            return true
        }
    }

    static help() {
        console.log('add contact : addcontact(name,company,email,phone_number)');
        console.log('update contact : updatecontact(id,filed,value)');
        console.log('delete contact : deletecontact(id,filed,value)');
        console.log('show all contact : showall()');
        console.log('show contact by filter : showbyfilter(field,valueOf)');
        console.log('add group : addgroup(group_name)');
        console.log('delete group : deletegroup(id)');
        console.log('change group name : changegroupname(id,name)');
        console.log('add conection : addconection(group_id,contact_id)');
        console.log('change conection : changeconection(id,groupid,contactid)');
        console.log('delete conection : deleteconection(id)');
        console.log('help : help()');
    }

}



export default Contact
