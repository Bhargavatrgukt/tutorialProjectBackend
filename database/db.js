const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "..", "database.sqlite3");

const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error(`Error in the database connection: ${err.message}`);
  } else {
    console.log("Database connected successfully!");
  }
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS tutorials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  published BOOLEAN DEFAULT 0
);
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Tutorials table created exists.");
  }
});

module.exports = db;
