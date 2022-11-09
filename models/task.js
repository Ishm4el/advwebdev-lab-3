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
	},
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
	user: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
},
    {
        // ensure `res.json()` include virtuals
        toJSON: { virtuals: true },
        // ensure `console.log()` include virtuals
        toObject: { virtuals: true },
    }
);

TaskSchema.virtual('project', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'tasks',
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;