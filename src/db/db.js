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
}
const createLoansTable = () => {
  const loans_schedule =
    `
        CREATE TABLE IF NOT EXISTS 
        loans_schedule(
            id SERIAL PRIMARY KEY,
            farmer INT NOT NULL,
            loan_amount INT NOT NULL,
            loan_paid INT NOT NULL,
            amount_due INT NOT NULL,
            due_date DATE NOT NULL,
            amount_paid INT NOT NULL,
            date_paid DATE NOT NULL,
            overdue INT NOT NULL,
        )
    `;

  sql(loans_schedule);

}
const createLoansOfficerTable = () => {
  const loans_schedule =
    `
    CREATE TABLE IF NOT EXISTS 
    loans_schedule(
        id SERIAL PRIMARY KEY,
        farmer INT NOT NULL,
        loan_amount INT NOT NULL,
        loan_paid INT NOT NULL,
        amount_due INT NOT NULL,
        due_date DATE NOT NULL,
        amount_paid INT NOT NULL,
        date_paid DATE NOT NULL,
        overdue INT NOT NULL,
    )
`;
  sql(loans_schedule);

}
const dropTable = () => {
  const text =
    `
    DROP TABLE IF EXISTS loans_schedule
    `;
  pool.query(text)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
pool.on('remove', () => {
  console.log('Client removed');
  process.exit(0);
})
module.exports = {
  createLoansTable,
  dropTable,
  pool
}
require('make-runnable');
