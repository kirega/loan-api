// routes/index.js
import express from 'express';
import Loans from '../controllers/loans';

var router = express.Router();

/* GET home page. */
router.get('/loans', Loans.getAllLoans)
router.post('/loans', Loans.addLoan);

export default router;