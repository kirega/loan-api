const { pool } = require('../db/db');

/**
 * Utility function that makes calls to the database
 * @param query Accepts the SQL string
 * @param params accepts whatever values need to be parsed
 * @return {Promise<any>} returns a new Promise
 */
export default (query, params) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err)
      });
  });
};

