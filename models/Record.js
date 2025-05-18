const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
  {
    lotNumber: {
      type: String,
      required: true,
      trim: true,
    },
    challanNumber: {
      type: Number,
      required: true,
    },
    inwardDate: {
      type: Date,
    },
    outwardDate: {
      type: Date,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    designNumber: {
      type: String,
      required: true,
      trim: true,
    },
    designDetail: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    quantityType: {
      type: String,
      enum: ['pcs', 'meter'],
      required: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
      set: (v) => parseFloat(v.toFixed(2)),
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    billNumber: {
      type: Number,
      required: true,
    },
    firm: {
      type: String,
      lowercase: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    billName: {
      type: String,
      trim: true,
      required: true,
    },
    partyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Party',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate amount before saving
recordSchema.pre('validate', function (next) {
  if (this.quantity != null && this.rate != null) {
    this.amount = parseFloat((this.quantity * this.rate).toFixed(2));
  }
  next();
});

// Compound unique index
recordSchema.index(
  { challanNumber: 1, designNumber: 1, designDetail: 1 },
  { unique: true }
);

module.exports = mongoose.model('Record', recordSchema);
