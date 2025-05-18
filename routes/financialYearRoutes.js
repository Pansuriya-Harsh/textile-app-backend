const express = require('express');
const router = express.Router();
const { listFinancialYears, createFinancialYear } = require('../controllers/financialYearController');
const authenticateToken = require('../middleware/verifyToken');

router.get('/list', authenticateToken, listFinancialYears);
router.post('/create', authenticateToken, createFinancialYear);

module.exports = router;
