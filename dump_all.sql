PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, company_name TEXT, email TEXT, phone TEXT, created_at DATE);
/**** ERROR: (11) database disk image is malformed *****/
/**** ERROR: (11) database disk image is malformed *****/
CREATE TABLE groups (id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT NOT NULL, created_at DATE);
/**** ERROR: (11) database disk image is malformed *****/
/**** ERROR: (11) database disk image is malformed *****/
/**** ERROR: (11) database disk image is malformed *****/
/**** ERROR: (11) database disk image is malformed *****/
COMMIT;
