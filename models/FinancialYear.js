const mongoose = require('mongoose');

const financialYearSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  year: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('FinancialYear', financialYearSchema);
