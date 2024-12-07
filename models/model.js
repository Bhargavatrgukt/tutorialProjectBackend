const db = require("../database/db");

//creating a tutorial

const createTutorial = async (title, description, published) => {
  const query = `INSERT INTO tutorials (title, description, published) VALUES (?, ?, ?)`;

  return new Promise((resolve, reject) => {
    db.run(query, [title, description, published || false], function (err) {
      if (err) {
        reject(err); // Rejects the promise with the error
      } else {
        console.log(this);
        resolve(this); // Resolves the promise with the metadata (this contains lastID)
      }
    });
  });
};

// find a Tutorial by id
const findTutorial = async (id) => {
  const quey = `SELECT * FROM tutorials  WHERE id=?`;
  return new Promise((resolve, reject) => {
    db.get(quey, [id], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

//get all Tutorials
const getTutorials = async () => {
  const quey = `SELECT * FROM tutorials`;
  return new Promise((resolve, reject) => {
    db.all(quey, [], function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//get all published Tutorials
const getPublishedTutorials = (published) => {
  const query = `SELECT * FROM tutorials WHERE published = ?`;

  return new Promise((resolve, reject) => {
    db.all(query, [published === "true"], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

const updateTutorialById = async (id) => {
  const query = `UPDATE  tutorials  SET published=true WHERE id=? `;
  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        console.log(`Rows affected: ${this.changes}`);
        resolve();
      }
    });
  });
};

//remove a Tutorial

const removeTutorial = async (id) => {
  const query = `DELETE FROM tutorials WHERE id=?`;
  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

const removeAllTutorial = async () => {
  const query = `DELETE FROM tutorials`;
  return new Promise((resolve, reject) => {
    db.run(query, [], function (err) {
      if (err) {
        reject(err);
      }
      console.log("Rows deleted:", this.changes);
      resolve(this.changes);
    });
  });
};

module.exports = {
  createTutorial,
  findTutorial,
  getTutorials,
  getPublishedTutorials,
  updateTutorialById,
  removeTutorial,
  removeAllTutorial,
};
