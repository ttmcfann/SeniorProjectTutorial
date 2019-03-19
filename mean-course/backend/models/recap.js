const mongoose = require('mongoose');

const recapSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});


module.exports = mongoose.model('Recap', recapSchema);
