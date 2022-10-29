const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	name: {
		type: String,
		index: { unique: true },
	},
	details: String,
	priority: {
		type: String,
		enum: ['low', 'medium', 'high'],
	}
	status: {
		type: String,
		enum: ['assigned', 
			'in progress', 
			'in review',
			'completed'],
	},
	timeline: {
		date_assigned: String,
		date_due: String,
		date_last_updated: String,
	},
	user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
	project: { type: mongoose.Schema.Types.ObjectID, ref: 'Project' },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;