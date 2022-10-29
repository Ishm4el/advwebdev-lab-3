const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: String,
	last_name: String,
	title: String,
	active: Boolean,
	project: { type: mongoose.Schema.Types.ObjectID, ref: 'Project' },
	tasks: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Task' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;