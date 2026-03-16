import Database from "better-sqlite3";

const db = new Database("db/database.db");
db.pragma("journal_mode = WAL");

db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    quantity INTEGER DEFAULT 1,
    basic_materials REAL,
    sub_materials REAL,
    rev_waste REAL,
    basic_salary REAL,
    sub_salary REAL,
    esv REAL,
    prod_prep REAL,
    general_exp REAL,
    administrative_exp REAL,
    general_cost REAL NOT NULL
  )`);

export default db;
