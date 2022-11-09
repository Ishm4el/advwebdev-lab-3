// first: install dependencies with: npm install
// second: run this demo script with: npx nodemon script.js
const mongoose = require('mongoose');

const User = require('./models/user');
const Task = require('./models/task');
const Project = require('./models/project');

const { username, password, dbName } = require('./config.json');
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.xmfuelx.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(mongoURL, () => {
    console.log('Connected to Mongo');
});

const execScript = async () => {
    // for demo purposes clear collection on save
    // becuase running the script with nodemon

    await User.deleteMany({});
    const user = await User.create({
        "first_name" : "ish",
        "last_name" : "valenzuela",
        "title" : "project lead",
        "active" : true,
    })
    const user1 = await User.create({
        "first_name" : "Audrey",
        "last_name" : "Bel",
        "title" : "Art lead",
        "active" : true,
    })

    await Task.deleteMany({});
    const task = await Task.create({
        "name" : "amd support",
        "details" : "upgrade to support new drivers",
        "priority" : "high",
        "status" : "in progress",
        "timeline" : {
            "date_assigned" : "November 21",
            "date_due" : "December 21",
            "date_last_updated" : "November 28"
        },
    });

    await Project.deleteMany({});
    const project = await Project.create({
        "name": "Dava Diffusion",
        "description" : "Generate ai art works inspired by leonardo davinci",
        "repo_url" : "davadiff.dava",
    });

    console.log('\nFinding User by _id');
    const findUser = await User.findById(user._id);
    console.log(findUser + '\n');

    // const updateProject = await Project.updateOne(
    //     { _id: project._id }, 
    //     { $push: { manager: user._id } },
    //     { returnDocument: 'after' },
    // );

    // $set for assigning to a field
    // $push for pushing into an array
    const updateProject = await Project.findOneAndUpdate(
        { _id: project._id }, 
        { 
            $set: { manager: user._id },
            $push: { 
                tasks: task._id,
                users: [user._id, user1._id],
            } 
        },
        { returnDocument: 'after' },
    );

    const updateTask = await Task.findOneAndUpdate(
        { _id: task._id },
        {
            $set: {
                user: user._id,
            },
        },
        { returnDocument: 'after' },
    );
    const populatedTask = await Task.
        findById(task._id).
        populate('user', 'first_name last_name ').
        populate({ path: 'project', select: 'name'});

    console.log("\n======\nPrint Task\n=========\n")
    console.log(populatedTask);
   
    // const projectPopulated = await Project.
    //     findById(project._id).
    //     populate('manager').
    //     populate('tasks').
    //     populate('users');
    // console.log(projectPopulated);

    // const updatedQuiz = await Project.findById(quiz._id)
    console.log("\n========\nPrint Project\n===========\n")
    const populatedProject = await Project.
        findById(project._id).
        populate('manager', 'first_name last_name title isActive').
        populate('users', '_id').
        populate('tasks', 'name details project');

    console.log(populatedProject);
};

execScript();
