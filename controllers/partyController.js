const Party = require('../models/Party');

// GET /parties/:yearId
exports.getPartiesByYear = async (req, res) => {
  try {
    const { yearId } = req.params;
    const parties = await Party.find({ financialYearId: yearId });
    res.json(parties);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch parties' });
  }
};

// POST /parties
exports.createParty = async (req, res) => {
  try {
    const { name, financialYearId } = req.body;
    const party = new Party({ name, financialYearId });
    await party.save();
    res.status(201).json({ message: 'Party created', party });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create party' });
  }
};

// PUT /parties/:id
exports.updateParty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await Party.findByIdAndUpdate(id, { name });
    res.json({ message: 'Party updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update party' });
  }
};

// DELETE /parties/:id
exports.deleteParty = async (req, res) => {
  try {
    const { id } = req.params;
    await Party.findByIdAndDelete(id);
    res.json({ message: 'Party deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete party' });
  }
};

// GET /parties/party/:id
exports.getPartyById = async (req, res) => {
  try {
    const { id } = req.params;
    const party = await Party.findById(id);

    if (!party) {
      return res.status(404).json({ error: 'Party not found' });
    }

    res.json(party);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch party' });
  }
};
