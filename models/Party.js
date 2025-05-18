const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  financialYearId: { type: mongoose.Schema.Types.ObjectId, ref: 'FinancialYear', required: true },
  name: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Party', partySchema);
