const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	name: {
		type: String,
		index: { unique: true },
	},
	description: String,
	repo_url: String,
	manager: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
	tasks: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Task' }],
	users: [{ type: mongoose.Schema.Types.ObjectID, ref: 'User' }],
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;