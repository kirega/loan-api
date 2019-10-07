const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});
const sql = (query) => {
  pool.query(query)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createLoansTable = () => {
  const loans_schedule =
    `
        CREATE TABLE IF NOT EXISTS 
        loans_schedule(
            id SERIAL PRIMARY KEY,
            farmer INT NOT NULL,
            officer INT NOT NULL,
            loan_amount INT NOT NULL,
            loan_paid INT NOT NULL,
            amount_due INT NOT NULL,
            due_date DATE NOT NULL,
            amount_paid INT NOT NULL,
            date_paid DATE NOT NULL,
            overdue INT NOT NULL DEFAULT 0
        )
    `;

  sql(loans_schedule);

};

const createLoansOfficerTable = () => {
  const loans_officer =
    `
    CREATE TABLE IF NOT EXISTS 
    loans_officer(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL
    )
`;
  sql(loans_officer);

};
const createFarmersTable = () => {
  const farmers =
    `
    CREATE TABLE IF NOT EXISTS 
    farmers(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL
    )
`;
  sql(farmers);

};
const dropLoansTable = () => {
  const loans =
    `
    DROP TABLE IF EXISTS loans_schedule
    `;
  sql(loans);
};
const dropFarmersTable = () => {
  const farmers =
    `
    DROP TABLE IF EXISTS farmers
    `;
  sql(farmers);
};
const dropOfficersTable = () => {
  const officers =
    `
    DROP TABLE IF EXISTS loans_officer
    `;
  sql(officers);
};

pool.on('remove', () => {
  console.log('Client removed');
});

module.exports = {
  createLoansTable,
  createLoansOfficerTable,
  createFarmersTable,
  dropLoansTable,
  dropOfficersTable,
  dropFarmersTable,
  pool
};
require('make-runnable');
