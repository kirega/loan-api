import db from '../utils/dbUtils';
import records from '../db/officersData';

const Officer = {
  /**
   * Fetches all the loans grouped by loans officer.
   * @return {Promise<void>}
   */
  async getLoansByOfficer(req, res) {
    const q =
      `
      SELECT officer, first_name,last_name, sum(loan_amount) as portfolio, sum(amount_due) as outstanding,
      SUM( CASE WHEN  date_paid - due_date > 30 AND date_paid - due_date < 60 THEN overdue ELSE 0 END) as overdue
      FROM loans_schedule 
      INNER JOIN loans_officer ON loans_officer.id=loans_schedule.officer
      GROUP BY officer, first_name, last_name
      ORDER BY officer ASC
      `;
    const results =  await db(q, []);
    return res.status(200).send(results.rows);
  },
  /**
   * Fetches all loan officers.
   * @param req
   * @param res
   * @return {Promise<*|void>}
   */
  async getOfficers(req, res){
    const q =
      `SELECT * from loans_officer
      `;
    const results =  await db(q, []);
    return res.status(200).send(results.rows);
  },
  async getLoanPerOfficer(req, res){
    const q =
      `
      SELECT officer, first_name,last_name, sum(loan_amount) as portfolio, sum(amount_due) as outstanding,
      SUM( CASE WHEN  date_paid - due_date > 30 AND date_paid - due_date < 60 THEN overdue ELSE 0 END) as overdue
      FROM loans_schedule 
      INNER JOIN loans_officer ON loans_officer.id=loans_schedule.officer
      WHERE officer=$1
      GROUP BY officer, first_name, last_name
      ORDER BY officer ASC
      `;
    const { id } = req.params;
    const results =  await db(q, [id]);
    return res.status(200).send(results.rows);
  }
  ,
  /**
   * Updates the loans officers table with data about the loan officers.
   * @param req
   * @param res
   * @return {Promise<*|void>}
   */
  async populateTable(req, res) {
    const q = `
            INSERT INTO loans_officer
                (first_name,last_name,email, gender)
                values ($1,$2,$3,$4)`;
    for (let item of records) {
      const {
        first_name,
        last_name,
        email,
        gender,
      } = item;
      const results = await db(q, [ first_name, last_name, email, gender ]);
    }
    return res.status(200).send({ message: 'Successfully created ' + records.length + ' records' });
  },
};
export default Officer;
