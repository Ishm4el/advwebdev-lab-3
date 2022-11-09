const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: String,
	last_name: String,
	title: String,
	active: Boolean,
},
    {
        // ensure `res.json()` include virtuals
        toJSON: { virtuals: true },
        // ensure `console.log()` include virtuals
        toObject: { virtuals: true },
    }
);

UserSchema.virtual('task', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'users',
});

UserSchema.virtual('project', {
	ref: 'Project',
	localField: '_id',
	foreignField: 'users',
});

const User = mongoose.model('User', UserSchema);

module.exports = User;