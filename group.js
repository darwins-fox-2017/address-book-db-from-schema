const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();
let file = 'contacts.db';
var db = new sqlite3.Database(file);

class Group {
    static addGroup(groupname) {
        let ADD_GROUP_QUERY = `INSERT INTO groups (name) values (?)`
        db.run(ADD_GROUP_QUERY, [groupname], function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('add data success');
            }
        })
    }

    static deleteGroup(id) {
        let DEL_GROUP_QUERY = `DELETE FROM groups where id=${id}`
        db.run(DEL_GROUP_QUERY, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('delete data success');
            }
        })
    }

    static changeGroupName(id, name) {
        let DEL_GROUP_QUERY = `UPDATE SET name ="${name}" FROM groups where id=${id}`
        db.run(DEL_GROUP_QUERY, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('delete data success');
            }
        })
    }
    static showgroup() {
        let SHOW_GROUP_QUERY = `select * from groups`
        db.each(SHOW_GROUP_QUERY, function(err, row) {
            if (err) {
                console.log(err);
            } else {
                console.log(row);
            }
        })
    }
}

export default Group
