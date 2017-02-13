"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

const file = 'address_book.db'
const db = new sqlite.Database(file)

//SQL STATEMENT
let seedData = ""
