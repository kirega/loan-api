// routes/index.js
import express from 'express';
import Loans from '../controllers/loans';
import Officer from '../controllers/loanOfficers';
import Farmers from "../controllers/farmers";
var router = express.Router();

/* Loans Schedule. */
router.get('/loans', Loans.getAllLoans);
router.get('/populate_loans', Loans.populateTable);
router.post('/loans', Loans.addLoan);
router.get('/loans/portfolio', Loans.getPortfolio);
router.get('/loans/outstanding', Loans.getOutstanding);
router.get('/loans/risk', Loans.getLoansAtRisk);

/* Loans Officers. */
router.get('/populate_officers', Officer.populateTable);
router.get('/officer/loans', Officer.getLoansByOfficer);
router.get('/officer/:id/loans/', Officer.getLoanPerOfficer);
router.get('/officer', Officer.getOfficers);

/* Farmers*/
router.get('/populate_farmers', Farmers.populateTable);

export default router;
