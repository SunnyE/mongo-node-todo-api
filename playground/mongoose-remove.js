const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

// Todo.remove({}).then((result) => {
//     console.log(results)
// });

//Todo.findOneAndRemove()

// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5910870ddb5ab209d6928b32').then((todo) => {
    console.log(todo);
})