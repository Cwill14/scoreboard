const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    homeScore: Number,
    awayScore: Number,
    userId: String
})

module.exports = mongoose.model('Game', gameSchema);