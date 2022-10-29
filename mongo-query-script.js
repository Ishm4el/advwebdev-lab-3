// first: install dependencies with: npm install
// second: run this demo script with: npx nodemon script.js
const mongoose = require('mongoose');

const Answer = require('./models/user');
const Question = require('./models/task');
const Quiz = require('./models/project');

const { username, password, dbName } = require('./config.json');
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.xmfuelx.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(mongoURL, () => {
    console.log('Connected to Mongo');
});

const execScript = async () => {

};
// execScript();
