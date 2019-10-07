import records from "../db/farmersData";
import db from "../utils/dbUtils";

const Farmers = {
  /**
   * Updates the farmers table with data about the farmers.
   * @param req
   * @param res
   * @return {Promise<*|void>}
   */
  async populateTable(req, res) {
    const q = `
            INSERT INTO farmers
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
  }
};
export default Farmers;
