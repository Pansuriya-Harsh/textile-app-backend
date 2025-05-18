const express = require('express');
const router = express.Router();
const {
  getPartiesByYear,
  createParty,
  updateParty,
  deleteParty,
  getPartyById,
} = require('../controllers/partyController');
const authenticateToken = require('../middleware/verifyToken');

router.get('/party/:id', authenticateToken, getPartyById);
router.get('/:yearId', authenticateToken, getPartiesByYear);
router.post('/', authenticateToken, createParty);
router.put('/:id', authenticateToken, updateParty);
router.delete('/:id', authenticateToken, deleteParty);

module.exports = router;
