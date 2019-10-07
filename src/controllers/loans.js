import db from '../utils/dbUtils';
import records from '../db/loansData';

const Loans = {
  /**
   * fetches all loans from the loans_schedule table
   * @param req
   * @param res
   */
  async getAllLoans(req, res) {
    const loans_schedule = '' +
      `SELECT 
      loans_schedule.id,officer, first_name,last_name, loan_amount, loan_paid, amount_due, due_date, 
      amount_paid, date_paid, overdue
      FROM loans_schedule
      INNER JOIN farmers on loans_schedule.farmer=farmers.id
      `;
    const portfolio =
      `
      SELECT SUM(loan_amount) as total FROM loans_schedule
      `;
    const outstanding =
      `
      SELECT SUM(amount_due) as total FROM loans_schedule
      `;
    const overdueQuery =
      `
      SELECT SUM(overdue) as total FROM loans_schedule
      WHERE date_paid - due_date BETWEEN 30 AND 60
      `
    ;
    try {
      const results = await db(loans_schedule, []);
      const results_portfolio = await db(portfolio, []);
      const results_outstanding = await db(outstanding, []);
      const results_overdue = await db(overdueQuery, []);
      if (results.rows.length < 1) {
        return res.status(200).send({
          status: "fail",
          message: 'No loan data found'
        });
      }
      return res.status(200).send({
        status: 'Success',
        portfolio: results_portfolio.rows[0],
        outstanding: results_outstanding.rows[0],
        overdue: results_overdue.rows[0],
        loans: results.rows
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  async addLoan(req, res) {
    const {
      farmer,
      loan_amount,
      loan_paid,
      amount_due,
      due_date,
      amount_paid,
      date_paid,
      overdue
    } = req.body;
    const q = `
            INSERT INTO loans_schedule 
                (farmer,loan_amount,loan_paid, amount_due, due_date, amount_paid, date_paid, overdue) 
                values ($1,$2,$3,$4,$5,$6,$7,$8)`;
    try {
      const results = await db(q, [ farmer, loan_amount, loan_paid, amount_due, due_date, amount_paid, date_paid, overdue ]);
      res.status(201).json({ status: 'success', message: 'loan repayment recorded' })
    } catch (error) {
      res.status(500).send(error);
    }
  },
  /**
   * Fetches a summation of the total loan portfolio.
   * @param req
   * @param res
   * @return {Promise<Object>}
   */
  async getPortfolio(req, res) {
    const q =
      `
      SELECT SUM(loan_amount) as portfolio FROM loans_schedule
      `;
    try {
      const results = await db(q, []);
      return res.status(200).send({ data: results.rows });
    } catch (error) {
      return res.status(400).send(error);
    }

  },
  /**
   * Fetches the total number of outstanding loans that are yet to be paid.
   * These are the loans that are amounts due for a period.
   * @param req
   * @param res
   */
  async getOutstanding(req, res) {
    const q =
      `
      SELECT SUM(amount_due) as outstanding FROM loans_schedule
      `;
    try {
      const results = await db(q, []);
      return res.status(200).send({ data: results.rows });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Fetches all loans that are at risks of defaulting, these are all loan amounts overdue and between >30 to <60 days
   * from the scheduled day.
   * @param req
   * @param res
   */
  async getLoansAtRisk(req, res) {
    const farmersQuery = `
      SELECT * FROM loans_schedule
    `;
    const overdueQuery =
      `
      SELECT SUM(overdue) as total FROM loans_schedule
      WHERE date_paid - due_date BETWEEN 30 AND 60
      `
    ;

    try {
      const overdues = await db(overdueQuery, []);
      const farmers = await db(farmersQuery, []);
      return res.status(200).send({
        status: 'success',
        overdues: overdues.rows,
        farmers: farmers.rows
      });
    } catch (e) {
      return res.status(500).send(e);
    }
  }
  ,
  /**
   * A useful endpoints for creating a list of dummy data into the database.
   * @param req
   * @param res
   * @return {Promise<*|void>}
   */
  async populateTable(req, res) {
    const q = `
            INSERT INTO loans_schedule
                (farmer,officer,loan_amount,loan_paid, amount_due, due_date, amount_paid, date_paid, overdue)
                values ($1,$2,$3,$4,$5,$6,$7,$8, $9)`;

    for (let item of records) {
      const {
        farmer,
        Officer,
        loan_amount,
        loan_paid,
        amount_due,
        due_date,
        amount_paid,
        date_paid,
        overdue
      } = item;

      try {
        const row = await db(q, [ farmer, Officer, loan_amount, loan_paid, amount_due, due_date, amount_paid, date_paid, overdue ]);
      } catch (error) {
        return res.status(400).send(error);
      }
    }
    return res.status(200).send({ message: 'success, created ' + records.length + ' records' });
  }
};

export default Loans
