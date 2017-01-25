const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	_id: Number,
	questionDetail: String,
	name: String,
	date: Date
});

mongoose.model('Question', questionSchema);