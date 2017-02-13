let repl = require('repl');
let sqlite3 = require('sqlite3');
let file = 'address.db';
let db = new sqlite3.Database(file);

class Groups {
  static insertGroups(name) {
    let QUERY_INSERT = `INSERT INTO groups (name) VALUES ('${name}')`;
    db.serialize(function() {
      db.run(QUERY_INSERT, function(err) {
        (err) ? console.log(err) : console.log('data table groups berhasil ditambahkan');
      });
    });
  }

  static updateGroups(name, id) {
    var QUERY_UPDATE = `UPDATE groups SET name = '${name}' WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(QUERY_UPDATE, function(err) {
        (err) ? console.log(err) : console.log('data table groups berhasil diubah');
      });
    });
  }

  static deleteGroups(id) {
    var QUERY_DELETE = `DELETE FROM groups WHERE id = '${id}'`;
    db.serialize(function() {
      db.run(QUERY_DELETE, function(err) {
        (err) ? console.log(err) : console.log('data table groups berhasil dihapus');
      });
    });
  }

  static showGroups() {
    var QUERY_SELECT = `SELECT * FROM groups LEFT JOIN contact_groups  ON groups.id = contact_groups.groups_id;`;
    db.serialize(function() {
      db.each(QUERY_SELECT, function(err, row) {
        (err) ? console.log(err) : console.log(row);
      });
    });
  }
}

export default Groups
