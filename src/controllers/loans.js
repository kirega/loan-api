// connect to the database
const { pool } = require('../db/db');
const Loans = {
    getAllLoans(req, res) {
        pool.connect((err, client, done) => {
            const q = 'SELECT * from loans_schedule';
            client.query(q, (err, results) => {
                done();
                if (err) {
                    res.status(400).json({ err });
                }
                if (results.rows < '1') {
                    res.status(404).send({
                        status: "fail",
                        message: 'No loan data found'
                    });
                } else {
                    res.status(200).send({
                        status: "success",
                        message: 'Loan Data fetched',
                        loans: results.rows
                    });
                }
            })
        })
    },
    addLoan(req, res) {
        const { loanAmount, paid } = req.body;
        const q = 'INSERT INTO loans_schedule (loanamount,loanpaid) values ($1,$2)';
        pool.connect((err, client, done) => {
            client.query(q, [loanAmount, paid], (err, results) => {
                done();
                if(err){
                    throw err;
                }
                res.status(201).json({status: 'success', message: 'loan repayment recorded'})
            })
        })
    }
}


export default Loans
