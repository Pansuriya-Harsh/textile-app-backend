const FinancialYear = require('../models/FinancialYear');

const getFinancialYearLabel = (date = new Date()) => {
  const year = date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  return `${year}-${(year + 1).toString().slice(-2)}`;
};

exports.listFinancialYears = async (req, res) => {
  try {
    const years = await FinancialYear.find({ userId: req.user.id }).sort({ year: 1 });
    res.json({ financialYears: years });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch financial years' });
  }
};

exports.createFinancialYear = async (req, res) => {
  try {
    const userId = req.user.id;
    const year = getFinancialYearLabel();

    const exists = await FinancialYear.findOne({ userId, year });
    if (exists) {
      return res.status(400).json({ message: 'Financial year already exists' });
    }

    const fy = new FinancialYear({ userId, year });
    await fy.save();

    res.status(201).json({ message: 'Financial year created', financialYear: fy });
  } catch (err) {
    console.error('Create FY error:', err);
    res.status(500).json({ error: 'Failed to create financial year' });
  }
};
