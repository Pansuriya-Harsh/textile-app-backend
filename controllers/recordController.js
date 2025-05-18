const Record = require('../models/Record');

// CREATE
exports.createRecord = async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate record for challanNumber, designNumber, and designDetail' });
    }
    res.status(500).json({ error: 'Failed to create record', details: err.message });
  }
};

// GET all records for a party
exports.getRecordsByParty = async (req, res) => {
  try {
    const records = await Record.find({ partyId: req.params.partyId }).sort({ challanNumber: 1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch records', details: err.message });
  }
};

// GET single record
exports.getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch record', details: err.message });
  }
};

// UPDATE
exports.updateRecord = async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Duplicate record for challanNumber, designNumber, and designDetail' });
    }
    res.status(500).json({ error: 'Failed to update record', details: err.message });
  }
};

// DELETE
exports.deleteRecord = async (req, res) => {
  try {
    const deleted = await Record.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record', details: err.message });
  }
};
