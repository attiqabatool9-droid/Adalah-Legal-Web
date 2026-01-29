const mongoose = require('mongoose');

const caseSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Ye Client ki ID hogi
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Ye us Lawyer ki ID hogi jo accept karega
      default: null,
    },
    title: {
      type: String,
      required: [true, 'Please add a case title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    caseType: {
      type: String,
      required: [true, 'Please specify the case type'],
    },
    status: {
      type: String,
      // UPDATE: 'accepted' ko hata kar 'active' kiya hai taaki frontend se match kare
      enum: ['pending', 'active', 'completed', 'rejected'],
      default: 'pending',
    },
    city: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Case', caseSchema);